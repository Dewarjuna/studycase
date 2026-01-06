import { Package } from 'lucide-react';

export default function EmptyState({ message, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Package className="h-12 w-12 text-gray-400 mb-4" />
      <p className="text-lg text-gray-600 text-center mb-4">{message}</p>
      {onClear && (
        <button
          onClick={onClear}
          className="text-teal-600 hover:text-teal-700 font-medium 
                     focus:outline-none focus:underline"
        >
          Clear search
        </button>
      )}
    </div>
  );
}