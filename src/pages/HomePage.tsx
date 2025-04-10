import { DashboardLayout } from "@/components/layout/Dashboard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Calendar } from "@/components/calendar/Calendar";
import { TripCard } from "@/components/trips/TripCard";
import { BookingChart } from "@/components/dashboard/BookingChart";
import { PopularRoomsCarousel } from "@/components/rooms/PopularRoomsCarousel";
import { useEffect, useState } from "react";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { useNavigate } from "react-router-dom";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import { isAfter, isBefore, parseISO } from "date-fns";

const popularRooms = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    title: "City View",
    location: "Shimane Villa",
    price: 199
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    title: "Classic Room",
    location: "Shimane Villa",
    price: 199
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    title: "Greecevillage",
    location: "Shimane Villa",
    price: 199
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    title: "Mountain View Suite",
    location: "Alpine Retreat",
    price: 299
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    title: "Ocean Front Villa",
    location: "Coastal Resort",
    price: 399
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    title: "Luxury Penthouse",
    location: "Downtown Heights",
    price: 499
  }
];

const defaultTrips = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    title: "Aling Waterfall",
    date: "01-04 July 2022"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1601581875039-e899893d520c?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
    title: "Prager Wildsee",
    date: "12-19 July 2022"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1502636621341-4846e29a3496?auto=format&fit=crop&w=600&h=350",
    fallbackImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=600&h=350",
    title: "Grouste Vista",
    date: "07-12 August 2022"
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const { userName, formatPrice, translate, initializeTranslations } = useUserPreferences();
  const [translationsReady, setTranslationsReady] = useState(false);
  const [scheduledTrips, setScheduledTrips] = useState(defaultTrips);

  useEffect(() => {
    initializeTranslations();
    setTranslationsReady(true);
    
    const loadBookings = () => {
      const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      if (savedBookings.length > 0) {
        const today = new Date();
        
        const upcomingBookings = savedBookings.filter((booking: any) => {
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
        
        if (upcomingBookings.length > 0) {
          const bookingTrips = upcomingBookings.map((booking: any) => ({
            id: booking.id || Date.now() + Math.random(),
            image: booking.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
            fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
            title: booking.title || booking.destination || "New Booking",
            date: booking.date || new Date().toLocaleDateString()
          }));
          
          bookingTrips.sort((a: any, b: any) => b.id - a.id);
          setScheduledTrips(bookingTrips.slice(0, 3));
        } else {
          const completedBookings = savedBookings.filter((booking: any) => {
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
          
          if (completedBookings.length > 0) {
            const completedTrips = completedBookings.map((booking: any) => ({
              id: booking.id || Date.now() + Math.random(),
              image: booking.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
              fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
              title: booking.title || booking.destination || "New Booking",
              date: booking.date || new Date().toLocaleDateString(),
              completed: true
            }));
            
            completedTrips.sort((a: any, b: any) => b.id - a.id);
            setScheduledTrips(completedTrips.slice(0, 3));
          } else {
            setScheduledTrips(defaultTrips);
          }
        }
      } else {
        setScheduledTrips(defaultTrips);
      }
    };

    loadBookings();

    window.addEventListener('storage', loadBookings);
    window.addEventListener('bookingUpdated', loadBookings);
    
    return () => {
      window.removeEventListener('storage', loadBookings);
      window.removeEventListener('bookingUpdated', loadBookings);
    };
  }, [initializeTranslations]);

  useEffect(() => {
    const checkForBookingUpdates = () => {
      const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      if (savedBookings.length > 0) {
        const today = new Date();
        
        const upcomingBookings = savedBookings.filter((booking: any) => {
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
        
        if (upcomingBookings.length > 0) {
          const bookingTrips = upcomingBookings.map((booking: any) => ({
            id: booking.id || Date.now() + Math.random(),
            image: booking.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
            fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=350",
            title: booking.title || booking.destination || "New Booking",
            date: booking.date || new Date().toLocaleDateString()
          }));
          
          bookingTrips.sort((a: any, b: any) => b.id - a.id);
          setScheduledTrips(bookingTrips.slice(0, 3));
        }
      }
    };
    
    checkForBookingUpdates();
    const interval = setInterval(checkForBookingUpdates, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query: string) => {
    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
    }
  };

  const getTranslation = (key: string, fallback: string): string => {
    if (!translationsReady) {
      return fallback;
    }
    return translate(key) || fallback;
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 dark:text-white" data-i18n-key="welcome">
          {getTranslation('welcome', 'Welcome to Voyage Vista')}{userName ? `, ${userName}` : ''}
        </h1>
      </div>
      
      <div className="mb-8">
        <SearchSuggestions 
          placeholder={getTranslation('search', 'Search destinations, places...')}
          className="max-w-2xl"
          onSearch={handleSearch}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title={getTranslation('totalSales', 'Total Sales')}
          value={formatPrice(120900)}
          change={{ value: "12%", positive: true }}
          subtitle={`+${formatPrice(1900)} ${getTranslation('today', 'today')}`}
        />
        <StatsCard
          title={getTranslation('totalOrders', 'Total Orders')}
          value="30,000"
          change={{ value: "20%", positive: true }}
          subtitle={`+2,890 ${getTranslation('today', 'today')}`}
        />
        <StatsCard
          title={getTranslation('visitor', 'Visitor')}
          value="20,000"
          change={{ value: "4%", positive: false }}
          subtitle={`-900 ${getTranslation('today', 'today')}`}
        />
        <StatsCard
          title={getTranslation('refunded', 'Refunded')}
          value={formatPrice(3000)}
          change={{ value: "15%", positive: true }}
          subtitle={getTranslation('today', 'today')}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold mb-4 dark:text-white" data-i18n-key="popularRooms">
            {getTranslation('popularRooms', 'Popular Rooms')}
          </h2>
          <PopularRoomsCarousel rooms={popularRooms} />
        </div>
        
        <div className="dark:bg-gray-800 dark:text-white rounded-lg p-2">
          <Calendar />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 dark:bg-gray-800 dark:text-white p-4 rounded-lg">
          <BookingChart className="animate-fade-in" />
        </div>
        
        <div className="dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4 dark:text-white" data-i18n-key="mySchedule">
            {getTranslation('mySchedule', 'My Schedule')}
          </h2>
          <div className="space-y-3">
            {scheduledTrips.length > 0 ? (
              scheduledTrips.map(trip => (
                <div key={trip.id} className="relative">
                  <TripCard
                    key={trip.id}
                    image={trip.image}
                    fallbackImage={trip.fallbackImage}
                    title={trip.title}
                    date={trip.date}
                  />
                  {trip.completed && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Completed
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No scheduled trips yet
              </div>
            )}
          </div>
          {scheduledTrips.length > 0 && (
            <div className="mt-4 text-center">
              <Button 
                onClick={() => navigate("/mytrips")}
                variant="outline" 
                size="sm"
                className="text-xs"
              >
                View All My Trips
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
