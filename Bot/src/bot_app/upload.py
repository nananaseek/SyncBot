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


@dp.message_handler(commands=['upload'])
async def file_list(message: types.Message, state: FSMContext):
    user_id = message.from_user.id
    token = await get_access_token(user_id)
    
