import asyncio
import contextlib
import typing
from sqlalchemy import MetaData, Boolean, Column, \
                        Date, DateTime, Enum, Float, ForeignKey, Integer, \
                        CHAR,String, Table, UniqueConstraint, create_engine, and_, func
from sqlalchemy.orm import sessionmaker, relationship, mapper
from sqlalchemy_utils import database_exists, create_database
from .conf import postgresql as settings


def get_engine (user, passwd, host, port, db) :
    url = f"postgresql://{user}:{passwd}@{host}:{port}/{db}"
    if not database_exists (url) :
        create_database (url)
    engine = create_engine (url, pool_size=50, echo=True)
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
meta = MetaData(engine)
conn = engine.connect()

users = Table('user_auth_tgusers', meta, autoload=True)

class User():
    def __init__(self, id_user, token):
        self.id_user = id_user
        self.token = token


def add_user_in_db (userID, refToken):
    mapper(User, users)
    justASs = User('id_user', userID, 'token', refToken)
    DBsession = sessionmaker(bind=engine)
    session = DBsession()
    session.add(justASs)
    session.commit()

def get_token(userID):
    token = users.select().where(users.c.id_user == userID)
    result = conn.execute(token)
    return result.fetchone()

print(get_token(382963259))