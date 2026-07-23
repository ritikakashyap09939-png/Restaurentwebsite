import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
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

      </div>
    </div>
  );
}
