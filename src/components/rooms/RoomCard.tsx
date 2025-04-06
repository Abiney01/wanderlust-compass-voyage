
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  className?: string;
}

export function RoomCard({ image, title, location, price, className }: RoomCardProps) {
  return (
    <div className={cn("bg-white rounded-xl overflow-hidden shadow-sm", className)}>
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-md font-medium">
          ${price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{location}</p>
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Book Now
        </Button>
      </div>
    </div>
  );
}
