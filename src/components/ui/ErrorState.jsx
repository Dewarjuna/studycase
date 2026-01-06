
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div 
      className="flex flex-col items-center justify-center py-16 px-4"
      role="alert"
    >
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <p className="text-lg text-gray-900 font-medium mb-2">Something went wrong</p>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white 
                     rounded-lg hover:bg-teal-700 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
}