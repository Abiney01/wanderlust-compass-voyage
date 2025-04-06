
import { useState } from "react";
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
  const itemsPerPage = 3;
  const totalItems = rooms.length;

  const handlePrevious = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - itemsPerPage;
      return newIndex < 0 ? Math.max(totalItems - itemsPerPage, 0) : newIndex;
    });
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + itemsPerPage;
      return newIndex >= totalItems ? 0 : newIndex;
    });
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
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all transform hover:scale-105"
            onClick={handlePrevious}
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all transform hover:scale-105"
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleRooms().map((room) => (
          <div key={room.id} className="animate-fade-in">
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
  );
}
