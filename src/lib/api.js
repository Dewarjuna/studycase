import axios from 'axios';
import { BASE_URL } from './constants';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Functions
export async function getProducts(limit = 30, skip = 0) {
  return api.get(`/products?limit=${limit}&skip=${skip}`);
}

export async function getProduct(id) {
  return api.get(`/products/${id}`);
}

export async function searchProducts(query) {
  const encodedQuery = encodeURIComponent(query);
  return api.get(`/products/search?q=${encodedQuery}`);
}

export async function getCategories() {
  return api.get('/products/categories');
}

export async function getCategoryList() {
  return api.get('/products/category-list');
}

export async function getProductsByCategory(category) {
  return api.get(`/products/category/${category}`);
}