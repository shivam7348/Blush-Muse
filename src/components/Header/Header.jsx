import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="relative flex flex-col items-center bg-black">
        {/* Top bar with logo and icons */}
        <div className="w-full flex items-center justify-between px-4 md:px-6 py-4 border-b border-yellow-900/30">
          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="block md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-yellow-500 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo - Centered on mobile, left-aligned on desktop */}
          <div className="flex-1 flex justify-center md:justify-center">
            <Link to="/" className="relative group">
              <h1 className="text-2xl md:text-3xl font-serif tracking-wider text-yellow-100">
                BILISH & MUSE
              </h1>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* <Link
              to="/search"
              className="text-yellow-100 hover:text-yellow-500 transition-colors"
            >
              <Search size={18} className="md:size-20" />
            </Link> */}
            <Link
              to="/account"
              className="text-yellow-100 hover:text-yellow-500 transition-colors"
            >
              {/* <User size={18} className="md:size-20" /> */}
            </Link>
            <Link
              to="/cart"
              className="text-yellow-100 hover:text-yellow-500 transition-colors"
            >
              {/* <ShoppingBag size={18} className="md:size-20" /> */}
            </Link>
          </div>
        </div>

        {/* Main navigation - Hidden on mobile unless menu is open */}
        <div
          className={`w-full px-0 md:px-6 py-0 md:py-3 ${
            mobileMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile menu (vertical) */}
          <div className="block md:hidden">
            <div className="flex flex-col w-full">
              <MobileNavLink to="/" onClick={toggleMobileMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/about-us" onClick={toggleMobileMenu}>
                About Us
              </MobileNavLink>
              <MobileNavLink to="/makeup-studio" onClick={toggleMobileMenu}>
                Makeup Studio
              </MobileNavLink>
              <MobileNavLink to="/academy" onClick={toggleMobileMenu}>
                Academy
              </MobileNavLink>
              <MobileNavLink to="/makeup-products" onClick={toggleMobileMenu}>
                Products
              </MobileNavLink>
              <MobileNavLink to="/community" onClick={toggleMobileMenu}>
                Community
              </MobileNavLink>
              <MobileNavLink to="/contact-us" onClick={toggleMobileMenu}>
                Contact
              </MobileNavLink>
            </div>
          </div>

          {/* Desktop menu (horizontal) */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/makeup-studio">Makeup Studio</NavLink>
            <NavLink to="/academy">Academy</NavLink>
            <NavLink to="/makeup-products">Products</NavLink>
            <NavLink to="/community">Community</NavLink>
            <NavLink to="/contact-us">Contact</NavLink>
          </div>
        </div>

        {/* Promotional banner */}
        <div className="w-full bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-700 text-center py-2 text-xs text-yellow-100 px-2">
          <span className="hidden sm:inline">
            FREE SHIPPING ON ALL ORDERS OVER $75 •{" "}
          </span>
          JOIN OUR BEAUTY CLUB FOR EXCLUSIVE OFFERS
        </div>
      </nav>

      {/* Main Content */}
      <main>{/* Add your page content here */}</main>
    </div>
  );
}

// Custom NavLink component with hover animation for desktop
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative text-yellow-100 text-sm font-medium tracking-wide py-2 hover:text-yellow-500 transition-colors duration-300"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
      </span>
    </Link>
  );
}

// Mobile NavLink component
function MobileNavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-yellow-100 text-base font-medium py-3 px-6 border-b border-yellow-900/20 hover:bg-yellow-900/20 transition-colors active:bg-yellow-900/40"
    >
      {children}
    </Link>
  );
}
