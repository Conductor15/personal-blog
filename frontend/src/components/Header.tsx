import { Search, Menu, X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import { SiteContext } from "@/contexts/SiteContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/youtube", label: "YouTube" },
  { href: "/donate", label: "Donate" },
  { href: "/about", label: "About" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const { site } = useContext(SiteContext);

  // ⌨️ Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-sm"
            : "bg-background"
        }`}
      >
    
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="blog-container relative">
          <div className="flex items-center h-16 md:h-20">

  
            <Link
              to="/"
              className="uppercase font-serif text-xl md:text-2xl tracking-[0.35em]
              bg-gradient-to-b from-foreground to-foreground/70
              bg-clip-text text-transparent
              hover:tracking-[0.4em]
              transition-all duration-500"
            >
              {site?.blogName || ""}
            </Link>

      
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative text-sm font-medium tracking-wide
                    transition-all duration-300
                    ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2
                      h-[2px] w-6 rounded-full
                      bg-gradient-to-r from-primary/40 via-primary to-primary/40
                      animate-in fade-in duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

          
            <div className="ml-auto flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-muted-foreground
                  hover:text-primary
                  hover:bg-primary/5
                  transition-all duration-300"
                >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full text-muted-foreground
                hover:text-primary hover:bg-muted/60
                transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {isMenuOpen && (
            <nav className="md:hidden py-6 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors
                    ${
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Header;