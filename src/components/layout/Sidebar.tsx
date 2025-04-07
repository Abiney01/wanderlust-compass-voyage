
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Compass, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { toast } from "sonner";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Booking", path: "/booking", icon: BookOpen },
  { name: "Explore", path: "/explore", icon: Compass },
  { name: "Message", path: "/message", icon: MessageSquare },
  { name: "Support", path: "/support", icon: HelpCircle },
];

const bottomItems = [
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Log out", path: "", icon: LogOut, action: "logout" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleItemClick = (item: { name: string; path: string; action?: string }) => {
    if (item.action === "logout") {
      // Handle logout
      toast.success("Successfully logged out");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
      return;
    }
    
    if (item.path) {
      navigate(item.path);
    }
  };
  
  return (
    <div className="h-screen w-[160px] bg-white border-r border-gray-200 flex flex-col justify-between py-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="space-y-8">
        <div className="px-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 bg-blue-500 text-white flex items-center justify-center rounded transition-transform group-hover:scale-110">
              <span className="font-bold text-xl">V</span>
            </div>
            <span className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors dark:text-white dark:group-hover:text-blue-400">Voyage Vista</span>
          </Link>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-2.5 w-full transition-all",
                location.pathname === item.path 
                  ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500" 
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              )}
            >
              <item.icon size={20} className="transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleItemClick(item)}
            className={cn(
              "flex items-center space-x-3 px-4 py-2.5 transition-all w-full text-left",
              location.pathname === item.path 
                ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500" 
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            )}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
        <div className="px-3 py-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
