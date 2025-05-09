import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Search, MapPin, Users, CreditCard, CheckCircle, Calendar, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isAfter, isBefore } from "date-fns";
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
import { useUserPreferences } from "@/context/UserPreferencesContext";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TripCard } from "@/components/trips/TripCard";

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

const allDestinations = [
  { id: 13, name: "Bali", location: "Indonesia", type: "Beach", price: 899, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4" },
  { id: 2, name: "Eiffel Tower", location: "Paris, France", type: "Landmark", price: 1299, image: "https://images.unsplash.com/photo-1439393161192-32360eb753f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWlmZmVsJTIwdG93ZXJ8ZW58MHx8MHx8fDA%3D" },
  { id: 4, name: "Kyoto Temples", location: "Kyoto, Japan", type: "Cultural", price: 1399, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" },
  { id: 3, name: "Bora Bora", location: "French Polynesia", type: "Beach", price: 2199, image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46" },
  { id: 5, name: "Northern Lights", location: "Iceland", type: "Nature", price: 1799, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7" },
  { id: 6, name: "Colosseum", location: "Rome, Italy", type: "Landmark", price: 1099, image: "https://images.unsplash.com/photo-1564507592333-c60657eea523" },
  { id: 7, name: "Great Barrier Reef", location: "Queensland, Australia", type: "Beach", price: 1699, image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5" },
  { id: 8, name: "Machu Picchu", location: "Cusco, Peru", type: "Cultural", price: 1599, image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1" },
  { id: 9, name: "Santorini", location: "Greece", type: "Beach", price: 1099, image: "https://images.unsplash.com/photo-1533105079780-92b9be482077" },
  { id: 10, name: "Mount Fuji", location: "Japan", type: "Nature", price: 1199, image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00" },
  { id: 11, name: "Taj Mahal", location: "Agra, India", type: "Landmark", price: 1299, image: "https://images.unsplash.com/photo-1564507592333-c60657eea523" },
  { id: 12, name: "Petra", location: "Jordan", type: "Historical", price: 1399, image: "https://media.istockphoto.com/id/1418510499/photo/woman-visiting-petra-ancient-city-in-jordan.webp?a=1&b=1&s=612x612&w=0&k=20&c=l4aNVtxk8udoMhqafak-GlnLx76LBX0u3_jR5Re1_Mw=" },
  {
    id: 1,
    name: "Grand Canyon",
    location: "Arizona, USA",
    type: "Nature",
    price: 899,
    image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c"
  }
];

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatPrice } = useUserPreferences();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState<Date>();
  const [searchResults, setSearchResults] = useState(popularDestinations);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<(typeof popularDestinations)[0] | null>(null);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [bookedDestinations, setBookedDestinations] = useState<any[]>([]);
  const [completedTrips, setCompletedTrips] = useState<any[]>([]);
  const [hasUpcomingTrips, setHasUpcomingTrips] = useState(true);
  
  useEffect(() => {
    const loadBookings = () => {
      const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const today = new Date();
      
      const upcoming = savedBookings.filter((booking: any) => {
        let tripDate: Date;
        if (booking.date) {
          const dateParts = booking.date.split(' ');
          if (dateParts.length > 1) {
            const dayRange = dateParts[0].split('-');
            const endDay = dayRange.length > 1 ? parseInt(dayRange[1]) : parseInt(dayRange[0]);
            const month = dateParts[1];
            const year = dateParts[2] || new Date().getFullYear().toString();
            tripDate = new Date(`${endDay} ${month} ${year}`);
          } else {
            const parts = booking.date.split('-');
            if (parts.length === 3) {
              tripDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            } else {
              tripDate = new Date(booking.date);
            }
          }
        } else {
          tripDate = new Date();
        }
        
        return isAfter(tripDate, today);
      });
      
      const completed = savedBookings.filter((booking: any) => {
        let tripDate: Date;
        if (booking.date) {
          const dateParts = booking.date.split(' ');
          if (dateParts.length > 1) {
            const dayRange = dateParts[0].split('-');
            const endDay = dayRange.length > 1 ? parseInt(dayRange[1]) : parseInt(dayRange[0]);
            const month = dateParts[1];
            const year = dateParts[2] || new Date().getFullYear().toString();
            tripDate = new Date(`${endDay} ${month} ${year}`);
          } else {
            const parts = booking.date.split('-');
            if (parts.length === 3) {
              tripDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            } else {
              tripDate = new Date(booking.date);
            }
          }
        } else {
          tripDate = new Date();
        }
        
        return isBefore(tripDate, today);
      });
      
      upcoming.sort((a: any, b: any) => b.id - a.id);
      completed.sort((a: any, b: any) => b.id - a.id);
      
      setHasUpcomingTrips(upcoming.length > 0);
      setBookedDestinations(upcoming.slice(0, 3));
      setCompletedTrips(completed.slice(0, 3));
    };
    
    loadBookings();
    
    window.addEventListener('storage', loadBookings);
    window.addEventListener('bookingUpdated', loadBookings);
    
    return () => {
      window.removeEventListener('storage', loadBookings);
      window.removeEventListener('bookingUpdated', loadBookings);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destParam = params.get("destination");
    const locationParam = params.get("location");
    const dateParam = params.get("date");
    const guestsParam = params.get("guests");
    const idParam = params.get("id");
    
    if (idParam) {
      const foundById = allDestinations.find(d => d.id === Number(idParam));
      if (foundById) {
        setDestination(`${foundById.name}, ${foundById.location}`);
        
        const formattedDestination = {
          id: foundById.id,
          name: `${foundById.name}, ${foundById.location}`,
          image: foundById.image,
          price: foundById.price
        };
        
        setSelectedDestination(formattedDestination);
      }
    } else if (destParam) {
      let displayDest = destParam;
      if (locationParam) {
        displayDest += `, ${locationParam}`;
      }
      setDestination(displayDest);
      
      const foundByName = allDestinations.find(
        d => d.name.toLowerCase() === destParam.toLowerCase() || 
             d.name.toLowerCase().includes(destParam.toLowerCase())
      );
      
      if (foundByName) {
        const formattedDestination = {
          id: foundByName.id,
          name: `${foundByName.name}, ${foundByName.location}`,
          image: foundByName.image,
          price: foundByName.price
        };
        
        setSelectedDestination(formattedDestination);
      }
    }
    
    if (dateParam) {
      setDate(new Date(dateParam));
    }
    
    if (guestsParam) {
      setGuests(Number(guestsParam));
    }
    
    if (destParam || idParam) {
      setHasSearched(true);
      setShowSearchResults(true);
      
      const filtered = allDestinations.filter(dest => {
        if (idParam && dest.id === Number(idParam)) return true;
        if (destParam && (
          dest.name.toLowerCase().includes(String(destParam).toLowerCase()) || 
          dest.location.toLowerCase().includes(String(destParam).toLowerCase())
        )) return true;
        return false;
      });
      
      if (filtered.length > 0) {
        const formattedResults = filtered.map(dest => ({
          id: dest.id,
          name: `${dest.name}, ${dest.location}`,
          image: dest.image,
          price: dest.price
        }));
        
        setSearchResults(formattedResults);
      } else {
        setSearchResults(popularDestinations);
      }
    }
  }, [location.search]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = destination ? 
      allDestinations.filter(dest => 
        `${dest.name}, ${dest.location}`.toLowerCase().includes(destination.toLowerCase())
      ) : [];
    
    const formattedResults = filtered.map(dest => ({
      id: dest.id,
      name: `${dest.name}, ${dest.location}`,
      image: dest.image,
      price: dest.price
    }));
    
    setSearchResults(formattedResults.length > 0 ? formattedResults : popularDestinations);
    setHasSearched(true);
    setShowSearchResults(true);
    
    if (filtered.length === 0 && destination) {
      toast.info("No destinations found, showing all available options");
    } else if (filtered.length > 0) {
      toast.success(`Found ${filtered.length} destinations matching your search`);
    }
  };
  
  const handleBookNow = (item: typeof popularDestinations[0]) => {
    setSelectedDestination(item);
    setShowBookingModal(true);
  };
  
  const completeBooking = () => {
    setIsBookingComplete(true);
    
    const newBooking = {
      id: Date.now(),
      title: selectedDestination?.name || "Unknown Destination",
      image: selectedDestination?.image || "",
      fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
      date: date ? format(date, "dd-MM yyyy") : format(new Date(), "dd-MM yyyy"),
      guests: guests,
      price: selectedDestination?.price || 0,
      destination: selectedDestination?.name || "Unknown Destination",
    };
    
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    
    const allBookings = [newBooking, ...savedBookings];
    const sortedBookings = allBookings.sort((a, b) => b.id - a.id);
    const recentBookings = sortedBookings.slice(0, 3);
    
    setBookedDestinations(recentBookings);
    localStorage.setItem("bookings", JSON.stringify(sortedBookings));
    
    window.dispatchEvent(new Event('bookingUpdated'));
    window.dispatchEvent(new Event('storage'));
    
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
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{formatPrice(destination.price)}</span>
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
        
        {bookedDestinations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 animate-fade-in">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Your Recent Bookings</h2>
            <Table>
              <TableCaption>Your 3 most recent bookings.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookedDestinations.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.title}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.guests || 1}</TableCell>
                    <TableCell className="text-right">{formatPrice(booking.price * (booking.guests || 1))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {!hasUpcomingTrips && completedTrips.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 animate-fade-in">
            <div className="flex items-center mb-4">
              <AlertCircle className="mr-2 text-amber-500" size={20} />
              <h2 className="text-xl font-bold dark:text-white">No Upcoming Trips</h2>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              You don't have any upcoming trips. Here are some of your recent completed trips:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {completedTrips.map((trip) => (
                <div key={trip.id} className="relative">
                  <TripCard
                    image={trip.image}
                    fallbackImage={trip.fallbackImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                    title={trip.title}
                    date={trip.date}
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Completed
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={() => navigate("/mytrips")}
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Calendar size={16} />
                View All My Trips
              </Button>
            </div>
          </div>
        )}
      </div>
      
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
                  <span className="font-medium">{selectedDestination ? formatPrice(selectedDestination.price) : ''}</span>
                </div>
                <div className="flex items-center justify-between font-bold dark:text-white">
                  <span>Total:</span>
                  <span>{selectedDestination ? formatPrice(selectedDestination.price * guests) : 0}</span>
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
