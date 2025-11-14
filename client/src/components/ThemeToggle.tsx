import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When the component mounts, we set the mounted state to true
  // This prevents a hydration mismatch error
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until the component is mounted
  // to ensure the correct theme is displayed
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="w-9 h-9"
        aria-label="Loading theme"
      />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-testid="button-theme-toggle"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}