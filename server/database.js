const sqlite3 = require('sqlite3').verbose();
const config = require('../config');

class Database {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(config.DATABASE_PATH, (err) => {
        if (err) {
          reject(err);
          return;
        }
        
        // URLs tablosunu oluştur
        this.db.run(`
          CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            original_url TEXT NOT NULL,
            short_code TEXT UNIQUE NOT NULL,
            clicks INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME
          )
        `, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    });
  }

  async createUrl(originalUrl, shortCode, expiresAt = null) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO urls (original_url, short_code, expires_at)
        VALUES (?, ?, ?)
      `;
      
      this.db.run(query, [originalUrl, shortCode, expiresAt], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          id: this.lastID,
          original_url: originalUrl,
          short_code: shortCode,
          clicks: 0,
          expires_at: expiresAt
        });
      });
    });
  }

  async getUrlByShortCode(shortCode) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM urls 
        WHERE short_code = ? 
        AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
      `;
      
      this.db.get(query, [shortCode], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });
  }

  async incrementClicks(shortCode) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?`;
      
      this.db.run(query, [shortCode], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      });
    });
  }

  async getAllUrls() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM urls 
        ORDER BY created_at DESC
      `;
      
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }

  async deleteUrl(shortCode) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM urls WHERE short_code = ?`;
      
      this.db.run(query, [shortCode], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes > 0);
      });
    });
  }

  async getUrlStats(shortCode) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT original_url, short_code, clicks, created_at, expires_at
        FROM urls 
        WHERE short_code = ?
      `;
      
      this.db.get(query, [shortCode], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });
  }

  // Analytics metodları
  async getAnalyticsOverview(startDate) {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT 
          COUNT(*) as totalUrls,
          SUM(clicks) as totalClicks,
          AVG(clicks) as avgClicks
        FROM urls 
        WHERE created_at >= ?
      `, [startDate.toISOString()], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const result = rows[0] || {};
          resolve({
            totalUrls: result.totalUrls || 0,
            totalClicks: result.totalClicks || 0,
            uniqueVisitors: Math.floor((result.totalClicks || 0) * 0.7), // Tahmini
            clickRate: result.avgClicks ? Number(result.avgClicks.toFixed(1)) : 0
          });
        }
      });
    });
  }

  async getClicksOverTime(startDate, timeRange) {
    return new Promise((resolve, reject) => {
      let groupBy;
      switch (timeRange) {
        case '24h':
          groupBy = "strftime('%H', created_at)";
          break;
        case '30d':
          groupBy = "date(created_at)";
          break;
        default: // 7d
          groupBy = "date(created_at)";
      }

      this.db.all(`
        SELECT 
          ${groupBy} as period,
          SUM(clicks) as clicks
        FROM urls 
        WHERE created_at >= ?
        GROUP BY ${groupBy}
        ORDER BY period
      `, [startDate.toISOString()], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const data = rows.map(row => ({
            date: row.period,
            clicks: row.clicks || 0
          }));
          resolve(data);
        }
      });
    });
  }

  async getTopUrls(startDate) {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT short_code, original_url, clicks
        FROM urls 
        WHERE created_at >= ?
        ORDER BY clicks DESC
        LIMIT 5
      `, [startDate.toISOString()], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => ({
            shortCode: row.short_code,
            originalUrl: row.original_url,
            clicks: row.clicks || 0
          })));
        }
      });
    });
  }

  async recordClickAnalytics(data) {
    // Analytics tablosu henüz yok, şimdilik clicks sayısını artır
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?',
        [data.shortCode],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
}

module.exports = Database;
