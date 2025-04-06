
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  month?: number;
  year?: number;
}

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function Calendar({ month: initialMonth, year: initialYear }: CalendarProps) {
  const today = new Date();
  const [month, setMonth] = useState(initialMonth ?? today.getMonth());
  const [year, setYear] = useState(initialYear ?? today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 3, 1)); // Apr 1, 2025

  // Get the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Create an array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Fill in blank spaces for the days of the week before the first day of the month
  const blanks = Array(firstDayOfMonth).fill(null);
  
  // Combine blanks and days
  const calendarDays = [...blanks, ...days];

  const navigateMonth = (direction: -1 | 1) => {
    let newMonth = month + direction;
    let newYear = year;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    
    setMonth(newMonth);
    setYear(newYear);
  };

  const isToday = (day: number) => {
    const currentDate = new Date();
    return day === currentDate.getDate() && 
      month === currentDate.getMonth() && 
      year === currentDate.getFullYear();
  };

  const isSelected = (day: number) => {
    return selectedDate &&
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear();
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-900 uppercase">{monthNames[month]} {year}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => navigateMonth(1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {/* Days of the week */}
        {dayNames.map(day => (
          <div 
            key={day} 
            className="text-xs font-medium text-gray-500 text-center py-1"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square">
            {day && (
              <button
                onClick={() => handleDateClick(day)}
                className={cn(
                  "w-full h-full flex items-center justify-center rounded-md text-sm",
                  isToday(day) && !isSelected(day) && "border border-blue-500",
                  isSelected(day) && "bg-blue-500 text-white",
                  !isToday(day) && !isSelected(day) && "hover:bg-gray-100"
                )}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
