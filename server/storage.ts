import { type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const products: InsertProduct[] = [
      {
        name: 'Dream Chaser T-Shirt',
        category: 'tshirt',
        price: '29.99',
        description: 'Bold coral pink t-shirt with inspirational "make your dreams come true" print. Made from premium 100% cotton for ultimate comfort and durability. This shirt is perfect for daily motivation and expressing your ambitious spirit.',
        image: '/generated_images/Coral_pink_t-shirt_product_7f38a592.png',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/t-shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Ambition Tee',
        category: 'tshirt',
        price: '29.99',
        description: 'Vibrant turquoise t-shirt featuring our signature motivational message. Soft, comfortable cotton blend that keeps you inspired all day long.',
        image: '/generated_images/Turquoise_t-shirt_product_9b85bbe8.png',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/t-shirts',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        name: '"Minimalist Dream" Crewneck Sweatshirt',
        category: 'sweatshirt',
        price: '42.50',
        description: 'A classic, cozy white crewneck sweatshirt perfect for everyday wear. It features a clean, minimalist design with the motivational phrase "Make your dreams come true" printed in two distinct fonts: a modern sans-serif and an elegant script.',
        image: '/generated_images/unisex-crew-neck-sweatshirt-white.jpg',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/sweatshirts-hoodies',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: '"Bold Ambition" Block-Text Sweatshirt',
        category: 'sweatshirt',
        price: '44.00',
        description: 'Make a statement with this light pink sweatshirt. The inspirational "Make your Dreams Come true" quote is featured in a bold, dark blue, sans-serif font. Each line is set against a white block background, giving it a modern, streetwear-inspired look.',
        image: '/generated_images/unisex-crew-neck-sweatshirt-light-pink.jpg',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/sweatshirts-hoodies',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: '"Gradient Dream" Heavy-Blend Hoodie',
        category: 'sweatshirt',
        price: '48.99',
        description: 'Stay warm and motivated in this black heavy-blend hoodie. It features a stylized, multi-font design with the word "Dream" in a vibrant blue-to-white gradient and "True" in a yellow gradient. This pullover hoodie includes a classic kangaroo pocket and a drawstring hood.',
        image: '/generated_images/unisex-heavy-blend-hoodie-black.jpg',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/sweatshirts-hoodies',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Dream Builder Sweatshirt',
        category: 'sweatshirt',
        price: '49.99',
        description: 'Cozy warm yellow sweatshirt perfect for cool days. Features our empowering "make your dreams come true" design. Premium fleece interior for maximum comfort.',
        image: '/generated_images/Yellow_sweatshirt_product_a87e990b.png',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/sweatshirts-hoodies',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Vision Hoodie',
        category: 'sweatshirt',
        price: '54.99',
        description: 'Premium mint green hoodie with kangaroo pocket. Stay warm while chasing your goals. Heavy-duty construction with adjustable drawstring hood.',
        image: '/generated_images/Mint_green_hoodie_product_1b619bea.png',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/sweatshirts-hoodies',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        name: 'Rainbow Dreams Tee',
        category: 'tshirt',
        price: '32.99',
        description: 'White t-shirt with colorful rainbow gradient print. Celebrate diversity and dreams in vibrant style. Breathable fabric perfect for any season.',
        image: '/generated_images/White_rainbow_t-shirt_product_b9e148d6.png',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/t-shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Motivation Tee - Coral',
        category: 'tshirt',
        price: '29.99',
        description: 'Classic coral design that never goes out of style. Lightweight and breathable for all-day wear. The perfect daily reminder to chase your dreams.',
        image: '/generated_images/Coral_pink_t-shirt_product_7f38a592.png',
        printfulUrl: 'https://printful.com/custom-products/mens-clothing/t-shirts',
        sizes: ['S', 'M', 'L', 'XL'],
      },
    ];

    products.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
