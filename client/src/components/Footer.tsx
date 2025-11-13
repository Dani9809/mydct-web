import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <footer className="border-t bg-muted/30 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-bold font-[Montserrat] text-lg mb-4">About Make Your Dream Come True</h3>
            <p className="text-muted-foreground text-sm">
              We create motivational clothing to inspire you every day. Each piece
              is designed to remind you to chase your dreams and make them reality.
            </p>
          </div>

          <div>
            <h3 className="font-bold font-[Montserrat] text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" data-testid="link-footer-shop">
                  <span className="text-sm text-muted-foreground hover-elevate px-2 py-1 rounded-md inline-block">
                    Shop All
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/?category=tshirt" data-testid="link-footer-tshirts">
                  <span className="text-sm text-muted-foreground hover-elevate px-2 py-1 rounded-md inline-block">
                    T-Shirts
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/?category=sweatshirt" data-testid="link-footer-sweatshirts">
                  <span className="text-sm text-muted-foreground hover-elevate px-2 py-1 rounded-md inline-block">
                    Sweatshirts
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold font-[Montserrat] text-lg mb-4">Stay Inspired</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get motivational updates and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-subscribe">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Make Your Dream Come True. Powered by{" "}
            <a
              href="https://printful.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover-elevate px-1 rounded"
              data-testid="link-printful"
            >
              Printful.
            </a>
          </p>
          <p>
            Made with 💙 by {""}
            <a
              href="https://www.moniva.snap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover-elevate px-1 rounded"
              data-testid="link-moniva-snap"
              >
              Moniva Snap.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
