const express = require('express');
const { nanoid } = require('nanoid');
const validator = require('validator');
const config = require('../../config');

function createUrlRoutes(db) {
  const router = express.Router();

  // Yeni URL kısalt
  router.post('/shorten', async (req, res) => {
    try {
      const { url, customCode, expiresIn } = req.body;

      // URL doğrulama
      if (!url || !validator.isURL(url, { require_protocol: true })) {
        return res.status(400).json({ 
          error: 'Geçerli bir URL girin (http:// veya https:// ile başlamalı)' 
        });
      }

      // Kısa kod oluştur veya özel kodu kullan
      let shortCode;
      if (customCode) {
        // Özel kod doğrulama
        if (!/^[a-zA-Z0-9_-]+$/.test(customCode) || customCode.length < 3 || customCode.length > 20) {
          return res.status(400).json({ 
            error: 'Özel kod 3-20 karakter arasında olmalı ve sadece harf, rakam, _ ve - içermelidir' 
          });
        }
        
        // Özel kodun daha önce kullanılıp kullanılmadığını kontrol et
        const existingUrl = await db.getUrlByShortCode(customCode);
        if (existingUrl) {
          return res.status(400).json({ 
            error: 'Bu kısa kod zaten kullanılmakta' 
          });
        }
        
        shortCode = customCode;
      } else {
        // Rastgele kısa kod oluştur (4 karakter)
        shortCode = nanoid(4);
        
        // Benzersizlik kontrolü
        let attempts = 0;
        while (await db.getUrlByShortCode(shortCode) && attempts < 5) {
          shortCode = nanoid(4);
          attempts++;
        }
        
        if (attempts >= 5) {
          return res.status(500).json({ 
            error: 'Benzersiz kod oluşturulamadı, lütfen tekrar deneyin' 
          });
        }
      }

      // Expiry date hesapla
      let expiresAt = null;
      if (expiresIn) {
        const hours = parseInt(expiresIn);
        if (hours > 0 && hours <= 8760) { // Max 1 yıl
          expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
        }
      }

      // Veritabanına kaydet
      const newUrl = await db.createUrl(url, shortCode, expiresAt);
      
      // Kısa URL oluştur - development'ta localhost, production'da kısa domain
      const shortUrl = config.NODE_ENV === 'development' 
        ? `${req.protocol}://${req.get('host')}/${newUrl.short_code}`
        : `https://${config.SHORT_DOMAIN}/${newUrl.short_code}`;

      res.json({
        success: true,
        data: {
          original_url: newUrl.original_url,
          short_code: newUrl.short_code,
          short_url: shortUrl,
          expires_at: newUrl.expires_at,
          created_at: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('URL kısaltma hatası:', error);
      res.status(500).json({ error: 'Sunucu hatası' });
    }
  });

  // Tüm URL'leri getir
  router.get('/', async (req, res) => {
    try {
      const urls = await db.getAllUrls();
      
      const urlsWithShortUrl = urls.map(url => {
        const shortUrl = config.NODE_ENV === 'development' 
          ? `${req.protocol}://${req.get('host')}/${url.short_code}`
          : `https://${config.SHORT_DOMAIN}/${url.short_code}`;
          
        return {
          ...url,
          short_url: shortUrl,
          is_expired: url.expires_at && new Date(url.expires_at) < new Date()
        };
      });
      
      res.json({ success: true, data: urlsWithShortUrl });
    } catch (error) {
      console.error('URLleri getirme hatası:', error);
      res.status(500).json({ error: 'Sunucu hatası' });
    }
  });

  // URL istatistiklerini getir
  router.get('/stats/:shortCode', async (req, res) => {
    try {
      const { shortCode } = req.params;
      const urlStats = await db.getUrlStats(shortCode);
      
      if (!urlStats) {
        return res.status(404).json({ error: 'URL bulunamadı' });
      }
      
      const shortUrl = config.NODE_ENV === 'development' 
        ? `${req.protocol}://${req.get('host')}/${urlStats.short_code}`
        : `https://${config.SHORT_DOMAIN}/${urlStats.short_code}`;
        
      const response = {
        ...urlStats,
        short_url: shortUrl,
        is_expired: urlStats.expires_at && new Date(urlStats.expires_at) < new Date()
      };
      
      res.json({ success: true, data: response });
    } catch (error) {
      console.error('URL istatistikleri getirme hatası:', error);
      res.status(500).json({ error: 'Sunucu hatası' });
    }
  });

  // URL sil
  router.delete('/:shortCode', async (req, res) => {
    try {
      const { shortCode } = req.params;
      const deleted = await db.deleteUrl(shortCode);
      
      if (!deleted) {
        return res.status(404).json({ error: 'URL bulunamadı' });
      }
      
      res.json({ success: true, message: 'URL başarıyla silindi' });
    } catch (error) {
      console.error('URL silme hatası:', error);
      res.status(500).json({ error: 'Sunucu hatası' });
    }
  });

  return router;
}

module.exports = createUrlRoutes;
