import { supabase } from '../utils/supabase';

// ===== Получение всех коллекций =====
export const getAllCollections = async () => {
  try {
    const { data, error } = await supabase
      .from('catalog')
      .select('*')
      .order('collection', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return [];
  }
};

// ===== Получение по категории =====
export const getCollectionsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('catalog')
      .select('*')
      .eq('category', category)
      .order('collection', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Ошибка получения данных по категории:', error);
    return [];
  }
};

// ===== Получение по производителю =====
export const getCollectionsByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from('catalog')
      .select('*')
      .eq('name', name)
      .order('collection', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Ошибка получения данных по производителю:', error);
    return [];
  }
};

// ===== Получение по коллекции =====
export const getCollectionByCollection = async (collection) => {
  try {
    const { data, error } = await supabase
      .from('catalog')
      .select('*')
      .eq('collection', collection)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (error) {
    console.error('Ошибка получения коллекции:', error);
    return null;
  }
};

// ===== Добавление коллекции =====
export const addCollection = async (item) => {
  try {
    const { data, error } = await supabase
      .from('catalog')
      .insert([{
        country: item.country || '',
        name: item.name,
        collection: item.collection,
        category: item.category,
        size: item.size || '',
        interiors: item.interiors || [],
        tovars: item.tovars || [],
      }])
      .select();
    
    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error('Ошибка добавления:', error);
    return null;
  }
};

// ===== Обновление коллекции =====
export const updateCollection = async (id, item) => {
  try {
    const { data, error } = await supabase
      .from('catalog')
      .update({
        country: item.country || '',
        name: item.name,
        collection: item.collection,
        category: item.category,
        size: item.size || '',
        interiors: item.interiors || [],
        tovars: item.tovars || [],
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error('Ошибка обновления:', error);
    return null;
  }
};

// ===== Удаление коллекции =====
export const deleteCollection = async (id) => {
  try {
    const { error } = await supabase
      .from('catalog')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Ошибка удаления:', error);
    return false;
  }
};

// ===== Поиск =====
export const searchCollections = async (query) => {
  try {
    const { data, error } = await supabase
      .from('catalog')
      .select('*')
      .or(`collection.ilike.%${query}%, name.ilike.%${query}%`)
      .order('collection', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Ошибка поиска:', error);
    return [];
  }
};

// ===== Получение всех производителей с группировкой по категориям =====
export const getMenuStructure = async () => {
  try {
    const { data, error } = await supabase
      .from('catalog')
      .select('name, category')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;

    // Группируем по категориям
    const menuMap = {};
    data.forEach(item => {
      if (!menuMap[item.category]) {
        menuMap[item.category] = [];
      }
      if (!menuMap[item.category].includes(item.name)) {
        menuMap[item.category].push(item.name);
      }
    });

    return menuMap;
  } catch (error) {
    console.error('Ошибка получения структуры меню:', error);
    return {};
  }
};