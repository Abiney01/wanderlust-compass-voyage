
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
        <p className="text-xl text-gray-300 mb-8">
          The destination you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          onClick={() => navigate('/explore')} 
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
