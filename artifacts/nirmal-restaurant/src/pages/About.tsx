import { motion } from 'framer-motion';
import { publicAsset } from '@/lib/paths';
import { Leaf, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-16 bg-background min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Our Story</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rooted in family, seasoned with love. The journey of Nirmal Restaurant.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                In 2025, a small dream took shape — the dream of creating a place where flavor, warmth, 
                and celebration come together. That dream became Neelam Restaurant &amp; Party Hall.
              </p>
              <p>
                We believe food is never just about filling a plate — it's about bringing people closer. 
                With that belief, we built a space where traditional flavors meet modern hospitality. 
                Every dish in our kitchen is prepared with care, using fresh ingredients and authentic 
                spices, so every bite feels like home.
              </p>
              <p>
                But Neelam is more than just a restaurant. Our elegant Party Hall is designed to be part 
                of your most special moments — weddings, birthdays, anniversaries, or any family 
                celebration. We believe every event deserves to be memorable, which is why our team 
                takes care of every little detail, from décor to the quality of food on your table.
              </p>
              <p>
                Since day one, we've had one simple goal — to make every guest feel like family. 
                Welcoming you warmly, serving you our best, and being part of your happiest moments — 
                that's what truly matters to us.
              </p>
              <p>
                So the next time you're looking for great food and a place to celebrate — Neelam 
                Restaurant &amp; Party Hall is waiting for you.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-l-4 border-secondary pl-4">
                <div className="text-3xl font-bold text-primary">2025</div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mt-1">Est. Year</div>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mt-1">Guest Satisfaction</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-lg transform translate-x-4 translate-y-4 -z-10" />
              <img 
                src={publicAsset('images/restaurant-front.jpeg')}
                alt="Nirmal Family Restaurant and Party Hall" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every dish we serve and every guest we welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="h-16 w-16 mx-auto bg-[#fdfaf5] rounded-full flex items-center justify-center mb-4 text-primary border border-secondary/30">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Purity & Hygiene</h3>
              <p className="text-muted-foreground text-sm">
                We use only the freshest produce and ground spices. Our kitchen maintains the highest standards of cleanliness and food safety.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="h-16 w-16 mx-auto bg-[#fdfaf5] rounded-full flex items-center justify-center mb-4 text-primary border border-secondary/30">
                <span className="text-2xl font-serif">A</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Authenticity</h3>
              <p className="text-muted-foreground text-sm">
                No shortcuts. We honor traditional cooking methods to bring you the true, unadulterated flavors of our heritage.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="h-16 w-16 mx-auto bg-[#fdfaf5] rounded-full flex items-center justify-center mb-4 text-primary border border-secondary/30">
                <span className="text-2xl font-serif">H</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Hospitality</h3>
              <p className="text-muted-foreground text-sm">
                'Atithi Devo Bhava'. The guest is equivalent to God. We strive to make every visit feel like a warm embrace.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mb-16 -mx-4 px-0">
          {/* Dark maroon banner background */}
          <div className="bg-[#3a0f1e] rounded-2xl overflow-hidden shadow-2xl">
            {/* Top decorative border */}
            <div className="h-1 w-full bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]" />

            <div className="px-8 md:px-14 py-14">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-16 bg-[#D4AF37]/40" />
                  <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
                  <div className="h-px w-16 bg-[#D4AF37]/40" />
                </div>
                <p className="text-[#D4AF37] font-semibold uppercase tracking-[4px] text-xs mb-3">Trusted & Verified</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  Our Certifications & Licenses
                </h2>
                <p className="text-[#c8b9a8] max-w-2xl mx-auto text-sm leading-relaxed">
                  Nirmal Family Restaurant &amp; Party Hall operates under all required food safety, hygiene and
                  municipal approvals — so you can host and dine with complete confidence.
                </p>
              </div>

              {/* Certificate Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'FSSAI License',
                    authority: 'Food Safety & Standards Authority of India',
                    number: 'License No. — XXXXXXXXXXXX',
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-10 h-10">
                        <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                        <path d="M30 10l20 8v16c0 15-9 26-20 33C10 60 10 49 10 34V18z" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                        <path d="M22 30c0-5 4-8 8-8s8 3 8 8-4 8-8 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="30" y1="22" x2="30" y2="38" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ),
                  },
                  {
                    title: 'GST Registered',
                    authority: 'Goods & Services Tax — Government of India',
                    number: 'GSTIN — XXXXXXXXXXXXXXXXX',
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-10 h-10">
                        <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                        <text x="30" y="38" fontFamily="serif" fontSize="22" fontWeight="700" fill="#D4AF37" textAnchor="middle">₹</text>
                        <circle cx="30" cy="30" r="18" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="3 2"/>
                      </svg>
                    ),
                  },
                  {
                    title: 'Trade License',
                    authority: 'Municipal Corporation — Local Body Approval',
                    number: 'License No. — XXXXXXXXXXXX',
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-10 h-10">
                        <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                        <rect x="18" y="26" width="24" height="16" rx="1" fill="none" stroke="#fff" strokeWidth="2"/>
                        <path d="M18 26l4-6h16l4 6" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round"/>
                        <line x1="30" y1="26" x2="30" y2="42" stroke="#D4AF37" strokeWidth="1.5"/>
                      </svg>
                    ),
                  },
                  {
                    title: 'Health / Eating House License',
                    authority: 'Issued by Local Police / Health Dept.',
                    number: 'License No. — XXXXXXXXXXXX',
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-10 h-10">
                        <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                        <path d="M30 16c-6-6-16-1-16 7 0 9 11 14 16 19 5-5 16-10 16-19 0-8-10-13-16-7z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M30 16c-6-6-16-1-16 7 0 9 11 14 16 19 5-5 16-10 16-19 0-8-10-13-16-7z" fill="#D4AF37" fillOpacity="0.15"/>
                      </svg>
                    ),
                  },
                  {
                    title: 'Fire Safety NOC',
                    authority: 'Fire Department No-Objection Certificate',
                    number: 'NOC No. — XXXXXXXXXXXX',
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-10 h-10">
                        <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                        <path d="M30 14c4 5-3 7-1 13 1 3 4 4 6 3 2 6-3 12-9 12-7 0-11-5-10-11 1-7 6-7 4-13 3 1 4 0 4-4 2 2 4 0 6 0z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M30 14c4 5-3 7-1 13 1 3 4 4 6 3 2 6-3 12-9 12-7 0-11-5-10-11 1-7 6-7 4-13 3 1 4 0 4-4 2 2 4 0 6 0z" fill="#D4AF37" fillOpacity="0.15"/>
                      </svg>
                    ),
                  },
                  {
                    title: 'Shop & Establishment Act',
                    authority: 'State Labour Department Registration',
                    number: 'Reg. No. — XXXXXXXXXXXX',
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-10 h-10">
                        <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                        <rect x="16" y="22" width="28" height="20" rx="1.5" fill="none" stroke="#fff" strokeWidth="2"/>
                        <path d="M22 22v-4h16v4" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                        <line x1="16" y1="32" x2="44" y2="32" stroke="#D4AF37" strokeWidth="1.5"/>
                        <line x1="22" y1="38" x2="38" y2="38" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    ),
                  },
                ].map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(212,175,55,0.25)' }}
                    className="group relative bg-white border border-[#D4AF37]/40 rounded-xl overflow-hidden transition-shadow duration-300"
                  >
                    {/* Corner ribbon */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-3 right-[-18px] rotate-45 bg-[#D4AF37] text-white text-[8px] font-bold uppercase tracking-wider w-16 text-center py-0.5">
                        Verified
                      </div>
                    </div>

                    {/* Top gold accent line */}
                    <motion.div
                      className="h-[3px] w-full bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                    />

                    <div className="p-6">
                      {/* Icon + Title row */}
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          className="shrink-0 w-14 h-14 rounded-full border border-[#D4AF37]/50 bg-[#fdf8ee] flex items-center justify-center group-hover:border-[#D4AF37] transition-colors"
                          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        >
                          {cert.icon}
                        </motion.div>
                        <div>
                          <h3 className="font-serif font-bold text-[#3a0f1e] text-base leading-snug mb-1">
                            {cert.title}
                          </h3>
                          <p className="text-gray-500 text-[11px] leading-relaxed">{cert.authority}</p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-[#D4AF37]/30 my-4" />

                      {/* License number */}
                      <div className="flex items-center justify-between">
                        <span className="text-[#8B0000]/70 text-[10px] font-mono tracking-widest uppercase">
                          {cert.number}
                        </span>
                        <motion.span
                          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                        >
                          <ShieldCheck className="h-3 w-3" />
                          Active
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <p className="mt-10 text-center text-[11px] text-[#8a7060] leading-relaxed max-w-xl mx-auto">
                License numbers shown above are placeholders. Official certificates are available for inspection at the restaurant premises upon request.
              </p>
            </div>

            {/* Bottom decorative border */}
            <div className="h-1 w-full bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]" />
          </div>
        </div>

      </div>
    </div>
  );
}
