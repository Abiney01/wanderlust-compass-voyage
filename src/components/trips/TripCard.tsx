
import { cn } from "@/lib/utils";

interface TripCardProps {
  image: string;
  title: string;
  date: string;
  className?: string;
}

export function TripCard({ image, title, date, className }: TripCardProps) {
  return (
    <div className={cn("flex items-center gap-4 bg-white p-3 rounded-xl hover:bg-gray-50", className)}>
      <img
        src={image}
        alt={title}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}
