import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Mail, Phone, User, Check, CreditCard, Lock, ArrowRight, Loader2 } from "lucide-react";
import { VideoBackground } from "../components/VideoBackground";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "../components/ui/input-otp";
import { useAuth } from "../contexts/AuthContext";

import hoursImg from "../../assets/hours_art.png";
import locationImg from "../../assets/location_art.png";
import contactImg from "../../assets/contact_art.png";
import rsImg from "../../assets/rs images.jpg";

type ReservationStep = "details" | "email" | "payment" | "processing" | "success";

export function ReservationsPage() {
  const [step, setStep] = useState<ReservationStep>("details");
  const [otp, setOtp] = useState("");
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvc: "", name: "" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || user.username || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone_number || "",
      }));
    }
  }, [isAuthenticated, user]);


  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("email");
  };

  const handleEmailVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setStep("payment");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    
    // Simulate payment processing delay
    setTimeout(() => {
      setStep("success");
      
      // Auto-reset after a long delay
      setTimeout(() => {
        setStep("details");
        setOtp("");
        setCardData({ number: "", expiry: "", cvc: "", name: "" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          specialRequests: "",
        });
      }, 10000);
    }, 3000);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-24 pb-20">
        <VideoBackground variant="ambiance" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-6xl mb-4">
              Reserve Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Experience
              </span>
            </h1>
            <p className="text-white/50 text-lg">Limited availability · Book in advance</p>
          </motion.div>

          {/* Flow Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-xl rounded-2xl" />
            <div className="absolute inset-0 border border-amber-500/20 rounded-2xl" />

            <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Details */}
                {step === "details" && (
                  <motion.form 
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleDetailsSubmit} 
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-white/80 mb-2 flex items-center gap-2">
                          <User className="w-4 h-4 text-amber-400" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-black/40 border-white/10 text-white focus:border-amber-500/50 h-12"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-white/80 mb-2 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-amber-400" />
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-black/40 border-white/10 text-white focus:border-amber-500/50 h-12"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-white/80 mb-2 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-amber-400" />
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-black/40 border-white/10 text-white focus:border-amber-500/50 h-12"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="date" className="text-white/80 mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-400" />
                            Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="bg-black/40 border-white/10 text-white focus:border-amber-500/50 h-12"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>

                        <div>
                          <Label htmlFor="time" className="text-white/80 mb-2 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-400" />
                            Time
                          </Label>
                          <Select
                            value={formData.time}
                            onValueChange={(value) => setFormData({ ...formData, time: value })}
                            required
                          >
                            <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-white/10">
                              {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"].map((time) => (
                                <SelectItem key={time} value={time} className="text-white focus:bg-amber-500/20">
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="guests" className="text-white/80 mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4 text-amber-400" />
                            Guests
                          </Label>
                          <Select
                            value={formData.guests}
                            onValueChange={(value) => setFormData({ ...formData, guests: value })}
                            required
                          >
                            <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                              <SelectValue placeholder="Party size" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-white/10">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SelectItem key={num} value={String(num)} className="text-white focus:bg-amber-500/20">
                                  {num} {num === 1 ? "Guest" : "Guests"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="requests" className="text-white/80 mb-2">
                          Special Requests (Optional)
                        </Label>
                        <textarea
                          id="requests"
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                          className="w-full min-h-[100px] bg-black/40 border border-white/10 text-white rounded-md p-3 focus:outline-none focus:border-amber-500/50 resize-none"
                          placeholder="Dietary restrictions, allergies, special occasions..."
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black h-14 shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <span className="tracking-wider font-semibold">Continue</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.form>
                )}

                {/* STEP 2: Email Verification */}
                {step === "email" && (
                  <motion.form 
                    key="email"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleEmailVerify} 
                    className="flex flex-col items-center text-center space-y-8"
                  >
                    <div>
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <Mail className="w-8 h-8 text-amber-400" />
                      </div>
                      <h2 className="text-3xl font-serif mb-3 text-white">Verify Your Email</h2>
                      <p className="text-white/60 mb-6 max-w-md mx-auto">
                        We've sent a 6-digit confirmation code to <span className="text-amber-400 font-medium">{formData.email}</span>. Please enter it below.
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp} className="gap-2">
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot index={0} className="w-12 h-14 text-xl bg-black/40 border-white/10 text-white rounded-md" />
                          <InputOTPSlot index={1} className="w-12 h-14 text-xl bg-black/40 border-white/10 text-white rounded-md" />
                          <InputOTPSlot index={2} className="w-12 h-14 text-xl bg-black/40 border-white/10 text-white rounded-md" />
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-white/40" />
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot index={3} className="w-12 h-14 text-xl bg-black/40 border-white/10 text-white rounded-md" />
                          <InputOTPSlot index={4} className="w-12 h-14 text-xl bg-black/40 border-white/10 text-white rounded-md" />
                          <InputOTPSlot index={5} className="w-12 h-14 text-xl bg-black/40 border-white/10 text-white rounded-md" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <div className="w-full flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("details")}
                        className="flex-1 h-14 border-white/10 text-white hover:bg-white/5"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={otp.length !== 6}
                        className="flex-1 h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold disabled:opacity-50"
                      >
                        Verify & Continue
                      </Button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 3: Payment */}
                {step === "payment" && (
                  <motion.form 
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handlePaymentSubmit} 
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <CreditCard className="w-8 h-8 text-amber-400" />
                      </div>
                      <h2 className="text-3xl font-serif mb-3 text-white">Secure Reservation</h2>
                      <p className="text-white/60 max-w-md mx-auto">
                        To guarantee your reservation for {formData.guests} guests on {formData.date}, a credit card is required. No charges will be made today.
                      </p>
                    </div>

                    <div className="space-y-6 p-6 rounded-xl border border-white/5 bg-black/20">
                      <div>
                        <Label htmlFor="cardName" className="text-white/80 mb-2">Name on Card</Label>
                        <Input
                          id="cardName"
                          required
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                          className="bg-black/60 border-white/10 text-white focus:border-amber-500/50 h-12"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber" className="text-white/80 mb-2 flex items-center gap-2">
                          Card Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            required
                            maxLength={19}
                            value={cardData.number}
                            onChange={(e) => {
                              // Auto format with spaces
                              let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                              let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                              setCardData({ ...cardData, number: formatted });
                            }}
                            className="bg-black/60 border-white/10 text-white focus:border-amber-500/50 h-12 pl-10"
                            placeholder="0000 0000 0000 0000"
                          />
                          <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="expiry" className="text-white/80 mb-2">Expiry Date</Label>
                          <Input
                            id="expiry"
                            required
                            maxLength={5}
                            value={cardData.expiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^0-9]/gi, '');
                              if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
                              setCardData({ ...cardData, expiry: val });
                            }}
                            className="bg-black/60 border-white/10 text-white focus:border-amber-500/50 h-12"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc" className="text-white/80 mb-2">CVC</Label>
                          <div className="relative">
                            <Input
                              id="cvc"
                              required
                              maxLength={4}
                              value={cardData.cvc}
                              onChange={(e) => setCardData({ ...cardData, cvc: e.target.value.replace(/[^0-9]/gi, '') })}
                              className="bg-black/60 border-white/10 text-white focus:border-amber-500/50 h-12 pr-10"
                              placeholder="123"
                            />
                            <Lock className="absolute right-3 top-3.5 w-4 h-4 text-white/40" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("email")}
                        className="w-1/3 h-14 border-white/10 text-white hover:bg-white/5"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="w-2/3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black h-14 shadow-lg shadow-amber-500/20 transition-all font-semibold"
                      >
                        Confirm & Reserve
                      </Button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 4: Processing */}
                {step === "processing" && (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <Loader2 className="w-16 h-16 text-amber-500 animate-spin mb-6" />
                    <h2 className="text-2xl font-serif text-white mb-2">Securing Reservation...</h2>
                    <p className="text-white/50">Please wait while we verify your details.</p>
                  </motion.div>
                )}

                {/* STEP 5: Success */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                      className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20"
                    >
                      <Check className="w-12 h-12 text-black" />
                    </motion.div>

                    <h2 className="text-4xl font-serif mb-4 text-white">Reservation Confirmed!</h2>
                    <p className="text-white/60 mb-2 text-lg">
                      Thank you for choosing Nocturne, {formData.name.split(' ')[0]}.
                    </p>
                    <p className="text-white/40 text-sm">
                      A confirmation email and receipt have been sent to {formData.email}.
                    </p>

                    <div className="mt-10 p-6 bg-black/40 border border-amber-500/20 rounded-xl max-w-md mx-auto">
                      <div className="grid grid-cols-2 gap-6 text-sm text-left">
                        <div>
                          <p className="text-white/40 mb-1 uppercase tracking-wider text-xs">Date</p>
                          <p className="text-white font-medium">{formData.date}</p>
                        </div>
                        <div>
                          <p className="text-white/40 mb-1 uppercase tracking-wider text-xs">Time</p>
                          <p className="text-white font-medium">{formData.time}</p>
                        </div>
                        <div>
                          <p className="text-white/40 mb-1 uppercase tracking-wider text-xs">Guests</p>
                          <p className="text-white font-medium">{formData.guests} People</p>
                        </div>
                        <div>
                          <p className="text-white/40 mb-1 uppercase tracking-wider text-xs">Status</p>
                          <p className="text-amber-400 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Secured
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              {
                title: "Hours",
                content: "Tue-Thu: 5PM-11PM\nFri-Sat: 5PM-1AM\nSun-Mon: Closed",
                image: hoursImg,
              },
              {
                title: "Location",
                content: "123 Nightfall Avenue\nDowntown District\nMetropolis, ST 12345",
                image: locationImg,
              },
              {
                title: "Atmosphere",
                content: "Sophisticated dim lighting\nPrivate dining suites\nDress code: Smart Elegant",
                image: rsImg,
              },
              {
                title: "Contact",
                content: "reservations@nocturne.com\n+1 (555) 123-4567",
                image: contactImg,
              },
            ].map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-6 bg-zinc-900/30 border border-white/5 rounded-lg backdrop-blur-sm transition-all hover:border-amber-500/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <img src={info.image} alt={info.title} className="w-full h-full object-cover grayscale mix-blend-overlay" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-amber-400 mb-3 font-serif text-lg">{info.title}</h3>
                  <p className="text-white/50 text-sm whitespace-pre-line leading-relaxed">
                    {info.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}