import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import coralTshirt from '@assets/generated_images/Coral_pink_t-shirt_product_7f38a592.png';
import turquoiseTshirt from '@assets/generated_images/Turquoise_t-shirt_product_9b85bbe8.png';
import yellowSweatshirt from '@assets/generated_images/Yellow_sweatshirt_product_a87e990b.png';
import mintHoodie from '@assets/generated_images/Mint_green_hoodie_product_1b619bea.png';
import rainbowTshirt from '@assets/generated_images/White_rainbow_t-shirt_product_b9e148d6.png';

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Dream Chaser T-Shirt',
      category: 'tshirt',
      price: '29.99',
      description: 'Bold coral pink t-shirt with inspirational "make your dreams come true" print. Made from premium 100% cotton for ultimate comfort and durability. This shirt is perfect for daily motivation and expressing your ambitious spirit.',
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
  ];

  const product = mockProducts.find((p) => p.id === params?.id) || mockProducts[0];
  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleBuyNow = () => {
    window.open(product.printfulUrl, '_blank');
    console.log('Redirecting to Printful:', product.printfulUrl);
  };

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
