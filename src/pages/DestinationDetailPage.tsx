
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
    name: "Grand Canyon",
    location: "Arizona, USA",
    image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c",
    rating: 4.8,
    category: "nature",
    description: "One of the most spectacular natural wonders of the world.",
    price: 799,
    duration: "3 days",
    activities: ["Hiking", "Rafting", "Photography"],
    weather: "Hot summers, cool winters",
    bestTime: "March to May, September to November",
    reviews: [
      { user: "Alex M.", comment: "Breathtaking views and a must-visit!", rating: 5 },
      { user: "Lina V.", comment: "Very scenic but can get crowded.", rating: 4.5 }
    ]
  },
  {
    id: 2,
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    rating: 4.7,
    category: "landmark",
    description: "Iconic symbol of Paris and one of the most famous structures in the world.",
    price: 1299,
    duration: "5 days",
    activities: ["Eiffel Tower", "Louvre", "Cruise on Seine"],
    weather: "Temperate",
    bestTime: "April to June, September to October",
    reviews: [
      { user: "Sophie L.", comment: "A romantic getaway. Paris is magical.", rating: 5 },
      { user: "Leo D.", comment: "Great food and culture!", rating: 4.3 }
    ]
  },
  {
    id: 3,
    name: "Bora Bora",
    location: "French Polynesia",
    image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&w=600&h=350",
    rating: 4.9,
    category: "beach",
    description: "A small South Pacific island northwest of Tahiti with stunning turquoise lagoons.",
    price: 2499,
    duration: "7 days",
    activities: ["Snorkeling", "Resort stay", "Lagoon tours"],
    weather: "Warm and humid",
    bestTime: "May to October",
    reviews: [
      { user: "Nina R.", comment: "Absolute paradise!", rating: 5 },
      { user: "Jason M.", comment: "Expensive but worth it.", rating: 4.8 }
    ]
  },
  {
    id: 4,
    name: "Kyoto Temples",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&h=350",
    rating: 4.6,
    category: "cultural",
    description: "Historic city known for its numerous classical Buddhist temples and gardens.",
    price: 999,
    duration: "6 days",
    activities: ["Temple tours", "Tea ceremonies", "Cultural performances"],
    weather: "Four seasons",
    bestTime: "March to May, October to November",
    reviews: [
      { user: "Aiko S.", comment: "Beautiful and peaceful.", rating: 5 },
      { user: "Tom H.", comment: "Great cultural experience.", rating: 4.4 }
    ]
  },
  {
    id: 5,
    name: "Northern Lights",
    location: "Iceland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&h=350",
    rating: 5.0,
    category: "nature",
    description: "Natural light display in the Earth's sky, predominantly seen in high-latitude regions.",
    price: 1699,
    duration: "4 days",
    activities: ["Aurora tours", "Hot springs", "Glacier hiking"],
    weather: "Cold, snowy winters",
    bestTime: "September to April",
    reviews: [
      { user: "Chris W.", comment: "Magical and unforgettable!", rating: 5 },
      { user: "Erica Z.", comment: "A unique experience, dress warmly!", rating: 4.9 }
    ]
  },
  {
    id: 6,
    name: "Colosseum",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&h=350",
    rating: 4.5,
    category: "landmark",
    description: "Ancient amphitheatre in the center of Rome and one of Italy's most popular tourist attractions.",
    price: 899,
    duration: "3 days",
    activities: ["Historic tours", "City walks", "Museum visits"],
    weather: "Mediterranean",
    bestTime: "April to June, September to October",
    reviews: [
      { user: "Marco P.", comment: "Amazing piece of history.", rating: 4.7 },
      { user: "Jade F.", comment: "Busy but worth it.", rating: 4.3 }
    ]
  },
  {
    id: 7,
    name: "Great Barrier Reef",
    location: "Queensland, Australia",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=600&h=350",
    rating: 4.8,
    category: "beach",
    description: "World's largest coral reef system composed of over 2,900 individual reefs.",
    price: 1899,
    duration: "6 days",
    activities: ["Scuba diving", "Snorkeling", "Boat tours"],
    weather: "Tropical",
    bestTime: "June to October",
    reviews: [
      { user: "Liam G.", comment: "Marine life was spectacular!", rating: 5 },
      { user: "Zoey N.", comment: "Beautiful underwater scenes.", rating: 4.6 }
    ]
  },
  {
    id: 8,
    name: "Machu Picchu",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=600&h=350",
    rating: 4.9,
    category: "cultural",
    description: "15th-century Inca citadel situated on a mountain ridge above the Sacred Valley.",
    price: 1499,
    duration: "5 days",
    activities: ["Hiking", "Inca trail", "Cultural exploration"],
    weather: "Tropical mountain",
    bestTime: "April to October",
    reviews: [
      { user: "Carlos R.", comment: "Spiritual and majestic!", rating: 5 },
      { user: "Emily D.", comment: "Loved the hike and the view.", rating: 4.9 }
    ]
  },
  {
    id: 9,
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1508598895300-60bfb2c44265",
    rating: 4.7,
    category: "beach",
    description: "Famous for its stunning white buildings with blue domes overlooking the sea.",
    price: 1399,
    duration: "5 days",
    activities: ["Sunset views", "Wine tasting", "Beach relaxation"],
    weather: "Mediterranean",
    bestTime: "May to October",
    reviews: [
      { user: "Niko K.", comment: "Perfect for a honeymoon.", rating: 5 },
      { user: "Sasha Y.", comment: "Absolutely dreamy!", rating: 4.6 }
    ]
  },
  {
    id: 10,
    name: "Mount Fuji",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=600&h=350",
    rating: 4.9,
    category: "nature",
    description: "Japan's highest mountain and an active volcano, known for its perfectly symmetrical cone.",
    price: 999,
    duration: "3 days",
    activities: ["Hiking", "Photography", "Scenic train rides"],
    weather: "Snow in winter, mild in summer",
    bestTime: "July to September",
    reviews: [
      { user: "Haruto M.", comment: "Challenging climb but so rewarding!", rating: 5 },
      { user: "Amy S.", comment: "Best view in Japan.", rating: 4.9 }
    ]
  },
  {
    id: 11,
    name: "Taj Mahal",
    location: "Agra, India",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&h=350",
    rating: 4.8,
    category: "landmark",
    description: "An ivory-white marble mausoleum built by Emperor Shah Jahan in memory of his wife.",
    price: 999,
    duration: "3 days",
    activities: [
      "Guided tour of the Taj Mahal",
      "Visit Agra Fort",
      "Local cuisine tasting",
      "Shopping in local bazaars"
    ],
    weather: "Hot summers, cool winters",
    bestTime: "October to March",
    reviews: [
      {
        user: "Priya S.",
        comment: "Stunning architecture and deeply moving history.",
        rating: 5
      },
      {
        user: "Alex B.",
        comment: "Beautiful place, best seen at sunrise!",
        rating: 4.7
      }
    ]
  },
  {
    id: 12,
    name: "Petra",
    location: "Jordan",
    image: "https://media.istockphoto.com/id/1418510499/photo/woman-visiting-petra-ancient-city-in-jordan.webp?a=1&b=1&s=612x612&w=0&k=20&c=l4aNVtxk8udoMhqafak-GlnLx76LBX0u3_jR5Re1_Mw=",
    rating: 4.8,
    category: "historical",
    description: "Ancient city famous for its rock-cut architecture and water conduit system.",
    price: 1099,
    duration: "4 days",
    activities: [
      "Explore Al-Khazneh (The Treasury)",
      "Hike to the Monastery",
      "Camel rides",
      "Visit Petra Museum"
    ],
    weather: "Hot and dry climate",
    bestTime: "March to May, September to November",
    reviews: [
      {
        user: "Layla N.",
        comment: "Absolutely magical. Like stepping back in time.",
        rating: 5
      },
      {
        user: "Omar A.",
        comment: "A must-see wonder! Bring good walking shoes.",
        rating: 4.6
      }
    ]
  },
  {
    id: 13,
    name: "Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    rating: 4.8,
    category: "beach",
    description: "Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.",
    price: 899,
    duration: "7 days",
    activities: [
      "Beach relaxation",
      "Temple visits",
      "Water sports",
      "Cultural shows"
    ],
    weather: "Tropical, warm year-round",
    bestTime: "April to October",
    reviews: [
      {
        user: "Sarah J.",
        comment: "Beautiful destination. Loved the beaches and temples.",
        rating: 5
      },
      {
        user: "Mike T.",
        comment: "Great food and friendly locals. Will definitely return.",
        rating: 4.5
      }
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
