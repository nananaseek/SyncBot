""" 
Токен для бота
"""
TOKEN = "1807439468:AAFNuUZhmaZCak2Fq0I8Jz72Dz48YDUWXwQ"

"""
Заголовок для запростов
"""
headers = {'Content-type': 'application/json',  
           'Content-Encoding': 'utf-8'}

headers_auth = {'Content-type': 'application/json',  
           'Content-Encoding': 'utf-8',
           'Authorization':"",
           }

"""
Конфигурация для полключения к базе данных
"""
postgresql = {'pguser' : 'postgres',
                'pgpasswd': '1234',
                'pghost': 'localhost',
                'pgport' : '5432',
                'pgdb': 'tg_coock'
}

"""
Посилання на API сервиса
"""
API_LOGIN = "http://127.0.0.1:8000/api/login/"
API_FILE_LIST = "http://127.0.0.1:8000/file/"
API_REFRESH_TOKEN = "http://127.0.0.1:8000/api/token/refresh/"

