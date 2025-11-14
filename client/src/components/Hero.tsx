import { Button } from "@/components/ui/button";
// 1. Import the ThemeToggle component
import { ThemeToggle } from "@/components/ThemeToggle"; // Adjust the import path as needed

// Define the custom color for the accent
const themeColor = "#F76363"; 

export default function Hero() {
  // Removed all theme-related state (useState, useEffect, toggleTheme)
  // as the logic is now encapsulated in the ThemeToggle component and next-themes.

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden">

      {/* 🌟 Dynamic Background 🌟 */}
      {/* The `dark:` classes are automatically applied/removed by next-themes controlling the <html> class */}
      <div className="absolute inset-0 
                      bg-white dark:bg-gradient-to-br 
                      dark:from-gray-950 dark:to-gray-800">
        
        {/* Subtle radial effect (only visible in dark mode) */}
        <div className="absolute inset-0 
                        dark:[mask-image:radial-gradient(ellipse_at_top,transparent_20%,black)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)] opacity-50" />
        </div>
      </div>

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-black/5 dark:bg-black/10 z-10" />

      {/* 💥 Soft Light Glow Behind Heading - Theme color is consistent 💥 */}
      <div className={`absolute left-0 top-1/3 w-[600px] h-[600px] blur-[140px] z-10 
                      bg-[${themeColor}]/[0.1] dark:bg-[${themeColor}]/[0.15]`} />

      {/* Content */}
      <div className="relative container mx-auto h-full flex items-center px-6 z-20">
        <div className="max-w-2xl text-left 
                        text-gray-900 dark:text-white 
                        animate-fade-up">
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-xl font-[Montserrat]">
            Wear Your Dreams.
          </h1>

          <p className="text-xl md:text-2xl 
                        text-gray-700 dark:text-white/90 
                        mb-10 leading-relaxed font-light">
            Motivational apparel for the everyday chaser. Shop the collection.
          </p>

          <div className="flex gap-4">
            <Button
              size="lg"
              className={`text-lg px-8 hover-elevate active-elevate-2 text-white 
                          bg-[${themeColor}] hover:bg-[#E65252] transition duration-300`}
              onClick={scrollToProducts}
              data-testid="button-shop-now"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}