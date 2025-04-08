
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import { searchPlaces, PlaceResult } from "@/services/placesApi";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchSuggestionsProps {
  placeholder?: string;
  className?: string;
  onlySearchInExplore?: boolean;
  onSearch?: (query: string) => void;
}

export function SearchSuggestions({ 
  placeholder = "Search destinations, places...", 
  className = "", 
  onlySearchInExplore = false,
  onSearch
}: SearchSuggestionsProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { translate } = useUserPreferences();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const results = await searchPlaces(debouncedQuery);
        setSuggestions(results);
        if (results.length > 0) {
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlaces();
  }, [debouncedQuery]);

  useEffect(() => {
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
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/explore?search=${encodeURIComponent(query)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/explore?search=${encodeURIComponent(query)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (place: PlaceResult) => {
    setQuery(`${place.name}, ${place.location}`);
    setShowSuggestions(false);
    
    // Find matching destination in the available destinations from ExplorePage
    // We need to make sure we're navigating to a destination that exists
    try {
      // Navigate to the explore page with search parameter instead of directly to details
      // This ensures the user can see results even if exact ID match isn't found
      navigate(`/explore?search=${encodeURIComponent(place.name)}`);
    } catch (error) {
      console.error("Error navigating to destination:", error);
    }
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
            placeholder={translate('searchPlaceholder') || "Search destinations, places..."}
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
                setSuggestions([]);
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <Button type="submit" className="ml-2">
          Search
        </Button>
      </form>
      
      {isLoading && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-4 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {translate('searching')}...
        </div>
      )}
      
      {showSuggestions && suggestions.length > 0 && !isLoading && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto dark:bg-gray-700 dark:border-gray-600">
          {suggestions.map((place) => (
            <div
              key={place.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center dark:hover:bg-gray-600 dark:text-white"
              onClick={() => handleSuggestionClick(place)}
            >
              <MapPin size={16} className="mr-2 text-blue-500" />
              <div>
                <div>{place.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{place.location} • {place.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showSuggestions && suggestions.length === 0 && query.length > 0 && !isLoading && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-4 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          No destinations found matching "{query}"
        </div>
      )}
    </div>
  );
}
