import aiohttp
import aiofiles
import json
import ast
import os
from pathlib import Path
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

async def get_file(url, file_name, user, token):
    headers_auth_copy = headers_auth.copy()
    headers_auth_copy = headers_auth_copy.fromkeys(['Authorization'], f'Bearer {token}')
    file_path = f"files/{user}/{file_name}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url=url, headers=headers_auth_copy) as response:
            async with aiofiles.open(file_name, "wb") as f:
                await f.write(await response.content.read())

async def upload_file(file, token):
    headers_auth_copy = headers_auth.copy()
    headers_auth_copy = headers_auth_copy.fromkeys(['Authorization'], f'Bearer {token}')
    async with aiohttp.ClientSession() as session:
        async with session.post(url=API_REFRESH_TOKEN, data=file, headers=headers) as response:
            return await response.text()