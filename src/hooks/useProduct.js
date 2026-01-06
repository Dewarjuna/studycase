import { useState, useEffect, useCallback, useMemo } from 'react';
import { getProducts, getProductsByCategory, searchProducts } from '../lib/api';

const PRODUCTS_PER_PAGE = 12;
const DEBOUNCE_DELAY = 400;

const sortProducts = (products, sortKey) => {
  if (!Array.isArray(products)) return [];
  
  const sortFns = {
    'price-asc': (a, b) => (a.price ?? 0) - (b.price ?? 0),
    'price-desc': (a, b) => (b.price ?? 0) - (a.price ?? 0),
    'rating-desc': (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
    'recommended': () => 0,
  };
  
  return [...products].sort(sortFns[sortKey] || sortFns.recommended);
};

export function useProducts() {
  const [state, setState] = useState({
    products: [],
    total: 0,
    loading: true,
    error: null,
  });
  
  const [filters, setFilters] = useState({
    page: 1,
    category: null,
    searchQuery: '',
    sort: 'recommended',
  });

  const fetchProducts = useCallback(async (signal) => {
    const { page, category, searchQuery, sort } = filters;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      let data;
      
      if (searchQuery.trim()) {
        data = await searchProducts(searchQuery, { signal });
      } else if (category) {
        data = await getProductsByCategory(category, { signal });
      } else {
        const skip = (page - 1) * PRODUCTS_PER_PAGE;
        data = await getProducts(PRODUCTS_PER_PAGE, skip, { signal });
      }
      
      const products = data?.products ?? data ?? [];
      const total = data?.total ?? products.length;
      
      setState({
        products: sortProducts(products, sort),
        total,
        loading: false,
        error: null,
      });
    } catch (err) {
      if (err.name === 'AbortError') return;
      
      console.error('Failed to fetch products:', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load products. Please try again.',
      }));
    }
  }, [filters]);

  // Debounced fetch for search
  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = filters.searchQuery 
      ? setTimeout(() => fetchProducts(controller.signal), DEBOUNCE_DELAY)
      : null;
    
    if (!filters.searchQuery) {
      fetchProducts(controller.signal);
    }
    
    return () => {
      controller.abort();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchProducts]);

  // Re-sort when sort changes without refetching
  useEffect(() => {
    setState(prev => ({
      ...prev,
      products: sortProducts(prev.products, filters.sort),
    }));
  }, [filters.sort]);

  const actions = useMemo(() => ({
    setPage: (page) => setFilters(prev => ({ ...prev, page })),
    setCategory: (category) => setFilters(prev => ({ 
      ...prev, 
      category, 
      page: 1, 
      searchQuery: '' 
    })),
    setSearchQuery: (searchQuery) => setFilters(prev => ({ 
      ...prev, 
      searchQuery, 
      page: 1 
    })),
    setSort: (sort) => setFilters(prev => ({ ...prev, sort })),
    clearSearch: () => setFilters(prev => ({ ...prev, searchQuery: '', page: 1 })),
    retry: () => fetchProducts(new AbortController().signal),
  }), [fetchProducts]);

  return {
    ...state,
    filters,
    actions,
    limit: PRODUCTS_PER_PAGE,
    isPaginated: !filters.category && !filters.searchQuery,
  };
}