
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

const SignInPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  
  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  // Sign Up state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  
  // Forgot password state
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  
  // Reset password form state
  const [resetFormOpen, setResetFormOpen] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!signInEmail || !signInPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Check if the user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === signInEmail);
    
    if (!user || user.password !== signInPassword) {
      toast.error("Invalid email or password");
      return;
    }
    
    // Store auth state in localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(user));
    
    toast.success("Sign in successful!");
    navigate("/");
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (signUpPassword !== signUpConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((user: any) => user.email === signUpEmail)) {
      toast.error("Email already in use");
      return;
    }
    
    // Add new user
    const newUser = {
      id: Date.now(),
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Auto sign in
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast.success("Account created successfully!");
    navigate("/");
  };
  
  const handleForgotPassword = () => {
    if (!forgotPasswordEmail) {
      toast.error("Please enter your email address");
      return;
    }
    
    // Check if email exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === forgotPasswordEmail);
    
    if (!user) {
      toast.error("No account found with that email");
      return;
    }
    
    // Generate a reset token
    const resetToken = Math.random().toString(36).substring(2, 15);
    setResetToken(resetToken);
    
    // Save the reset token to the user object
    user.resetToken = resetToken;
    localStorage.setItem("users", JSON.stringify(users));
    
    // Show success message
    setPasswordResetSent(true);
    
    // In a real app, we would send an email with a link containing the reset token
    // For this demo, we'll simulate sending an email by logging to console
    console.log(`Password reset link for ${forgotPasswordEmail}: /reset-password?token=${resetToken}&email=${encodeURIComponent(forgotPasswordEmail)}`);
    
    // After 3 seconds, close the dialog and reset state, then open reset form
    setTimeout(() => {
      setForgotPasswordOpen(false);
      setPasswordResetSent(false);
      
      // Automatically open the reset password form
      setResetFormOpen(true);
    }, 3000);
  };
  
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmNewPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Update user's password
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: any) => u.email === forgotPasswordEmail && u.resetToken === resetToken);
    
    if (userIndex === -1) {
      toast.error("Invalid or expired reset link");
      return;
    }
    
    users[userIndex].password = newPassword;
    users[userIndex].resetToken = null; // Clear the reset token
    localStorage.setItem("users", JSON.stringify(users));
    
    toast.success("Password has been reset successfully!");
    setResetFormOpen(false);
    
    // Clear form fields
    setNewPassword("");
    setConfirmNewPassword("");
    
    // Redirect to login
    setActiveTab("signin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Blue background with features */}
      <div className="hidden lg:block lg:w-1/2 bg-blue-600 p-12">
        <div className="flex items-center gap-2 mb-16">
          <div className="h-10 w-10 bg-gray-800 text-white flex items-center justify-center rounded">
            <span className="font-bold text-xl">V</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Voyage Vista</h1>
        </div>
        
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-white mb-6">Your journey starts here</h2>
          <p className="text-lg text-white/90 mb-12">
            Discover amazing destinations, book with ease, and create unforgettable travel experiences.
          </p>
          
          <div className="space-y-8">
            {[
              "Personalized travel recommendations",
              "Exclusive deals on hotels and flights",
              "24/7 travel support during your trips"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="text-white text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right side - Sign in/sign up form */}
      <div className="w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")} className="w-full">
            <div className="w-full flex justify-between mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="signin" 
                  className={activeTab === "signin" ? "text-white bg-gray-800" : "text-gray-400"}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className={activeTab === "signup" ? "text-white bg-gray-800" : "text-gray-400"}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </div>
          
            <TabsContent value="signin">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
                <p className="text-gray-400">Sign in to your account</p>
              </div>
              
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-white">Email</Label>
                  <Input 
                    id="signin-email" 
                    type="email" 
                    placeholder="name@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password" className="text-white">Password</Label>
                    <Button 
                      variant="link" 
                      className="text-xs p-0 h-auto text-blue-400 hover:text-blue-300"
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input 
                    id="signin-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Sign In
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Create an account</h2>
                <p className="text-gray-400">Join Voyage Vista today</p>
              </div>
              
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-white">Full Name</Label>
                  <Input 
                    id="signup-name" 
                    placeholder="Enter your name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="name@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    placeholder="Create a password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-white">Confirm Password</Label>
                  <Input 
                    id="signup-confirm-password" 
                    type="password" 
                    placeholder="Confirm your password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">{passwordResetSent ? "Check Your Email" : "Reset Password"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {passwordResetSent 
                ? "We've sent you an email with a link to reset your password." 
                : "Enter your email address and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>
          
          {passwordResetSent ? (
            <div className="py-6 flex items-center justify-center">
              <div className="rounded-full bg-green-500/20 p-3 text-green-400">
                <CheckCircle className="h-8 w-8" />
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    placeholder="name@example.com"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="ghost" 
                  onClick={() => setForgotPasswordOpen(false)}
                  className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleForgotPassword}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Send Reset Link
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Reset Password Form Dialog */}
      <Dialog open={resetFormOpen} onOpenChange={setResetFormOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Reset Your Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please enter your new password below.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleResetPassword} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white">New Password</Label>
              <Input 
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password" className="text-white">Confirm New Password</Label>
              <Input 
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                variant="ghost" 
                type="button"
                onClick={() => setResetFormOpen(false)}
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Reset Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInPage;
