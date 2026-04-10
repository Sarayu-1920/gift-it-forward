import { Gift, Menu, ShoppingBag, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Gift className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Gift It Forward</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <a href="/#impact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Our Impact</a>

          <Link to="/products" className="relative">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-forest">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Shop Gifts
            </Button>
          </Link>

          {/* Cart indicator */}
          <Link to="/cart" className="relative">
            <ShoppingBag className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <User className="h-4 w-4" />
                {user?.name?.split(" ")[0]}
              </Link>
             <button onClick={() => { window.location.href = "/login"; }} className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-3">
            <a href="/#how-it-works" className="text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>How It Works</a>
            <Link to="/products" className="text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>Shop</Link>
            <a href="/#impact" className="text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>Our Impact</a>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <button className="text-sm font-medium text-destructive py-2 text-left" onClick={() => { logout(); window.location.href = "/login"; }}>Sign Out</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="bg-primary text-primary-foreground w-full">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;