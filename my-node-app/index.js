const express = require('express');
const path = require('path');
require('dotenv').config();
const { pool } = require('./db'); // подключаем базу
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Роут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

const memoryUsage = process.memoryUsage();
console.log(memoryUsage);

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // замени на свою таблицу
    res.json(result.rows); // отправка на фронт
  } catch (err) {
    console.error('Ошибка при получении данных:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});