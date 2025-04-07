
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TripCardProps {
  image: string;
  fallbackImage?: string;  // Added fallbackImage as an optional prop
  title: string;
  date: string;
  className?: string;
}

export function TripCard({ image, fallbackImage, title, date, className }: TripCardProps) {
  const [imgSrc, setImgSrc] = useState(image);
  
  // Handle image error by using fallbackImage if available
  const handleImageError = () => {
    if (fallbackImage) {
      setImgSrc(fallbackImage);
    }
  };
  
  return (
    <div className={cn("flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", className)}>
      <img
        src={imgSrc}
        alt={title}
        className="w-16 h-16 object-cover rounded-lg"
        onError={handleImageError}
      />
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
      </div>
    </div>
  );
}
