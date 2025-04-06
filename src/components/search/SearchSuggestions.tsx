
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Sample destinations data - in a real app this would come from an API
const allDestinations = [
  { id: 1, name: "Bali, Indonesia", type: "Beach" },
  { id: 2, name: "Paris, France", type: "City" },
  { id: 3, name: "Tokyo, Japan", type: "City" },
  { id: 4, name: "New York, USA", type: "City" },
  { id: 5, name: "Santorini, Greece", type: "Beach" },
  { id: 6, name: "Cairo, Egypt", type: "Historical" },
  { id: 7, name: "Bangkok, Thailand", type: "City" },
  { id: 8, name: "Sydney, Australia", type: "Coastal" },
  { id: 9, name: "Dubai, UAE", type: "Modern" },
  { id: 10, name: "London, UK", type: "City" }
];

interface SearchSuggestionsProps {
  placeholder?: string;
  className?: string;
}

export function SearchSuggestions({ placeholder = "Search destinations...", className }: SearchSuggestionsProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof allDestinations>([]);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allDestinations.filter(destination => 
        destination.name.toLowerCase().includes(query.toLowerCase())
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
    }
  };

  const handleSuggestionClick = (destination: { id: number; name: string }) => {
    setQuery(destination.name);
    setShowSuggestions(false);
    navigate(`/explore/destinations/${destination.id}`);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="flex">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-10 w-full"
            onFocus={() => query && setShowSuggestions(true)}
          />
        </div>
        <Button type="submit" className="ml-2">
          Search
        </Button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {suggestions.map((destination) => (
            <div
              key={destination.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(destination)}
            >
              <MapPin size={16} className="mr-2 text-blue-500" />
              <div>
                <div>{destination.name}</div>
                <div className="text-xs text-gray-500">{destination.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
