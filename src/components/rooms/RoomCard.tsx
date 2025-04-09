
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUserPreferences } from "@/context/UserPreferencesContext";

interface RoomCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  className?: string;
  onClick?: () => void;
}

export function RoomCard({ image, title, location, price, className, onClick }: RoomCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { formatPrice } = useUserPreferences();
  
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm transition-all duration-300",
        isHovered ? "shadow-md transform translate-y-[-5px]" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "scale-110" : ""
          )}
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-md font-medium">
          {formatPrice(price)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{location}</p>
        <Button 
          className={cn(
            "w-full transition-all duration-300",
            isHovered ? "bg-blue-600" : "bg-blue-500"
          )}
          onClick={onClick}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
