// src/Pages/AdminPanel.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getAllCollections, 
  addCollection, 
  updateCollection, 
  deleteCollection 
} from "../api/catalog";
import { supabase } from "../utils/supabase";
import "./Admin.css";

export default function AdminPanel() {
  const navigate = useNavigate();
  
  // ===== Состояния =====
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortField, setSortField] = useState("collection");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    country: "",
    name: "",
    collection: "",
    category: "",
    size: "",
    interiors: [],
    tovars: [],
  });

  // ===== Проверка авторизации =====
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (isAuth !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // ===== Загрузка данных =====
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getAllCollections();
        setCatalog(data);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        alert("❌ Ошибка загрузки данных из БД");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ===== Сортировка и фильтрация =====
  const sortedAndFilteredCatalog = useMemo(() => {
    let result = [...catalog];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(item => 
        item.collection?.toLowerCase().includes(query) ||
        item.name?.toLowerCase().includes(query) ||
        item.country?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)
      );
    }
    
    result.sort((a, b) => {
      let aVal = a[sortField] || "";
      let bVal = b[sortField] || "";
      
      if (sortField === "id") {
        aVal = Number(aVal);
        bVal = Number(bVal);
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
      
      if (sortDirection === "asc") {
        return aVal.localeCompare(bVal, 'ru');
      } else {
        return bVal.localeCompare(aVal, 'ru');
      }
    });
    
    return result;
  }, [catalog, sortField, sortDirection, searchQuery]);

  // ===== Удаление изображения из Storage =====
  const deleteImageFromStorage = async (imageUrl) => {
    if (!imageUrl) return false;
    
    try {
      if (!imageUrl.includes('supabase.co/storage/v1/object/public/catalog-images')) {
        return true;
      }
      
      const urlParts = imageUrl.split('/');
      const publicIndex = urlParts.indexOf('public');
      
      if (publicIndex === -1) return false;
      
      const filePath = urlParts.slice(publicIndex + 2).join('/');
      
      const { error } = await supabase.storage
        .from('catalog-images')
        .remove([filePath]);
      
      if (error) {
        console.error('❌ Ошибка удаления файла:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Ошибка при удалении файла:', error);
      return false;
    }
  };

  // ===== Удаление всех изображений коллекции =====
  const deleteAllImagesFromCollection = async (item) => {
    if (!item) return;
    const allImages = [...(item.interiors || []), ...(item.tovars || [])];
    for (const url of allImages) {
      await deleteImageFromStorage(url);
    }
  };

  // ===== Загрузка изображений в Storage =====
  const uploadImage = async (file, folder) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      const { error } = await supabase.storage
        .from('catalog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (error) {
        console.error('❌ Ошибка загрузки в Storage:', error);
        return null;
      }
      
      const { data } = supabase.storage
        .from('catalog-images')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('❌ Ошибка загрузки изображения:', error);
      return null;
    }
  };

  // ===== Обработка загрузки файлов =====
  const handleImageUpload = async (files, fieldName) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    const uploadedUrls = [];
    
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        alert(`❌ Файл ${file.name} не является изображением`);
        continue;
      }
      
      if (file.size > 50 * 1024 * 1024) {
        alert(`❌ Файл ${file.name} слишком большой (макс. 50MB)`);
        continue;
      }
      
      const url = await uploadImage(file, 'catalog');
      if (url) {
        uploadedUrls.push(url);
      }
    }
    
    if (uploadedUrls.length > 0) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: [...prev[fieldName], ...uploadedUrls]
      }));
    }
    
    setUploading(false);
  };

  // ===== Drag-and-Drop =====
  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload(files, fieldName);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // ===== Рендер превью =====
  const renderImagePreviews = (imageUrls, fieldName) => {
    if (!imageUrls || imageUrls.length === 0) {
      return <p className="admin-form__no-images">Нет изображений</p>;
    }

    return (
      <div className="admin-form__previews">
        {imageUrls.map((url, index) => (
          <div key={index} className="admin-form__preview-item">
            <img 
              src={url} 
              alt={`Превью ${index + 1}`} 
              className="admin-form__preview-img"
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
            <button
              type="button"
              className="admin-form__preview-remove"
              onClick={async () => {
                await deleteImageFromStorage(url);
                const newUrls = imageUrls.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, [fieldName]: newUrls }));
              }}
              title="Удалить изображение"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    );
  };

  // ===== Добавление =====
  const handleAdd = async () => {
    if (!formData.name || !formData.collection || !formData.category) {
      alert("❌ Заполните обязательные поля: Name, Collection, Category");
      return;
    }

    const newItem = {
      country: formData.country || "",
      name: formData.name,
      collection: formData.collection,
      category: formData.category,
      size: formData.size || "",
      interiors: formData.interiors,
      tovars: formData.tovars,
    };
    
    const result = await addCollection(newItem);
    if (result) {
      const updated = await getAllCollections();
      setCatalog(updated);
      resetForm();
      alert("✅ Коллекция успешно добавлена!");
    } else {
      alert("❌ Ошибка при добавлении коллекции");
    }
  };

  // ===== Редактирование =====
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      id: item.id,
      country: item.country || "",
      name: item.name || "",
      collection: item.collection || "",
      category: item.category || "",
      size: item.size || "",
      interiors: item.interiors || [],
      tovars: item.tovars || [],
    });
    // Скроллим к форме
    document.querySelector('.admin-panel__form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.collection || !formData.category) {
      alert("❌ Заполните обязательные поля: Name, Collection, Category");
      return;
    }

    const oldItem = catalog.find(c => c.id === editingId);
    
    if (oldItem) {
      const oldInteriors = oldItem.interiors || [];
      const newInteriors = formData.interiors || [];
      const oldTovars = oldItem.tovars || [];
      const newTovars = formData.tovars || [];
      
      const removedInteriors = oldInteriors.filter(url => !newInteriors.includes(url));
      const removedTovars = oldTovars.filter(url => !newTovars.includes(url));
      const allRemoved = [...removedInteriors, ...removedTovars];
      
      for (const url of allRemoved) {
        await deleteImageFromStorage(url);
      }
    }

    const updatedItem = {
      country: formData.country || "",
      name: formData.name,
      collection: formData.collection,
      category: formData.category,
      size: formData.size || "",
      interiors: formData.interiors,
      tovars: formData.tovars,
    };
    
    const result = await updateCollection(editingId, updatedItem);
    if (result) {
      const updated = await getAllCollections();
      setCatalog(updated);
      resetForm();
      alert("✅ Коллекция успешно обновлена!");
    } else {
      alert("❌ Ошибка при обновлении коллекции");
    }
  };

  // ===== Удаление =====
  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Вы уверены, что хотите удалить эту коллекцию?")) return;
    
    const item = catalog.find(c => c.id === id);
    await deleteAllImagesFromCollection(item);
    
    const result = await deleteCollection(id);
    if (result) {
      const updated = await getAllCollections();
      setCatalog(updated);
      alert("✅ Коллекция удалена!");
    } else {
      alert("❌ Ошибка при удалении коллекции");
    }
  };

  // ===== Импорт из файла =====
  const importDefaultData = async () => {
    if (window.confirm("⚠️ Это заменит все текущие данные на исходные из файла. Продолжить?")) {
      const Cards = await import("../Constants/DirlisterListCatalog").then(m => m.default);
      
      let success = 0;
      let errors = 0;

      for (const item of Cards) {
        try {
          const result = await addCollection({
            country: item.Сountry || "",
            name: item.Name,
            collection: item.Collection,
            category: item.Category,
            size: Array.isArray(item.Size) ? item.Size.join(", ") : item.Size || "",
            interiors: item.interiors || [],
            tovars: item.tovars || [],
          });
          if (result) success++;
          else errors++;
        } catch (e) {
          errors++;
          console.error("Ошибка импорта:", e);
        }
      }

      const updated = await getAllCollections();
      setCatalog(updated);
      alert(`✅ Импорт завершён! Успешно: ${success}, Ошибок: ${errors}`);
    }
  };

  // ===== Очистка =====
  const handleClearAll = async () => {
    if (!window.confirm("⚠️ Вы уверены, что хотите удалить ВСЕ данные?")) return;
    
    let success = 0;
    let errors = 0;

    for (const item of catalog) {
      await deleteAllImagesFromCollection(item);
    }

    for (const item of catalog) {
      const result = await deleteCollection(item.id);
      if (result) success++;
      else errors++;
    }

    setCatalog([]);
    alert(`✅ Удалено: ${success}, Ошибок: ${errors}`);
  };

  // ===== Вспомогательные функции =====
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      id: "",
      country: "",
      name: "",
      collection: "",
      category: "",
      size: "",
      interiors: [],
      tovars: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const categories = ["Plitka", "Keramogranit", "GibkyMramor"];

  if (loading) {
    return (
      <div className="load-more__loader">
        <div className="load-more__spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {/* Шапка */}
      <div className="admin-panel__header">
        <h1 className="admin-panel__title">Админ-панель каталога</h1>
        <div className="admin-panel__header-right">
          <span className="admin-panel__size">📊 {sortedAndFilteredCatalog.length} записей</span>
          <button className="admin-panel__import" onClick={importDefaultData}>📥 Импорт</button>
          {catalog.length > 0 && (
            <button className="admin-panel__clear" onClick={handleClearAll}>🗑️ Очистить всё</button>
          )}
          <button className="admin-panel__logout" onClick={handleLogout}>Выйти</button>
        </div>
      </div>

      {/* ДВЕ КОЛОНКИ */}
      <div className="admin-panel__columns">

        {/* ЛЕВАЯ КОЛОНКА — ФОРМА */}
        <div className="admin-panel__column admin-panel__column--left">
          <div className="admin-panel__form">
            <h2>
              {editingId ? "✏️ Редактирование" : "➕ Добавление"}
              {editingId && (
                <button className="admin-form__cancel-small" onClick={resetForm}>
                  ✕
                </button>
              )}
            </h2>
            <div className="admin-form__grid">
              <div className="admin-form__group">
                <label>Производитель *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Например: Alma Ceramica"
                />
              </div>
              <div className="admin-form__group">
                <label>Коллекция *</label>
                <input
                  type="text"
                  name="collection"
                  value={formData.collection}
                  onChange={handleInputChange}
                  placeholder="Например: Adelia"
                />
              </div>
              <div className="admin-form__group">
                <label>Страна</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Например: Россия"
                />
              </div>
              <div className="admin-form__group">
                <label>Категория *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="admin-form__group admin-form__group--full">
                <label>Размеры</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder='Например: 20x60 или 20x60, 60x60'
                />
              </div>
              <div className="admin-form__group admin-form__group--full">
                <label>Интерьеры</label>
                <div className="admin-form__drop-zone" onDrop={(e) => handleDrop(e, "interiors")} onDragOver={handleDragOver}>
                  {uploading ? (
                    <p>⏳ Загрузка...</p>
                  ) : (
                    <>
                      <p>📤 Перетащите изображения сюда</p>
                      <p className="admin-form__drop-hint">или</p>
                      <label className="admin-form__upload-btn">
                        Выберите файлы
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleImageUpload(e.target.files, "interiors")}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </>
                  )}
                </div>
                {renderImagePreviews(formData.interiors, "interiors")}
              </div>
              <div className="admin-form__group admin-form__group--full">
                <label>Товары</label>
                <div className="admin-form__drop-zone" onDrop={(e) => handleDrop(e, "tovars")} onDragOver={handleDragOver}>
                  {uploading ? (
                    <p>⏳ Загрузка...</p>
                  ) : (
                    <>
                      <p>📤 Перетащите изображения сюда</p>
                      <p className="admin-form__drop-hint">или</p>
                      <label className="admin-form__upload-btn">
                        Выберите файлы
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleImageUpload(e.target.files, "tovars")}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </>
                  )}
                </div>
                {renderImagePreviews(formData.tovars, "tovars")}
              </div>
            </div>
            <div className="admin-form__actions">
              {editingId ? (
                <>
                  <button className="admin-form__save" onClick={handleUpdate}>💾 Сохранить</button>
                  <button className="admin-form__cancel" onClick={resetForm}>❌ Отмена</button>
                </>
              ) : (
                <button className="admin-form__add" onClick={handleAdd}>➕ Добавить</button>
              )}
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА — СПИСОК */}
        <div className="admin-panel__column admin-panel__column--right">
          <div className="admin-panel__list-wrapper">
            <div className="admin-list__toolbar">
              <input
                type="text"
                className="admin-list__search"
                placeholder="🔍 Поиск по коллекциям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="admin-list__headers">
              <button
                className={`admin-list__header ${sortField === "collection" ? "active" : ""}`}
                onClick={() => handleSort("collection")}
              >
                Коллекция {getSortIcon("collection")}
              </button>
              <button
                className={`admin-list__header ${sortField === "name" ? "active" : ""}`}
                onClick={() => handleSort("name")}
              >
                Производитель {getSortIcon("name")}
              </button>
              <button
                className={`admin-list__header ${sortField === "category" ? "active" : ""}`}
                onClick={() => handleSort("category")}
              >
                Категория {getSortIcon("category")}
              </button>
              <button className="admin-list__header admin-list__header--actions">Действия</button>
            </div>
            <div className="admin-list">
              {sortedAndFilteredCatalog.map((item) => (
                <div key={item.id} className="admin-list__item">
                  <div className="admin-list__info">
                    <span className="admin-list__cell admin-list__cell--collection">{item.collection}</span>
                    <span className="admin-list__cell admin-list__cell--name">{item.name}</span>
                    <span className="admin-list__cell admin-list__cell--category">{item.category}</span>
                    <span className="admin-list__cell admin-list__cell--images">🖼️ {item.interiors?.length || 0}</span>
                  </div>
                  <div className="admin-list__actions">
                    <button className="admin-list__edit" onClick={() => handleEdit(item)} title="Редактировать">✏️</button>
                    <button className="admin-list__delete" onClick={() => handleDelete(item.id)} title="Удалить">🗑️</button>
                  </div>
                </div>
              ))}
              {sortedAndFilteredCatalog.length === 0 && (
                <div className="admin-list__empty">Нет коллекций</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}