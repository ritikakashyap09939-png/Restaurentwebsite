import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  guests: z.string().min(1, 'Please select number of guests'),
  message: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (_data: BookingForm) => {
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#FFF8F0] rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border-t-4 border-[#8B0000]">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8d8c4]">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#8B0000]">Reserve a Table</h2>
                  <p className="text-sm text-[#6b5c4e] mt-1">We will confirm your booking shortly</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-[#6b5c4e] hover:text-[#8B0000] transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="h-16 w-16 text-[#8B0000] mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-[#8B0000] mb-2">Booking Request Sent!</h3>
                    <p className="text-[#6b5c4e] mb-2">Thank you for choosing Nirmal Family Restaurant.</p>
                    <p className="text-[#6b5c4e] text-sm">We will call you on your number to confirm your reservation.</p>
                    <button
                      onClick={handleClose}
                      className="mt-6 bg-[#8B0000] text-white px-8 py-3 rounded-sm font-medium hover:bg-[#6B0000] transition-colors uppercase tracking-wider text-sm"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Full Name *</label>
                      <input
                        {...register('name')}
                        placeholder="Your full name"
                        className="w-full h-11 border border-[#d4c4b0] rounded-md px-4 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                      />
                      {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Phone Number *</label>
                      <input
                        {...register('phone')}
                        placeholder="+91 98139 54399"
                        className="w-full h-11 border border-[#d4c4b0] rounded-md px-4 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                      />
                      {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Date *</label>
                        <input
                          {...register('date')}
                          type="date"
                          className="w-full h-11 border border-[#d4c4b0] rounded-md px-4 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                        />
                        {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Time *</label>
                        <select
                          {...register('time')}
                          className="w-full h-11 border border-[#d4c4b0] rounded-md px-4 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                        >
                          <option value="">Select time</option>
                          <option>8:00 AM</option>
                          <option>9:00 AM</option>
                          <option>10:00 AM</option>
                          <option>11:00 AM</option>
                          <option>12:00 PM</option>
                          <option>1:00 PM</option>
                          <option>2:00 PM</option>
                          <option>3:00 PM</option>
                          <option>4:00 PM</option>
                          <option>5:00 PM</option>
                        </select>
                        {errors.time && <p className="text-red-600 text-xs mt-1">{errors.time.message}</p>}
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Number of Guests *</label>
                      <select
                        {...register('guests')}
                        className="w-full h-11 border border-[#d4c4b0] rounded-md px-4 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                      >
                        <option value="">Select guests</option>
                        <option>1 Person</option>
                        <option>2 People</option>
                        <option>3 People</option>
                        <option>4 People</option>
                        <option>5 People</option>
                        <option>6 People</option>
                        <option>7-10 People</option>
                        <option>10+ People</option>
                      </select>
                      {errors.guests && <p className="text-red-600 text-xs mt-1">{errors.guests.message}</p>}
                    </div>

                    {/* Special requests */}
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Special Requests (Optional)</label>
                      <textarea
                        {...register('message')}
                        rows={3}
                        placeholder="Any dietary requirements or special occasions..."
                        className="w-full border border-[#d4c4b0] rounded-md px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#8B0000] text-white py-3 rounded-sm font-medium hover:bg-[#6B0000] transition-colors uppercase tracking-wider text-sm mt-2"
                    >
                      Confirm Reservation
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
