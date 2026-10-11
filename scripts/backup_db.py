# scripts/backup_db.py
import os
import sys
import csv
import json
from datetime import datetime
from supabase import create_client

# ===== Настройки =====
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("❌ Не заданы SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY")
    sys.exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# ===== Создаём папку для бэкапов =====
backup_dir = "backups"
os.makedirs(backup_dir, exist_ok=True)

date_str = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

# ===== 1. Выгружаем таблицу catalog =====
print("📦 Выгружаем catalog...")
response = supabase.table("catalog").select("*").execute()
catalog_rows = response.data
print(f"   ✅ Получено {len(catalog_rows)} строк")

# ===== 2. Сохраняем в CSV =====
csv_path = f"{backup_dir}/catalog_{date_str}.csv"
if catalog_rows:
    # Собираем все ключи
    all_keys = set()
    for row in catalog_rows:
        all_keys.update(row.keys())
    fieldnames = sorted(all_keys)

    with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in catalog_rows:
            # Преобразуем JSON-поля в строки
            clean_row = {}
            for key in fieldnames:
                value = row.get(key, "")
                if isinstance(value, (list, dict)):
                    value = json.dumps(value, ensure_ascii=False)
                clean_row[key] = value
            writer.writerow(clean_row)

    print(f"   ✅ CSV сохранён: {csv_path}")

# ===== 3. Сохраняем в JSON =====
json_path = f"{backup_dir}/catalog_{date_str}.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(catalog_rows, f, ensure_ascii=False, indent=2)

print(f"   ✅ JSON сохранён: {json_path}")

# ===== 4. Сохраняем в SQL (для отката) =====
sql_path = f"{backup_dir}/catalog_{date_str}.sql"
with open(sql_path, "w", encoding="utf-8") as f:
    f.write(f"-- Бэкап catalog от {date_str}\n")
    f.write(f"-- Всего строк: {len(catalog_rows)}\n\n")

    for row in catalog_rows:
        # Экранируем значения
        def esc(v):
            if v is None:
                return "NULL"
            if isinstance(v, (list, dict)):
                v = json.dumps(v, ensure_ascii=False)
            v = str(v).replace("'", "''")
            return f"'{v}'"

        columns = ", ".join(row.keys())
        values = ", ".join(esc(v) for v in row.values())
        f.write(f"INSERT INTO catalog ({columns}) VALUES ({values});\n")

print(f"   ✅ SQL сохранён: {sql_path}")

print(f"\n✅ Бэкап завершён! Файлы в папке {backup_dir}/")