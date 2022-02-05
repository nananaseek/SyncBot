from aiogram import types
from .app import dp
from . import messages


# @dp.message_handler(commands=['start'])
# async def send_welcome (message: types.message):
#     await message.reply(messages.WELCOME_MESSAGE)

@dp.message_handler(commands=['help'])
async def process_help_command(message: types.Message):
    await message.reply("Напиши мне что-нибудь, и я отпрпавлю этот текст тебе в ответ!")


