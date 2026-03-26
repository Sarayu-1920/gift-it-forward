import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

const Checkout = () => {
  const { items, totalPrice, totalImpact, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
   const today = new Date().toISOString().split("T")[0];
const [form, setForm] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  paymentMethod: "upi",
  occasion: "",
  personalMessage: "",
  deliveryDate: "",
});

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.pincode.trim() || !form.occasion || !form.deliveryDate) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        totalAmount: totalPrice,
        items: items.map(({ product, quantity }) => ({
          giftId: product.id,
          quantity,
        })),
      };
      const response = await api.post("/orders", payload);
      clearCart();
      toast({ title: "Order placed! 🎉", description: `₹${totalImpact.toLocaleString()} donated to a good cause.` });
      navigate(`/impact/order/${response.data.id}`);
    } catch (error: any) {
      toast({ title: "Order failed", description: error.response?.data?.message || "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Navbar />
        <div className="pt-24 pb-16 text-center px-4">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Nothing to Checkout</h1>
          <p className="text-muted-foreground mb-4">Add some gifts to your cart first.</p>
          <Link to="/products"><Button className="rounded-full">Browse Gifts</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Navbar />
        <div className="pt-24 pb-16 text-center px-4">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Sign In to Checkout</h1>
          <p className="text-muted-foreground mb-4">Please sign in to complete your order.</p>
          <Link to="/login"><Button className="rounded-full">Sign In</Button></Link>
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
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Address form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Delivery Address
                  </h2>
                  {/* Occasion & Message */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="font-display font-semibold text-foreground text-lg mb-4">Gift Details</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="occasion">Occasion *</Label>
                        <select
                          id="occasion"
                          value={form.occasion}
                          onChange={(e) => update("occasion", e.target.value)}
                          className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
                        >
                          <option value="">Select occasion</option>
                          {["Birthday","Anniversary","Wedding","Graduation","Festival","Thank You","Farewell","Baby Shower"].map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="deliveryDate">Delivery Date *</Label>
                        <input
                          type="date"
                          id="deliveryDate"
                          min={today}
                          value={form.deliveryDate}
                          onChange={(e) => update("deliveryDate", e.target.value)}
                          className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
                        />
                      </div>
                      <div>
                        <Label htmlFor="personalMessage">Personal Message</Label>
                        <textarea
                          id="personalMessage"
                          value={form.personalMessage}
                          onChange={(e) => update("personalMessage", e.target.value)}
                          rows={3}
                          placeholder="Write a message for the recipient..."
                          className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground resize-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="mt-1" placeholder="Recipient's full name" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1" placeholder="10-digit phone number" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} className="mt-1" placeholder="House no., street, area" />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1" placeholder="City" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} className="mt-1" placeholder="State" />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input id="pincode" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className="mt-1" placeholder="6-digit pincode" />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {[
//                       { value: "cod", label: "Cash on Delivery", desc: "Pay before delivery" },
                      { value: "upi", label: "UPI Payment", desc: "GPay, PhonePe, Paytm" },
                      { value: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          form.paymentMethod === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={opt.value}
                          checked={form.paymentMethod === opt.value}
                          onChange={(e) => update("paymentMethod", e.target.value)}
                          className="accent-primary"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                  <h2 className="font-display font-semibold text-foreground text-lg mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-4">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate mr-2">{product.name} × {quantity}</span>
                        <span className="text-foreground shrink-0">₹{(product.price * quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-primary font-medium">Free</span>
                    </div>
                    <div className="flex justify-between font-display font-bold text-foreground text-lg pt-2 border-t border-border">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/15 rounded-xl p-3 mt-4">
                    <p className="text-xs font-semibold text-primary">Impact included: ₹{totalImpact.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Auto-donated to social causes</p>
                  </div>

                  <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-forest rounded-full font-semibold" size="lg" disabled={loading}>
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>

                  <div className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;