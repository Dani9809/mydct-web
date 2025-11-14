import type { Express } from "express";
import { createServer, type Server } from "http";
// We import your existing Product type
import type { Product } from "../shared/schema";

// --- Printful API Configuration ---
const PRINTFUL_API_URL = "https://api.printful.com";
const API_KEY = process.env.PRINTFUL_API_KEY;

if (!API_KEY) {
  console.warn("Missing PRINTFUL_API_KEY environment variable.");
}

const apiHeaders = {
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// --- Data Transformation ---

/**
 * Maps Printful's product type to your app's "category".
 * You may need to adjust this based on your Printful product types.
 */
function mapPrintfulTypeToCategory(type: string): string {
  const lowerType = type.toLowerCase();
  if (lowerType.includes('shirt')) return 'tshirt';
  if (lowerType.includes('sweatshirt')) return 'sweatshirt';
  if (lowerType.includes('hoodie')) return 'sweatshirt';
  return 'tshirt'; // Default category
}

/**
 * Transforms a single detailed product from Printful (from /store/products/:id)
 * into the 'Product' shape your client-side code expects.
 */
function transformPrintfulProduct(pfProduct: any): Product {
  const syncProduct = pfProduct.result.sync_product;
  const syncVariants = pfProduct.result.sync_variants;

  // Extract all unique sizes from the variants
  // --- THIS IS THE CORRECTED LINE ---
  const sizes = Array.from(new Set(syncVariants.map((v: any) => v.size).filter(Boolean) as string[]));

  // Use the first variant for the main price and image, or fallback to product thumbnail
  const firstVariant = syncVariants[0];
  const price = firstVariant?.price || "0.00";
  
  // Find the best image. Look for a variant image first, then fallback to product thumbnail.
  const firstVariantImage = firstVariant?.files.find((f: any) => f.type === 'preview')?.preview_url;
  const imageUrl = firstVariantImage || syncProduct.thumbnail_url;

  return {
    id: syncProduct.id.toString(), // Ensure ID is a string
    name: syncProduct.name,
    category: mapPrintfulTypeToCategory(syncProduct.product_type_name || ""),
    price: price, // Your schema expects a decimal as string
    description: `Official ${syncProduct.name}.`, // Printful API doesn't have a simple description field, so we create one.
    image: imageUrl,
    printfulUrl: `https://www.printful.com/custom-products/store/product/${syncProduct.id}`, // Generate a plausible URL
    sizes: sizes,
  };
}

// --- API Routes ---

export async function registerRoutes(app: Express): Promise<Server> {
  
  // --- Get ALL Products ---
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;

      // 1. Fetch the list of all product IDs from Printful
      const listResponse = await fetch(`${PRINTFUL_API_URL}/store/products`, {
        headers: apiHeaders,
      });
      if (!listResponse.ok) throw new Error('Failed to fetch product list');
      const listData = await listResponse.json();
      
      const productIds = listData.result.map((p: any) => p.id);

      // 2. Fetch details for EACH product in parallel
      // This is needed to get price, sizes, and category type
      const detailPromises = productIds.map((id: number) => 
        fetch(`${PRINTFUL_API_URL}/store/products/${id}`, { headers: apiHeaders })
          .then(res => res.json())
      );
      
      const detailedProductResults = await Promise.all(detailPromises);
      
      // 3. Transform all products to match your 'Product' schema
      let allProducts: Product[] = detailedProductResults.map(transformPrintfulProduct);

      // 4. If a category filter is applied, filter the results
      if (category) {
        const products = allProducts.filter(p => p.category === category);
        return res.json(products);
      }

      // 5. Otherwise, return all products
      return res.json(allProducts);

    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // --- Get a SINGLE Product by ID ---
  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // 1. Fetch the detailed product from Printful
      const productResponse = await fetch(`${PRINTFUL_API_URL}/store/products/${id}`, {
        headers: apiHeaders,
      });

      if (!productResponse.ok) {
        if (productResponse.status === 404) {
          return res.status(404).json({ error: 'Product not found' });
        }
        throw new Error('Failed to fetch product details');
      }

      const productData = await productResponse.json();

      // 2. Transform it and send it to the client
      const product = transformPrintfulProduct(productData);
      return res.json(product);
      
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}