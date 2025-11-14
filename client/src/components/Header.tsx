import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "All Products", path: "/" },
    { name: "T-Shirts", path: "/?category=tshirt" },
    { name: "Sweatshirts", path: "/?category=sweatshirt" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <h1 className="text-xl font-bold font-[Montserrat] text-primary">
              Make Your Dreams Come True
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {/* {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    location === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))} */}
          </nav>

          <div className="flex items-center gap-2">
            {/* <Button
              size="icon"
              variant="ghost"
              data-testid="button-cart"
              onClick={() => console.log('Cart clicked')}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button> */}

            <ThemeToggle />
            {/* <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button> */}
          </div>
        </div>

        {/* {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span
                  className={`block px-3 py-2 text-sm font-medium rounded-md hover-elevate ${
                    location === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        )} */}
      </div>
    </header>
  );
}
