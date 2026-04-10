import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ImpactBadge from "@/components/ImpactBadge";
import { Button } from "@/components/ui/button";
import { productService, Product } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productService.getProductById(Number(id)).then(setProduct).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-20"><Loader text="Loading product details..." /></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-24 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-primary underline mt-2 inline-block">Browse all gifts</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Gifts
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-semibold tracking-widest text-secondary uppercase">{product.category}</span>
                <span className="text-xs text-muted-foreground mx-2">•</span>
                <span className="text-xs text-muted-foreground">{product.occasion}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{product.name}</h1>



              <p className="text-2xl font-display font-bold text-foreground mb-4">₹{product.price.toLocaleString()}</p>

              <p className="text-muted-foreground font-body leading-relaxed mb-6">{product.description}</p>

              {/* Impact breakdown */}
              <ImpactBadge
                type={product.impactType}
                description={product.impactDescription}
                amount={product.impactAmount}
                size="md"
              />

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-forest rounded-full font-semibold"
                  onClick={() => { addToCart(product, quantity); toast({ title: "Added to cart! 🎁", description: `${quantity}× ${product.name}` }); }}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart — ₹{(product.price * quantity).toLocaleString()}
                </Button>
              </div>

              {product.inStock ? (
                <p className="text-xs text-primary mt-3 font-medium">✓ In Stock</p>
              ) : (
                <p className="text-xs text-destructive mt-3 font-medium">Out of Stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;