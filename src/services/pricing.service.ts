import { apiClient, ApiResponse } from '@/lib/api-client';

export interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  pricePerOrder: number;
  description: string;
  features: string[];
  orderVolumeMin: number;
  orderVolumeMax?: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePricingRequest {
  name: string;
  monthlyPrice: number;
  pricePerOrder: number;
  description: string;
  features: string[];
  orderVolumeMin: number;
  orderVolumeMax?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface UpdatePricingRequest {
  name?: string;
  monthlyPrice?: number;
  pricePerOrder?: number;
  description?: string;
  features?: string[];
  orderVolumeMin?: number;
  orderVolumeMax?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface PricingListResponse {
  data: PricingTier[];
  pagination: {
    total: number;
    skip: number;
    take: number;
    pages: number;
  };
}

export interface PricingListParams {
  skip?: number;
  take?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}

// List pricing tiers
export const listPricing = async (params?: PricingListParams) => {
  const response = await apiClient.get<ApiResponse<PricingListResponse>>('/pricing', {
    params,
  });
  return response.data.data;
};

// Get single pricing tier
export const getPricing = async (id: string) => {
  const response = await apiClient.get<ApiResponse<PricingTier>>(`/pricing/${id}`);
  return response.data.data;
};

// Create pricing tier
export const createPricing = async (data: CreatePricingRequest) => {
  const response = await apiClient.post<ApiResponse<PricingTier>>('/pricing', data);
  return response.data.data;
};

// Update pricing tier
export const updatePricing = async (id: string, data: UpdatePricingRequest) => {
  const response = await apiClient.put<ApiResponse<PricingTier>>(`/pricing/${id}`, data);
  return response.data.data;
};

// Delete pricing tier
export const deletePricing = async (id: string) => {
  const response = await apiClient.delete<ApiResponse>(`/pricing/${id}`);
  return response.data;
};

