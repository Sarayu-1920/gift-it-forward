import { Gift, Heart, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Gift,
    title: "Choose a Gift",
    description: "Browse our curated collection of gifts across categories — electronics, fashion, books, eco-friendly, and more.",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: Heart,
    title: "Impact Built In",
    description: "A portion of every purchase is automatically donated to a cause matched to the occasion — no extra cost to you.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Sparkles,
    title: "Celebrate & Share",
    description: "The receiver gets a Celebration Reveal Card with a thank-you from beneficiaries. Every gift tells a story.",
    color: "bg-forest text-forest-foreground",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">Simple & Meaningful</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
              )}

              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <step.icon className="h-10 w-10" />
              </div>

              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;