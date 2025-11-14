import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Import your hero images here. Replace these paths with your actual images.
// I've kept the original image and added two placeholders.
import heroImage1 from "/generated_images/Gemini_Generated_Image-hero.png";
import heroImage2 from "/generated_images/hero-2.png";
import heroImage3 from "/generated_images/hero-3.png";

// Array of images for the carousel
const heroImages = [heroImage1, heroImage2, heroImage3];
const carouselInterval = 7000; // Change image every 7 seconds

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect for auto-cycling the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % heroImages.length
      );
    }, carouselInterval);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this runs once on mount

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden">
      {/* Carousel Background Images Container */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out transform scale-105 ${
              index === currentImageIndex
                ? "opacity-100 z-0"
                : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              filter: "brightness(0.82) contrast(1.05)",
            }}
          />
        ))}
      </div>

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

      {/* Soft Light Glow Behind Heading (Adjusted z-index) */}
      <div className="absolute left-0 top-1/3 w-[600px] h-[600px] bg-black/10 blur-[140px] z-10" />

      {/* Content (Adjusted z-index) */}
      <div className="relative container mx-auto h-full flex items-center px-6 z-20">
        <div className="max-w-2xl text-left text-white animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-xl font-[Montserrat]">
            Wear Your Dreams.
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light">
            Motivational apparel for the everyday chaser. Shop the collection.
          </p>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="text-lg px-8 hover-elevate active-elevate-2"
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