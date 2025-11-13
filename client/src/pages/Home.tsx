import { useState } from "react";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import coralTshirt from '@assets/generated_images/Coral_pink_t-shirt_product_7f38a592.png';
import turquoiseTshirt from '@assets/generated_images/Turquoise_t-shirt_product_9b85bbe8.png';
import yellowSweatshirt from '@assets/generated_images/Yellow_sweatshirt_product_a87e990b.png';
import mintHoodie from '@assets/generated_images/Mint_green_hoodie_product_1b619bea.png';
import rainbowTshirt from '@assets/generated_images/White_rainbow_t-shirt_product_b9e148d6.png';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Dream Chaser T-Shirt',
      category: 'tshirt',
      price: '29.99',
      description: 'Bold coral pink t-shirt with inspirational "make your dreams come true" print. Perfect for daily motivation.',
      image: coralTshirt,
      printfulUrl: 'https://printful.com',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: '2',
      name: 'Ambition Tee',
      category: 'tshirt',
      price: '29.99',
      description: 'Vibrant turquoise t-shirt featuring our signature motivational message. Soft, comfortable cotton blend.',
      image: turquoiseTshirt,
      printfulUrl: 'https://printful.com',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: '3',
      name: 'Dream Builder Sweatshirt',
      category: 'sweatshirt',
      price: '49.99',
      description: 'Cozy warm yellow sweatshirt perfect for cool days. Features our empowering "make your dreams come true" design.',
      image: yellowSweatshirt,
      printfulUrl: 'https://printful.com',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: '4',
      name: 'Vision Hoodie',
      category: 'sweatshirt',
      price: '54.99',
      description: 'Premium mint green hoodie with kangaroo pocket. Stay warm while chasing your goals.',
      image: mintHoodie,
      printfulUrl: 'https://printful.com',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: '5',
      name: 'Rainbow Dreams Tee',
      category: 'tshirt',
      price: '32.99',
      description: 'White t-shirt with colorful rainbow gradient print. Celebrate diversity and dreams in vibrant style.',
      image: rainbowTshirt,
      printfulUrl: 'https://printful.com',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: '6',
      name: 'Motivation Tee - Coral',
      category: 'tshirt',
      price: '29.99',
      description: 'Classic coral design that never goes out of style. Lightweight and breathable for all-day wear.',
      image: coralTshirt,
      printfulUrl: 'https://printful.com',
      sizes: ['S', 'M', 'L', 'XL'],
    },
  ];

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.category === selectedCategory)
    : mockProducts;

  return (
    <div>
      <Hero />
      
      <section id="products" className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-[Montserrat] mb-4">
            Our Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover premium quality apparel designed to inspire and motivate you every day
          </p>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
