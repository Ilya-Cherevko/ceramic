import { supabase } from '../utils/supabase';
import Cards from '../Constants/DirlisterListCatalog';

const migrateData = async () => {
  console.log('Начинаем миграцию данных...');
  console.log(`Всего записей: ${Cards.length}`);

  let success = 0;
  let errors = 0;

  for (const item of Cards) {
    try {
      const { error } = await supabase
        .from('catalog')
        .insert([{
          country: item.Сountry || '',
          name: item.Name,
          collection: item.Collection,
          category: item.Category,
          size: Array.isArray(item.Size) ? item.Size.join(', ') : item.Size || '',
          interiors: item.interiors || [],
          tovars: item.tovars || [],
        }]);

      if (error) {
        console.error(`❌ Ошибка для ${item.Collection}:`, error.message);
        errors++;
      } else {
        console.log(`✅ Добавлена: ${item.Collection}`);
        success++;
      }
    } catch (e) {
      console.error(`❌ Исключение для ${item.Collection}:`, e.message);
      errors++;
    }
  }

  console.log(`\n📊 Итог: успешно ${success}, ошибок ${errors}`);
};

// Запускаем
migrateData();