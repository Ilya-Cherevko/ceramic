// src/Pages/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../Constants/DirlisterListCatalog";
import "./Admin.css";

const STORAGE_KEY = "catalog_data";

export default function AdminPanel() {
  const navigate = useNavigate();
  
  // Проверка авторизации
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (isAuth !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Состояния
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    Сountry: "",
    Name: "",
    Collection: "",
    Category: "",
    Size: "",
    interiors: [],
    tovars: [],
  });

  // ===== Загрузка данных (без сохранения в localStorage) =====
  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCatalog(parsed);
            setLoading(false);
            return;
          }
        }
        
        // Если в localStorage нет данных — НЕ СОХРАНЯЕМ исходные
        // Просто показываем пустой список
        setCatalog([]);
        setLoading(false);
        
      } catch (e) {
        console.error("Ошибка загрузки данных:", e);
        localStorage.removeItem(STORAGE_KEY);
        setCatalog([]);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ===== Проверка размера данных =====
  const getDataSize = (data) => {
    const jsonStr = JSON.stringify(data);
    const sizeInBytes = new Blob([jsonStr]).size;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return { sizeInBytes, sizeInMB };
  };

  // ===== Сохранение данных с проверкой размера =====
  const saveData = (data) => {
    try {
      const jsonStr = JSON.stringify(data);
      const sizeInMB = new Blob([jsonStr]).size / (1024 * 1024);
      
      console.log(`Размер данных: ${sizeInMB.toFixed(2)} MB`);
      
      // Максимальный размер — 4 MB
      if (sizeInMB > 4) {
        alert(`❌ Данные слишком большие (${sizeInMB.toFixed(2)} MB). 
               Максимальный размер: 4 MB.
               Пожалуйста, удалите часть данных (особенно изображения).`);
        return false;
      }
      
      setCatalog(data);
      localStorage.setItem(STORAGE_KEY, jsonStr);
      console.log(`✅ Данные сохранены: ${sizeInMB.toFixed(2)} MB`);
      return true;
      
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        alert("❌ Недостаточно места в localStorage. Пожалуйста, удалите часть данных.");
      } else {
        console.error("Ошибка сохранения:", e);
        alert("❌ Ошибка при сохранении данных.");
      }
      return false;
    }
  };

  // ===== Загрузка данных из исходного файла (только для импорта) =====
  const importDefaultData = () => {
    if (window.confirm("⚠️ Это заменит все текущие данные на исходные из файла. Продолжить?")) {
      const data = Cards;
      const { sizeInMB } = getDataSize(data);
      
      if (sizeInMB > 4) {
        alert(`❌ Исходные данные слишком большие (${sizeInMB.toFixed(2)} MB). 
               Невозможно импортировать.`);
        return;
      }
      
      if (saveData(data)) {
        alert("✅ Данные импортированы из файла!");
      }
    }
  };

  // ===== Добавление =====
  const handleAdd = () => {
    const newId = Date.now().toString();
    const newItem = {
      ...formData,
      id: newId,
      interiors: formData.interiors.filter((url) => url.trim() !== ""),
      tovars: formData.tovars.filter((url) => url.trim() !== ""),
    };
    const updated = [...catalog, newItem];
    
    if (saveData(updated)) {
      resetForm();
      alert("✅ Коллекция успешно добавлена!");
    }
  };

  // ===== Редактирование =====
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      ...item,
      interiors: item.interiors || [],
      tovars: item.tovars || [],
    });
  };

  const handleUpdate = () => {
    const updatedItem = {
      ...formData,
      interiors: formData.interiors.filter((url) => url.trim() !== ""),
      tovars: formData.tovars.filter((url) => url.trim() !== ""),
    };
    const updated = catalog.map((item) =>
      item.id === editingId ? updatedItem : item
    );
    
    if (saveData(updated)) {
      resetForm();
      alert("✅ Коллекция успешно обновлена!");
    }
  };

  // ===== Удаление =====
  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить эту коллекцию?")) {
      const updated = catalog.filter((item) => item.id !== id);
      if (saveData(updated)) {
        alert("✅ Коллекция удалена!");
      }
    }
  };

  // ===== Очистка всех данных =====
  const handleClearAll = () => {
    if (window.confirm("⚠️ Вы уверены, что хотите удалить ВСЕ данные? Это действие необратимо!")) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        setCatalog([]);
        alert("✅ Все данные очищены.");
        resetForm();
      } catch (e) {
        console.error("Ошибка очистки:", e);
        alert("❌ Ошибка при очистке данных.");
      }
    }
  };

  // ===== Вспомогательные функции =====
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      id: "",
      Сountry: "",
      Name: "",
      Collection: "",
      Category: "",
      Size: "",
      interiors: [],
      tovars: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value;
    const urls = value.split(",").map((url) => url.trim()).filter((url) => url !== "");
    setFormData((prev) => ({ ...prev, [field]: urls }));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  // Категории для выбора
  const categories = ["Plitka", "Keramogranit", "GibkyMramor"];

  // Получаем информацию о размере данных
  const { sizeInMB } = getDataSize(catalog);
  const isNearLimit = sizeInMB > 3;
  const hasData = catalog.length > 0;

  if (loading) {
    return (
      <div className="load-more__loader">
        <div className="load-more__spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h1 className="admin-panel__title">Админ-панель каталога</h1>
        <div className="admin-panel__header-right">
          <span className={`admin-panel__size ${isNearLimit ? "admin-panel__size--warning" : ""}`}>
            📊 {catalog.length} записей, {sizeInMB.toFixed(2)} MB / 4 MB
          </span>
          <button className="admin-panel__import" onClick={importDefaultData}>
            📥 Импорт из файла
          </button>
          {hasData && (
            <button className="admin-panel__clear" onClick={handleClearAll}>
              🗑️ Очистить всё
            </button>
          )}
          <button className="admin-panel__logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>

      {isNearLimit && (
        <div className="admin-panel__warning">
          ⚠️ Внимание! Вы приближаетесь к лимиту памяти ({sizeInMB.toFixed(2)} MB / 4 MB). 
          Рекомендуется удалить часть данных.
        </div>
      )}

      {!hasData && (
        <div className="admin-panel__empty">
          <p>📭 В каталоге пока нет данных.</p>
          <p>Вы можете добавить новую коллекцию или импортировать данные из файла.</p>
        </div>
      )}

      {/* Форма */}
      <div className="admin-panel__form">
        <h2>{editingId ? "✏️ Редактирование" : "➕ Добавление"} коллекции</h2>
        <div className="admin-form__grid">
          <div className="admin-form__group">
            <label>Производитель (Name) *</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              placeholder="Например: Alma Ceramica"
              required
            />
          </div>
          <div className="admin-form__group">
            <label>Коллекция (Collection) *</label>
            <input
              type="text"
              name="Collection"
              value={formData.Collection}
              onChange={handleInputChange}
              placeholder="Например: Adelia"
              required
            />
          </div>
          <div className="admin-form__group">
            <label>Страна</label>
            <input
              type="text"
              name="Сountry"
              value={formData.Сountry}
              onChange={handleInputChange}
              placeholder="Например: Россия"
            />
          </div>
          <div className="admin-form__group">
            <label>Категория *</label>
            <select
              name="Category"
              value={formData.Category}
              onChange={handleInputChange}
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="admin-form__group">
            <label>Размеры</label>
            <input
              type="text"
              name="Size"
              value={formData.Size}
              onChange={handleInputChange}
              placeholder='Например: 20x60 или 20x60, 60x60'
            />
          </div>
          <div className="admin-form__group admin-form__group--full">
            <label>Ссылки на интерьеры (через запятую)</label>
            <textarea
              name="interiors"
              value={formData.interiors.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "interiors")}
              placeholder="../images/catalog/alma_ceramica/adelia/interiors/photo1.jpg, ../images/catalog/alma_ceramica/adelia/interiors/photo2.jpg"
              rows="3"
            />
            <small className="admin-form__hint">
              Количество: {formData.interiors.length} изображений
            </small>
          </div>
          <div className="admin-form__group admin-form__group--full">
            <label>Ссылки на товары (через запятую)</label>
            <textarea
              name="tovars"
              value={formData.tovars.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "tovars")}
              placeholder="../images/catalog/alma_ceramica/adelia/tovars/product1.jpg, ../images/catalog/alma_ceramica/adelia/tovars/product2.jpg"
              rows="3"
            />
            <small className="admin-form__hint">
              Количество: {formData.tovars.length} товаров
            </small>
          </div>
        </div>
        <div className="admin-form__actions">
          {editingId ? (
            <>
              <button className="admin-form__save" onClick={handleUpdate}>
                💾 Сохранить изменения
              </button>
              <button className="admin-form__cancel" onClick={resetForm}>
                ❌ Отмена
              </button>
            </>
          ) : (
            <button className="admin-form__add" onClick={handleAdd}>
              ➕ Добавить коллекцию
            </button>
          )}
        </div>
      </div>

      {/* Список коллекций */}
      {hasData && (
        <div className="admin-panel__list">
          <h2>
            Все коллекции ({catalog.length})
            <span className="admin-panel__count">
              ({sizeInMB.toFixed(2)} MB)
            </span>
          </h2>
          <div className="admin-list">
            {catalog.map((item) => (
              <div key={item.id} className="admin-list__item">
                <div className="admin-list__info">
                  <span className="admin-list__name">{item.Collection}</span>
                  <span className="admin-list__detail">{item.Name}</span>
                  <span className="admin-list__detail">{item.Сountry}</span>
                  <span className="admin-list__detail">{item.Category}</span>
                  <span className="admin-list__detail">{item.Size}</span>
                  <span className="admin-list__detail">
                    🖼️ {item.interiors?.length || 0}
                  </span>
                </div>
                <div className="admin-list__actions">
                  <button 
                    className="admin-list__edit" 
                    onClick={() => handleEdit(item)}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button 
                    className="admin-list__delete" 
                    onClick={() => handleDelete(item.id)}
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}