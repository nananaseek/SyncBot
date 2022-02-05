import asyncio
import contextlib
import typing
from datetime import datetime
from sqlalchemy import MetaData, Boolean, Column, \
                        Date, DateTime, Enum, Float, ForeignKey, Integer, \
                        CHAR, String, Table, UniqueConstraint, create_engine, and_, select
from sqlalchemy.orm import sessionmaker, relationship, mapper, load_only
from sqlalchemy_utils import database_exists, create_database
from .conf import postgresql as settings


def get_engine (user, passwd, host, port, db) :
    url = f"postgresql://{user}:{passwd}@{host}:{port}/{db}"
    if not database_exists (url) :
        create_database (url)
    engine = create_engine (url, pool_size=50, echo=False)
    return engine

def get_engine_from_settings ():
    keys=['pguser', 'pgpasswd', 'pghost', 'pgport', 'pgdb']
    if not all (key in keys for key in settings.keys () ):
        raise Exception ('Bad config file')
    
    return get_engine(settings ['pguser'],
                        settings ['pgpasswd'],
                        settings ['pghost'],
                        settings ['pgport'],
                        settings ['pgdb']
                    )

# def get_session () :
#     engine = get_engine_from_settings()
#     session = sessionmaker(bind=engine)()
#     return session

engine = get_engine_from_settings()
meta = MetaData()
conn = engine.connect()

users_table = Table('Users', meta,
    Column('id_user', Integer),
    Column('token',String(512)),
    Column('created_on', DateTime(), default=datetime.now)
)

meta.create_all(engine)

def create_token(userID, token):
    create_token = users_table.insert().values(id_user=userID, token=token)
    conn.execute(create_token)

""" 
TODO: доделать закрытие сессии
"""

def get_reftoken_user(user_id):

    reftoken = users_table.select().where(users_table.c.id_user == user_id)
    result = conn.execute(reftoken)

    return result.fetchone()[1]
