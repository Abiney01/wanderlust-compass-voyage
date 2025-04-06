
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Calendar, Users, Star, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const allDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    rating: 4.8,
    price: 899,
    duration: "7 days",
    activities: ["Beach relaxation", "Temple visits", "Water sports", "Cultural shows"],
    weather: "Tropical, warm year-round",
    bestTime: "April to October",
    reviews: [
      { user: "Sarah J.", comment: "Beautiful destination. Loved the beaches and temples.", rating: 5 },
      { user: "Mike T.", comment: "Great food and friendly locals. Will definitely return.", rating: 4.5 }
    ]
  },
  {
    id: 2,
    name: "Paris, France",
    description: "The City of Light draws millions of visitors every year with its unforgettable ambiance. Of course, the divine cuisine and vast art collections deserve some credit as well.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    rating: 4.7,
    price: 1299,
    duration: "5 days",
    activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise", "Notre-Dame Cathedral"],
    weather: "Temperate, four distinct seasons",
    bestTime: "April to June, September to October",
    reviews: [
      { user: "Emily R.", comment: "The most romantic city! Loved every moment.", rating: 5 },
      { user: "David L.", comment: "Excellent food and art. A bit crowded though.", rating: 4 }
    ]
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    description: "A city where ultramodern and traditional blend, from neon-lit skyscrapers to historic temples.",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc",
    rating: 4.9,
    price: 1499,
    duration: "10 days",
    activities: ["Mt. Fuji day trip", "Tokyo Skytree", "Shibuya Crossing", "Senso-ji Temple"],
    weather: "Four seasons with mild winters and warm summers",
    bestTime: "March to May, September to November",
    reviews: [
      { user: "Jennifer P.", comment: "Incredible blend of tradition and technology. Clean and safe.", rating: 5 },
      { user: "Robert K.", comment: "The food is amazing. Transit system is efficient.", rating: 4.8 }
    ]
  }
];

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const found = allDestinations.find(dest => dest.id === Number(id));
      setDestination(found || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error("Please select a date for your trip");
      return;
    }
    
    toast.success("Booking initiated!");
    // In a real app, you'd navigate to a booking confirmation page or show a modal
    navigate(`/booking?destination=${id}&date=${selectedDate}&guests=${guests}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-xl">Loading destination details...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!destination) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Destination Not Found</h2>
          <p className="mb-6">The destination you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/explore')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/explore')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-80 mb-6 rounded-xl overflow-hidden">
            <img 
              src={destination.image} 
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
          
          <div className="flex items-center mb-4">
            <MapPin size={16} className="text-gray-500 mr-1" />
            <span className="text-gray-500 mr-4">{destination.name}</span>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
              <span>{destination.rating} rating</span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-8">{destination.description}</p>
          
          <Tabs defaultValue="details" className="mb-12">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Duration</h3>
                  <div className="flex items-center text-gray-700">
                    <Clock size={16} className="mr-2" />
                    {destination.duration}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Best Time to Visit</h3>
                  <div className="flex items-center text-gray-700">
                    <Calendar size={16} className="mr-2" />
                    {destination.bestTime}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Weather</h3>
                  <p className="text-gray-700">{destination.weather}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Price</h3>
                  <p className="text-gray-700">Starting from ${destination.price} per person</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="activities" className="pt-4">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.activities.map((activity: string, index: number) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-lg flex items-center">
                    <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    {activity}
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              {destination.reviews.map((review: any, index: number) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{review.user}</h4>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                      {review.rating}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h3 className="text-xl font-semibold mb-4">Book This Trip</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Date</label>
              <input 
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Number of Guests</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  className="px-3 py-2" 
                  onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <div className="flex-grow text-center">
                  <Users size={16} className="inline mr-2" />
                  {guests} {guests === 1 ? 'guest' : 'guests'}
                </div>
                <button 
                  className="px-3 py-2" 
                  onClick={() => setGuests(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Base price</span>
                <span>${destination.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Number of guests</span>
                <span>× {guests}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>${destination.price * guests}</span>
              </div>
            </div>
            
            <Button onClick={handleBookNow} className="w-full">Book Now</Button>
            
            <p className="text-center text-gray-500 text-sm mt-4">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
