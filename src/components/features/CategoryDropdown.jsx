import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';

export default function CategoryDropdown({ selectedCategory, onSelect, isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { categories, loading, error } = useCategories();

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (category) => {
    onSelect(category);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          <CategoryPill
            isSelected={!selectedCategory}
            onClick={() => handleSelect(null)}
          >
            All
          </CategoryPill>
          {categories.map((category) => {
            const value = typeof category === 'string' ? category : category.slug ?? category.name;
            const label = typeof category === 'string' ? category : category.name ?? category.slug;
            return (
              <CategoryPill
                key={value}
                isSelected={selectedCategory === value}
                onClick={() => handleSelect(value)}
              >
                {formatCategoryName(label)}
              </CategoryPill>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium
          transition-all duration-200 min-w-[160px] justify-between
          ${selectedCategory 
            ? 'border-teal-500 bg-teal-50 text-teal-700' 
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">
          {selectedCategory ? formatCategoryName(selectedCategory) : 'All Categories'}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          role="listbox"
        >
          {loading ? (
            <div className="p-4 text-sm text-gray-500">Loading categories...</div>
          ) : error ? (
            <div className="p-4 text-sm text-red-500">{error}</div>
          ) : (
            <>
              <DropdownItem
                isSelected={!selectedCategory}
                onClick={() => handleSelect(null)}
              >
                All Categories
              </DropdownItem>
              
              <div className="border-t border-gray-100" />
              
              {categories.map((category) => {
                const value = typeof category === 'string' ? category : category.slug ?? category.name;
                const label = typeof category === 'string' ? category : category.name ?? category.slug;
                return (
                  <DropdownItem
                    key={value}
                    isSelected={selectedCategory === value}
                    onClick={() => handleSelect(value)}
                  >
                    {formatCategoryName(label)}
                  </DropdownItem>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ isSelected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-2.5 text-sm text-left
        transition-colors duration-150
        ${isSelected 
          ? 'bg-teal-50 text-teal-700' 
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
      role="option"
      aria-selected={isSelected}
    >
      <span>{children}</span>
      {isSelected && <Check className="h-4 w-4 text-teal-600" />}
    </button>
  );
}

function CategoryPill({ isSelected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-full text-sm font-medium transition-all
        ${isSelected 
          ? 'bg-teal-600 text-white' 
          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
        }
      `}
    >
      {children}
    </button>
  );
}

function formatCategoryName(category) {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}