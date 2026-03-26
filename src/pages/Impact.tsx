import { TreePine, GraduationCap, Heart, Users, TrendingUp, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";

const stats = [
  { icon: TreePine, label: "Trees Planted", value: "12,450+", color: "text-primary", bg: "bg-primary/10" },
  { icon: GraduationCap, label: "Education Funded", value: "₹4.2L", color: "text-secondary", bg: "bg-secondary/10" },
  { icon: Heart, label: "NGOs Supported", value: "28", color: "text-destructive", bg: "bg-destructive/10" },
  { icon: Users, label: "Beneficiaries", value: "8,300+", color: "text-primary", bg: "bg-primary/10" },
  { icon: TrendingUp, label: "Total Donated", value: "₹8.7L", color: "text-secondary", bg: "bg-secondary/10" },
  { icon: Globe, label: "States Reached", value: "14", color: "text-forest", bg: "bg-forest/10" },
];

const causes = [
  {
    title: "Tree Plantation Drive",
    partner: "Grow-Trees Foundation",
    description: "Every eco-friendly gift contributes to reforestation across India. Saplings are planted in Rajasthan, Maharashtra, and Karnataka.",
    progress: 78,
    target: "15,000 trees",
    current: "12,450 trees",
    icon: TreePine,
    color: "bg-primary",
  },
  {
    title: "Rural Education Initiative",
    partner: "Teach For India & Local NGOs",
    description: "Book and stationery purchases fund school supplies, libraries, and teacher training in underserved communities.",
    progress: 62,
    target: "₹7L",
    current: "₹4.2L",
    icon: GraduationCap,
    color: "bg-secondary",
  },
  {
    title: "Women Artisan Empowerment",
    partner: "Self Employed Women's Association",
    description: "Handmade and fashion gifts directly support women artisans, providing fair wages and skill development.",
    progress: 85,
    target: "500 artisans",
    current: "425 artisans",
    icon: Heart,
    color: "bg-destructive",
  },
];

const timeline = [
  { date: "Feb 2026", event: "Crossed 12,000 trees planted milestone" },
  { date: "Jan 2026", event: "Partnered with 5 new NGOs across South India" },
  { date: "Dec 2025", event: "Festival season: ₹2.1L donated in one month" },
  { date: "Nov 2025", event: "Launched Celebration Reveal Cards feature" },
  { date: "Oct 2025", event: "Reached 50,000 gifts sold with impact" },
];

const Impact = () => {
    const { orderId } = useParams();
    const [orderImpact, setOrderImpact] = useState<any[]>([]);
    const [impactLoading, setImpactLoading] = useState(false);

    useEffect(() => {
      if (!orderId) return;
      setImpactLoading(true);
      api.get(`/orders/impact/${orderId}`)
        .then((res) => setOrderImpact(res.data))
        .catch(() => {})
        .finally(() => setImpactLoading(false));
    }, [orderId]);
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-20 pb-16">
      {orderId && (
        <div className="container mx-auto px-4 pt-8 pb-4 max-w-xl">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">🎉 Your Order's Impact</h2>
            {impactLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : orderImpact.map((record, i) => (
              <div key={i}>
                <p className="text-muted-foreground text-sm">Your gift contributed to</p>
                <p className="text-2xl font-bold text-primary mt-1">{record.cause}</p>
                <p className="text-muted-foreground mt-2">₹{record.impactAmount.toLocaleString()} donated</p>
              </div>
            ))}
          </div>
        </div>
      )}
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">Transparency Report</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Your Impact, <span className="text-primary">Made Visible</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every gift on Gift It Forward includes a built-in charitable contribution. Here's exactly where your impact goes.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="container mx-auto px-4 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active causes */}
        <div className="container mx-auto px-4 mt-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-10">Active Causes</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {causes.map((cause, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${cause.color}/10 flex items-center justify-center shrink-0`}>
                    <cause.icon className={`h-6 w-6 ${cause.color === "bg-primary" ? "text-primary" : cause.color === "bg-secondary" ? "text-secondary" : "text-destructive"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground text-lg">{cause.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Partner: {cause.partner}</p>
                    <p className="text-sm text-muted-foreground mt-2">{cause.description}</p>

                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-foreground font-medium">{cause.current}</span>
                        <span className="text-muted-foreground">Goal: {cause.target}</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cause.color} transition-all duration-1000`}
                          style={{ width: `${cause.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{cause.progress}% complete</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="container mx-auto px-4 mt-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-10">Impact Timeline</h2>
          <div className="max-w-xl mx-auto">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary">{item.date}</p>
                  <p className="text-sm text-foreground mt-0.5">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Impact;