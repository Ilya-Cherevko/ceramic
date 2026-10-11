# scripts/vk_storage.py
"""
Загрузка картинок в VK Cloud Storage.
"""
import io
import uuid
from datetime import datetime
from scripts.config import DRY_RUN

import boto3
import requests
from botocore.config import Config

from scripts.config import (
    VK_ENDPOINT,
    VK_REGION,
    VK_BUCKET,
    VK_ACCESS_KEY,
    VK_SECRET_KEY,
)

# ===== Клиент S3 =====
s3_client = boto3.client(
    "s3",
    endpoint_url=VK_ENDPOINT,
    region_name=VK_REGION,
    aws_access_key_id=VK_ACCESS_KEY,
    aws_secret_access_key=VK_SECRET_KEY,
    config=Config(signature_version="s3v4"),
)


def upload_image_to_vk(image_url: str, folder: str = "catalog") -> str | None:
    """
    Скачивает картинку по URL и загружает в VK Cloud Storage.
    
    Возвращает публичный URL в VK или None при ошибке.
    """
    if not image_url:
        return None

    try:
        # 1. Скачиваем картинку
        response = requests.get(image_url, timeout=30)
        response.raise_for_status()

        # 2. Определяем расширение
        content_type = response.headers.get("Content-Type", "image/jpeg")
        ext_map = {
            "image/jpeg": "jpg",
            "image/jpg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
            "image/gif": "gif",
        }
        ext = ext_map.get(content_type.split(";")[0].strip(), "jpg")

        # 3. Формируем ключ
        filename = f"{int(datetime.now().timestamp() * 1000)}-{uuid.uuid4().hex[:10]}.{ext}"
        key = f"ceramic-images/{folder}/{filename}"

        # 4. Загружаем в VK
        s3_client.put_object(
            Bucket=VK_BUCKET,
            Key=key,
            Body=response.content,
            ContentType=content_type,
            ACL="public-read",
        )

        # 5. Возвращаем публичный URL
        public_url = f"{VK_ENDPOINT}/{VK_BUCKET}/{key}"
        print(f"    ✅ Загружено: {public_url}")
        return public_url

    except Exception as e:
        print(f"    ❌ Ошибка загрузки {image_url}: {e}")
        return None


def upload_images_list(image_urls: list) -> list:
    if DRY_RUN:
        print("    ⏭️ DRY_RUN — пропускаем загрузку в VK")
        return image_urls  # возвращаем оригинальные URL
    """
    Загружает список картинок в VK.
    Возвращает список публичных URL.
    """
    result = []
    for url in image_urls:
        vk_url = upload_image_to_vk(url)
        if vk_url:
            result.append(vk_url)
    return result