
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Search, MapPin, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const popularDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    price: 899
  },
  {
    id: 2,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    price: 1299
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc",
    price: 1499
  },
  {
    id: 4,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
    price: 1099
  }
];

const BookingPage = () => {
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState<Date>();
  const [searchResults, setSearchResults] = useState(popularDestinations);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would fetch results from an API
    // For this example, we'll just filter the popular destinations
    const filtered = popularDestinations.filter(dest => 
      dest.name.toLowerCase().includes(destination.toLowerCase())
    );
    setSearchResults(filtered.length > 0 ? filtered : popularDestinations);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">Book Your Next Adventure</h1>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="relative">
              <Input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                placeholder="Guests"
                className="pl-10"
              />
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            
            <Button 
              type="submit" 
              className="transition-transform hover:scale-105"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Available Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((destination) => (
              <div 
                key={destination.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-105 hover:shadow-md cursor-pointer group"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{destination.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold">${destination.price}</span>
                    <span className="text-sm text-gray-500">per person</span>
                  </div>
                  <Button className="w-full mt-3 transition-colors hover:bg-blue-600">Book Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookingPage;
