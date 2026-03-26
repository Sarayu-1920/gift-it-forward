import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package, Heart, Image, User, LogOut, Calendar, TreePine, GraduationCap,
  ChevronRight, Gift, Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

// Mock data for dashboard
const MOCK_ORDERS = [
  { id: "ORD-1001", date: "2025-12-15", status: "Delivered", total: 2499, items: ["Handcrafted Bamboo Watch"], impactType: "tree_planting", impactAmount: 150 },
  { id: "ORD-1002", date: "2026-01-20", status: "Delivered", total: 3498, items: ["Classic Literature Collection", "Organic Tea Gift Set"], impactType: "education", impactAmount: 255 },
  { id: "ORD-1003", date: "2026-02-10", status: "Shipped", total: 1899, items: ["Artisan Silk Scarf"], impactType: "ngo_support", impactAmount: 120 },
];

const MOCK_MEMORIES = [
  { id: 1, occasion: "Mom's Birthday", date: "2025-12-15", gift: "Handcrafted Bamboo Watch", recipient: "Mom", impact: "2 trees planted", note: "She loved the watch! The card about tree planting made her day." },
  { id: 2, occasion: "Best Friend's Graduation", date: "2026-01-20", gift: "Classic Literature Collection", recipient: "Arjun", impact: "3 books donated to school", note: "He said it was the most thoughtful gift ever." },
  { id: 3, occasion: "Festival Gift Exchange", date: "2026-02-10", gift: "Artisan Silk Scarf", recipient: "Priya", impact: "Women artisan empowered", note: "Beautiful craftsmanship, she wears it everywhere." },
];

const MOCK_REVEAL_CARDS = [
  { id: 1, orderId: "ORD-1001", beneficiary: "Grow-Trees Foundation", message: "Thank you! Your gift helped plant 2 trees in Rajasthan. Here's a photo of your saplings growing.", photoUrl: "/placeholder.svg", date: "2026-01-05" },
  { id: 2, orderId: "ORD-1002", beneficiary: "Rural Education NGO", message: "3 books have been added to the Sunrise School library. The students send their gratitude!", photoUrl: "/placeholder.svg", date: "2026-02-01" },
];

const impactIcons: Record<string, typeof TreePine> = {
  tree_planting: TreePine,
  education: GraduationCap,
  ngo_support: Heart,
};

const statusColors: Record<string, string> = {
  Delivered: "bg-primary/10 text-primary",
  Shipped: "bg-secondary/10 text-secondary",
  Processing: "bg-muted text-muted-foreground",
};

type Tab = "orders" | "memories" | "reveals" | "profile";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  const tabs: { key: Tab; label: string; icon: typeof Package }[] = [
    { key: "orders", label: "Order History", icon: Package },
    { key: "memories", label: "Memory Stack", icon: Image },
    { key: "reveals", label: "Celebration Cards", icon: Gift },
    { key: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome back, {user?.name || "User"}</p>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Order History */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => {
                const ImpactIcon = impactIcons[order.impactType] || Heart;
                return (
                  <div key={order.id} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-display font-semibold text-foreground">{order.id}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          {order.date}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-primary">
                        <ImpactIcon className="h-3.5 w-3.5" />
                        <span>₹{order.impactAmount} impact contributed</span>
                      </div>
                      <p className="font-display font-bold text-foreground">₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Memory Stack */}
          {activeTab === "memories" && (
            <div className="space-y-4">
              {MOCK_MEMORIES.map((memory) => (
                <div key={memory.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <Heart className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground">{memory.occasion}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {memory.date} • Gift to {memory.recipient}
                      </p>
                      <p className="text-sm text-foreground mt-2">{memory.gift}</p>
                      <div className="bg-primary/5 rounded-lg px-3 py-2 mt-2">
                        <p className="text-xs text-primary font-medium">🌱 {memory.impact}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 italic">"{memory.note}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Celebration Reveal Cards */}
          {activeTab === "reveals" && (
            <div className="space-y-4">
              {MOCK_REVEAL_CARDS.map((card) => (
                <div key={card.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-5 w-5 text-primary" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Celebration Reveal</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground">From {card.beneficiary}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Order {card.orderId} • {card.date}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-foreground leading-relaxed mb-4">{card.message}</p>
                    <div className="aspect-video rounded-xl bg-muted overflow-hidden mb-3">
                      <img src={card.photoUrl} alt="Beneficiary thank you" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View Full Card
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <div className="max-w-lg">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground text-lg">{user?.name || "User"}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center py-4 border-y border-border">
                  <div>
                    <p className="text-xl font-display font-bold text-primary">{MOCK_ORDERS.length}</p>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-secondary">₹{MOCK_ORDERS.reduce((s, o) => s + o.impactAmount, 0)}</p>
                    <p className="text-xs text-muted-foreground">Impact</p>
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-foreground">{MOCK_MEMORIES.length}</p>
                    <p className="text-xs text-muted-foreground">Memories</p>
                  </div>
                </div>

                <Link to="/impact">
                  <Button variant="outline" className="w-full rounded-full mt-2">
                    View Impact Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Button variant="ghost" className="w-full text-destructive hover:text-destructive" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;