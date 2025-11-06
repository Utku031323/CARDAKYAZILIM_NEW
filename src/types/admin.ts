// Admin Panel Types

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "viewer";
  createdAt: Date;
}

export interface QuoteRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  monthlyOrderCount: number;
  productTypes: string[];
  specialRequirements?: string;
  hasFragileItems: boolean;
  needsCustomPackaging: boolean;
  preferredStartDate?: string;
  calculatedPrice?: number;
  status: "pending" | "reviewed" | "quoted" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface OnboardingSubmission {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  currentStep: 1 | 2 | 3 | 4;
  stepData: {
    step1?: {
      companyInfo: string;
      taxId: string;
      address: string;
    };
    step2?: {
      selectedServices: string[];
      requirements: string;
    };
    step3?: {
      integrationPlatform: string;
      integrationDetails: string;
    };
    step4?: {
      startDate: string;
      notes: string;
    };
  };
  documents: {
    taxCertificate?: string;
    signatureCircular?: string;
    ecommercePlatformInfo?: string;
  };
  status: "pending" | "in_progress" | "completed" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export interface PricingTier {
  id: string;
  range: "0-100" | "101-250" | "251-500" | "501-750" | "751-1000" | "1000+";
  pricePerUnit: number;
  storageFeeTL: number;
  features: string[];
  isActive: boolean;
  effectiveDate: Date;
}

export interface AdminSettings {
  id: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  generalManagerName: string;
  taxId: string;
  updatedAt: Date;
}

export interface DashboardStats {
  totalQuotes: number;
  pendingQuotes: number;
  totalOnboarding: number;
  inProgressOnboarding: number;
  conversionRate: number;
  monthlyQuotes: number;
  monthlyOnboarding: number;
}

export interface AnalyticsData {
  date: string;
  quotes: number;
  onboarding: number;
  conversions: number;
}

export interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

