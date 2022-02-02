from re import S
from aiogram.dispatcher.filters.state import StatesGroup, State



class login(StatesGroup):
    username = State()
    passwd = State()
    fin = State()