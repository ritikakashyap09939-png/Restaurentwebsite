import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Users, Wind, MapPin, Music, Cake, CheckCircle2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import banquetWedding from '@assets/generated_images/banquet-wedding.jpg';
import banquetCorporate from '@assets/generated_images/banquet-corporate.jpg';
import heroBg from '@assets/generated_images/hero-bg.jpg';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  eventDate: z.string().min(1, "Event date is required"),
  guestCount: z.string().min(1, "Guest count is required"),
  eventType: z.string().min(1, "Event type is required"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Banquet() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      eventDate: '',
      guestCount: '',
      eventType: '',
      message: '',
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Banquet Inquiry:", data);
    setIsSubmitted(true);
    form.reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero */}
      <div 
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banquetWedding})` }}
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4 block">Celebrations</span>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-md">
              Nirmal Party Hall
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow font-light">
              Where your most cherished moments turn into beautiful memories.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-30">
        
        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-border text-center flex flex-col items-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Spacious Capacity</h3>
            <p className="text-muted-foreground text-sm">Accommodates up to 500 guests comfortably, ideal for grand weddings and functions.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-border text-center flex flex-col items-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Wind className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Fully Air-Conditioned</h3>
            <p className="text-muted-foreground text-sm">Climate-controlled environment ensuring comfort for your guests in any season.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-border text-center flex flex-col items-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Cake className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Custom Packages</h3>
            <p className="text-muted-foreground text-sm">Tailored catering, decoration, and DJ services to match your exact requirements.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Details & Gallery */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Host Any Event</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Weddings & Receptions", 
                  "Ring Ceremonies", 
                  "Birthday Parties", 
                  "Corporate Meetings", 
                  "Anniversaries", 
                  "Kitty Parties"
                ].map(event => (
                  <div key={event} className="flex items-center gap-3 text-foreground font-medium bg-white p-4 rounded-md border border-border shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                    <span>{event}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Hall Dimensions</h2>
              <div className="bg-primary text-white p-8 rounded-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10">
                  <MapPin className="w-48 h-48 -mr-10 -mt-10" />
                </div>
                <div className="relative z-10 grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-secondary text-sm uppercase tracking-wider mb-1">Total Area</div>
                    <div className="text-3xl font-bold font-serif">4,500 sq ft</div>
                  </div>
                  <div>
                    <div className="text-secondary text-sm uppercase tracking-wider mb-1">Dining Area</div>
                    <div className="text-3xl font-bold font-serif">Separate</div>
                  </div>
                  <div>
                    <div className="text-secondary text-sm uppercase tracking-wider mb-1">Valet Parking</div>
                    <div className="text-xl font-bold font-serif">Available</div>
                  </div>
                  <div>
                    <div className="text-secondary text-sm uppercase tracking-wider mb-1">Bridal Rooms</div>
                    <div className="text-xl font-bold font-serif">2 Included</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src={banquetCorporate} alt="Corporate Setup" className="rounded-lg shadow-md w-full h-48 object-cover" />
              <img src={heroBg} alt="Dining Setup" className="rounded-lg shadow-md w-full h-48 object-cover" />
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-border sticky top-24">
            <h2 className="text-2xl font-serif font-bold text-primary mb-2">Request a Quote</h2>
            <p className="text-muted-foreground mb-8 text-sm">Fill out the form below and our event manager will contact you within 24 hours.</p>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center"
              >
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Request Received!</h3>
                <p className="text-sm">Thank you for considering Nirmal Party Hall. We'll be in touch shortly to discuss your event.</p>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <input {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="John Doe" />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <input {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="+91 98765 43210" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <FormControl>
                            <input type="date" {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guestCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Guests</FormLabel>
                          <FormControl>
                            <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                              <option value="">Select guests</option>
                              <option value="50-100">50 - 100</option>
                              <option value="100-250">100 - 250</option>
                              <option value="250-500">250 - 500</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type</FormLabel>
                        <FormControl>
                          <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="">Select event type</option>
                            <option value="wedding">Wedding / Reception</option>
                            <option value="engagement">Engagement / Ring Ceremony</option>
                            <option value="birthday">Birthday Party</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="other">Other</option>
                          </select>
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
                        <FormLabel>Additional Requirements (Optional)</FormLabel>
                        <FormControl>
                          <textarea {...field} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Decoration theme, specific catering needs..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white h-12 rounded-sm font-medium hover:bg-primary/90 transition-colors mt-2"
                  >
                    Submit Enquiry
                  </button>
                </form>
              </Form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
