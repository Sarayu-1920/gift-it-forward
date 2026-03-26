import { Laptop, Shirt, BookOpen, Home, Leaf, Gem, Palette, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: Laptop, name: "Electronics", count: 120, color: "from-primary/10 to-primary/5" },
  { icon: Shirt, name: "Fashion", count: 85, color: "from-secondary/10 to-secondary/5" },
  { icon: BookOpen, name: "Books", count: 200, color: "from-forest/10 to-forest/5" },
  { icon: Home, name: "Home Décor", count: 95, color: "from-primary/10 to-primary/5" },
  { icon: Heart, name: "Personalized", count: 60, color: "from-secondary/10 to-secondary/5" },
  { icon: Leaf, name: "Eco-Friendly", count: 75, color: "from-forest/10 to-forest/5" },
  { icon: Gem, name: "Luxury", count: 40, color: "from-primary/10 to-primary/5" },
  { icon: Palette, name: "Handmade", count: 110, color: "from-secondary/10 to-secondary/5" },
];

const GiftCategories = () => {
  const navigate = useNavigate();
  return (
    <section id="categories" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">Curated Collections</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Gift Categories
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Find the perfect gift for every occasion — birthdays, anniversaries, graduations, festivals, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              className={`group relative bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-center border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background/80 mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm md:text-base">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.count}+ items</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftCategories;