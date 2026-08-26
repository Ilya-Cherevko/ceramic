// src/utils/supabase.js
import { createClient } from '@supabase/supabase-js';

// Добавь логи, чтобы увидеть, что загружается
console.log('URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY);

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Если переменные не загрузились — покажи ошибку
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Переменные окружения не загружены!');
  console.error('Проверь .env файл в корне проекта');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);