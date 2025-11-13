import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categories = [
  { id: null, label: "All Products" },
  { id: "tshirt", label: "T-Shirts" },
  { id: "sweatshirt", label: "Sweatshirts" },
];

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id || "all"}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => {
            onCategoryChange(category.id);
            console.log('Category changed to:', category.id);
          }}
          data-testid={`button-category-${category.id || 'all'}`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
