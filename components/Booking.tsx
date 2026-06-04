'use client';

import { Calendar, Users, Crown, ArrowUpRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingProps {
  isClassicDark: boolean;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  bookingSuccess: boolean;
  bookingReference: string;
  isSubmitting: boolean;
  handleBookingSubmit: (e: React.FormEvent) => void;
  handleResetBooking: () => void;
  getSelectedRoom: () => any;
  calculateNights: () => number;
  calculateTotal: () => number;
}

export default function Booking({
  isClassicDark,
  formData,
  setFormData,
  bookingSuccess,
  bookingReference,
  isSubmitting,
  handleBookingSubmit,
  handleResetBooking,
  getSelectedRoom,
  calculateNights,
  calculateTotal
}: BookingProps) {
  return (
    <section id="booking" className={`py-24 ${isClassicDark ? 'bg-stone-955' : 'bg-stone-50'} border-t border-amber-500/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual/Invoice left helper details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6" id="booking-invoice-pane">
            
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-500 block mb-2">
                Elite Reserve Desk
              </span>
              <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
                Secure Your Suite Room
              </h2>
              <p className={`text-xs sm:text-sm ${isClassicDark ? 'text-stone-400' : 'text-stone-600'} font-sans leading-relaxed`}>
                All check-out requests are filtered securely via biometric protocols. Your reservation desk will contact your primary coordinates within 15 minutes of validation.
              </p>
            </div>

            {/* LIVE PRICING INVOICE CALCULATOR */}
            <div className={`p-6 rounded-sm border relative overflow-hidden transition-colors shadow-md ${
              isClassicDark 
                ? 'bg-stone-900/50 border-amber-500/20 text-stone-200' 
                : 'bg-white border-stone-250 text-stone-800 shadow-sm'
            }`}>
              <div className="shimmer-effect absolute inset-x-0 top-0 h-1" />
              <h3 className={`font-serif text-lg font-bold border-b pb-3 mb-4 flex items-center justify-between ${
                isClassicDark ? 'border-stone-850 text-white' : 'border-stone-200 text-stone-950'
              }`}>
                <span>Live Invoice Estimation</span>
                <Crown className="w-4 h-4 text-amber-500" />
              </h3>
              
              <div className="space-y-3.5 text-xs">
                
                {/* Selected Room */}
                <div className="flex justify-between font-sans font-medium">
                  <span className={isClassicDark ? 'text-stone-400' : 'text-stone-500'}>Selected Residence Class</span>
                  <span className={`font-bold uppercase ${isClassicDark ? 'text-amber-400' : 'text-amber-800'}`}>{getSelectedRoom().type}</span>
                </div>

                {/* Pricing Rate */}
                <div className="flex justify-between font-sans">
                  <span className={isClassicDark ? 'text-stone-400' : 'text-stone-500'}>Nightly Base rate</span>
                  <span className="font-mono font-semibold">${getSelectedRoom().price} / night</span>
                </div>

                {/* Calculated Nights */}
                <div className="flex justify-between font-sans">
                  <span className={isClassicDark ? 'text-stone-400' : 'text-stone-500'}>Calculated Residing Period</span>
                  <span className={`font-mono font-bold ${
                    calculateNights() > 0 
                      ? (isClassicDark ? 'text-amber-300' : 'text-amber-800') 
                      : 'text-stone-400'
                  }`}>
                    {calculateNights()} {calculateNights() === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>

                {/* Custom check in check-out visual tags */}
                {formData.checkIn && formData.checkOut && (
                  <div className={`p-2.5 rounded-sm border text-[11px] space-y-1 ${
                    isClassicDark ? 'bg-stone-950/60 border-stone-800' : 'bg-stone-50 border-stone-200/60'
                  }`}>
                    <div className="flex justify-between">
                      <span className={isClassicDark ? 'text-stone-400' : 'text-stone-500'}>Check-in Coordinate:</span>
                      <span className={`font-mono font-semibold ${isClassicDark ? 'text-stone-200' : 'text-stone-800'}`}>{formData.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isClassicDark ? 'text-stone-400' : 'text-stone-500'}>Check-out Coordinate:</span>
                      <span className={`font-mono font-semibold ${isClassicDark ? 'text-stone-200' : 'text-stone-800'}`}>{formData.checkOut}</span>
                    </div>
                  </div>
                )}

                {/* VAT + Luxury Tax details */}
                <div className={`flex justify-between font-sans border-t pt-3 ${
                  isClassicDark ? 'border-stone-850' : 'border-stone-200/60'
                }`}>
                  <span className={isClassicDark ? 'text-stone-400' : 'text-stone-500'}>Resort Tax + Luxury Service (10%)</span>
                  <span className="font-mono font-semibold">${Math.floor(calculateTotal() * 0.1)}</span>
                </div>

                {/* GRAND TOTAL */}
                <div className={`flex justify-between font-serif text-base font-bold border-t pt-4 ${
                  isClassicDark ? 'border-amber-500/25 text-white' : 'border-stone-200 text-stone-950'
                }`}>
                  <span>Est. Sovereign Investment</span>
                  <span className={`text-xl font-mono ${isClassicDark ? 'text-gold-gradient font-bold' : 'text-amber-800 font-bold'}`}>
                    ${calculateTotal() + Math.floor(calculateTotal() * 0.1)}
                  </span>
                </div>

              </div>

              <div className={`mt-5 pt-3 border-t text-[10px] leading-relaxed ${
                isClassicDark ? 'border-stone-850 text-stone-500' : 'border-stone-200 text-stone-500'
              }`}>
                *This counts as a premium placeholder estimation lock-in. Final payment details are finalized at safe checking arrival.
              </div>
            </div>

          </div>

          {/* Secure Booking Form Block (7 Cols) */}
          <div className="lg:col-span-7" id="booking-form-pane">
            <div className={`p-8 rounded-sm border ${
              isClassicDark ? 'bg-stone-900 border-stone-850' : 'bg-white border-stone-250 shadow-md'
            }`}>
              
              <AnimatePresence mode="wait">
                {!bookingSuccess ? (
                  // FORM STATE
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit} 
                    className="space-y-6"
                    id="booking-input-form"
                  >
                    <h3 className={`font-serif text-xl sm:text-2xl font-bold mb-4 ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
                      Residence Application details
                    </h3>

                    {/* Check-In Check-Out Date Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className={`text-[10px] uppercase tracking-wider font-bold ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          Check-In calendar Lock
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                            <Calendar className="w-4 h-4" />
                          </span>
                          <input 
                            type="date"
                            required
                            value={formData.checkIn}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, checkIn: e.target.value }))}
                            className={`w-full text-sm py-3 pl-10 pr-3 rounded-xs border font-sans tracking-wide focus:outline-none focus:border-amber-400 ${
                              isClassicDark ? 'bg-stone-950 border-stone-800 text-stone-100' : 'bg-stone-50 border-stone-300 text-stone-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className={`text-[10px] uppercase tracking-wider font-bold ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          Check-Out calendar Lock
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                            <Calendar className="w-4 h-4" />
                          </span>
                          <input 
                            type="date"
                            required
                            value={formData.checkOut}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, checkOut: e.target.value }))}
                            className={`w-full text-sm py-3 pl-10 pr-3 rounded-xs border font-sans tracking-wide focus:outline-none focus:border-amber-400 ${
                              isClassicDark ? 'bg-stone-950 border-stone-800 text-stone-100' : 'bg-stone-50 border-stone-300 text-stone-900'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Guest Count & Room Class Select Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className={`text-[10px] uppercase tracking-wider font-bold ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          Invited Guests Count
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                            <Users className="w-4 h-4" />
                          </span>
                          <select 
                            value={formData.guests}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, guests: e.target.value }))}
                            className={`w-full text-sm py-3 pl-10 pr-3 rounded-xs border focus:outline-none focus:border-amber-400 ${
                              isClassicDark ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-stone-50 border-stone-300 text-stone-900'
                            }`}
                          >
                            <option value="1">1 Diplomat / Head Single</option>
                            <option value="2">2 Adults (Standard Couple)</option>
                            <option value="4">4 Guests Suite Pack</option>
                            <option value="6">6 Guests Exclusive Grand Mansion</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className={`text-[10px] uppercase tracking-wider font-bold ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          Room Category Selected
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                            <Crown className="w-4 h-4" />
                          </span>
                          <select 
                            value={formData.roomType}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, roomType: e.target.value }))}
                            className={`w-full text-sm py-3 pl-10 pr-3 rounded-xs border focus:outline-none focus:border-amber-400 ${
                              isClassicDark ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-stone-50 border-stone-300 text-stone-900'
                            }`}
                          >
                            <option value="deluxe">Deluxe Serenity Suite ($550 / night)</option>
                            <option value="family">Signature Manor Suite ($850 / night)</option>
                            <option value="vip">Celestia Presidential Residence ($1,850 / night)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Contact block - Name */}
                    <div className="flex flex-col space-y-1.5">
                      <label className={`text-[10px] uppercase tracking-wider font-bold ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                        Dignitary Full Name
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Sovereign Resident Romanov"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, fullName: e.target.value }))}
                        className={`w-full text-sm py-3 px-4 rounded-xs border focus:outline-none focus:border-amber-400 ${
                          isClassicDark ? 'bg-stone-950 border-stone-800 text-stone-100 placeholder-stone-600' : 'bg-stone-50 border-stone-300 text-stone-900'
                        }`}
                      />
                    </div>

                    {/* Email + Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className={`text-[10px] uppercase tracking-wider font-bold ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          Secure Email Address
                        </label>
                        <input 
                          type="email"
                          required
                          placeholder="e.g. design@worldsovereign.com"
                          value={formData.email}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
                          className={`w-full text-sm py-3 px-4 rounded-xs border focus:outline-none focus:border-amber-400 ${
                            isClassicDark ? 'bg-stone-950 border-stone-800 text-stone-100 placeholder-stone-600' : 'bg-stone-50 border-stone-300 text-stone-900'
                          }`}
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className={`text-[10px] uppercase tracking-wider font-bold ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          Direct Phone/WhatsApp Line
                        </label>
                        <input 
                          type="tel"
                          required
                          placeholder="e.g. +44 207 946 0192"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))}
                          className={`w-full text-sm py-3 px-4 rounded-xs border focus:outline-none focus:border-amber-400 ${
                            isClassicDark ? 'bg-stone-950 border-stone-800 text-stone-100 placeholder-stone-600' : 'bg-stone-50 border-stone-300 text-stone-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Special requesting notes */}
                    <div className="flex flex-col space-y-1.5">
                      <label className={`text-[10px] uppercase tracking-wider font-bold ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                        Custom Dietary Details / VIP Security protocol
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="e.g. Strict gluten-free request. Private elevator biometric setup, secret diplomatic check-in required."
                        value={formData.specialRequest}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, specialRequest: e.target.value }))}
                        className={`w-full text-sm py-3 px-4 rounded-xs border focus:outline-none focus:border-amber-400 resize-none ${
                          isClassicDark ? 'bg-stone-950 border-stone-800 text-stone-100 placeholder-stone-600' : 'bg-stone-50 border-stone-300 text-stone-900'
                        }`}
                      />
                    </div>

                    {/* Submit Trigger with luxury feedback loader */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-widest text-xs rounded-xs flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer shadow-lg disabled:opacity-50"
                      id="booking-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                          <span>Authenticating Secure Lock...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete VIP Booking Lock</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </motion.form>
                ) : (
                  // BOOKING SUCCESS SCREEN
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-6"
                    id="booking-success-message"
                  >
                    <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center rounded-full mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500">
                        Application Verified
                      </span>
                      <h3 className="font-serif text-3xl font-bold text-white">
                        Suite Locked Successfully
                      </h3>
                      <p className={`text-xs max-w-md mx-auto ${isClassicDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        A bespoke lifestyle curator has been assigned to your profile. Please monitor your secure email <span className="font-bold text-amber-400">{formData.email}</span> for arrival guidelines.
                      </p>
                    </div>

                    {/* Code verification widget */}
                    <div className="p-4 bg-stone-950/60 rounded-sm border border-stone-800 inline-block">
                      <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-mono">
                        Secure Reference Access Key
                      </span>
                      <span className="font-mono text-lg font-bold text-amber-400 select-all tracking-widest">
                        {bookingReference}
                      </span>
                    </div>

                    <div>
                      <button
                        onClick={handleResetBooking}
                        className="px-6 py-2.5 border border-amber-500/30 text-xs tracking-widest font-bold text-amber-400 hover:bg-amber-500 hover:text-stone-950 rounded-xs transition-colors cursor-pointer"
                      >
                        Submit Another Booking Application
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
