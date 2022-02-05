import aiohttp
import json
import ast
from .conf import *
from .userDB import *


async def get_login(data):
    async with aiohttp.ClientSession() as session:
        async with session.post(url=API_LOGIN, data=data, headers=headers) as response:
            return await response.text()

async def request_access_token(token):
    async with aiohttp.ClientSession() as session:
        async with session.post(url=API_REFRESH_TOKEN, data=token, headers=headers) as response:
            return await response.text()

async def get_access_token(user_id):
        token = {"refresh":get_reftoken_user(user_id)}
        jtoken = json.dumps(token, indent = 4)
        access_token = ast.literal_eval(await request_access_token(jtoken))
        return access_token['access']

async def get_list(token):
    headers_auth_copy = headers_auth.copy()
    headers_auth_copy = headers_auth_copy.fromkeys(['Authorization'], f'Bearer {token}')
    async with aiohttp.ClientSession() as session:
        async with session.get(url=API_FILE_LIST, headers=headers_auth_copy) as response:
            return await response.json()
