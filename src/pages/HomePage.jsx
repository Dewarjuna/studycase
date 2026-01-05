import { useState, useEffect } from 'react';
import { getProducts } from '../lib/api';
import ProductCard from '../components/features/ProductCard.jsx';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          All Products <span className="text-gray-500 font-normal text-lg">({products.length})</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product}
            isNew={index % 3 === 0}
          />
        ))}
      </div>
    </div>
  );
}