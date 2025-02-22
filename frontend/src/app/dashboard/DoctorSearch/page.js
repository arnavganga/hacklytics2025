'use client';
import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with your actual data or API call
  const samplePeople = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager' },
  ];

  // Simulated search function - replace with actual API call
  const searchPeople = (query) => {
    return samplePeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.email.toLowerCase().includes(query.toLowerCase()) ||
      person.role.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((term) => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const searchResults = searchPeople(term);
        setResults(searchResults);
        setIsLoading(false);
      }, 300);
    }, 300),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) {
      debouncedSearch(value);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Search</h1>
          <p className="mt-2 text-gray-600">Search for doctor by name</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Start typing to search..."
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-4 text-center text-gray-600">
            Searching...
          </div>
        )}

        {/* Results */}
        {!isLoading && results.length > 0 && (
          <div className="mt-6 bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {results.map((person) => (
                <li key={person.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-blue-600">{person.name}</p>
                      <p className="text-sm text-gray-500">{person.email}</p>
                      <p className="text-sm text-gray-500">{person.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No Results */}
        {!isLoading && searchTerm.length >= 2 && results.length === 0 && (
          <div className="mt-4 text-center text-gray-600">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;