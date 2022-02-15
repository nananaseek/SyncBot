from aiogram.utils.callback_data import CallbackData
from aiogram import types



vote_cb = CallbackData('login', 'action')  # post:<action>:<amount>

def get_keyboard_login(amount):
    return types.InlineKeyboardMarkup().row(
        types.InlineKeyboardButton('Увійти', callback_data=vote_cb.new(action='login')),
        types.InlineKeyboardButton('Скасувати', callback_data=vote_cb.new(action='cancel')),
    )
 

"""
TODO: РЕАЛИЗОВАТЬ СТРАНИЧКИ ДЛЯ ВЫВОДА БОЛЬШОГО КОЛИЧЕСТВА ФАЙЛОВ
"""

def file_list_keyboard(file_name):
    keyboard = types.InlineKeyboardMarkup()
    next_list = types.InlineKeyboardButton('>', callback_data='>')
    pre_list = types.InlineKeyboardButton('<', callback_data='<')
    count = 0
    for file in file_name:
        count = count + 1
        name = file['filename'].split('/')[-1]
        keyboard.add(types.InlineKeyboardMarkup(text=file['name'], callback_data=f"download:{name}:{file['id']}:{count}"))
        if count == 8:
            break
    keyboard.row(pre_list, next_list)
    return keyboard