
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, MapPin, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { toast } from "sonner";

const destinations = [
  {
    id: 1,
    name: "Grand Canyon",
    location: "Arizona, USA",
    image: "https://images.unsplash.com/photo-1575407371544-9d386af95330",
    rating: 4.8,
    category: "nature",
    description: "One of the most spectacular natural wonders of the world."
  },
  {
    id: 2,
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e",
    rating: 4.7,
    category: "landmark",
    description: "Iconic symbol of Paris and one of the most famous structures in the world."
  },
  {
    id: 3,
    name: "Bora Bora",
    location: "French Polynesia",
    image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46",
    rating: 4.9,
    category: "beach",
    description: "A small South Pacific island northwest of Tahiti with stunning turquoise lagoons."
  },
  {
    id: 4,
    name: "Kyoto Temples",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    rating: 4.6,
    category: "cultural",
    description: "Historic city known for its numerous classical Buddhist temples and gardens."
  },
  {
    id: 5,
    name: "Northern Lights",
    location: "Iceland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
    rating: 5.0,
    category: "nature",
    description: "Natural light display in the Earth's sky, predominantly seen in high-latitude regions."
  },
  {
    id: 6,
    name: "Colosseum",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    rating: 4.5,
    category: "landmark",
    description: "Ancient amphitheatre in the center of Rome and one of Italy's most popular tourist attractions."
  },
  {
    id: 7,
    name: "Great Barrier Reef",
    location: "Queensland, Australia",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5",
    rating: 4.8,
    category: "beach",
    description: "World's largest coral reef system composed of over 2,900 individual reefs."
  },
  {
    id: 8,
    name: "Machu Picchu",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
    rating: 4.9,
    category: "cultural",
    description: "15th-century Inca citadel situated on a mountain ridge above the Sacred Valley."
  }
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [category, setCategory] = useState<string>("all");
  
  // Get search query from URL if any
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [location.search]);
  
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    
    // Show toast notification
    const destination = destinations.find(d => d.id === id);
    if (destination) {
      const action = favorites.includes(id) ? "removed from" : "added to";
      toast.success(`${destination.name} ${action} favorites`);
    }
  };
  
  const handleViewDetails = (destinationId: number) => {
    navigate(`/explore/destinations/${destinationId}`);
  };
  
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || dest.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold">Explore Amazing Destinations</h1>
          <SearchSuggestions className="w-full md:w-64" />
        </div>
        
        <Tabs value={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="mb-6 w-full md:w-auto bg-white flex flex-wrap">
            <TabsTrigger value="all" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600">
              All Destinations
            </TabsTrigger>
            <TabsTrigger value="nature" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600">
              Nature
            </TabsTrigger>
            <TabsTrigger value="landmark" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600">
              Landmarks
            </TabsTrigger>
            <TabsTrigger value="beach" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600">
              Beaches
            </TabsTrigger>
            <TabsTrigger value="cultural" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600">
              Cultural
            </TabsTrigger>
          </TabsList>
          
          {["all", "nature", "landmark", "beach", "cultural"].map((tab) => (
            <TabsContent key={tab} value={tab} className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredDestinations.map((destination) => (
                  <div 
                    key={destination.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        onClick={() => handleViewDetails(destination.id)}
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(destination.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                      >
                        <Heart 
                          size={18} 
                          className={cn(
                            "transition-colors",
                            favorites.includes(destination.id) 
                              ? "fill-red-500 text-red-500" 
                              : "text-gray-500"
                          )} 
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold" onClick={() => handleViewDetails(destination.id)}>{destination.name}</h3>
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-sm ml-1">{destination.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        {destination.location}
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {destination.description}
                      </p>
                      <Button 
                        className="w-full mt-3 group-hover:bg-blue-600 transition-colors"
                        onClick={() => handleViewDetails(destination.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default ExplorePage;
