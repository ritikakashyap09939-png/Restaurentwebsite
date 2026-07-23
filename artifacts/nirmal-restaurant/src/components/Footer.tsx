import { Link } from 'wouter';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a0f0f] text-[#f5ebd7] pt-16 pb-8 border-t-4 border-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-3xl font-bold text-secondary mb-4">Nirmal</h3>
            <p className="text-[#d0c6b3] leading-relaxed">
              A heritage of authentic Indian flavors, passed down through generations. 
              Celebrating food, family, and togetherness.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="h-10 w-10 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:text-[#1a0f0f] transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:text-[#1a0f0f] transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:text-[#1a0f0f] transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-[#d0c6b3] hover:text-secondary transition-colors block">Home</Link></li>
              <li><Link href="/about" className="text-[#d0c6b3] hover:text-secondary transition-colors block">Our Story</Link></li>
              <li><Link href="/menu" className="text-[#d0c6b3] hover:text-secondary transition-colors block">Menu</Link></li>
              <li><Link href="/banquet" className="text-[#d0c6b3] hover:text-secondary transition-colors block">Banquet Hall</Link></li>
              <li><Link href="/contact" className="text-[#d0c6b3] hover:text-secondary transition-colors block">Reservations</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-[#d0c6b3]">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-1" />
                <span>Habri Road, Gausala Market<br />Near Jashan Complex</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0 mt-1" />
                <span>+91 98139 54399<br />+91 98968 54399</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span>namaste@nirmalrestaurant.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-white border-b border-white/10 pb-2 inline-block">Opening Hours</h4>
            <ul className="space-y-3 text-[#d0c6b3]">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Monday - Friday</span>
                <span className="text-secondary font-medium">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Saturday - Sunday</span>
                <span className="text-secondary font-medium">10:00 AM - 11:30 PM</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="block w-full text-center border border-secondary text-secondary py-2 hover:bg-secondary hover:text-[#1a0f0f] transition-colors rounded-sm font-medium uppercase tracking-wide text-sm">
                Book A Table
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-white/10 pt-8 mt-8 text-sm text-[#d0c6b3]/60">
          <p>&copy; {currentYear} Nirmal Family Restaurant and Party Hall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
