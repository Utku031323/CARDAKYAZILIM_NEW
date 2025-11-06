import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash passwords
  const adminPassword = await bcrypt.hash('Admin@123456', 10);
  const managerPassword = await bcrypt.hash('Manager@123456', 10);

  // Delete existing data in correct order (respecting foreign keys)
  await prisma.onboarding.deleteMany();
  console.log('✓ Cleared existing onboarding submissions');

  await prisma.quote.deleteMany();
  console.log('✓ Cleared existing quotes');

  await prisma.user.deleteMany();
  console.log('✓ Cleared existing users');

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@cardak.com',
      password: adminPassword,
      name: 'Yönetici',
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log('✓ Created admin user:', admin.email);

  // Create manager user
  const manager = await prisma.user.create({
    data: {
      email: 'manager@cardak.com',
      password: managerPassword,
      name: 'Müdür',
      role: 'MANAGER',
      isActive: true,
    },
  });
  console.log('✓ Created manager user:', manager.email);

  // Create viewer user
  const viewerPassword = await bcrypt.hash('Viewer@123456', 10);
  const viewer = await prisma.user.create({
    data: {
      email: 'viewer@cardak.com',
      password: viewerPassword,
      name: 'Görüntüleyici',
      role: 'VIEWER',
      isActive: true,
    },
  });
  console.log('✓ Created viewer user:', viewer.email);

  // Delete existing quotes (for development only)
  await prisma.quote.deleteMany();
  console.log('✓ Cleared existing quotes');

  // Create test quotes
  const quote1 = await prisma.quote.create({
    data: {
      companyName: 'ABC Ticaret Ltd.',
      contactName: 'Ahmet Yılmaz',
      email: 'ahmet@abc.com',
      phone: '+90 212 555 0001',
      monthlyOrderCount: 500,
      productTypes: JSON.stringify(['Elektronik', 'Tekstil']),
      specialRequirements: 'Hızlı kargo gerekli',
      hasFragileItems: true,
      needsCustomPackaging: false,
      preferredStartDate: '2025-12-01',
      status: 'PENDING',
      createdBy: admin.id,
    },
  });
  console.log('✓ Created test quote 1:', quote1.id);

  const quote2 = await prisma.quote.create({
    data: {
      companyName: 'XYZ Pazarlama A.Ş.',
      contactName: 'Fatma Kaya',
      email: 'fatma@xyz.com',
      phone: '+90 216 555 0002',
      monthlyOrderCount: 1000,
      productTypes: JSON.stringify(['Gıda', 'Kozmetik']),
      specialRequirements: 'Özel etiketleme',
      hasFragileItems: false,
      needsCustomPackaging: true,
      preferredStartDate: '2025-11-15',
      calculatedPrice: 5000,
      status: 'QUOTED',
      createdBy: manager.id,
    },
  });
  console.log('✓ Created test quote 2:', quote2.id);

  const quote3 = await prisma.quote.create({
    data: {
      companyName: 'DEF İnşaat Ltd.',
      contactName: 'Mehmet Demir',
      email: 'mehmet@def.com',
      phone: '+90 312 555 0003',
      monthlyOrderCount: 200,
      productTypes: JSON.stringify(['İnşaat Malzemeleri']),
      specialRequirements: null,
      hasFragileItems: true,
      needsCustomPackaging: false,
      preferredStartDate: null,
      status: 'REVIEWED',
      createdBy: admin.id,
    },
  });
  console.log('✓ Created test quote 3:', quote3.id);

  // Create test onboarding submissions
  const onboarding1 = await prisma.onboarding.create({
    data: {
      companyName: 'Teknoloji Çözümleri Ltd.',
      contactName: 'Ayşe Kara',
      email: 'ayse@teknoloji.com',
      phone: '+90 212 555 1001',
      status: 'PENDING',
      currentStep: 1,
      createdBy: admin.id,
    },
  });
  console.log('✓ Created test onboarding 1:', onboarding1.id);

  const onboarding2 = await prisma.onboarding.create({
    data: {
      companyName: 'Lojistik Hizmetleri A.Ş.',
      contactName: 'Murat Yıldız',
      email: 'murat@lojistik.com',
      phone: '+90 216 555 1002',
      status: 'IN_PROGRESS',
      currentStep: 2,
      createdBy: manager.id,
    },
  });
  console.log('✓ Created test onboarding 2:', onboarding2.id);

  const onboarding3 = await prisma.onboarding.create({
    data: {
      companyName: 'Perakende Ticaret Ltd.',
      contactName: 'Selin Demir',
      email: 'selin@perakende.com',
      phone: '+90 312 555 1003',
      status: 'COMPLETED',
      currentStep: 5,
      createdBy: admin.id,
    },
  });
  console.log('✓ Created test onboarding 3:', onboarding3.id);

  // Create onboarding steps for first submission
  await prisma.onboardingStep.create({
    data: {
      onboardingId: onboarding1.id,
      stepNumber: 1,
      data: { companyInfo: 'Başlangıç bilgileri' },
    },
  });
  console.log('✓ Created onboarding step for submission 1');

  // Create onboarding documents for second submission
  await prisma.onboardingDocument.create({
    data: {
      onboardingId: onboarding2.id,
      documentType: 'tax_certificate',
      filePath: '/uploads/tax_cert_001.pdf',
      fileName: 'tax_certificate.pdf',
      fileSize: 245000,
      mimeType: 'application/pdf',
    },
  });
  console.log('✓ Created onboarding document for submission 2');

  // Delete existing pricing tiers (for development only)
  await prisma.pricingTier.deleteMany();
  console.log('✓ Cleared existing pricing tiers');

  // Create test pricing tiers
  const pricing1 = await prisma.pricingTier.create({
    data: {
      name: 'Başlangıç Paketi',
      monthlyPrice: 500,
      pricePerOrder: 2.5,
      description: 'Küçük işletmeler için ideal',
      features: JSON.stringify(['Temel paketleme', 'Standart kargo', 'Email desteği']),
      orderVolumeMin: 0,
      orderVolumeMax: 100,
      status: 'ACTIVE',
    },
  });
  console.log('✓ Created pricing tier 1:', pricing1.id);

  const pricing2 = await prisma.pricingTier.create({
    data: {
      name: 'Profesyonel Paketi',
      monthlyPrice: 1500,
      pricePerOrder: 1.8,
      description: 'Orta ölçekli işletmeler için',
      features: JSON.stringify(['Özel paketleme', 'Hızlı kargo', 'Telefon desteği', 'Raporlama']),
      orderVolumeMin: 101,
      orderVolumeMax: 500,
      status: 'ACTIVE',
    },
  });
  console.log('✓ Created pricing tier 2:', pricing2.id);

  const pricing3 = await prisma.pricingTier.create({
    data: {
      name: 'Kurumsal Paketi',
      monthlyPrice: 5000,
      pricePerOrder: 1.0,
      description: 'Büyük işletmeler için',
      features: JSON.stringify(['Tam özelleştirme', 'Ekspres kargo', '24/7 Destek', 'Gelişmiş raporlama', 'API erişimi']),
      orderVolumeMin: 501,
      orderVolumeMax: null,
      status: 'ACTIVE',
    },
  });
  console.log('✓ Created pricing tier 3:', pricing3.id);

  // Delete existing settings (for development only)
  await prisma.settings.deleteMany();
  console.log('✓ Cleared existing settings');

  // Create default settings
  const settings = [
    {
      key: 'company_name',
      value: { value: 'Çardak Paketleme' },
    },
    {
      key: 'company_email',
      value: { value: 'info@cardak.com' },
    },
    {
      key: 'company_phone',
      value: { value: '+90 212 555 0000' },
    },
    {
      key: 'company_address',
      value: { value: 'İstanbul, Türkiye' },
    },
    {
      key: 'email_notifications_enabled',
      value: { value: true },
    },
    {
      key: 'sms_notifications_enabled',
      value: { value: false },
    },
    {
      key: 'max_file_upload_size',
      value: { value: 10485760 }, // 10MB in bytes
    },
    {
      key: 'allowed_file_types',
      value: { value: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png'] },
    },
  ];

  for (const setting of settings) {
    await prisma.settings.create({
      data: setting,
    });
  }
  console.log('✓ Created default settings');

  console.log('✅ Database seed completed successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('  Admin:   admin@cardak.com / Admin@123456');
  console.log('  Manager: manager@cardak.com / Manager@123456');
  console.log('  Viewer:  viewer@cardak.com / Viewer@123456');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

