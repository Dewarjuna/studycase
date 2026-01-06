import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear }) {
  const [localValue, setLocalValue] = useState(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onClear();
    inputRef.current?.focus();
  }, [onClear]);

  return (
    <div className="relative flex-1 max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      
      <input
        ref={inputRef}
        type="search"
        value={localValue}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Escape' && handleClear()}
        placeholder="Search products..."
        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg
                   bg-white text-gray-900 placeholder-gray-500 text-sm
                   focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                   transition-shadow"
      />
      
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}