import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-gifts.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful gift boxes in earthy tones"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Heart className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Every gift creates impact
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            Gift with
            <span className="text-secondary"> Purpose,</span>
            <br />
            Celebrate with
            <span className="text-secondary"> Heart</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 font-body mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Every gift you send includes a built-in charitable contribution.
            No extra cost, no extra effort — just meaningful impact, automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <Link to="/products">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-gold text-base px-8 py-6 rounded-full font-semibold">
                Explore Gifts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/impact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 rounded-full">
                See Our Impact
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-secondary">50K+</p>
              <p className="text-xs text-primary-foreground/60">Gifts Sent</p>
            </div>
            <div className="w-px h-10 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-secondary">12K+</p>
              <p className="text-xs text-primary-foreground/60">Trees Planted</p>
            </div>
            <div className="w-px h-10 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-secondary">₹8L+</p>
              <p className="text-xs text-primary-foreground/60">Donated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;