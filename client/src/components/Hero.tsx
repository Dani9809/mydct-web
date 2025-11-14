import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Gemini_Generated_Image_v3vni4v3vni4v3vn.png";

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolling to products');
  };

  return (
    
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>

      <div className="container relative mx-auto px-4 h-full flex items-center top-[10%]">
        <div className="text-white pb-[30px]">
          <h1 className="text-5xl md:text-6xl font-bold font-[Montserrat] mb-6 leading-tight">
            Wear Your Dreams 
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
            Motivational apparel for the everyday chaser. Shop the collection.
          </p>
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
    </section>
  );
}
