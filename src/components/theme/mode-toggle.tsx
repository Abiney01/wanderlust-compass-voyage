
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserPreferences } from "@/context/UserPreferencesContext";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { translate } = useUserPreferences();

  // Safe translation function that provides fallbacks
  const safeTranslate = (key: string): string => {
    try {
      const translated = translate(key);
      // If translation returns undefined or the key itself, use fallback
      return translated && translated !== key ? translated : getFallbackTranslation(key);
    } catch (error) {
      console.error("Translation error:", error);
      return getFallbackTranslation(key);
    }
  };

  // Fallback translations for critical UI elements
  const getFallbackTranslation = (key: string): string => {
    const fallbacks: Record<string, string> = {
      darkMode: "Dark Mode",
      lightMode: "Light Mode"
    };
    return fallbacks[key] || key;
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    const messageKey = newTheme === "dark" ? "darkMode" : "lightMode";
    toast.success(`${safeTranslate(messageKey)} activated`);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle {theme === 'dark' ? safeTranslate('lightMode').toLowerCase() : safeTranslate('darkMode').toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
