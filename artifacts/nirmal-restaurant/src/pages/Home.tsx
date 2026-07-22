import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Star, Utensils, Users, Music } from 'lucide-react';
import heroBg from '@assets/generated_images/hero-bg.jpg';
import dishBiryani from '@assets/generated_images/dish-biryani.jpg';
import dishPaneer from '@assets/generated_images/dish-paneer-tikka.jpg';
import dishButterChicken from '@assets/generated_images/dish-butter-chicken.jpg';
import banquetWedding from '@assets/generated_images/banquet-wedding.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        
        <div className="container relative z-20 mx-auto px-4 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-medium tracking-[0.3em] uppercase text-sm md:text-base block mb-4">
              Tradition in Every Bite
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold mb-6 leading-tight drop-shadow-lg">
              Nirmal
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light drop-shadow">
              A heritage of authentic Indian flavors, serving families with love, warmth, and spices passed down through generations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact" 
                className="bg-primary text-white px-8 py-4 rounded-sm font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 text-lg min-w-[200px]"
              >
                Reserve a Table
              </Link>
              <Link 
                href="/menu" 
                className="bg-transparent border border-white text-white px-8 py-4 rounded-sm font-medium hover:bg-white hover:text-black transition-all text-lg min-w-[200px]"
              >
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background text-foreground relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              The Nirmal Experience
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              We believe dining is an event. That's why we bring the finest ingredients, masterful chefs, and an ambiance that makes you feel at home.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Utensils, title: "Heritage Recipes", desc: "Our spice blends are made in-house using recipes perfected over decades." },
              { icon: Users, title: "Family Atmosphere", desc: "Warm, welcoming spaces designed for celebrations and togetherness." },
              { icon: Star, title: "Premium Quality", desc: "Uncompromising hygiene standards and the freshest local produce." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-lg shadow-sm border border-border text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-[#fdfaf5] border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Our Signatures</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Flavors to Remember</h2>
            </div>
            <Link href="/menu" className="group flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors">
              Explore Full Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: dishBiryani, name: "Hyderabadi Dum Biryani", desc: "Slow-cooked fragrant basmati rice with tender marinated meat." },
              { img: dishButterChicken, name: "Murgh Makhani", desc: "Classic butter chicken in a rich, creamy tomato and cashew gravy." },
              { img: dishPaneer, name: "Sizzling Paneer Tikka", desc: "Cottage cheese marinated in yogurt and spices, char-grilled to perfection." }
            ].map((dish, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={dish.img} 
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{dish.name}</h3>
                  <p className="text-muted-foreground">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Banquet Hall Teaser */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0" />
        <div className="absolute inset-0 opacity-20 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${banquetWedding})` }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/95 backdrop-blur-sm max-w-2xl p-8 md:p-12 rounded-lg shadow-2xl">
            <span className="flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-sm mb-4">
              <Music className="h-4 w-4" /> Celebrate With Us
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">Nirmal Party Hall</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Make your special moments unforgettable. From grand weddings to intimate birthday parties, our elegant banquet hall accommodates up to 500 guests with premium catering, decoration, and impeccable service.
            </p>
            <Link 
              href="/banquet" 
              className="inline-flex bg-primary text-white px-6 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm"
            >
              View Hall Details
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-[#1a0f0f] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready for a memorable meal?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
            Join us at Nirmal for lunch or dinner. Walk-ins are welcome, but reservations are recommended for weekends.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="bg-[#1a0f0f] text-secondary px-8 py-4 rounded-sm font-bold hover:bg-[#2c1f1f] transition-colors uppercase tracking-wider">
              Book A Table
            </Link>
            <a href="tel:+919876543210" className="flex items-center gap-2 font-bold text-lg hover:underline underline-offset-4">
              Or call +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
