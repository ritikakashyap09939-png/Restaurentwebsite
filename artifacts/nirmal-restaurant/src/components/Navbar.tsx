import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from './BookingModal';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/menu', label: 'Menu' },
  { path: '/banquet', label: 'Banquet' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/testimonials', label: 'Reviews' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-background/98 backdrop-blur-md shadow-md border-border py-2'
            : 'bg-background/95 backdrop-blur-sm shadow-sm border-border py-3'
        )}
      >
        <div className="w-full px-4 md:px-6 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <span className="font-serif text-2xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
              Nirmal
            </span>
          </Link>

          {/* Desktop Nav — all items left-aligned after logo */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'px-3 py-1.5 text-xs lg:text-sm font-medium uppercase tracking-wide rounded transition-colors whitespace-nowrap',
                  location === link.path
                    ? 'text-secondary font-bold bg-secondary/10'
                    : 'text-foreground hover:text-secondary hover:bg-secondary/5'
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setBookingOpen(true)}
              className="ml-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-sm font-medium hover:bg-primary/90 transition-colors shadow-sm uppercase tracking-wide text-xs lg:text-sm cursor-pointer whitespace-nowrap"
            >
              Book Table
            </button>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden ml-auto text-foreground p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-background md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-serif text-2xl font-bold text-primary">
                  Nirmal
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      'text-xl font-serif transition-colors',
                      location === link.path ? 'text-secondary font-bold' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8">
                  <button
                    onClick={() => { setMobileMenuOpen(false); setBookingOpen(true); }}
                    className="block w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors text-lg cursor-pointer"
                  >
                    Reserve a Table
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
