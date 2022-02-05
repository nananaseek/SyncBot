from aiogram.dispatcher.filters.state import StatesGroup, State

class login(StatesGroup):
    username = State()
    passwd = State()
    fin = State()

class downloadFile(StatesGroup):
    select = State()
    download = State()