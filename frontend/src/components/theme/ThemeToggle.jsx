import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      size="icon"
      variant="ghost"
      className="
        fixed bottom-6 right-6 z-50 
        rounded-full 
        bg-background/70 backdrop-blur 
        border border-border
        shadow-lg
        hover:bg-accent hover:text-accent-foreground
        transition-all
      "
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};
