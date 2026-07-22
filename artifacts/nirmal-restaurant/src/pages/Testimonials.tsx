import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    city: "New Delhi",
    rating: 5,
    text: "Hosted my daughter's first birthday at the banquet hall. The arrangements were impeccable. The food was the highlight—every guest complimented the Dal Makhani. Truly feels like a family restaurant.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    city: "Gurgaon",
    rating: 5,
    text: "The Butter Chicken here is legendary! I've been coming to Nirmal for over 10 years, and the taste hasn't changed a bit. Consistent, hygienic, and always welcoming.",
  },
  {
    id: 3,
    name: "Amit Desai",
    city: "Noida",
    rating: 4,
    text: "Great ambiance for family dinners. The staff is very courteous and the service is prompt even on busy weekends. The Paneer Tikka is a must-try for vegetarians.",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    city: "New Delhi",
    rating: 5,
    text: "We booked the hall for our corporate annual dinner. Professional service, excellent decor, and the customized menu was a hit with the team. Highly recommended for corporate events.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    city: "Faridabad",
    rating: 5,
    text: "Authentic flavors that remind you of home-cooked meals but with that restaurant touch. The Biryani is perfectly spiced. Love the heritage haveli vibe of the interiors.",
  },
  {
    id: 6,
    name: "Anjali Verma",
    city: "New Delhi",
    rating: 4,
    text: "A reliable spot for Sunday lunches. The portions are generous and the prices are reasonable for the quality they offer. Make sure to reserve a table as it gets crowded!",
  },
  {
    id: 7,
    name: "Dr. Mehra",
    city: "Gurgaon",
    rating: 5,
    text: "I am very particular about hygiene and Nirmal always exceeds expectations. The open kitchen concept is great, and the flavors are incredibly rich without being heavy.",
  },
  {
    id: 8,
    name: "Kavita Rao",
    city: "New Delhi",
    rating: 5,
    text: "Our wedding reception was hosted here. The team took care of everything from catering to floral setups. It was stress-free and absolutely beautiful. Thank you Nirmal family!",
  },
];

export default function Testimonials() {
  return (
    <div className="pt-24 pb-20 bg-[#fdfaf5] min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Guest Book</h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Don't just take our word for it. Here is what our extended family has to say about their experiences.
            </p>
            
            {/* Rating Summary */}
            <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-sm border border-border">
              <div className="text-4xl font-bold text-primary">4.8</div>
              <div className="flex flex-col text-left">
                <div className="flex text-secondary mb-1">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 fill-current" />)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Based on 1,200+ Reviews</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Masonry Grid (simulated with CSS columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 md:gap-6 lg:gap-8 space-y-6 lg:space-y-8">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="break-inside-avoid bg-white p-8 rounded-xl shadow-sm border border-border relative group hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-secondary/20 group-hover:text-secondary/40 transition-colors" />
              
              <div className="flex text-secondary mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className={cn(
                      "h-4 w-4", 
                      index < testimonial.rating ? "fill-current" : "text-gray-300"
                    )} 
                  />
                ))}
              </div>
              
              <p className="text-foreground/80 leading-relaxed mb-6 font-medium">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold font-serif">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
