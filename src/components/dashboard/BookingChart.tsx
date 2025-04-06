
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { month: "Jan", bookings: 65 },
  { month: "Feb", bookings: 59 },
  { month: "Mar", bookings: 80 },
  { month: "Apr", bookings: 81 },
  { month: "May", bookings: 56 },
  { month: "Jun", bookings: 55 },
  { month: "Jul", bookings: 40 },
  { month: "Aug", bookings: 70 },
  { month: "Sep", bookings: 90 },
  { month: "Oct", bookings: 42 },
  { month: "Nov", bookings: 61 },
  { month: "Dec", bookings: 85 }
];

interface BookingChartProps {
  className?: string;
}

export function BookingChart({ className }: BookingChartProps) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  
  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "#1E88E5",
    }
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm ${className}`}>
      <h3 className="font-semibold mb-4 text-lg">Booking Statistics</h3>
      <div className="h-80 w-full">
        <ChartContainer 
          config={chartConfig} 
          className="h-full"
        >
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              width={30}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent payload={payload} />
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="bookings"
              radius={[4, 4, 0, 0]} 
              className="fill-blue-500 hover:fill-blue-600 transition-colors cursor-pointer"
              onMouseEnter={(_, index) => setActiveBar(index)}
              onMouseLeave={() => setActiveBar(null)}
              animationDuration={300}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
