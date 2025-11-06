import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as pricingService from '@/services/pricing.service';

export const PRICING_QUERY_KEY = ['pricing'];

// List pricing tiers
export const usePricing = (params?: pricingService.PricingListParams) => {
  return useQuery({
    queryKey: [...PRICING_QUERY_KEY, params],
    queryFn: () => pricingService.listPricing(params),
  });
};

// Get single pricing tier
export const usePricingDetail = (id: string) => {
  return useQuery({
    queryKey: [...PRICING_QUERY_KEY, id],
    queryFn: () => pricingService.getPricing(id),
    enabled: !!id,
  });
};

// Create pricing mutation
export const useCreatePricing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: pricingService.CreatePricingRequest) =>
      pricingService.createPricing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRICING_QUERY_KEY });
    },
  });
};

// Update pricing mutation
export const useUpdatePricing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: pricingService.UpdatePricingRequest }) =>
      pricingService.updatePricing(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: PRICING_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PRICING_QUERY_KEY, id] });
    },
  });
};

// Delete pricing mutation
export const useDeletePricing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pricingService.deletePricing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRICING_QUERY_KEY });
    },
  });
};

