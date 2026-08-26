// src/scripts/generateSitemap.js
const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Проверяем, что переменные загружены
if (!process.env.REACT_APP_SUPABASE_URL) {
  console.error('❌ REACT_APP_SUPABASE_URL не найден в .env');
  console.log('📍 Ищем .env в:', path.join(__dirname, '../../.env'));
  process.exit(1);
}

const SITE_URL = 'https://vokceramic.ru';

// Базовые страницы
const pages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/Plitka', changefreq: 'weekly', priority: 0.9 },
  { url: '/Keramogranit', changefreq: 'weekly', priority: 0.9 },
  { url: '/GibkyMramor', changefreq: 'weekly', priority: 0.9 },
  { url: '/AboutUs', changefreq: 'monthly', priority: 0.7 },
];

// Генерация sitemap
async function generateSitemap() {
  try {
    const stream = new SitemapStream({ hostname: SITE_URL });
    const data = [];

    pages.forEach(page => {
      data.push({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString().split('T')[0],
      });
    });

    const sitemap = await streamToPromise(
      Readable.from(data).pipe(stream)
    );

    const filePath = path.join(__dirname, '../../public/sitemap.xml');
    fs.writeFileSync(filePath, sitemap.toString());
    console.log('✅ sitemap.xml успешно создан!');
    console.log(`📊 Добавлено страниц: ${data.length}`);
  } catch (error) {
    console.error('❌ Ошибка создания sitemap:', error);
  }
}

generateSitemap();