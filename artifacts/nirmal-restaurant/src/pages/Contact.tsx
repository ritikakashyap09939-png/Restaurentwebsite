import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Contact form:", data);
    setIsSubmitted(true);
    form.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Contact Us</h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help you plan your next visit, event, or answer any questions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <h3 className="font-serif text-2xl font-bold text-primary mb-6">Get in Touch</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">Location</div>
                    <div className="text-muted-foreground text-sm">Habri Road, Gausala Market<br />Near Jashan Complex</div>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">Phone</div>
                    <div className="text-muted-foreground text-sm">+91 98139 54399<br />+91 98968 54399</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mt-1">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">Email</div>
                    <div className="text-muted-foreground text-sm">namaste@nirmalrestaurant.com</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mt-1">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">Hours</div>
                    <div className="text-muted-foreground text-sm">
                      Mon-Fri: 11:00 AM - 11:00 PM<br />
                      Sat-Sun: 10:00 AM - 11:30 PM
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-border">
                <a 
                  href="https://wa.me/919813954399" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-md font-bold hover:bg-[#20b858] transition-colors"
                >
                  <MessageSquare className="h-5 w-5" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden shadow-sm border border-border h-64 bg-muted relative flex items-center justify-center group">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="text-center z-10 relative">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2 opacity-50 group-hover:scale-110 transition-transform" />
                <span className="text-muted-foreground font-medium">Google Maps Embed</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-border">
              <h2 className="text-3xl font-serif font-bold text-primary mb-2">Send us a Message</h2>
              <p className="text-muted-foreground mb-8">For table reservations, large group bookings, or general inquiries.</p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-lg text-center my-12">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-2xl mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for reaching out. A member of our team will get back to you shortly.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Full Name</FormLabel>
                            <FormControl>
                              <input {...field} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" placeholder="Jane Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Phone Number</FormLabel>
                            <FormControl>
                              <input {...field} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" placeholder="+91 98765 43210" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email Address</FormLabel>
                          <FormControl>
                            <input type="email" {...field} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" placeholder="jane@example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Message</FormLabel>
                          <FormControl>
                            <textarea {...field} rows={6} className="flex w-full rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" placeholder="I would like to reserve a table for 4 on Friday evening..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button 
                      type="submit" 
                      className="w-full bg-primary text-white h-14 rounded-sm font-bold text-lg hover:bg-primary/90 transition-colors mt-4 shadow-md hover:shadow-lg"
                    >
                      Send Message
                    </button>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
