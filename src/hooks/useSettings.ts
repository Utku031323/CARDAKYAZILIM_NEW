import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as settingsService from '@/services/settings.service';

export const SETTINGS_QUERY_KEY = ['settings'];

// Get all settings
export const useSettings = () => {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: () => settingsService.getAllSettings(),
  });
};

// Get setting by key
export const useSettingByKey = (key: string) => {
  return useQuery({
    queryKey: [...SETTINGS_QUERY_KEY, key],
    queryFn: () => settingsService.getSettingByKey(key),
    enabled: !!key,
  });
};

// Update setting mutation
export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) =>
      settingsService.updateSetting(key, value),
    onSuccess: (_, { key }) => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...SETTINGS_QUERY_KEY, key] });
    },
  });
};

// Delete setting mutation
export const useDeleteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (key: string) => settingsService.deleteSetting(key),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY });
    },
  });
};

