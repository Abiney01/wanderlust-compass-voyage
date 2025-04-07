
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { User, Languages, Globe } from "lucide-react";
import { toast } from "sonner";

// Constants for language and currency options
const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "japanese", label: "Japanese" },
  { value: "hindi", label: "Hindi" }
];

const CURRENCIES = [
  { value: "usd", label: "USD ($)", symbol: "$" },
  { value: "eur", label: "EUR (€)", symbol: "€" },
  { value: "gbp", label: "GBP (£)", symbol: "£" },
  { value: "jpy", label: "JPY (¥)", symbol: "¥" },
  { value: "aud", label: "AUD ($)", symbol: "$" },
  { value: "inr", label: "INR (₹)", symbol: "₹" }
];

const SettingsPage = () => {
  // User profile state
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [address, setAddress] = useState("123 Travel St, City");
  const [image, setImage] = useState("/placeholder.svg");
  
  // Preferences state with local storage persistence
  const [language, setLanguage] = useState(() => 
    localStorage.getItem("user-language") || "english"
  );
  const [currency, setCurrency] = useState(() => 
    localStorage.getItem("user-currency") || "usd"
  );

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem("user-language", language);
    document.documentElement.setAttribute("lang", language.substring(0, 2));
    toast.success(`Language updated to ${LANGUAGES.find(l => l.value === language)?.label || language}`);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("user-currency", currency);
    toast.success(`Currency updated to ${CURRENCIES.find(c => c.value === currency)?.label || currency}`);
  }, [currency]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
          toast.success("Profile image updated successfully");
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleNameChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Name updated to ${name}`);
  };

  const handleAddressChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Address updated to ${address}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 dark:bg-gray-700">
            <TabsTrigger value="profile" className="flex items-center gap-2 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-white">
              <User size={16} />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-white">
              <Languages size={16} />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in dark:bg-gray-800">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Profile Information</h2>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-28 h-28">
                    <AvatarImage src={image} alt={name} className="object-cover" />
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Input
                      id="avatar"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <Label
                      htmlFor="avatar"
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-100 transition-colors dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                    >
                      Change Avatar
                    </Label>
                  </div>
                </div>
                
                <div className="flex-1 space-y-6 w-full">
                  <form onSubmit={handleNameChange} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="dark:text-white">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="hover:border-blue-300 focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      />
                    </div>
                    <Button type="submit" className="hover:scale-105 transition-transform">
                      Update Name
                    </Button>
                  </form>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="dark:text-white">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                      />
                      <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Email changes are not allowed for security reasons.</p>
                    </div>
                    
                    <form onSubmit={handleAddressChange}>
                      <div className="mb-4">
                        <Label htmlFor="address" className="dark:text-white">Address</Label>
                        <Input
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="hover:border-blue-300 focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                      </div>
                      <Button type="submit" className="hover:scale-105 transition-transform">
                        Update Address
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in dark:bg-gray-800">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Language & Region</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language" className="dark:text-white">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      {LANGUAGES.map(lang => (
                        <SelectItem key={lang.value} value={lang.value} className="dark:hover:bg-gray-600">
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This will change the application language
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency" className="dark:text-white">Currency</Label>
                  <div className="relative">
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        {CURRENCIES.map(curr => (
                          <SelectItem key={curr.value} value={curr.value} className="dark:hover:bg-gray-600">
                            {curr.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      <Globe size={16} className="text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    All prices will be displayed in this currency
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-md font-semibold mb-2 dark:text-white">Current Preferences</h3>
                <div className="bg-gray-50 p-4 rounded-md dark:bg-gray-700">
                  <p className="text-sm dark:text-gray-300">
                    Language: <span className="font-medium">{LANGUAGES.find(l => l.value === language)?.label}</span>
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    Currency: <span className="font-medium">{CURRENCIES.find(c => c.value === currency)?.label}</span>
                    {" "} 
                    <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-md dark:bg-gray-600">
                      Example: {CURRENCIES.find(c => c.value === currency)?.symbol}100
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
