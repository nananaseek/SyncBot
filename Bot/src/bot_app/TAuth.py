from itertools import count
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



from .app import *
from .states import *
from .data_fetcher import *
from .userDB import *
from . import messages


vote_cb = CallbackData('login', 'action')  # post:<action>:<amount>


def get_keyboard(amount):
    return types.InlineKeyboardMarkup().row(
        types.InlineKeyboardButton('Увійти', callback_data=vote_cb.new(action='login')),
        types.InlineKeyboardButton('Скасувати', callback_data=vote_cb.new(action='cancel')),
    )
 
@dp.message_handler(commands=['login'])
async def login_in_t (message: types.Message):
    await login.username.set()
    await message.reply('Введіть логін:')

@dp.message_handler(state=login.username)
async def process_username(message: types.Message, state: FSMContext):

    async with state.proxy() as data:
        data['username'] = message.text

    await login.next()
    await message.reply('Введіть ваш пароль:')

@dp.message_handler(state=login.passwd)
async def process_paswd(message: types.Message, state: FSMContext):

    async with state.proxy() as data:
        data['password'] = message.text

    await login.next()
    await message.reply('Войти в систему?', reply_markup=get_keyboard(0))

@dp.callback_query_handler(vote_cb.filter(action='login'),state=login.fin)
async def vote_up_cb_handler(query: types.CallbackQuery, state: FSMContext):

    await invalid_login_check(query=query, state=state)    

    await msg_del(query)
    await state.finish()

@dp.callback_query_handler(vote_cb.filter(action='cancel'),state=login.fin)
async def vote_up_cb_handler( query: types.CallbackQuery, state: FSMContext):

    current_state = await state.get_state()
    await msg_del(query)
    logging.info('Cancelling state %r', current_state)
    await state.finish()

async def msg_del(query):
    count = 0
    while count <= 5 :
        msg = query.message.message_id - count
        await bot.delete_message(query.from_user.id, msg)
        count = count + 1   

async def login_api (state):
    json_data = json.dumps(await state.get_data(), indent = 4) 
    return await get_login(json_data)

async def invalid_login_check (query: types.CallbackQuery, state: FSMContext):
    lg = await login_api(state)
    json_data = json.loads(lg)
    try :
        if json_data['detail'] == json_data['detail']:
            await query.message.reply(json_data['detail'])
    except KeyError:
        # await query.message.reply('Успіх')
        userid = query.from_user.id
        json_data = json_data['token']
        json_data = ast.literal_eval(json_data)
        add_user_in_db(userID=userid, refToken=json_data['refresh'])
        

    

