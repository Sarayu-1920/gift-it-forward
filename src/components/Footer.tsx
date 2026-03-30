import { Gift, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-6 w-6 text-secondary" />
              <span className="font-display text-xl font-bold">Gift It Forward</span>
            </div>
            <p className="text-primary-foreground/60 font-body max-w-sm text-sm leading-relaxed">
              Transforming everyday gifting into an effortless act of social impact. Every gift creates a ripple of positive change.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/products" className="hover:text-secondary transition-colors">All Gifts</Link></li>
              <li><Link to="/products?occasion=Birthday" className="hover:text-secondary transition-colors">Occasions</Link></li>
              <li><Link to="/products?category=Electronics" className="hover:text-secondary transition-colors">Categories</Link></li>
              <li><Link to="/products?category=Eco-Friendly" className="hover:text-secondary transition-colors">Eco-Friendly</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="hover:text-secondary transition-colors">Our Impact</Link></li>
              <li><Link to="/impact" className="hover:text-secondary transition-colors">Partner NGOs</Link></li>
              <li><Link to="/#contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40 flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-secondary" /> by Gift It Forward © 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;