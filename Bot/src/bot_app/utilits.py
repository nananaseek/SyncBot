from .app import *


async def msg_del(query, mess_del):
    count = 0
    while count <= mess_del :
        msg = query.message.message_id - count
        await bot.delete_message(query.from_user.id, msg)
        count = count + 1

async def msg_del_for_d(query, mess_del):
    count = 0
    while count <= mess_del :
        msg = query.message.message_id - count
        await bot.delete_message(query.from_user.id, msg)
        count = count + 1