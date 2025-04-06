
import { useState } from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { useTheme } from "@/components/theme/theme-provider";

export function Header() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your booking for Paris has been confirmed",
      time: "5 mins ago",
      read: false
    },
    {
      id: 2,
      title: "New Offer",
      message: "Special discount for your next trip to Bali",
      time: "2 hours ago",
      read: false
    },
    {
      id: 3,
      title: "Payment Successful",
      message: "Your payment for Greece trip was successful",
      time: "Yesterday",
      read: true
    }
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <header className="border-b bg-background dark:bg-gray-800">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-3 border-b flex justify-between items-center">
                <h4 className="font-semibold">Notifications</h4>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs text-blue-500 hover:text-blue-700"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium">{notification.title}</h5>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
              <div className="p-2 border-t text-center">
                <Button 
                  variant="ghost" 
                  className="text-sm text-blue-500 hover:text-blue-700 w-full"
                  onClick={() => navigate("/notifications")}
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/message")}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          
          <ModeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/settings")}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
