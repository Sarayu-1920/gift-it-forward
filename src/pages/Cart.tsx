import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, TreePine, GraduationCap, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const impactIcons: Record<string, typeof TreePine> = {
  tree_planting: TreePine,
  education: GraduationCap,
  ngo_support: Heart,
};

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, totalImpact, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Navbar />
        <div className="pt-24 pb-16 flex flex-col items-center justify-center text-center px-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Start adding gifts that create real impact.</p>
          <Link to="/products">
            <Button className="bg-primary text-primary-foreground hover:bg-forest rounded-full">
              Browse Gifts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Your Cart</h1>
            <p className="text-sm text-muted-foreground mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ product, quantity }) => {
                const ImpactIcon = impactIcons[product.impactType] || Heart;
                return (
                  <div key={product.id} className="bg-card border border-border rounded-2xl p-4 flex gap-4">
                    <Link to={`/products/${product.id}`} className="shrink-0">
                      <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/products/${product.id}`}>
                            <h3 className="font-display font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">{product.category} • {product.occasion}</p>
                        </div>
                        <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2 text-xs text-primary">
                        <ImpactIcon className="h-3 w-3" />
                        <span>{product.impactDescription}</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-full">
                          <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-foreground">{quantity}</span>
                          <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-display font-bold text-foreground">₹{(product.price * quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive transition-colors underline">
                Clear entire cart
              </button>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="font-display font-semibold text-foreground text-lg mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-foreground text-lg">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Impact summary */}
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mt-4">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Your Impact</p>
                  <p className="text-sm text-foreground font-medium">₹{totalImpact.toLocaleString()} will be contributed to social causes</p>
                  <p className="text-xs text-muted-foreground mt-1">Automatically included — no extra cost!</p>
                </div>

                <Link to="/checkout">
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-forest rounded-full font-semibold" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link to="/products" className="block text-center text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;