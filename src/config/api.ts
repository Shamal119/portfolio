// API configuration for different environments
const getApiBaseUrl = (): string => {
  // Check if we're in development
  if (import.meta.env.DEV) {
    return 'http://localhost:3001';
  }
  
  // Check for production API URL from environment variable
  const productionApiUrl = import.meta.env.VITE_API_URL;
  if (productionApiUrl) {
    return productionApiUrl;
  }
  
  // Fallback: disable chatbot in production if no API URL is configured
  console.warn('No API URL configured for production. Chatbot will be disabled.');
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

export const isApiAvailable = (): boolean => {
  return API_BASE_URL !== '';
};

export const getApiEndpoint = (endpoint: string): string => {
  if (!isApiAvailable()) {
    throw new Error('API is not available');
  }
  return `${API_BASE_URL}${endpoint}`;
};
