// src/utils/vkStorage.js
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// ===== Настройки VK Cloud =====
const VK_ENDPOINT = process.env.REACT_APP_VK_ENDPOINT;
const VK_REGION = process.env.REACT_APP_VK_REGION;
const VK_BUCKET = process.env.REACT_APP_VK_BUCKET;
const VK_ACCESS_KEY = process.env.REACT_APP_VK_ACCESS_KEY;
const VK_SECRET_KEY = process.env.REACT_APP_VK_SECRET_KEY;

// ===== Клиент S3 =====
const s3Client = new S3Client({
  endpoint: VK_ENDPOINT,
  region: VK_REGION,
  credentials: {
    accessKeyId: VK_ACCESS_KEY,
    secretAccessKey: VK_SECRET_KEY,
  },
  forcePathStyle: true,
});

// ===== Публичный URL к файлу =====
export const getPublicUrl = (key) => {
  return `${VK_ENDPOINT}/${VK_BUCKET}/${key}`;
};

// ===== Загрузка файла в VK =====
export const uploadToVK = async (file, folder = "catalog") => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    // ↓ Ключ: ceramic-images/catalog/xxx.jpg (как у старых файлов)
    const key = `ceramic-images/${folder}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();

    const command = new PutObjectCommand({
      Bucket: VK_BUCKET,
      Key: key,
      Body: arrayBuffer,
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3Client.send(command);

    console.log("✅ Загружено в VK:", getPublicUrl(key));
    return getPublicUrl(key);
  } catch (error) {
    console.error("❌ Ошибка загрузки в VK:", error);
    return null;
  }
};

// ===== Удаление файла из VK =====
export const deleteFromVK = async (fileUrl) => {
  try {
    if (!fileUrl || !fileUrl.includes(VK_ENDPOINT)) {
      console.log("⏭️ Пропускаем (не в VK):", fileUrl);
      return true;
    }

    // URL: https://hb.ru-msk.vkcloud-storage.ru/ceramic-images/ceramic-images/catalog/xxx.jpg
    // Ключ: ceramic-images/catalog/xxx.jpg
    const key = fileUrl.replace(`${VK_ENDPOINT}/${VK_BUCKET}/`, "");

    const command = new DeleteObjectCommand({
      Bucket: VK_BUCKET,
      Key: key,
    });

    await s3Client.send(command);
    console.log("✅ Удалено из VK:", key);
    return true;
  } catch (error) {
    console.error("❌ Ошибка удаления из VK:", error);
    return false;
  }
};