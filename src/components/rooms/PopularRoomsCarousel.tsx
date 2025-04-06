
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RoomCard } from "@/components/rooms/RoomCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Room {
  id: number;
  image: string;
  title: string;
  location: string;
  price: number;
}

interface PopularRoomsCarouselProps {
  rooms: Room[];
}

export function PopularRoomsCarousel({ rooms }: PopularRoomsCarouselProps) {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 3;
  const totalItems = rooms.length;

  const handlePrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - itemsPerPage;
      return newIndex < 0 ? Math.max(totalItems - itemsPerPage, 0) : newIndex;
    });
    
    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + itemsPerPage;
      return newIndex >= totalItems ? 0 : newIndex;
    });
    
    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const handleBookNow = (roomId: number) => {
    toast.success("Navigating to booking page");
    navigate(`/booking?roomId=${roomId}`);
  };

  // Get the current visible items
  const visibleRooms = () => {
    const result = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (startIndex + i) % totalItems;
      result.push(rooms[index]);
    }
    return result;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Popular Rooms</h2>
        <div className="flex gap-2">
          <button 
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition-all transform hover:scale-105"
            onClick={handlePrevious}
            aria-label="Previous"
            disabled={isAnimating}
          >
            <ChevronLeft size={18} className="dark:text-gray-300" />
          </button>
          <button 
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition-all transform hover:scale-105"
            onClick={handleNext}
            aria-label="Next"
            disabled={isAnimating}
          >
            <ChevronRight size={18} className="dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out ${isAnimating ? 'opacity-90' : ''}`}
          style={{
            transform: isAnimating ? 'scale(0.98)' : 'scale(1)'
          }}
        >
          {visibleRooms().map((room) => (
            <div key={room.id} className={`transition-all duration-500 ${isAnimating ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'}`}>
              <RoomCard
                image={room.image}
                title={room.title}
                location={room.location}
                price={room.price}
                onClick={() => handleBookNow(room.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
