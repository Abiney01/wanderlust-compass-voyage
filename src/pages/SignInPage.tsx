
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const SignInPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // In a real app, this would call an API
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({
        name: "John Doe",
        email: email,
      }));
      
      toast.success("Successfully signed in!");
      navigate("/");
      setLoading(false);
    }, 1000);
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      toast.success("Account created successfully!", {
        description: "Please sign in with your new account."
      });
      setActiveTab("signin");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-blue-600 p-8 flex flex-col justify-center relative overflow-hidden md:min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-lg mx-auto text-white">
          <div className="flex items-center mb-8">
            <div className="h-12 w-12 bg-white text-blue-600 flex items-center justify-center rounded-lg mr-4">
              <span className="font-bold text-2xl">V</span>
            </div>
            <h1 className="text-3xl font-bold">Voyage Vista</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">Your journey starts here</h2>
          <p className="text-blue-100 text-lg mb-8">
            Discover amazing destinations, book with ease, and create unforgettable travel experiences.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg">Personalized travel recommendations</p>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg">Exclusive deals on hotels and flights</p>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg">24/7 travel support during your trips</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <Tabs 
            defaultValue="signin" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Welcome back</h2>
                <p className="text-gray-500">Sign in to your account</p>
              </div>
              
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-transform hover:scale-105" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="hover:bg-gray-50">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.59 22.56 12.25Z" fill="#4285F4" />
                    <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.19 18.63 6.8 16.71 5.95 14.1H2.27V16.94C4.08 20.47 7.76 23 12 23Z" fill="#34A853" />
                    <path d="M5.95 14.1C5.75 13.45 5.63 12.77 5.63 12.07C5.63 11.37 5.75 10.69 5.95 10.04V7.2H2.27C1.57 8.67 1.17 10.32 1.17 12.07C1.17 13.82 1.57 15.47 2.27 16.94L5.95 14.1Z" fill="#FBBC05" />
                    <path d="M12 5.42C13.62 5.42 15.06 5.96 16.21 7.06L19.36 3.91C17.45 2.11 14.97 1 12 1C7.76 1 4.08 3.53 2.27 7.06L5.95 9.9C6.8 7.29 9.19 5.42 12 5.42Z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="hover:bg-gray-50">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.397 20.997V12.87h2.73l.411-3.166h-3.14V7.777c0-.917.255-1.541 1.57-1.541h1.677V3.394a22.285 22.285 0 0 0-2.442-.125c-2.417 0-4.073 1.476-4.073 4.182v2.333H7.332v3.166h2.799v8.047h3.266Z"></path>
                  </svg>
                  Facebook
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Create your account</h2>
                <p className="text-gray-500">Join Voyage Vista today</p>
              </div>
              
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input 
                    id="signup-name" 
                    placeholder="John Doe" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                  <p className="text-xs text-gray-500">
                    Password must be at least 8 characters long
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-transform hover:scale-105" 
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
