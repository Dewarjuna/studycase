import { Link } from 'react-router-dom';
import CartButton from './CartButton.jsx';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-teal-700">
            Shopz
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-teal-700 font-medium border-b-2 border-teal-700 pb-1">
              Home
            </Link>
            <Link to="/category/mens-shirts" className="text-gray-700 hover:text-teal-700 transition">
              Man
            </Link>
            <Link to="/category/womens-dresses" className="text-gray-700 hover:text-teal-700 transition">
              Women
            </Link>
            <Link to="/category/beauty" className="text-gray-700 hover:text-teal-700 transition">
              Kids
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-700 hover:text-teal-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
}