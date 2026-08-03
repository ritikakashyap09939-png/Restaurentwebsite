import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Users, Wind, MapPin, Cake, CheckCircle2,
  PartyPopper, Briefcase, Heart, Star, Gift, Coffee
} from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import banquetCorporate from '@assets/generated_images/banquet-corporate.jpg';
import heroBg from '@assets/generated_images/hero-bg.jpg';

// High-quality Unsplash banquet/wedding hall images
const HERO_IMG = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=900&fit=crop&auto=format&q=90';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.string().min(1, 'Guest count is required'),
  eventType: z.string().min(1, 'Event type is required'),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const features = [
  { icon: Users, title: 'Spacious Capacity', desc: 'Accommodates up to 500 guests comfortably, ideal for grand weddings and grand functions.' },
  { icon: Wind,  title: 'Fully Air-Conditioned', desc: 'Climate-controlled environment ensuring comfort for your guests in any season.' },
  { icon: Cake,  title: 'Custom Packages', desc: 'Tailored catering, decoration, and DJ services to match your exact requirements.' },
];

const events = [
  { icon: Heart,       label: 'Weddings & Receptions' },
  { icon: Gift,        label: 'Ring Ceremonies' },
  { icon: PartyPopper, label: 'Birthday Parties' },
  { icon: Briefcase,   label: 'Corporate Meetings' },
  { icon: Star,        label: 'Anniversaries' },
  { icon: Coffee,      label: 'Kitty Parties' },
];

const stats = [
  { value: '500+', label: 'Guests Capacity' },
  { value: '4,500', label: 'Sq Ft Area' },
  { value: '2', label: 'Bridal Rooms' },
  { value: '10+', label: 'Event Types' },
];

export default function Banquet() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', phone: '', eventDate: '', guestCount: '', eventType: '', message: '' },
  });

  function onSubmit(data: FormValues) {
    console.log('Banquet Inquiry:', data);
    setIsSubmitted(true);
    form.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  return (
    <div className="bg-background min-h-screen pb-20 overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[58vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        {/* Sharp parallax background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: heroY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />

        <div className="relative z-20 text-center px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="text-secondary font-medium tracking-[0.35em] uppercase text-sm mb-4 block"
            >
              Celebrations
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-5 drop-shadow-xl leading-tight"
            >
              Nirmal Party Hall
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow font-light mb-8"
            >
              Where your most cherished moments turn into beautiful memories.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#enquiry"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-secondary text-[#1a0f0f] px-8 py-3.5 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-secondary/90 transition-colors"
            >
              Book Your Event
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── Feature Cards (overlap) ───────────────────────────────────── */}
      <div className="container mx-auto px-4 -mt-14 relative z-30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              className="bg-white p-8 rounded-xl shadow-lg border border-border text-center flex flex-col items-center transition-shadow"
            >
              <motion.div
                className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 text-primary"
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                transition={{ duration: 0.4 }}
              >
                <f.icon className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Stats Bar ──────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="bg-primary rounded-2xl p-8 mb-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp}>
              <div className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-1">{s.value}</div>
              <div className="text-white/70 text-sm uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left Column ─────────────────────────────────────────── */}
          <div className="space-y-14">

            {/* Events Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="text-3xl font-serif font-bold text-primary mb-7">
                Host Any Event
              </motion.h2>
              <div className="grid grid-cols-2 gap-4">
                {events.map((ev, i) => (
                  <motion.div
                    key={ev.label}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ scale: 1.04, borderColor: 'var(--secondary)', backgroundColor: '#fffbf2' }}
                    className="flex items-center gap-3 text-foreground font-medium bg-white p-4 rounded-xl border border-border shadow-sm transition-colors cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <ev.icon className="h-5 w-5 text-secondary shrink-0" />
                    </motion.div>
                    <span className="text-sm">{ev.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hall Dimensions */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="text-3xl font-serif font-bold text-primary mb-6">
                Hall Dimensions
              </motion.h2>
              <motion.div
                variants={fadeUp}
                className="bg-primary text-white p-8 rounded-2xl relative overflow-hidden"
              >
                {/* Animated background ring */}
                <motion.div
                  className="absolute right-0 top-0 opacity-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <MapPin className="w-48 h-48 -mr-10 -mt-10" />
                </motion.div>
                <div className="relative z-10 grid grid-cols-2 gap-8">
                  {[
                    { label: 'Total Area', value: '4,500 sq ft' },
                    { label: 'Dining Area', value: 'Separate' },
                    { label: 'Valet Parking', value: 'Available' },
                    { label: 'Bridal Rooms', value: '2 Included' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <div className="text-secondary text-xs uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-2xl font-bold font-serif">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Gallery Photos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="text-3xl font-serif font-bold text-primary mb-6">
                Our Hall
              </motion.h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop&auto=format&q=85', alt: 'Wedding Setup' },
                  { src: banquetCorporate, alt: 'Corporate Setup' },
                  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&auto=format&q=85', alt: 'Party Decoration' },
                  { src: heroBg, alt: 'Dining Setup' },
                ].map((img, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ scale: 1.03 }}
                    className="overflow-hidden rounded-xl shadow-md"
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-44 object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Booking Form ─────────────────────────────────────────── */}
          <motion.div
            id="enquiry"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border sticky top-24"
          >
            {/* Gold top accent */}
            <div className="h-1 -mx-8 md:-mx-10 -mt-8 md:-mt-10 mb-8 rounded-t-2xl bg-gradient-to-r from-primary via-secondary to-primary" />

            <h2 className="text-2xl font-serif font-bold text-primary mb-1">Request a Quote</h2>
            <p className="text-muted-foreground mb-7 text-sm">
              Fill out the form and our event manager will call you within 24 hours.
            </p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"
                  >
                    <CheckCircle2 className="h-7 w-7" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">Request Received!</h3>
                  <p className="text-sm">Thank you for considering Nirmal Party Hall. We'll be in touch shortly.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <input {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground" placeholder="Your name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <input {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground" placeholder="+91 94668 64000" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="eventDate" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                              <input type="date" {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="guestCount" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Guests</FormLabel>
                            <FormControl>
                              <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <option value="">Select guests</option>
                                <option value="50-100">50 – 100</option>
                                <option value="100-250">100 – 250</option>
                                <option value="250-500">250 – 500</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="eventType" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type</FormLabel>
                          <FormControl>
                            <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                              <option value="">Select event type</option>
                              <option value="wedding">Wedding / Reception</option>
                              <option value="engagement">Engagement / Ring Ceremony</option>
                              <option value="birthday">Birthday Party</option>
                              <option value="corporate">Corporate Event</option>
                              <option value="anniversary">Anniversary</option>
                              <option value="other">Other</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Requirements (Optional)</FormLabel>
                          <FormControl>
                            <textarea {...field} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground" placeholder="Decoration theme, catering preferences…" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-primary text-white h-12 rounded-sm font-medium hover:bg-primary/90 transition-colors mt-2 uppercase tracking-wider text-sm"
                      >
                        Submit Enquiry
                      </motion.button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* WhatsApp quick contact */}
            <motion.a
              href="https://wa.me/919466864000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="mt-5 flex items-center justify-center gap-2 w-full border border-green-500 text-green-700 rounded-sm h-11 text-sm font-medium hover:bg-green-50 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
