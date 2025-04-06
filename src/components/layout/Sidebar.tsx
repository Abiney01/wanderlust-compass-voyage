
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Compass, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  Moon, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Booking", path: "/booking", icon: BookOpen },
  { name: "Explore", path: "/explore", icon: Compass },
  { name: "Message", path: "/message", icon: MessageSquare },
  { name: "Support", path: "/support", icon: HelpCircle },
];

const bottomItems = [
  { name: "Setting", path: "/settings", icon: Settings },
  { name: "Dark mode", path: "", icon: Moon },
  { name: "Log out", path: "", icon: LogOut },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="h-screen w-[160px] bg-white border-r border-gray-200 flex flex-col justify-between py-6">
      <div className="space-y-8">
        <div className="px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-500 text-white flex items-center justify-center rounded">
              <span className="font-bold text-xl">V</span>
            </div>
            <span className="font-semibold text-gray-900">Voyage Vista</span>
          </Link>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-2.5 w-full",
                location.pathname === item.path 
                  ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600" 
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center space-x-3 px-4 py-2.5 text-gray-500 hover:bg-gray-100"
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
