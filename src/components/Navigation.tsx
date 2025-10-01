import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "System", href: "#system" },
    { label: "About", href: "#about" },
    { label: "Resources", href: "#resources" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-smooth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-center">
          {/* Centered Navigation Bar */}
          <div className="bg-gray-600 rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <a href="#home" className="flex items-center space-x-2 group">
                <div className="w-6 h-6 bg-white rounded transition-smooth group-hover:bg-gray-100">
                  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full p-1">
                    <path
                      d="M8 8h16v16H8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-600"
                    />
                    <path
                      d="M12 12h8M12 16h8M12 20h8"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-600"
                    />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">Terminal</span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-white hover:text-gray-200 transition-smooth"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-gray-200 rounded-lg transition-smooth"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-smooth"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;