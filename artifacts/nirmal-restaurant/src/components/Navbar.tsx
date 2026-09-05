import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import BookingModal from './BookingModal';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = () => {
    setMobileOpen(false);
  };

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
        <div className="w-full px-4 md:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <span className="font-serif text-2xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
              Nirmal
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'px-3 py-2 text-sm font-medium uppercase tracking-wide rounded transition-colors whitespace-nowrap',
                  location === link.path
                    ? 'text-secondary font-bold bg-secondary/10'
                    : 'text-foreground hover:text-secondary hover:bg-secondary/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Book button + hamburger */}
          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-primary text-primary-foreground px-3 xl:px-4 py-1.5 rounded-sm font-medium hover:bg-primary/90 transition-colors shadow-sm uppercase tracking-wide text-xs xl:text-sm cursor-pointer whitespace-nowrap"
            >
              Book Table
            </button>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={mobileOpen}
                  className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground hover:bg-secondary/10 transition-colors cursor-pointer"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <SheetTitle className="sr-only">
                  Nirmal Restaurant navigation
                </SheetTitle>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <span className="font-serif text-xl font-bold text-primary">
                      Nirmal
                    </span>
                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={() => setMobileOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-secondary/10 transition-colors cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <nav
                    aria-label="Mobile navigation"
                    className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={handleMobileNav}
                        className={cn(
                          'rounded-md px-4 py-3 text-base font-medium uppercase tracking-wide transition-colors',
                          location === link.path
                            ? 'text-secondary font-bold bg-secondary/10'
                            : 'text-foreground hover:bg-secondary/5 hover:text-secondary'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        setBookingOpen(true);
                      }}
                      className="mt-4 w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-medium uppercase tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Book a Table
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
