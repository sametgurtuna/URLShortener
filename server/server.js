const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('../config');
const Database = require('./database');
const urlRoutes = require('./routes/urls');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const db = new Database();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Database'i başlat
db.init().then(() => {
  console.log('Veritabanı başarıyla başlatıldı');
}).catch(err => {
  console.error('Veritabanı başlatılırken hata:', err);
});

// Routes
app.use('/api/urls', urlRoutes(db));

// Analytics routes - db'yi global olarak kullanabilmesi için
app.use('/api/analytics', (req, res, next) => {
  req.db = db;
  next();
}, require('./routes/analytics'));

// Kısaltılmış URL yönlendirmesi
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await db.getUrlByShortCode(shortCode);
    
    if (!url) {
      return res.status(404).json({ error: 'URL bulunamadı' });
    }
    
    // Tıklama sayısını artır
    await db.incrementClicks(shortCode);
    
    // Orijinal URL'ye yönlendir
    res.redirect(url.original_url);
  } catch (error) {
    console.error('Yönlendirme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// React uygulaması için catch-all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
