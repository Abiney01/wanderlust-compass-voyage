
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    positive: boolean;
  };
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

export function StatsCard({ title, value, change, subtitle, className, children }: StatsCardProps) {
  return (
    <div className={cn("bg-white p-4 rounded-xl shadow-sm", className)}>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{title}</span>
        <div className="flex items-baseline mt-2 mb-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          <span 
            className={cn(
              "ml-2 text-sm",
              change.positive ? "text-green-500" : "text-red-500"
            )}
          >
            {change.positive ? "+" : ""}{change.value}
          </span>
        </div>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}
