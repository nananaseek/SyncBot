


API_LOGIN = "http://127.0.0.1:8000/api/login/"

data = {
    "username": "mef",
    "password": "1234"
}

import aiohttp

def get_login(data):
    with aiohttp.ClientSession() as session:
        with session.post(API_LOGIN) as response:
            return response.json

get_login(data)


