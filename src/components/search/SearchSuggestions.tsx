
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Extended destinations data for better search results
const allDestinations = [
  { id: 1, name: "Bali", location: "Indonesia", type: "Beach" },
  { id: 2, name: "Paris", location: "France", type: "City" },
  { id: 3, name: "Tokyo", location: "Japan", type: "City" },
  { id: 4, name: "New York", location: "USA", type: "City" },
  { id: 5, name: "Santorini", location: "Greece", type: "Beach" },
  { id: 6, name: "Cairo", location: "Egypt", type: "Historical" },
  { id: 7, name: "Bangkok", location: "Thailand", type: "City" },
  { id: 8, name: "Sydney", location: "Australia", type: "Coastal" },
  { id: 9, name: "Dubai", location: "UAE", type: "Modern" },
  { id: 10, name: "London", location: "UK", type: "City" },
  { id: 11, name: "Grand Canyon", location: "Arizona, USA", type: "Nature" },
  { id: 12, name: "Eiffel Tower", location: "Paris, France", type: "Landmark" },
  { id: 13, name: "Bora Bora", location: "French Polynesia", type: "Beach" },
  { id: 14, name: "Kyoto Temples", location: "Kyoto, Japan", type: "Cultural" },
  { id: 15, name: "Northern Lights", location: "Iceland", type: "Nature" },
  { id: 16, name: "Colosseum", location: "Rome, Italy", type: "Landmark" },
  { id: 17, name: "Great Barrier Reef", location: "Queensland, Australia", type: "Beach" },
  { id: 18, name: "Machu Picchu", location: "Cusco, Peru", type: "Cultural" },
  { id: 19, name: "Taj Mahal", location: "Agra, India", type: "Landmark" },
  { id: 20, name: "Petra", location: "Jordan", type: "Historical" }
];

interface SearchSuggestionsProps {
  placeholder?: string;
  className?: string;
  onlySearchInExplore?: boolean;
}

export function SearchSuggestions({ 
  placeholder = "Search destinations...", 
  className = "", 
  onlySearchInExplore = false 
}: SearchSuggestionsProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof allDestinations>([]);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const searchLower = query.toLowerCase();
      const filtered = allDestinations.filter(destination => 
        destination.name.toLowerCase().includes(searchLower) ||
        destination.location.toLowerCase().includes(searchLower) ||
        destination.type.toLowerCase().includes(searchLower)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (destination: { id: number; name: string; location: string }) => {
    setQuery(`${destination.name}, ${destination.location}`);
    setShowSuggestions(false);
    
    // Navigate to destination details page instead of just search results
    navigate(`/explore/destinations/${destination.id}?name=${encodeURIComponent(destination.name)}&location=${encodeURIComponent(destination.location)}`);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="flex">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-10 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onFocus={() => query && setShowSuggestions(true)}
          />
          {query && (
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              ×
            </button>
          )}
        </div>
        <Button type="submit" className="ml-2">
          Search
        </Button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto dark:bg-gray-700 dark:border-gray-600">
          {suggestions.map((destination) => (
            <div
              key={destination.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center dark:hover:bg-gray-600 dark:text-white"
              onClick={() => handleSuggestionClick(destination)}
            >
              <MapPin size={16} className="mr-2 text-blue-500" />
              <div>
                <div>{destination.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{destination.location} • {destination.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showSuggestions && suggestions.length === 0 && query.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-4 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          No destinations found matching "{query}"
        </div>
      )}
    </div>
  );
}
