import { memo } from 'react';
import { useCategories } from '../../hooks/useCategories';

const CategoryFilter = memo(function CategoryFilter({ selectedCategory, onSelect }) {
  const { categories, loading, error } = useCategories();

  if (error) {
    return (
      <div className="text-sm text-red-500 py-2" role="alert">
        Failed to load categories
      </div>
    );
  }

  return (
    <nav aria-label="Product categories">
      <div className="flex flex-wrap gap-2">
        <CategoryButton
          isSelected={!selectedCategory}
          onClick={() => onSelect(null)}
        >
          All
        </CategoryButton>

        {loading ? (
          <CategorySkeleton count={5} />
        ) : (
          categories.map((category) => {
            const value = typeof category === 'string' 
              ? category 
              : category.slug ?? category.name;
            const label = typeof category === 'string' 
              ? category 
              : category.name ?? category.slug;
              
            return (
              <CategoryButton
                key={value}
                isSelected={selectedCategory === value}
                onClick={() => onSelect(value)}
              >
                {formatCategoryLabel(label)}
              </CategoryButton>
            );
          })
        )}
      </div>
    </nav>
  );
});

function CategoryButton({ isSelected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`
        px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
        ${isSelected 
          ? 'bg-teal-600 text-white shadow-sm' 
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
        }
      `}
    >
      {children}
    </button>
  );
}

function CategorySkeleton({ count }) {
  return Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
      aria-hidden="true"
    />
  ));
}

function formatCategoryLabel(label) {
  return label
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default CategoryFilter;