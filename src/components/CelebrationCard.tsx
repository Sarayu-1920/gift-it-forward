import { PartyPopper, TreePine, Heart } from "lucide-react";

const CelebrationCard = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-3">
              Celebration Reveal Cards
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Every Gift Tells a Beautiful Story
            </h2>
            <p className="text-muted-foreground font-body mb-6 leading-relaxed">
              When someone receives your gift, they also get a Celebration Reveal Card — a personalized message showing the positive impact their gift created. Beneficiaries upload thank-you photos, creating an emotional loop of gratitude.
            </p>
            <ul className="space-y-4">
              {[
                { icon: PartyPopper, text: "Personalized occasion greeting" },
                { icon: Heart, text: "Thank-you photos from beneficiaries" },
                { icon: TreePine, text: "Impact details for your contribution" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mock Reveal Card */}
          <div className="flex justify-center">
            <div className="relative w-80 animate-float">
              <div className="bg-background rounded-3xl shadow-2xl border border-border overflow-hidden">
                <div className="bg-primary p-6 text-center">
                  <PartyPopper className="h-10 w-10 text-secondary mx-auto mb-2" />
                  <h3 className="font-display text-xl font-bold text-primary-foreground">Happy Birthday, Priya! 🎂</h3>
                  <p className="text-primary-foreground/70 text-sm mt-1">From Arjun, with love</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-cream rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your gift also helped</p>
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <TreePine className="h-5 w-5" />
                      <span className="font-display font-bold">Plant 2 Trees</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">in Rajasthan, India</p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border">
                    <div className="bg-muted h-32 flex items-center justify-center">
                      <div className="text-center">
                        <Heart className="h-6 w-6 text-secondary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Thank-you photo from beneficiary</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-xs text-muted-foreground italic">
                    "Thank you for helping us grow! 🌱" — Green Earth Foundation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebrationCard;