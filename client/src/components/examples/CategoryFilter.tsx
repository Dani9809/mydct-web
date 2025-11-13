import { useState } from 'react';
import CategoryFilter from '../CategoryFilter';

export default function CategoryFilterExample() {
  const [category, setCategory] = useState<string | null>(null);

  return <CategoryFilter selectedCategory={category} onCategoryChange={setCategory} />;
}
