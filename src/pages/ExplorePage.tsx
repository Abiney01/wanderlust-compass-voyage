
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";

// More comprehensive destinations data
const destinations = [
  {
    id: 1,
    name: "Grand Canyon",
    location: "Arizona, USA",
    image: "https://images.unsplash.com/photo-1575407371544-9d386af95330?auto=format&fit=crop&w=600&h=350",
    rating: 4.8,
    category: "nature",
    description: "One of the most spectacular natural wonders of the world."
  },
  {
    id: 2,
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&h=350",
    rating: 4.7,
    category: "landmark",
    description: "Iconic symbol of Paris and one of the most famous structures in the world."
  },
  {
    id: 3,
    name: "Bora Bora",
    location: "French Polynesia",
    image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&w=600&h=350",
    rating: 4.9,
    category: "beach",
    description: "A small South Pacific island northwest of Tahiti with stunning turquoise lagoons."
  },
  {
    id: 4,
    name: "Kyoto Temples",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&h=350",
    rating: 4.6,
    category: "cultural",
    description: "Historic city known for its numerous classical Buddhist temples and gardens."
  },
  {
    id: 5,
    name: "Northern Lights",
    location: "Iceland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&h=350",
    rating: 5.0,
    category: "nature",
    description: "Natural light display in the Earth's sky, predominantly seen in high-latitude regions."
  },
  {
    id: 6,
    name: "Colosseum",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&h=350",
    rating: 4.5,
    category: "landmark",
    description: "Ancient amphitheatre in the center of Rome and one of Italy's most popular tourist attractions."
  },
  {
    id: 7,
    name: "Great Barrier Reef",
    location: "Queensland, Australia",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=600&h=350",
    rating: 4.8,
    category: "beach",
    description: "World's largest coral reef system composed of over 2,900 individual reefs."
  },
  {
    id: 8,
    name: "Machu Picchu",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=600&h=350",
    rating: 4.9,
    category: "cultural",
    description: "15th-century Inca citadel situated on a mountain ridge above the Sacred Valley."
  },
  {
    id: 9,
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&h=350",
    rating: 4.7,
    category: "beach",
    description: "Famous for its stunning white buildings with blue domes overlooking the sea."
  },
  {
    id: 10,
    name: "Mount Fuji",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=600&h=350",
    rating: 4.9,
    category: "nature",
    description: "Japan's highest mountain and an active volcano, known for its perfectly symmetrical cone."
  },
  {
    id: 11,
    name: "Taj Mahal",
    location: "Agra, India",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&h=350",
    rating: 4.8,
    category: "landmark",
    description: "An ivory-white marble mausoleum built by Emperor Shah Jahan in memory of his wife."
  },
  {
    id: 12,
    name: "Petra",
    location: "Jordan",
    image: "https://images.unsplash.com/photo-1579606032821-4e6634c3e454?auto=format&fit=crop&w=600&h=350",
    rating: 4.8,
    category: "historical",
    description: "Ancient city famous for its rock-cut architecture and water conduit system."
  }
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
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
    const destination = destinations.find(d => d.id === destinationId);
    if (destination) {
      setSelectedDestination(destination);
      setShowDetailsDialog(true);
    } else {
      navigate(`/explore/destinations/${destinationId}`);
    }
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
          <h1 className="text-2xl font-bold dark:text-white">Explore Amazing Destinations</h1>
          <SearchSuggestions className="w-full md:w-64" />
        </div>
        
        <Tabs value={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="mb-6 w-full md:w-auto bg-white dark:bg-gray-800 flex flex-wrap">
            <TabsTrigger value="all" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
              All Destinations
            </TabsTrigger>
            <TabsTrigger value="nature" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
              Nature
            </TabsTrigger>
            <TabsTrigger value="landmark" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
              Landmarks
            </TabsTrigger>
            <TabsTrigger value="beach" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
              Beaches
            </TabsTrigger>
            <TabsTrigger value="cultural" className="transition-all data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
              Cultural
            </TabsTrigger>
          </TabsList>
          
          {["all", "nature", "landmark", "beach", "cultural"].map((tab) => (
            <TabsContent key={tab} value={tab} className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredDestinations.map((destination) => (
                  <div 
                    key={destination.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        onClick={() => handleViewDetails(destination.id)}
                        loading="lazy"
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
                        <h3 className="font-semibold dark:text-white" onClick={() => handleViewDetails(destination.id)}>{destination.name}</h3>
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-sm ml-1 dark:text-gray-300">{destination.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        {destination.location}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
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
      
      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px] dark:bg-gray-800">
          {selectedDestination && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl dark:text-white">{selectedDestination.name}</DialogTitle>
                <DialogDescription className="dark:text-gray-300">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 text-blue-500" />
                    {selectedDestination.location}
                    <div className="ml-4 flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm ml-1">{selectedDestination.rating}/5.0</span>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <div className="my-4 relative h-64 overflow-hidden rounded-md">
                <img 
                  src={selectedDestination.image} 
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <button 
                  onClick={() => toggleFavorite(selectedDestination.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart 
                    size={18} 
                    className={cn(
                      "transition-colors",
                      favorites.includes(selectedDestination.id) 
                        ? "fill-red-500 text-red-500" 
                        : "text-gray-500"
                    )} 
                  />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedDestination.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Activities</h3>
                  <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                    <li>Local guided tours</li>
                    <li>Cultural experiences</li>
                    <li>Scenic photography spots</li>
                    <li>Local cuisine sampling</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Best Time to Visit</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedDestination.category === 'beach' && 'May to September - Warm weather and less rainfall'}
                    {selectedDestination.category === 'nature' && 'April to October - Pleasant temperatures for outdoor activities'}
                    {selectedDestination.category === 'landmark' && 'Year-round, though spring and fall offer mild weather and fewer crowds'}
                    {selectedDestination.category === 'cultural' && 'March to May or September to November - Comfortable weather and cultural festivals'}
                  </p>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetailsDialog(false)}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  Close
                </Button>
                <Button onClick={() => {
                  setShowDetailsDialog(false);
                  navigate(`/booking?destination=${encodeURIComponent(selectedDestination.name)}&location=${encodeURIComponent(selectedDestination.location)}&id=${selectedDestination.id}`);
                }}>
                  Book This Destination
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default ExplorePage;
