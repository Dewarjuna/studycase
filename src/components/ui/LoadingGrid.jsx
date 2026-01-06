export default function LoadingGrid({ count = 12 }) {
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      aria-label="Loading products"
      role="status"
    >
      {Array.from({ length: count }, (_, i) => (
        <div 
          key={i}
          className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
        >
          <div className="aspect-square bg-gray-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading products...</span>
    </div>
  );
}