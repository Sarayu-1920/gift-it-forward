import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const occasionToCause: Record<string, string> = {
  "Birthday": "Children's Education",
  "Anniversary": "Tree Plantation",
  "Wedding": "Clean Water",
  "Graduation": "Skill Development",
  "Festival": "Hunger Relief",
  "Thank You": "Women Empowerment",
  "Farewell": "Elder Care",
  "Baby Shower": "Child Health",
};

const occasionToIcon: Record<string, typeof TreePine> = {
  "Birthday": Gift,
  "Anniversary": Heart,
  "Wedding": Heart,
  "Graduation": GraduationCap,
  "Festival": TreePine,
  "Thank You": Heart,
  "Farewell": Package,
  "Baby Shower": Heart,
};
type Tab = "orders" | "memories" | "reveals" | "profile";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

   const handleLogout = () => {
     logout();
     window.location.href = "/login";
   };

  useEffect(() => {
    setLoadingOrders(true);
    orderService.getUserOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, []); // fetch once on mount, not per tab

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
                 const MemoryIcon = occasionToIcon[order.occasion] || Gift;
                return (
                  <div key={order.id} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-display font-semibold text-foreground">Order #{order.id}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Processing</span>
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
                        <MemoryIcon className="h-3 w-3" />
                        <span>₹{(order.totalAmount * 0.1).toFixed(2)} donated to {occasionToCause[order.occasion] || "General Cause"}</span>
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
          {activeTab === "memories" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No memories yet. Place an order to create one!
                </p>
              ) : (
                orders.map((order) => {
                  const MemoryIcon = occasionToIcon[order.occasion] || Gift;

                  return (
                    <div
                      key={order.id}
                      className="bg-card border border-border rounded-2xl p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                          <MemoryIcon className="h-6 w-6 text-secondary" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-foreground">
                            {order.occasion} for {order.receiverName}
                          </h3>

                          <p className="text-xs text-muted-foreground mt-0.5">
                            {new Date(order.orderDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>

                          <p className="text-sm text-foreground mt-2">
                            You gifted: {order.items.map((i) => i.gift.name).join(", ")}
                          </p>

                          {order.personalMessage && order.personalMessage.trim() !== "" && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              “{order.personalMessage}”
                            </p>
                          )}

                          <div className="bg-primary/5 rounded-lg px-3 py-2 mt-3">
                            <p className="text-xs text-primary font-medium">
                              <MemoryIcon className="h-3 w-3 inline mr-1" />
                              ₹{(order.totalAmount * 0.1).toFixed(2)} donated to {occasionToCause[order.occasion] || "General Cause"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}



          {/* Celebration Reveal Cards */}
          {activeTab === "reveals" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No celebration cards yet. Place an order to unlock one!
                </p>
              ) : (
                orders.map((order) => {

                  return (
                    <div key={order.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="h-5 w-5 text-primary" />
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Celebration Reveal
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-foreground">
                          Happy {order.occasion}, {order.receiverName}!
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          From {order.senderName || user?.name || "Your friend"} •{" "}
                          {new Date(order.orderDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-foreground leading-relaxed mb-4">
                          Your gift did more than just surprise you – it also created real
                          impact for someone in need.
                        </p>
                        <div className={`aspect-[3/1] rounded-xl overflow-hidden mb-3 flex flex-col items-center justify-center gap-2
                          ${order.occasion === "Birthday" ? "bg-gradient-to-br from-pink-200 to-yellow-200" :
                            order.occasion === "Anniversary" ? "bg-gradient-to-br from-rose-200 to-purple-200" :
                            order.occasion === "Graduation" ? "bg-gradient-to-br from-blue-200 to-green-200" :
                            order.occasion === "Festival" ? "bg-gradient-to-br from-orange-200 to-yellow-300" :
                            order.occasion === "Wedding" ? "bg-gradient-to-br from-pink-100 to-rose-300" :
                            order.occasion === "Baby Shower" ? "bg-gradient-to-br from-sky-200 to-pink-200" :
                            order.occasion === "Farewell" ? "bg-gradient-to-br from-slate-200 to-blue-200" :
                            order.occasion === "Thank You" ? "bg-gradient-to-br from-green-200 to-teal-200" :
                            "bg-gradient-to-br from-primary/20 to-secondary/20"}`}>
                          <Gift className="h-10 w-10 text-primary/60" />
                          <p className="text-sm font-semibold text-foreground/70">Happy {order.occasion}!</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link to={`/impact/${order.id}`}>
                            <Button variant="outline" size="sm" className="rounded-full">
                              <Eye className="h-4 w-4 mr-1" />
                              View Full Card
                            </Button>
                          </Link>

                        </div>
                      </div>
                    </div>
                  );
                })
              )}
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
                    <h2 className="font-display font-semibold text-foreground text-lg">
                      {user?.name || "User"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center py-4 border-y border-border">
                  <div>
                    <p className="text-xl font-display font-bold text-primary">
                      {orders.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-secondary">
                      ₹{orders.reduce((s, o) => s + o.totalAmount * 0.1, 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">Impact</p>
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-foreground">
                      {orders.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Memories</p>
                  </div>
                </div>

                <Link to="/impact">
                  <Button variant="outline" className="w-full rounded-full mt-2">
                    View Impact Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Button
                                  variant="ghost"
                                  className="w-full text-destructive hover:text-destructive"
                                  onClick={handleLogout}
                                >
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