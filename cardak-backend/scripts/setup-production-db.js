#!/usr/bin/env node

/**
 * Production Database Setup Script
 * Bu script production.db dosyasını oluşturur ve Prisma schema'sını uygular
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Production Database Setup Başlıyor...\n');

// 1. Production database dosyasını oluştur
const prodDbPath = path.join(__dirname, '../prisma/production.db');
const devDbPath = path.join(__dirname, '../prisma/dev.db');

console.log('📁 Database dosyaları kontrol ediliyor...');
console.log(`   Dev DB: ${devDbPath}`);
console.log(`   Prod DB: ${prodDbPath}\n`);

// 2. Eğer production.db yoksa, dev.db'den kopyala
if (!fs.existsSync(prodDbPath)) {
  console.log('📋 Production database dosyası oluşturuluyor...');
  
  if (fs.existsSync(devDbPath)) {
    fs.copyFileSync(devDbPath, prodDbPath);
    console.log('✅ Dev database from production database copied\n');
  } else {
    // Create empty SQLite database
    console.log('✅ Creating new production database file...\n');
    fs.writeFileSync(prodDbPath, '');
  }
} else {
  console.log('✅ Production database dosyası zaten mevcut\n');
}

// 3. Prisma migrations'ı production database'e uygula
console.log('🔄 Prisma migrations uygulanıyor...');
try {
  const env = {
    ...process.env,
    DATABASE_URL: `file:${prodDbPath}`
  };
  
  execSync('npx prisma migrate deploy', {
    cwd: path.join(__dirname, '..'),
    env: env,
    stdio: 'inherit'
  });
  
  console.log('\n✅ Migrations başarıyla uygulandı\n');
} catch (error) {
  console.error('❌ Migration hatası:', error.message);
  process.exit(1);
}

// 4. Database dosyasının boyutunu kontrol et
const stats = fs.statSync(prodDbPath);
console.log(`📊 Production Database Bilgileri:`);
console.log(`   Dosya: ${prodDbPath}`);
console.log(`   Boyut: ${(stats.size / 1024).toFixed(2)} KB`);
console.log(`   Oluşturulma: ${stats.birthtime}`);
console.log(`   Son Güncelleme: ${stats.mtime}\n`);

console.log('✅ Production database hazırlanması tamamlandı!\n');
console.log('📝 Sonraki Adımlar:');
console.log('   1. Railway hesabı oluştur (https://railway.app)');
console.log('   2. GitHub repository\'yi bağla');
console.log('   3. Environment variables\'ları ayarla');
console.log('   4. Deployment başlat\n');

