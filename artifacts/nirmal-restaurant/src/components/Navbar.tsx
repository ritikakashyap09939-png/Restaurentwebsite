import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
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
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="w-full px-4 md:px-6 lg:flex lg:items-center lg:gap-4">
          {/* Logo */}
          <div className="flex items-center justify-between gap-4 lg:flex-1">
            <Link href="/" className="flex items-center shrink-0 group">
              <span className="font-serif text-2xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                Nirmal
              </span>
            </Link>

            <button
              onClick={() => setBookingOpen(true)}
              className="bg-primary text-primary-foreground px-3 xl:px-4 py-1.5 rounded-sm font-medium hover:bg-primary/90 transition-colors shadow-sm uppercase tracking-wide text-xs xl:text-sm cursor-pointer whitespace-nowrap"
            >
              Book Table
            </button>
          </div>

          {/* Always-visible navigation: wraps into a second row on smaller screens */}
          <nav
            aria-label="Primary navigation"
            className="mt-2 flex w-full flex-wrap items-center justify-center gap-1 border-t border-border pt-2 lg:mt-0 lg:w-auto lg:shrink-0 lg:border-t-0 lg:pt-0 lg:gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'px-2 py-1 text-[11px] sm:text-xs xl:px-3 xl:text-sm font-medium uppercase tracking-wide rounded transition-colors whitespace-nowrap',
                  location === link.path
                    ? 'text-secondary font-bold bg-secondary/10'
                    : 'text-foreground hover:text-secondary hover:bg-secondary/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
