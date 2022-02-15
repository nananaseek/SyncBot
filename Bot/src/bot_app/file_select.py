import logging
import json
import ast

import aiogram.utils.markdown as md
from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text
from aiogram.types import ParseMode
from aiogram.utils.exceptions import MessageNotModified
from aiogram.utils.callback_data import CallbackData
from aiohttp.client_exceptions import ClientConnectorError


from .app import *
from .states import *
from .data_fetcher import *
from .userDB import *
from .keyboards import *
from .utilits import *
from . import messages


@dp.message_handler(commands=['list'])
async def file_list(message: types.Message, state: FSMContext):
    user_id = message.from_user.id
    token = await get_access_token(user_id)
    file_name = await get_list(token=token)
    
    # await downloadFile.select.set()
    await message.reply("Ваші файли:", reply_markup=file_list_keyboard(file_name=file_name))



@dp.callback_query_handler(lambda c: c.data and c.data.startswith('download'),)
async def user_file_select(query: types.CallbackQuery, state: FSMContext):
    user_id = query.from_user.id
    username = query.from_user.username
    token = await get_access_token(user_id)
    file_name = await get_list(token=token)
    api_download_file = API_DOWNLOAD_FILE
    url = api_download_file + query.data.split(':')[-2] + '/'
    file_name = query.data.split(':')[-3]
    code = query.data[-1]
    if code.isdigit():
        code = int(code)
    if code == 1:
        await get_file(url=url, file_name=file_name, user=username, token=token)
    elif code == 2:
        await get_file(url=url, file_name=file_name, user=username, token=token)
    elif code == 3:
        await get_file(url=url, file_name=file_name, user=username, token=token)
    elif code == 4:
        await get_file(url=url, file_name=file_name, user=username, token=token)
    elif code == 5:
        await get_file(url=url, file_name=file_name, user=username, token=token)
    elif code == 6:
        await get_file(url=url, file_name=file_name, user=username, token=token)
    elif code == 7:
        await get_file(url=url, file_name=file_name, user=username, token=token)
    else:
        await bot.answer_callback_query(query.id)
    
    await query.answer('Файл завантажується')
    # await msg_del_for_d(query, 2)
    await  query.message.reply_document(open(file_name, 'rb'))

