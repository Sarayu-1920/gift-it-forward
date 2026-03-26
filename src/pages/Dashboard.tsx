import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package, Heart, Image, User, LogOut, Calendar, TreePine, GraduationCap,
  ChevronRight, Gift, Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { orderService, Order } from "@/services/orderService";


const impactIcons: Record<string, typeof TreePine> = {
  tree_planting: TreePine,
  TREE: TreePine,
  education: GraduationCap,
  EDUCATION: GraduationCap,
  ngo_support: Heart,
  FOOD: Heart,
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

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (activeTab === "orders") {
      setLoadingOrders(true);
      orderService.getUserOrders()
        .then(setOrders)
        .catch(() => setOrders([]))  // silently fail, show empty
        .finally(() => setLoadingOrders(false));
    }
  }, [activeTab]);

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
              {loadingOrders ? (
                <p className="text-muted-foreground text-sm">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-muted-foreground text-sm">No orders found.</p>
              ) : orders.map((order) => {
                const ImpactIcon = impactIcons[order.items[0]?.gift.impactType] || Heart;
                return (
                  <div key={order.id} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-display font-semibold text-foreground">Order #{order.id}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          {new Date(order.orderDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.items.map(i => i.gift.name).join(", ")}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-primary">
                        <ImpactIcon className="h-3.5 w-3.5" />
                        <span>₹{(order.totalAmount * 0.1).toFixed(2)} impact contributed</span>
                      </div>
                      <p className="font-display font-bold text-foreground">
                        ₹{order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Memory Stack */}
          {activeTab === "memories" && ( <p className="text-muted-foreground text-sm">Memory Stack coming soon.</p>
                                         )}

          {/* Celebration Reveal Cards */}
          {activeTab === "reveals" && (
            <p className="text-muted-foreground text-sm">Celebration Cards coming soon.</p>
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
                    <p className="text-xl font-display font-bold text-primary">{orders.length}</p>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-secondary">₹{orders.reduce((s, o) => s + o.impactAmount, 0)}</p>
                    <p className="text-xs text-muted-foreground">Impact</p>
                  </div>
                  <div>

                    <p className="text-xl font-display font-bold text-foreground">{0}</p>
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