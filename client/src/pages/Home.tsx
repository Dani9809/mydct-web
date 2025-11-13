import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryParams } from "@/hooks/use-query-params";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@shared/schema";

export default function Home() {
  const queryParams = useQueryParams();
  const category = queryParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', selectedCategory],
    queryFn: async () => {
      const url = selectedCategory 
        ? `/api/products?category=${selectedCategory}`
        : '/api/products';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    const url = new URL(window.location.href);
    if (category) {
      url.searchParams.set('category', category);
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url);
  };

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
          onCategoryChange={handleCategoryChange}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && products?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
