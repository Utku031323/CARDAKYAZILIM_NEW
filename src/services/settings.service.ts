import { apiClient, ApiResponse } from '@/lib/api-client';

export interface Setting {
  id: string;
  key: string;
  value: any;
  updatedAt: string;
}

export interface SettingListResponse {
  data: Setting[];
}

// Get all settings
export const getAllSettings = async () => {
  const response = await apiClient.get<ApiResponse<SettingListResponse>>('/settings');
  return response.data.data;
};

// Get setting by key
export const getSettingByKey = async (key: string) => {
  const response = await apiClient.get<ApiResponse<Setting>>(`/settings/${key}`);
  return response.data.data;
};

// Update setting
export const updateSetting = async (key: string, value: any) => {
  const response = await apiClient.put<ApiResponse<Setting>>(`/settings/${key}`, {
    value,
  });
  return response.data.data;
};

// Delete setting
export const deleteSetting = async (key: string) => {
  const response = await apiClient.delete<ApiResponse>(`/settings/${key}`);
  return response.data;
};

