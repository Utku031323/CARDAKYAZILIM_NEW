import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as onboardingService from '@/services/onboarding.service';

export const ONBOARDING_QUERY_KEY = ['onboarding'];

// List onboarding
export const useOnboarding = (params?: onboardingService.OnboardingListParams) => {
  return useQuery({
    queryKey: [...ONBOARDING_QUERY_KEY, params],
    queryFn: () => onboardingService.listOnboarding(params),
  });
};

// Get single onboarding
export const useOnboardingDetail = (id: string) => {
  return useQuery({
    queryKey: [...ONBOARDING_QUERY_KEY, id],
    queryFn: () => onboardingService.getOnboarding(id),
    enabled: !!id,
  });
};

// Create onboarding mutation
export const useCreateOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: onboardingService.CreateOnboardingRequest) =>
      onboardingService.createOnboarding(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
    },
  });
};

// Update onboarding mutation
export const useUpdateOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: onboardingService.UpdateOnboardingRequest }) =>
      onboardingService.updateOnboarding(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ONBOARDING_QUERY_KEY, id] });
    },
  });
};

// Update onboarding status mutation
export const useUpdateOnboardingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      onboardingService.updateOnboardingStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ONBOARDING_QUERY_KEY, id] });
    },
  });
};

// Delete onboarding mutation
export const useDeleteOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => onboardingService.deleteOnboarding(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
    },
  });
};

