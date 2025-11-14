import { Button } from "@/components/ui/button";
import heroImage from "/generated_images/Gemini_Generated_Image-hero.png";

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transform"
        style={{
          backgroundImage: `url(${heroImage})`,
          filter: "brightness(0.82) contrast(1.05)",
        }}
      />

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* Soft Light Glow Behind Heading */}
      <div className="absolute left-0 top-1/3 w-[600px] h-[600px] bg-black/10 blur-[140px]" />

      {/* Content */}
      <div className="relative container mx-auto h-full flex items-center px-6">
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