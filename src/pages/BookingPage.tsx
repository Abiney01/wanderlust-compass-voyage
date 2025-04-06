
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Search, MapPin, Users, CreditCard, CheckCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState<Date>();
  const [searchResults, setSearchResults] = useState(popularDestinations);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<typeof popularDestinations[0] | null>(null);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Parse URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destParam = params.get("destination");
    const dateParam = params.get("date");
    const guestsParam = params.get("guests");
    const roomIdParam = params.get("roomId");
    
    if (destParam) {
      const found = popularDestinations.find(d => d.id === Number(destParam));
      if (found) {
        setDestination(found.name);
        setSelectedDestination(found);
      }
    }
    
    if (dateParam) {
      setDate(new Date(dateParam));
    }
    
    if (guestsParam) {
      setGuests(Number(guestsParam));
    }
    
    if (roomIdParam) {
      setShowSearchResults(true);
      setHasSearched(true);
      // Handle room ID if needed
    }
  }, [location]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter destinations
    const filtered = destination ? 
      popularDestinations.filter(dest => 
        dest.name.toLowerCase().includes(destination.toLowerCase())
      ) : popularDestinations;
    
    setSearchResults(filtered.length > 0 ? filtered : popularDestinations);
    setHasSearched(true);
    setShowSearchResults(true);
    
    if (filtered.length === 0) {
      toast.info("No destinations found, showing all available options");
    } else {
      toast.success("Search results updated");
    }
  };
  
  const handleBookNow = (item: typeof popularDestinations[0]) => {
    setSelectedDestination(item);
    setShowBookingModal(true);
  };
  
  const completeBooking = () => {
    setIsBookingComplete(true);
    
    // Reset after showing success for 2 seconds
    setTimeout(() => {
      setShowBookingModal(false);
      setIsBookingComplete(false);
      toast.success(`Booking for ${selectedDestination?.name} confirmed!`);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold mb-6 dark:text-white">Book Your Next Adventure</h1>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="pl-10 dark:bg-gray-700 dark:text-white"
              />
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal dark:bg-gray-700 dark:text-white dark:border-gray-600",
                      !date && "text-muted-foreground dark:text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 dark:bg-gray-800">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="dark:bg-gray-800"
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
                className="pl-10 dark:bg-gray-700 dark:text-white"
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
        
        {showSearchResults && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Available Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((destination) => (
                <div 
                  key={destination.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-105 hover:shadow-md cursor-pointer group"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                      onClick={() => navigate(`/explore/destinations/${destination.id}`)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold dark:text-white">{destination.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">${destination.price}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">per person</span>
                    </div>
                    <Button 
                      className="w-full mt-3 transition-colors hover:bg-blue-600"
                      onClick={() => handleBookNow(destination)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!hasSearched && (
          <div className="text-center py-12">
            <h3 className="text-xl mb-2 dark:text-white">Find Your Perfect Destination</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Search above to discover our available destinations</p>
            <img 
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Travel" 
              className="max-w-md mx-auto rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
      
      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-[500px] dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="dark:text-white">
              {isBookingComplete ? "Booking Confirmed!" : "Complete Your Booking"}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              {isBookingComplete 
                ? "Your booking has been successfully processed." 
                : `Please provide payment details to book ${selectedDestination?.name}.`
              }
            </DialogDescription>
          </DialogHeader>
          
          {isBookingComplete ? (
            <div className="flex flex-col items-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <p className="text-lg font-medium dark:text-white">Thank you for your booking!</p>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
                A confirmation has been sent to your email.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                <div className="flex items-center justify-between dark:text-white">
                  <span>Destination:</span>
                  <span className="font-medium">{selectedDestination?.name}</span>
                </div>
                <div className="flex items-center justify-between dark:text-white">
                  <span>Date:</span>
                  <span className="font-medium">{date ? format(date, "PPP") : "Not selected"}</span>
                </div>
                <div className="flex items-center justify-between dark:text-white">
                  <span>Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex items-center justify-between dark:text-white">
                  <span>Price per person:</span>
                  <span className="font-medium">${selectedDestination?.price}</span>
                </div>
                <div className="flex items-center justify-between font-bold dark:text-white">
                  <span>Total:</span>
                  <span>${selectedDestination ? selectedDestination.price * guests : 0}</span>
                </div>
                
                <div className="border-t pt-4 mt-2 dark:border-gray-700">
                  <h4 className="font-medium mb-2 dark:text-white">Payment Details</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">Card Number</label>
                      <div className="flex border rounded-md dark:border-gray-600">
                        <div className="flex items-center px-3 border-r dark:border-gray-600">
                          <CreditCard size={16} className="text-gray-400" />
                        </div>
                        <Input className="border-0 dark:bg-gray-700 dark:text-white" placeholder="4242 4242 4242 4242" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">Expiry</label>
                        <Input placeholder="MM/YY" className="dark:bg-gray-700 dark:text-white" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">CVC</label>
                        <Input placeholder="123" className="dark:bg-gray-700 dark:text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">Name on Card</label>
                      <Input placeholder="John Doe" className="dark:bg-gray-700 dark:text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowBookingModal(false)}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  Cancel
                </Button>
                <Button onClick={completeBooking}>
                  Complete Booking
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BookingPage;
