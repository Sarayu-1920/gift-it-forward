import impactEducation from "@/assets/impact-education.jpg";
import impactTrees from "@/assets/impact-trees.jpg";
import { TreePine, GraduationCap, HeartHandshake } from "lucide-react";

const causes = [
  {
    icon: TreePine,
    title: "Tree Plantation",
    description: "Every eco-friendly gift plants a tree. Over 12,000 saplings and counting.",
    image: impactTrees,
    stat: "12,000+",
    statLabel: "Trees Planted",
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    description: "Book and stationery gifts fund school supplies for underprivileged children.",
    image: impactEducation,
    stat: "5,000+",
    statLabel: "Children Supported",
  },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">Transparent Impact</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Your Gifts Change Lives
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
            Every purchase includes a built-in contribution to a relevant social cause. Here's where your impact goes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {causes.map((cause, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-500">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <cause.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-primary-foreground">{cause.stat}</p>
                    <p className="text-xs text-primary-foreground/80">{cause.statLabel}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-card-foreground mb-2">{cause.title}</h3>
                <p className="text-muted-foreground font-body">{cause.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-primary/5 rounded-full px-6 py-3 border border-primary/20">
            <HeartHandshake className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Over <strong className="text-primary">₹8,00,000</strong> donated to social causes through gifts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;