import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CATEGORIES = ["Electronics", "Fashion", "Books", "Home Décor", "Personalized", "Eco-Friendly", "Luxury", "Handmade"];
const OCCASIONS = ["Birthday", "Anniversary", "Graduation", "Festival"];
const SORT_OPTIONS = [
  { value: "", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

interface FilterSidebarProps {
  category: string;
  occasion: string;
  sort: string;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (v: string) => void;
  onOccasionChange: (v: string) => void;
  onSortChange: (v: string) => void;
  onMinPriceChange: (v: string) => void;
  onMaxPriceChange: (v: string) => void;
  onClear: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const FilterSidebar = ({
  category, occasion, sort, minPrice, maxPrice,
  onCategoryChange, onOccasionChange, onSortChange,
  onMinPriceChange, onMaxPriceChange, onClear,
  mobileOpen, onMobileClose,
}: FilterSidebarProps) => {
  const hasFilters = category || occasion || sort || minPrice || maxPrice;

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground text-lg">Filters</h3>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-muted-foreground">
              Clear All
            </Button>
          )}
          {onMobileClose && (
            <button onClick={onMobileClose} className="md:hidden text-muted-foreground">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Sort By</Label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Category</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(category === c ? "" : c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                category === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Occasion</Label>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              onClick={() => onOccasionChange(occasion === o ? "" : o)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                occasion === o
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-card text-muted-foreground border-border hover:border-secondary/30"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Price Range (₹)</Label>
        <select
          onChange={(e) => {
            const [min, max] = e.target.value.split("-");
            onMinPriceChange(min);
            onMaxPriceChange(max);
          }}
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="-">All Prices</option>
          <option value="0-500">Under ₹500</option>
          <option value="500-1000">₹500 – ₹1,000</option>
          <option value="1000-2500">₹1,000 – ₹2,500</option>
          <option value="2500-5000">₹2,500 – ₹5,000</option>
          <option value="5000-99999">Above ₹5,000</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block w-64 shrink-0">{content}</aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={onMobileClose} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto animate-fade-in">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;