import { useState, useEffect } from 'react';
import { getCategories } from '../lib/api';

let cachedCategories = null;

export function useCategories() {
  const [state, setState] = useState({
    categories: cachedCategories ?? [],
    loading: !cachedCategories,
    error: null,
  });

  useEffect(() => {
    if (cachedCategories) return;

    getCategories()
      .then((data) => {
        const categories = Array.isArray(data) ? data : data?.categories ?? [];
        cachedCategories = categories;
        setState({ categories, loading: false, error: null });
      })
      .catch((err) => {
        console.error('Failed to load categories:', err);
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: 'Failed to load categories' 
        }));
      });
  }, []);

  return state;
}