from .settings import *
import os
import json


DEBUG = True

DB_CONFIG_FILE = "db_config.json"

DATABASES = json.load(open(os.path.join(BASE_DIR, DB_CONFIG_FILE)))
