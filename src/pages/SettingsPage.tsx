
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import { Bell, Globe, CreditCard, Languages, Wallet } from "lucide-react";

const SettingsPage = () => {
  const { currency, setCurrency, language, setLanguage } = useUserPreferences();
  
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Travel enthusiast and adventure seeker. Love exploring new places and meeting new people."
  });
  
  const [notifications, setNotifications] = useState({
    marketing: true,
    socialUpdates: false,
    securityAlerts: true,
    promotionalOffers: true
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[600px] dark:bg-gray-800">
            <TabsTrigger value="profile" className="dark:data-[state=active]:bg-gray-700">Profile</TabsTrigger>
            <TabsTrigger value="preferences" className="dark:data-[state=active]:bg-gray-700">Preferences</TabsTrigger>
            <TabsTrigger value="notifications" className="dark:data-[state=active]:bg-gray-700">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="dark:data-[state=active]:bg-gray-700">Security</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Profile Information</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Update your personal details here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="dark:text-white">Name</Label>
                      <Input 
                        id="name" 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})} 
                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="dark:text-white">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profile.email} 
                        onChange={(e) => setProfile({...profile, email: e.target.value})} 
                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="dark:text-white">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                      className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio" className="dark:text-white">Bio</Label>
                    <Input 
                      id="bio" 
                      value={profile.bio} 
                      onChange={(e) => setProfile({...profile, bio: e.target.value})} 
                      className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="grid gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Globe className="mr-2 h-5 w-5" /> Language
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Choose your preferred language
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={language} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['English', 'Spanish', 'French', 'German', 'Hindi', 'Japanese'].map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={lang} 
                          id={`lang-${lang}`} 
                          onClick={() => setLanguage(lang as any)}
                          className="dark:border-gray-500"
                        />
                        <Label htmlFor={`lang-${lang}`} className="dark:text-white">{lang}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Wallet className="mr-2 h-5 w-5" /> Currency
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Set your preferred currency for displaying prices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={currency} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {code: 'USD', label: 'US Dollar ($)'},
                      {code: 'EUR', label: 'Euro (€)'},
                      {code: 'GBP', label: 'British Pound (£)'},
                      {code: 'INR', label: 'Indian Rupee (₹)'},
                      {code: 'JPY', label: 'Japanese Yen (¥)'},
                      {code: 'AUD', label: 'Australian Dollar (A$)'}
                    ].map((curr) => (
                      <div key={curr.code} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={curr.code} 
                          id={`currency-${curr.code}`} 
                          onClick={() => setCurrency(curr.code as any)}
                          className="dark:border-gray-500"
                        />
                        <Label htmlFor={`currency-${curr.code}`} className="dark:text-white">{curr.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <CreditCard className="mr-2 h-5 w-5" /> Payment Methods
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Manage your payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center dark:bg-gray-700">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-white">Edit</Button>
                    </div>
                    <Button className="w-full">Add New Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Bell className="mr-2 h-5 w-5" /> Notification Settings
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Configure how you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium dark:text-white">Marketing Emails</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about new features and promotions</p>
                  </div>
                  <Switch 
                    checked={notifications.marketing} 
                    onCheckedChange={() => handleNotificationChange('marketing')}
                    className="dark:bg-gray-700"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium dark:text-white">Social Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications about your network</p>
                  </div>
                  <Switch 
                    checked={notifications.socialUpdates} 
                    onCheckedChange={() => handleNotificationChange('socialUpdates')}
                    className="dark:bg-gray-700"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium dark:text-white">Security Alerts</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about account security events</p>
                  </div>
                  <Switch 
                    checked={notifications.securityAlerts} 
                    onCheckedChange={() => handleNotificationChange('securityAlerts')}
                    className="dark:bg-gray-700"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium dark:text-white">Promotional Offers</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive special offers and discounts</p>
                  </div>
                  <Switch 
                    checked={notifications.promotionalOffers} 
                    onCheckedChange={() => handleNotificationChange('promotionalOffers')}
                    className="dark:bg-gray-700"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast.success("Notification preferences saved")}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Security Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Update your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="dark:text-white">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="Enter your current password"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="dark:text-white">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="Enter your new password"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="dark:text-white">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm your new password"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                    </div>
                    <Switch 
                      className="dark:bg-gray-700"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          toast.success("Two-factor authentication enabled");
                        } else {
                          toast.error("Two-factor authentication disabled");
                        }
                      }} 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => toast.success("Password updated successfully. Please log in again.")}
                  className="mr-2"
                >
                  Update Password
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 dark:border-gray-600"
                  onClick={() => toast.error("This action would log you out and delete your account.")}
                >
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
