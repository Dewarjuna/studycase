import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/features/ProductGrid';
import FilterBar from '../components/features/FilterBar';
import Pagination from '../components/features/Pagination';
import LoadingGrid from '../components/ui/LoadingGrid';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

export default function HomePage() {
  const { 
    products, 
    total, 
    loading, 
    error, 
    filters, 
    actions, 
    limit, 
    isPaginated 
  } = useProducts();

  const displayCount = filters.searchQuery ? products.length : total;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Filter Bar - Full Width */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <FilterBar
            filters={filters}
            onCategoryChange={actions.setCategory}
            onSortChange={actions.setSort}
            onSearch={actions.setSearchQuery}
            onClearSearch={actions.clearSearch}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {filters.category ? formatCategoryName(filters.category) : 'All Products'}
            <span className="text-gray-400 font-normal text-lg ml-2">
              ({displayCount})
            </span>
          </h1>
        </div>

        {/* Products Section */}
        <section aria-live="polite" aria-busy={loading}>
          {loading ? (
            <LoadingGrid count={limit} />
          ) : error ? (
            <ErrorState message={error} onRetry={actions.retry} />
          ) : products.length === 0 ? (
            <EmptyState 
              message={filters.searchQuery 
                ? `No results found for "${filters.searchQuery}"` 
                : 'No products found.'
              }
              onClear={filters.searchQuery ? actions.clearSearch : undefined}
            />
          ) : (
            <ProductGrid products={products} />
          )}
        </section>

        {/* Pagination */}
        {isPaginated && !loading && !error && products.length > 0 && (
          <Pagination
            currentPage={filters.page}
            totalItems={total}
            itemsPerPage={limit}
            onPageChange={actions.setPage}
          />
        )}
      </div>
    </main>
  );
}

function formatCategoryName(category) {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}