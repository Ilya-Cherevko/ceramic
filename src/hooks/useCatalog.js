// src/hooks/useCatalog.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllCollections, 
  getCollectionsByCategory, 
  getCollectionsByName,
  getCollectionByCollection,
  addCollection,
  updateCollection,
  deleteCollection,
} from "../api/catalog";
import { supabase } from "../utils/supabase";

// ===== Ключи для кэша =====
export const catalogKeys = {
  all: ['catalog'],
  lists: () => [...catalogKeys.all, 'list'],
  list: (filters) => [...catalogKeys.lists(), { filters }],
  details: () => [...catalogKeys.all, 'detail'],
  detail: (collection) => [...catalogKeys.details(), collection],
};

// ===== УНИВЕРСАЛЬНЫЙ ХУК =====
export const useCatalog = (id, Name) => {
  return useQuery({
    queryKey: ['catalog', { id, Name }],
    queryFn: async () => {
      if (Name) {
        return await getCollectionsByName(Name);
      }
      if (id) {
        return await getCollectionsByCategory(id);
      }
      return await getAllCollections();
    },
    enabled: true,
  });
};

// ===== ХУК: Все коллекции =====
export const useAllCollections = () => {
  return useQuery({
    queryKey: catalogKeys.lists(),
    queryFn: getAllCollections,
  });
};

// ===== ХУК: Коллекции по категории =====
export const useCollectionsByCategory = (category) => {
  return useQuery({
    queryKey: catalogKeys.list({ category }),
    queryFn: () => getCollectionsByCategory(category),
    enabled: !!category,
  });
};

// ===== ХУК: Коллекции по производителю =====
export const useCollectionsByName = (name) => {
  return useQuery({
    queryKey: catalogKeys.list({ name }),
    queryFn: () => getCollectionsByName(name),
    enabled: !!name,
  });
};

// ===== ХУК: Одна коллекция =====
export const useCollection = (collection) => {
  return useQuery({
    queryKey: catalogKeys.detail(collection),
    queryFn: () => getCollectionByCollection(collection),
    enabled: !!collection,
  });
};

// ===== ХУК: Поиск =====
export const useSearch = (query) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      
      const { data, error } = await supabase
        .from("catalog")
        .select("*")
        .or(
          `collection.ilike.%${query}%, ` +
          `name.ilike.%${query}%, ` +
          `country.ilike.%${query}%, ` +
          `category.ilike.%${query}%`
        );
      
      if (error) throw error;
      return data;
    },
    enabled: !!(query && query.length >= 2),
    staleTime: 60 * 1000,
    retry: false,
  });
};

// ===== МУТАЦИИ =====
export const useAddCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.lists() });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCollection(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.detail(data.collection) });
      queryClient.invalidateQueries({ queryKey: catalogKeys.lists() });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.lists() });
    },
  });
};