
import { DashboardLayout } from "@/components/layout/Dashboard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Calendar } from "@/components/calendar/Calendar";
import { TripCard } from "@/components/trips/TripCard";
import { BookingChart } from "@/components/dashboard/BookingChart";
import { PopularRoomsCarousel } from "@/components/rooms/PopularRoomsCarousel";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";

// Expanded popular rooms data
const popularRooms = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    title: "City View",
    location: "Shimane Villa",
    price: 199
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    title: "Classic Room",
    location: "Shimane Villa",
    price: 199
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
    title: "Greecevillage",
    location: "Shimane Villa",
    price: 199
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    title: "Mountain View Suite",
    location: "Alpine Retreat",
    price: 299
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    title: "Ocean Front Villa",
    location: "Coastal Resort",
    price: 399
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    title: "Luxury Penthouse",
    location: "Downtown Heights",
    price: 499
  }
];

const scheduledTrips = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d",
    title: "Aling Waterfall",
    date: "01-04 July 2022"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1601581875039-e899893d520c",
    title: "Prager Wildsee",
    date: "12-19 July 2022"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1502636621341-4846e29a3496",
    title: "Grouste Vista",
    date: "07-12 August 2022"
  }
];

const HomePage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Find Your Next Destination</h1>
        <SearchSuggestions className="max-w-lg" />
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Sales"
          value="$120,900"
          change={{ value: "12%", positive: true }}
          subtitle="+$1,900 today"
        />
        <StatsCard
          title="Total Orders"
          value="30,000"
          change={{ value: "20%", positive: true }}
          subtitle="+2,890 today"
        />
        <StatsCard
          title="Visitor"
          value="20,000"
          change={{ value: "4%", positive: false }}
          subtitle="-900 today"
        />
        <StatsCard
          title="Refunded"
          value="$3,000"
          change={{ value: "15%", positive: true }}
          subtitle="today"
        />
      </div>
      
      {/* Popular Rooms and Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Popular Rooms - Taking 2/3 of the width */}
        <div className="lg:col-span-2">
          <PopularRoomsCarousel rooms={popularRooms} />
        </div>
        
        {/* Calendar - Taking 1/3 of the width */}
        <div>
          <Calendar />
        </div>
      </div>
      
      {/* Booking Stats and My Schedule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Booking Chart - Taking 2/3 of the width */}
        <div className="lg:col-span-2">
          <BookingChart className="animate-fade-in" />
        </div>
        
        {/* My Schedule - Taking 1/3 of the width */}
        <div>
          <h2 className="text-lg font-bold mb-4">My Schedule</h2>
          <div className="space-y-3">
            {scheduledTrips.map(trip => (
              <TripCard
                key={trip.id}
                image={trip.image}
                title={trip.title}
                date={trip.date}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
