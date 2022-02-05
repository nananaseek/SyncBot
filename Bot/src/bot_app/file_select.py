from lib2to3.pgen2 import token
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

downl = CallbackData('download', 'action')

def get_keyboard(amount):
    return types.InlineKeyboardMarkup().row(
        types.InlineKeyboardButton('Увійти', callback_data=downl.new(action='download')),
    )

@dp.message_handler(commands=['list'])
async def file_list(message: types.Message):
    user_id = message.from_user.id
    token = await get_access_token(user_id)
    t = await get_list(token=token)
    for file in t:
        print(file['name'])
