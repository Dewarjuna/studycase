import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore.js';

export default function ProductCard({ product, isNew = false }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow relative group"
      onMouseEnter={() => setShowAddToCart(true)}
      onMouseLeave={() => setShowAddToCart(false)}
    >
      {isNew && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-teal-700 text-white text-xs font-medium px-3 py-1 rounded-md">
            New Arrivals
          </span>
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
      >
        <svg 
          className={`w-5 h-5 ${isWishlisted ? 'fill-teal-700 text-teal-700' : 'text-gray-400'}`}
          fill={isWishlisted ? 'currentColor' : 'none'}
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Link to={`/products/${product.id}`}>
        <div className="relative w-full h-64 bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 truncate mb-1">
            {product.title}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews?.length || 0})</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {showAddToCart && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-teal-700 text-white py-2.5 rounded-lg hover:bg-teal-800 transition font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}