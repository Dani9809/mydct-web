import ProductCard from '../ProductCard';
import coralTshirt from '@assets/generated_images/Coral_pink_t-shirt_product_7f38a592.png';

export default function ProductCardExample() {
  const mockProduct = {
    id: '1',
    name: 'Dream Chaser T-Shirt',
    category: 'tshirt',
    price: '29.99',
    description: 'Soft cotton t-shirt with bold "make your dreams come true" print',
    image: coralTshirt,
    printfulUrl: 'https://printful.com',
    sizes: ['S', 'M', 'L', 'XL'],
  };

  return <ProductCard product={mockProduct} />;
}
