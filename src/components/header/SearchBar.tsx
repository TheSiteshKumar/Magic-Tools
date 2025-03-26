import React, { useState } from 'react';
import { Search, Delete } from 'lucide-react';

export const SearchBar = () => {
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full max-w-md group">
      {/* Persistent Search Icon */}
      <div className="absolute inset-y-0 left-3 flex items-center">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* Clear Button without Background */}
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          <Delete className="h-5 w-5 text-gray-400 hover:text-gray-600 
                           transition-colors duration-200" />
        </button>
      )}

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="w-full h-12 pl-10 pr-10 text-base bg-white border-2 border-gray-200 rounded-lg
                   placeholder-gray-400 placeholder:text-base
                   hover:border-gray-300
                   focus:border-indigo-400 
                   focus:outline-none 
                   transition-all duration-200"
        placeholder="Search tools..."
      />
    </div>
  );
};