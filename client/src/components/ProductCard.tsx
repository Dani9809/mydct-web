import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 group">
      <Link href={`/product/${product.id}`} data-testid={`link-product-${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
          />
        </div>
      </Link>
      <div className="p-6">
        <h3 className="font-semibold font-[Montserrat] text-lg mb-2" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
            ${product.price}
          </span>
          <Link href={`/product/${product.id}`}>
            <Button size="sm" data-testid={`button-view-${product.id}`}>
              View Product
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
