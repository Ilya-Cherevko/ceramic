import os
from pathlib import Path
from dotenv import load_dotenv

# Явный путь к .env в корне проекта (на уровень выше scripts/)
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.environ.get(
    "SUPABASE_URL", "https://ggestrktvjleraztlawi.supabase.co"
)
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

BASE_URL = "https://zakaz.altacera.ru/load"
TARGET_REGION = "Самарская обл"

# Склад Казань — самый наполненный в Поволжье
MANUAL_DEPOT_ID = "d1666584-d536-11ec-80f8-00155d5d5700"

DRY_RUN = True

# ===== VK Cloud Storage (для загрузки картинок) =====
VK_ENDPOINT = os.environ.get("VK_ENDPOINT", "https://hb.ru-msk.vkcloud-storage.ru")
VK_REGION = os.environ.get("VK_REGION", "ru-msk")
VK_BUCKET = os.environ.get("VK_BUCKET", "ceramic-images")
VK_ACCESS_KEY = os.environ.get("VK_ACCESS_KEY")
VK_SECRET_KEY = os.environ.get("VK_SECRET_KEY")

# DRY_RUN: по умолчанию True (безопасно), но можно переопределить через env
DRY_RUN = os.environ.get("DRY_RUN", "true").lower() == "true"