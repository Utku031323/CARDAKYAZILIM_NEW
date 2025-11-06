import { Package, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Package className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-lg sm:text-xl font-bold text-foreground">Çardak Paketleme</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#hizmetler" className="text-foreground hover:text-primary transition-colors">
            Hizmetler
          </a>
          <a href="#fiyatlar" className="text-foreground hover:text-primary transition-colors">
            Fiyatlar
          </a>
          <a href="#avantajlar" className="text-foreground hover:text-primary transition-colors">
            Avantajlar
          </a>
          <a href="#iletisim" className="text-foreground hover:text-primary transition-colors">
            İletişim
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <Button variant="outline" size="sm" className="lg:size-default" asChild>
            <Link to="/teklif-al">Teklif Al</Link>
          </Button>
          <Button size="sm" className="lg:size-default" asChild>
            <Link to="/basla">Başla</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="#hizmetler"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hizmetler
            </a>
            <a
              href="#fiyatlar"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Fiyatlar
            </a>
            <a
              href="#avantajlar"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Avantajlar
            </a>
            <a
              href="#iletisim"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              İletişim
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" asChild>
                <Link to="/teklif-al">Teklif Al</Link>
              </Button>
              <Button asChild>
                <Link to="/basla">Başla</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;