import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email:   z.string().email('Valid email is required'),
  phone:   z.string().min(10, 'Valid phone number is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
type FormValues = z.infer<typeof formSchema>;

const contactItems = [
  {
    icon: MapPin,
    title: 'Location',
    lines: ['Habri Road, Gausala Market', 'Near Jashan Complex'],
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+91 98139 54399', '+91 98968 54399'],
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['namaste@nirmalrestaurant.com'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['Mon–Fri: 8:00 AM – 10:00 PM', 'Sat–Sun: 10:00 AM – 11:30 PM'],
    color: 'bg-amber-50 text-amber-600',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  function onSubmit(data: FormValues) {
    console.log('Contact form:', data);
    setIsSubmitted(true);
    form.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            We'd love to hear from you
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Contact Us</h1>
          <motion.div
            className="h-1 bg-secondary mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help you plan your next visit, event, or answer any questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — Info + Map */}
          <div className="lg:col-span-2 space-y-6">

            {/* Contact info cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="bg-white p-8 rounded-2xl shadow-sm border border-border"
            >
              <motion.h3 variants={fadeUp} className="font-serif text-2xl font-bold text-primary mb-7">
                Get in Touch
              </motion.h3>

              <div className="space-y-5">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 group cursor-default"
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}
                      whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <item.icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <div className="font-bold text-foreground text-sm mb-0.5">{item.title}</div>
                      {item.lines.map((line, j) => (
                        <div key={j} className="text-muted-foreground text-sm">{line}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/919813954399"
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold hover:bg-[#20b858] transition-colors shadow-sm"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(37,211,102,0.35)' }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MessageSquare className="h-5 w-5" />
                </motion.div>
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            {/* Map */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-sm border border-border h-64 bg-muted relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
            >
              <iframe
                title="Nirmal Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.512!2d76.98!3d28.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzM2LjAiTiA3NsKwNTgnNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
                className="w-full h-full"
                style={{ border: 0, filter: 'grayscale(20%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay pin pulse */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                  className="absolute w-8 h-8 rounded-full bg-primary/30"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <motion.div className="w-4 h-4 rounded-full bg-primary shadow-lg" />
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-border relative overflow-hidden">
              {/* Gold top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

              <h2 className="text-3xl font-serif font-bold text-primary mb-2">Send us a Message</h2>
              <p className="text-muted-foreground mb-8 text-sm">For table reservations, large group bookings, or general inquiries.</p>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-50 border border-green-200 text-green-800 p-10 rounded-2xl text-center my-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 text-green-600"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                    <h3 className="font-bold text-2xl mb-2">Message Sent!</h3>
                    <p className="text-green-700 text-sm">Thank you for reaching out. A member of our team will get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <motion.div
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                          initial="hidden"
                          animate="visible"
                          variants={stagger}
                        >
                          <motion.div variants={fadeUp}>
                            <FormField control={form.control} name="name" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Full Name</FormLabel>
                                <FormControl>
                                  <input {...field} className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow" placeholder="Your name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </motion.div>
                          <motion.div variants={fadeUp}>
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Phone Number</FormLabel>
                                <FormControl>
                                  <input {...field} className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow" placeholder="+91 98765 43210" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </motion.div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Email Address</FormLabel>
                              <FormControl>
                                <input type="email" {...field} className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow" placeholder="you@example.com" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.28 }}
                        >
                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Message</FormLabel>
                              <FormControl>
                                <textarea {...field} rows={5} className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow" placeholder="I would like to reserve a table for 4 on Friday evening…" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </motion.div>

                        <motion.button
                          type="submit"
                          className="w-full bg-primary text-white h-14 rounded-xl font-bold text-base hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(139,0,0,0.3)' }}
                          whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.36 }}
                        >
                          <Send className="h-5 w-5" />
                          Send Message
                        </motion.button>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
