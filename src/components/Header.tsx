import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Ana sayfadaysa scroll yap, değilse ana sayfaya yönlendir
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();

    // Eğer ana sayfada değilsek, önce ana sayfaya yönlendir
    if (location.pathname !== '/') {
      navigate('/');
      // Sayfa yüklendiğinde hash'e scroll yapması için setTimeout kullan
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Ana sayfadaysak direkt hash'e scroll yap
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 w-full bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <button onClick={handleLogoClick} className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0">
          <img src="/chardak-logo.svg" alt="Chardak Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <h1 className="text-lg sm:text-xl font-bold text-foreground">Chardak</h1>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#hizmetler" onClick={(e) => handleHashNavigation(e, '#hizmetler')} className="text-foreground hover:text-primary transition-colors cursor-pointer">
            Hizmetler
          </a>
          <a href="#fiyatlar" onClick={(e) => handleHashNavigation(e, '#fiyatlar')} className="text-foreground hover:text-primary transition-colors cursor-pointer">
            Fiyatlar
          </a>
          <a href="#avantajlar" onClick={(e) => handleHashNavigation(e, '#avantajlar')} className="text-foreground hover:text-primary transition-colors cursor-pointer">
            Avantajlar
          </a>
          <a href="#iletisim" onClick={(e) => handleHashNavigation(e, '#iletisim')} className="text-foreground hover:text-primary transition-colors cursor-pointer">
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
              className="block text-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                handleHashNavigation(e, '#hizmetler');
                setIsMenuOpen(false);
              }}
            >
              Hizmetler
            </a>
            <a
              href="#fiyatlar"
              className="block text-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                handleHashNavigation(e, '#fiyatlar');
                setIsMenuOpen(false);
              }}
            >
              Fiyatlar
            </a>
            <a
              href="#avantajlar"
              className="block text-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                handleHashNavigation(e, '#avantajlar');
                setIsMenuOpen(false);
              }}
            >
              Avantajlar
            </a>
            <a
              href="#iletisim"
              className="block text-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                handleHashNavigation(e, '#iletisim');
                setIsMenuOpen(false);
              }}
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