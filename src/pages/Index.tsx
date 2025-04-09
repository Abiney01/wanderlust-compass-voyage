
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/mode-toggle";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { theme } = useTheme();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-500 text-white flex items-center justify-center rounded">
              <span className="font-bold text-xl">V</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Voyage Vista</h1>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300">Welcome, {userName}</span>
                <Button variant="outline" onClick={handleSignOut} className="dark:text-white dark:hover:bg-gray-700">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => navigate("/signin")} className="dark:text-white dark:hover:bg-gray-700">
                Sign In
              </Button>
            )}
            <ModeToggle />
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Discover Your Perfect Travel Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              Find and book unique accommodations, experiences, and trips around the world.
              Let us be your guide to the most amazing destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate("/")} size="lg" className="bg-blue-500 hover:bg-blue-600">
                Start Exploring
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/booking")} className="dark:text-white dark:hover:bg-gray-700">
                Book Now
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-30"></div>
            <div className="relative z-10">
              <img 
                src="/logo.png" 
                alt="Voyage Vista Dashboard"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-12">
            Trusted by Travelers Worldwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["30,000+ Bookings", "50+ Countries", "24/7 Support", "97% Satisfaction"].map((stat) => (
              <div key={stat} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700">
                <p className="text-gray-800 dark:text-gray-200 font-medium">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
