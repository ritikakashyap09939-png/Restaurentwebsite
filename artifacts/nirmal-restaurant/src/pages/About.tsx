import { motion } from 'framer-motion';
import { Leaf, ShieldCheck } from 'lucide-react';
import teamPhoto from '@assets/generated_images/team-photo.jpg';

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
                src={teamPhoto} 
                alt="Nirmal Restaurant Family Team" 
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
        <div className="mb-16">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold uppercase tracking-[3px] text-xs mb-3">Trusted & Verified</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Our Certifications & Licenses</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Nirmal Family Restaurant &amp; Party Hall operates under all required food safety, hygiene and municipal approvals — so you can host and dine with complete confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                title: 'FSSAI License',
                desc: 'Food Safety & Standards Authority of India',
                svg: (
                  <svg viewBox="0 0 100 130" className="w-20 h-auto mx-auto mb-4">
                    <path d="M50 8l35 14v28c0 26-15 46-35 58C30 96 15 76 15 50V22z" fill="#fff" stroke="#D9A441" strokeWidth="3"/>
                    <circle cx="50" cy="46" r="26" fill="#F0CE85" opacity="0.35"/>
                    <path d="M38 46c0-8 5-14 12-14s12 6 12 14-5 14-12 14" fill="none" stroke="#6B1F3A" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M50 32v28" stroke="#3F5A45" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="50" cy="46" r="30" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeDasharray="2 3"/>
                  </svg>
                ),
              },
              {
                title: 'GST Registered',
                desc: 'Goods & Services Tax Certificate',
                svg: (
                  <svg viewBox="0 0 100 130" className="w-20 h-auto mx-auto mb-4">
                    <path d="M50 8l35 14v28c0 26-15 46-35 58C30 96 15 76 15 50V22z" fill="#fff" stroke="#D9A441" strokeWidth="3"/>
                    <circle cx="50" cy="46" r="26" fill="#EAF1EA" opacity="0.6"/>
                    <text x="50" y="53" fontFamily="serif" fontSize="24" fontWeight="700" fill="#3F5A45" textAnchor="middle">₹</text>
                    <circle cx="50" cy="46" r="30" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeDasharray="2 3"/>
                  </svg>
                ),
              },
              {
                title: 'Trade License',
                desc: 'Municipal Corporation Approval',
                svg: (
                  <svg viewBox="0 0 100 130" className="w-20 h-auto mx-auto mb-4">
                    <path d="M50 8l35 14v28c0 26-15 46-35 58C30 96 15 76 15 50V22z" fill="#fff" stroke="#D9A441" strokeWidth="3"/>
                    <circle cx="50" cy="46" r="26" fill="#F7E7C4" opacity="0.4"/>
                    <rect x="34" y="40" width="32" height="20" rx="1.5" fill="none" stroke="#6B1F3A" strokeWidth="3"/>
                    <path d="M34 40l6-8h20l6 8" fill="none" stroke="#6B1F3A" strokeWidth="3" strokeLinejoin="round"/>
                    <circle cx="50" cy="46" r="30" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeDasharray="2 3"/>
                  </svg>
                ),
              },
              {
                title: 'Health / Eating House License',
                desc: 'Issued by local Police / Health Dept.',
                svg: (
                  <svg viewBox="0 0 100 130" className="w-20 h-auto mx-auto mb-4">
                    <path d="M50 8l35 14v28c0 26-15 46-35 58C30 96 15 76 15 50V22z" fill="#fff" stroke="#D9A441" strokeWidth="3"/>
                    <circle cx="50" cy="46" r="26" fill="#F7DCE1" opacity="0.4"/>
                    <path d="M50 32c-8-8-22-2-22 9 0 12 15 20 22 26 7-6 22-14 22-26 0-11-14-17-22-9z" fill="none" stroke="#6B1F3A" strokeWidth="3" strokeLinejoin="round"/>
                    <circle cx="50" cy="46" r="30" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeDasharray="2 3"/>
                  </svg>
                ),
              },
              {
                title: 'Fire Safety NOC',
                desc: 'Fire Department No-Objection Certificate',
                svg: (
                  <svg viewBox="0 0 100 130" className="w-20 h-auto mx-auto mb-4">
                    <path d="M50 8l35 14v28c0 26-15 46-35 58C30 96 15 76 15 50V22z" fill="#fff" stroke="#D9A441" strokeWidth="3"/>
                    <circle cx="50" cy="46" r="26" fill="#FBE7D4" opacity="0.5"/>
                    <path d="M50 30c6 8-4 10-2 18 1 4 5 6 8 4 3 8-4 16-12 16-9 0-15-7-14-15 1-9 8-10 6-18 4 2 6-1 6-5 3 2 6 0 8 0z" fill="none" stroke="#6B1F3A" strokeWidth="2.5" strokeLinejoin="round"/>
                    <circle cx="50" cy="46" r="30" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeDasharray="2 3"/>
                  </svg>
                ),
              },
              {
                title: 'Shop & Establishment Registration',
                desc: 'State Labour Department Registration',
                svg: (
                  <svg viewBox="0 0 100 130" className="w-20 h-auto mx-auto mb-4">
                    <path d="M50 8l35 14v28c0 26-15 46-35 58C30 96 15 76 15 50V22z" fill="#fff" stroke="#D9A441" strokeWidth="3"/>
                    <circle cx="50" cy="46" r="26" fill="#E9E3F5" opacity="0.4"/>
                    <rect x="32" y="34" width="36" height="26" rx="2" fill="none" stroke="#6B1F3A" strokeWidth="3"/>
                    <path d="M38 34v-4h24v4" fill="none" stroke="#6B1F3A" strokeWidth="3"/>
                    <line x1="32" y1="46" x2="68" y2="46" stroke="#6B1F3A" strokeWidth="2"/>
                    <circle cx="50" cy="46" r="30" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeDasharray="2 3"/>
                  </svg>
                ),
              },
            ].map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#f0e2c8] hover:-translate-y-1 transition-transform duration-200"
              >
                {cert.svg}
                <h3 className="font-serif font-bold text-[#4A1428] text-base mb-1 leading-tight">{cert.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{cert.desc}</p>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-[#3F5A45] bg-[#eaf1ea] border border-dashed border-[#3F5A45] rounded-full px-3 py-1">
                  Sample badge
                </span>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            <ShieldCheck className="inline h-4 w-4 text-primary mr-1 mb-0.5" />
            These are placeholder badges. Once official certificates are received, the actual license numbers or scans will be displayed here.
          </p>
        </div>

      </div>
    </div>
  );
}
