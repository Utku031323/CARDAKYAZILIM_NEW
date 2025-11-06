import { apiClient, ApiResponse } from '@/lib/api-client';

export interface Quote {
  id: string;
  companyName: string;
  monthlyOrderCount: number;
  productTypes: string[];
  status: 'PENDING' | 'REVIEWED' | 'QUOTED' | 'ACCEPTED' | 'REJECTED';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuoteRequest {
  companyName: string;
  monthlyOrderCount: number;
  productTypes: string[];
}

export interface UpdateQuoteRequest {
  companyName?: string;
  monthlyOrderCount?: number;
  productTypes?: string[];
}

export interface QuoteListResponse {
  data: Quote[];
  pagination: {
    total: number;
    skip: number;
    take: number;
    pages: number;
  };
}

export interface QuoteListParams {
  skip?: number;
  take?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}

// List quotes
export const listQuotes = async (params?: QuoteListParams) => {
  const response = await apiClient.get<ApiResponse<QuoteListResponse>>('/quotes', {
    params,
  });
  return response.data.data;
};

// Get single quote
export const getQuote = async (id: string) => {
  const response = await apiClient.get<ApiResponse<Quote>>(`/quotes/${id}`);
  return response.data.data;
};

// Create quote
export const createQuote = async (data: CreateQuoteRequest) => {
  const response = await apiClient.post<ApiResponse<Quote>>('/quotes', data);
  return response.data.data;
};

// Update quote
export const updateQuote = async (id: string, data: UpdateQuoteRequest) => {
  const response = await apiClient.put<ApiResponse<Quote>>(`/quotes/${id}`, data);
  return response.data.data;
};

// Update quote status
export const updateQuoteStatus = async (id: string, status: string) => {
  const response = await apiClient.put<ApiResponse<Quote>>(`/quotes/${id}/status`, {
    status,
  });
  return response.data.data;
};

// Delete quote
export const deleteQuote = async (id: string) => {
  const response = await apiClient.delete<ApiResponse>(`/quotes/${id}`);
  return response.data;
};

