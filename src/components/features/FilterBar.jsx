import { memo, useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown';
import SortDropdown from './SortDropdown';

const FilterBar = memo(function FilterBar({
  filters,
  onCategoryChange,
  onSortChange,
  onSearch,
  onClearSearch,
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="py-4">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between gap-4">
        {/* Left Side - Search & Category */}
        <div className="flex items-center gap-4 flex-1">
          <SearchBar
            value={filters.searchQuery}
            onChange={onSearch}
            onClear={onClearSearch}
          />
          
          <CategoryDropdown
            selectedCategory={filters.category}
            onSelect={onCategoryChange}
          />
        </div>

        {/* Right Side - Sort */}
        <div className="flex items-center gap-3">
          <SortDropdown value={filters.sort} onChange={onSortChange} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-3">
        <SearchBar
          value={filters.searchQuery}
          onChange={onSearch}
          onClear={onClearSearch}
        />
        
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {filters.category && (
              <span className="bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded text-xs">1</span>
            )}
          </button>
          
          <SortDropdown value={filters.sort} onChange={onSortChange} />
        </div>

        {/* Mobile Filters Panel */}
        {showMobileFilters && (
          <div className="p-4 bg-gray-50 rounded-lg border">
            <CategoryDropdown
              selectedCategory={filters.category}
              onSelect={(cat) => {
                onCategoryChange(cat);
                setShowMobileFilters(false);
              }}
              isMobile
            />
          </div>
        )}
      </div>

      {/* Active Filters */}
      {filters.category && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">Active filters:</span>
          <button
            onClick={() => onCategoryChange(null)}
            className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm hover:bg-teal-100 transition-colors"
          >
            {formatCategoryName(filters.category)}
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
});

function formatCategoryName(category) {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default FilterBar;