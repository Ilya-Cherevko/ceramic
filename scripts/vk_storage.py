# scripts/vk_storage.py
"""
Загрузка картинок в VK Cloud Storage.
"""
import io
import uuid
from datetime import datetime

import boto3
import requests
from botocore.config import Config

from scripts.config import (
    VK_ENDPOINT,
    VK_REGION,
    VK_BUCKET,
    VK_ACCESS_KEY,
    VK_SECRET_KEY,
    DRY_RUN,
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
        # ← Таймаут: 5 сек на подключение, 15 сек на чтение
        response = requests.get(image_url, timeout=(5, 15))
        response.raise_for_status()

        # Определяем расширение
        content_type = response.headers.get("Content-Type", "image/jpeg")
        ext_map = {
            "image/jpeg": "jpg",
            "image/jpg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
            "image/gif": "gif",
        }
        ext = ext_map.get(content_type.split(";")[0].strip(), "jpg")

        # Формируем ключ
        filename = f"{int(datetime.now().timestamp() * 1000)}-{uuid.uuid4().hex[:10]}.{ext}"
        key = f"ceramic-images/{folder}/{filename}"

        # Загружаем в VK
        s3_client.put_object(
            Bucket=VK_BUCKET,
            Key=key,
            Body=response.content,
            ContentType=content_type,
            ACL="public-read",
        )

        # Возвращаем публичный URL
        public_url = f"{VK_ENDPOINT}/{VK_BUCKET}/{key}"
        print(f"    ✅ Загружено: {public_url}")
        return public_url

    except requests.exceptions.Timeout:
        print(f"    ⏱️ Таймаут: {image_url}")
        return None
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            return None  # молча пропускаем битые картинки
        print(f"    ❌ HTTP {e.response.status_code}: {image_url}")
        return None
    except Exception as e:
        print(f"    ❌ Ошибка: {image_url} — {e}")
        return None


def upload_images_list(image_urls: list) -> list:
    """
    Загружает список картинок в VK.
    Возвращает список публичных URL.
    """
    if DRY_RUN:
        print("    ⏭️ DRY_RUN — пропускаем загрузку в VK")
        return image_urls  # возвращаем оригинальные URL

    result = []
    for url in image_urls:
        vk_url = upload_image_to_vk(url)
        if vk_url:
            result.append(vk_url)
    return result