import { apiClient, ApiResponse } from '@/lib/api-client';

export interface OnboardingStep {
  id: string;
  onboardingId: string;
  stepNumber: number;
  data?: any;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingDocument {
  id: string;
  onboardingId: string;
  documentType: string;
  filePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface Onboarding {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  currentStep: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  steps?: OnboardingStep[];
  documents?: OnboardingDocument[];
}

export interface CreateOnboardingRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface UpdateOnboardingRequest {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  currentStep?: number;
}

export interface OnboardingListResponse {
  data: Onboarding[];
  pagination: {
    total: number;
    skip: number;
    take: number;
    pages: number;
  };
}

export interface OnboardingListParams {
  skip?: number;
  take?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}

// List onboarding
export const listOnboarding = async (params?: OnboardingListParams) => {
  const response = await apiClient.get<ApiResponse<OnboardingListResponse>>('/onboarding', {
    params,
  });
  return response.data.data;
};

// Get single onboarding
export const getOnboarding = async (id: string) => {
  const response = await apiClient.get<ApiResponse<Onboarding>>(`/onboarding/${id}`);
  return response.data.data;
};

// Create onboarding
export const createOnboarding = async (data: CreateOnboardingRequest) => {
  const response = await apiClient.post<ApiResponse<Onboarding>>('/onboarding', data);
  return response.data.data;
};

// Update onboarding
export const updateOnboarding = async (id: string, data: UpdateOnboardingRequest) => {
  const response = await apiClient.put<ApiResponse<Onboarding>>(`/onboarding/${id}`, data);
  return response.data.data;
};

// Update onboarding status
export const updateOnboardingStatus = async (id: string, status: string) => {
  const response = await apiClient.put<ApiResponse<Onboarding>>(`/onboarding/${id}/status`, {
    status,
  });
  return response.data.data;
};

// Delete onboarding
export const deleteOnboarding = async (id: string) => {
  const response = await apiClient.delete<ApiResponse>(`/onboarding/${id}`);
  return response.data;
};

