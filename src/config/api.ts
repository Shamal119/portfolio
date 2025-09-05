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
  
  // Check if we're on Vercel (serverless functions)
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return ''; // Use relative paths for Vercel - this enables the API
  }
  
  // Check if we're on GitHub Pages
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    // For GitHub Pages, we need an external API URL
    console.warn('GitHub Pages detected but no API URL configured. Chatbot will be disabled.');
    return '';
  }
  
  // Fallback: disable chatbot in production if no API URL is configured
  console.warn('No API URL configured for production. Chatbot will be disabled.');
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

export const isApiAvailable = (): boolean => {
  // Check if we're on Vercel (serverless functions available)
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return true; // Vercel has serverless functions available
  }
  
  // For other platforms, check if API_BASE_URL is configured
  return API_BASE_URL !== '';
};

export const getApiEndpoint = (endpoint: string): string => {
  if (!isApiAvailable()) {
    throw new Error('API is not available');
  }
  
  // For Vercel, use relative paths to serverless functions
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return `/api${endpoint}`;
  }
  
  // For other platforms, use the configured base URL
  return `${API_BASE_URL}${endpoint}`;
};
