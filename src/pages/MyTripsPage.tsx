
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { TripCard } from "@/components/trips/TripCard";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { 
  CalendarOff, 
  CheckCircle, 
  ClockIcon, 
  Compass, 
  MapPin 
} from "lucide-react";

interface Trip {
  id: number;
  image: string;
  fallbackImage: string;
  title: string;
  date: string;
  completed?: boolean;
}

const MyTripsPage = () => {
  const [completedTrips, setCompletedTrips] = useState<Trip[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  
  useEffect(() => {
    const loadTrips = () => {
      const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      
      const today = new Date();
      const completed: Trip[] = [];
      const upcoming: Trip[] = [];
      
      savedBookings.forEach((booking: any) => {
        // Parse the date from various formats
        let tripDate: Date;
        if (booking.date) {
          // Handle formats like "01-04 July 2022" or "dd-MM yyyy"
          const dateParts = booking.date.split(' ');
          if (dateParts.length > 1) {
            // Format: "01-04 July 2022"
            const dayRange = dateParts[0].split('-');
            const endDay = dayRange.length > 1 ? parseInt(dayRange[1]) : parseInt(dayRange[0]);
            const month = dateParts[1];
            const year = dateParts[2] || new Date().getFullYear().toString();
            tripDate = new Date(`${endDay} ${month} ${year}`);
          } else {
            // Format: "dd-MM yyyy"
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
        
        const trip: Trip = {
          id: booking.id || Date.now(),
          image: booking.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          fallbackImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          title: booking.title || booking.destination || "Trip",
          date: booking.date || format(new Date(), "dd-MM yyyy"),
          completed: isBefore(tripDate, today)
        };
        
        if (isBefore(tripDate, today)) {
          completed.push(trip);
        } else {
          upcoming.push(trip);
        }
      });
      
      // Sort by most recent first
      completed.sort((a, b) => b.id - a.id);
      upcoming.sort((a, b) => a.id - b.id);
      
      setCompletedTrips(completed);
      setUpcomingTrips(upcoming);
    };
    
    loadTrips();
    
    window.addEventListener('storage', loadTrips);
    window.addEventListener('bookingUpdated', loadTrips);
    
    return () => {
      window.removeEventListener('storage', loadTrips);
      window.removeEventListener('bookingUpdated', loadTrips);
    };
  }, []);
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">My Trips</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <ClockIcon className="mr-2 text-blue-500" />
                <h2 className="text-xl font-semibold dark:text-white">Upcoming Trips</h2>
              </div>
              
              <div className="space-y-4">
                {upcomingTrips.length > 0 ? (
                  upcomingTrips.map(trip => (
                    <div key={trip.id} className="flex items-start gap-4">
                      <TripCard
                        image={trip.image}
                        fallbackImage={trip.fallbackImage}
                        title={trip.title}
                        date={trip.date}
                      />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <CalendarOff className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <h3 className="font-medium text-gray-600 dark:text-gray-300">No upcoming trips</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Book a new adventure from the booking page
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="mr-2 text-green-500" />
                <h2 className="text-xl font-semibold dark:text-white">Completed Trips</h2>
              </div>
              
              <div className="space-y-4">
                {completedTrips.length > 0 ? (
                  completedTrips.slice(0, 5).map(trip => (
                    <div key={trip.id} className="flex items-start gap-4">
                      <div className="relative w-full">
                        <TripCard
                          image={trip.image}
                          fallbackImage={trip.fallbackImage}
                          title={trip.title}
                          date={trip.date}
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Completed
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <MapPin className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <h3 className="font-medium text-gray-600 dark:text-gray-300">No completed trips yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Your travel history will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {completedTrips.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Compass className="mr-2 text-purple-500" />
              <h2 className="text-xl font-semibold dark:text-white">Your Travel Statistics</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">Total Trips</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {completedTrips.length + upcomingTrips.length}
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                <h3 className="text-lg font-medium text-green-700 dark:text-green-300">Completed</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {completedTrips.length}
                </p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-center">
                <h3 className="text-lg font-medium text-amber-700 dark:text-amber-300">Upcoming</h3>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">
                  {upcomingTrips.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTripsPage;
