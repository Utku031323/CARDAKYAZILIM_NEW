import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SettingValue {
  [key: string]: any;
}

/**
 * Get setting by key
 */
export const getSettingByKey = async (key: string) => {
  const setting = await prisma.settings.findUnique({
    where: { key },
  });

  return setting;
};

/**
 * Get all settings
 */
export const getAllSettings = async () => {
  const settings = await prisma.settings.findMany();
  return settings;
};

/**
 * Update or create setting
 */
export const updateSetting = async (key: string, value: SettingValue) => {
  const setting = await prisma.settings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  return setting;
};

/**
 * Delete setting
 */
export const deleteSetting = async (key: string) => {
  await prisma.settings.delete({
    where: { key },
  });
};

/**
 * Get multiple settings by keys
 */
export const getSettingsByKeys = async (keys: string[]) => {
  const settings = await prisma.settings.findMany({
    where: {
      key: {
        in: keys,
      },
    },
  });

  return settings;
};

/**
 * Initialize default settings
 */
export const initializeDefaultSettings = async () => {
  const defaultSettings = [
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

  const results = [];
  for (const setting of defaultSettings) {
    const result = await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
    results.push(result);
  }

  return results;
};

