
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";

import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import MyTripsPage from "./pages/MyTripsPage";
import ExplorePage from "./pages/ExplorePage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import MessagePage from "./pages/MessagePage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import SignInPage from "./pages/SignInPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <UserPreferencesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/mytrips" element={<MyTripsPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/explore/destinations/:id" element={<DestinationDetailPage />} />
              <Route path="/message" element={<MessagePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserPreferencesProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
