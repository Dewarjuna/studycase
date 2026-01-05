import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore.js';

export default function CartButton() {
  const itemCount = useCartStore((state) => state.getTotalItems());

  return (
    <Link to="/cart" className="relative text-gray-700 hover:text-teal-700">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}