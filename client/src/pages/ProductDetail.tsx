import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: ['/api/products', params?.id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${params?.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    },
    enabled: !!params?.id,
  });

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  const relatedProducts = allProducts?.filter((p) => p.id !== product?.id).slice(0, 3) || [];

  const handleBuyNow = () => {
    if (product) {
      window.open(product.printfulUrl, '_blank');
      console.log('Redirecting to Printful:', product.printfulUrl);
    }
  };

  if (productLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-lg bg-muted animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-12 bg-muted animate-pulse rounded" />
            <div className="h-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link href="/">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" data-testid="link-back">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid="img-product-detail"
          />
        </div>

        <div className="flex flex-col justify-center">
          <Badge className="w-fit mb-4" data-testid="badge-category">
            {product.category === 'tshirt' ? 'T-Shirt' : 'Sweatshirt'}
          </Badge>
          
          <h1 className="text-4xl font-bold font-[Montserrat] mb-4" data-testid="text-product-name">
            {product.name}
          </h1>
          
          <p className="text-3xl font-bold text-primary mb-6" data-testid="text-product-price">
            ${product.price}
          </p>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <Card className="p-6 mb-6">
            <h3 className="font-semibold font-[Montserrat] mb-4">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => {
                    setSelectedSize(size);
                    console.log('Size selected:', size);
                  }}
                  data-testid={`button-size-${size}`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </Card>

          <Button
            size="lg"
            className="w-full text-lg"
            onClick={handleBuyNow}
            disabled={!selectedSize}
            data-testid="button-buy-now"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Buy on Printful
          </Button>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            You'll be redirected to Printful.com to complete your order
          </p>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold font-[Montserrat] mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
