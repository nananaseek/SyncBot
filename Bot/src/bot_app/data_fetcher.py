import aiohttp
from .conf import *

async def get_login(data):
    async with aiohttp.ClientSession() as session:
        async with session.post(url=API_LOGIN, data=data, headers=headers) as response:
            return await response.text()