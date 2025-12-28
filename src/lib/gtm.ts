/**
 * Google Tag Manager (GTM) Utility Module
 * Handles GTM initialization and event tracking for React applications
 */

// GTM Container ID
const GTM_ID = 'GTM-WVMWTWPQ';

/**
 * Initialize Google Tag Manager
 * This function ensures GTM is properly initialized in the application
 */
export const initializeGTM = (): void => {
  // Check if GTM is already loaded
  if (window.dataLayer === undefined) {
    window.dataLayer = [];
  }

  // GTM is already loaded via the script tag in index.html
  // This function serves as a confirmation that GTM is ready
  console.log('GTM initialized with container ID:', GTM_ID);
};

/**
 * Push an event to the GTM dataLayer
 * @param eventName - The name of the event
 * @param eventData - Optional event data object
 */
export const pushGTMEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
    console.log('GTM Event pushed:', eventName, eventData);
  }
};

/**
 * Track page view in GTM
 * Useful for tracking page navigation in single-page applications
 * @param pagePath - The path of the page
 * @param pageTitle - Optional page title
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  pushGTMEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
};

/**
 * Track user interaction events
 * @param category - Event category (e.g., 'engagement', 'conversion')
 * @param action - Event action (e.g., 'click', 'submit')
 * @param label - Optional event label
 * @param value - Optional numeric value
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  pushGTMEvent('custom_event', {
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value,
  });
};

/**
 * Set user properties in GTM
 * @param userId - Unique user identifier
 * @param userProperties - Object containing user properties
 */
export const setUserProperties = (
  userId: string,
  userProperties?: Record<string, unknown>
): void => {
  pushGTMEvent('user_properties', {
    user_id: userId,
    ...userProperties,
  });
};

/**
 * Track form submission
 * @param formName - Name of the form
 * @param formData - Optional form data
 */
export const trackFormSubmission = (
  formName: string,
  formData?: Record<string, unknown>
): void => {
  pushGTMEvent('form_submit', {
    form_name: formName,
    ...formData,
  });
};

/**
 * Track quote request
 * @param quoteData - Quote request data
 */
export const trackQuoteRequest = (
  quoteData?: Record<string, unknown>
): void => {
  pushGTMEvent('quote_request', {
    ...quoteData,
  });
};

/**
 * Track onboarding event
 * @param onboardingData - Onboarding data
 */
export const trackOnboarding = (
  onboardingData?: Record<string, unknown>
): void => {
  pushGTMEvent('onboarding', {
    ...onboardingData,
  });
};

/**
 * Declare window.dataLayer for TypeScript
 */
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

