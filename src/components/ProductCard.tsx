import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/services/productService";
import ImpactBadge from "@/components/ImpactBadge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <Link to={`/products/${product.id}`} className="block overflow-hidden aspect-square bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <ImpactBadge type={product.impactType} description={product.impactDescription} amount={product.impactAmount} />

        <Link to={`/products/${product.id}`}>
          <h3 className="font-display font-semibold text-foreground mt-2 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">{product.description}</p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div>
            <p className="text-lg font-display font-bold text-foreground">₹{product.price.toLocaleString()}</p>

          </div>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-forest rounded-full"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              toast({ title: "Added to cart! 🎁", description: product.name });
            }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;