from .settings import *
import os
import json
import dj_database_url


DEBUG = True

DB_CONFIG_FILE = "db_config.json"

DATABASE_URL = "postgres://reekdqzqinfnvl:6e409450c47b9af1387fd70b56f1f1a05b1ca1a97afbe545919189469f418430@ec2-34-249-49-9.eu-west-1.compute.amazonaws.com:5432/dcmica93vee27i"
# DATABASES = json.load(open(os.path.join(BASE_DIR, DB_CONFIG_FILE)))
DATABASES = {"default": dj_database_url.config(default=DATABASE_URL)}
