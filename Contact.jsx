import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: '', message: '' });

    // IMPORTANT: Replace these with your actual IDs from EmailJS
    const SERVICE_ID = 'service_nxf0tbe'; 
    const TEMPLATE_ID = 'template_nli0aep'; // Replace with your template ID
    const PUBLIC_KEY = 'baaYpHmKYHmdbOgz3';   // Replace with your public key

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setStatus({
          type: 'success',
          message: "Thank you! Your request has been sent successfully. We'll be in touch within 24 hours."
        });
        e.target.reset(); // Clears the form inputs on success
      }, (error) => {
        console.error('FAILED...', error.text);
        setStatus({
          type: 'error',
          message: 'Oops! Something went wrong. Please check your connection or email us directly.'
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Let's Build Something <span className="text-brand-blue">Amazing.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
            Ready to bring your idea to life? Fill out the form, and our team will get back to you within 24 hours with a free quote and project roadmap.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-blue">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold font-heading">Email Us</h4>
                <p className="text-slate-600 dark:text-slate-400">zeyadsamir27@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-purple">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold font-heading">Call Us</h4>
                <p className="text-slate-600 dark:text-slate-400">+20 1012000430</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-blue">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold font-heading">Visit Us</h4>
                <p className="text-slate-600 dark:text-slate-400">Global Remote Agency</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: The Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg"
        >
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                <input 
                  type="text" 
                  name="user_name" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all dark:text-white" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input 
                  type="email" 
                  name="user_email" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all dark:text-white" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Type</label>
              <select 
                name="project_type" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all dark:text-white"
              >
                <option value="Web Application">Web Application</option>
                <option value="iOS / Android App">iOS / Android App</option>
                <option value="Game Development">Game Development</option>
                <option value="Custom Software">Custom Software</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Details</label>
              <textarea 
                name="message" 
                required 
                rows="4" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all dark:text-white" 
                placeholder="Tell us about your idea..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>Sending... <Loader2 size={18} className="animate-spin" /></>
              ) : (
                <>Send Request <Send size={18} /></>
              )}
            </button>

            {/* Visual Status Banner */}
            {status.message && (
              <div className={`p-4 rounded-xl text-sm border font-medium ${
                status.type === 'success' 
                  ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-900/50' 
                  : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/50'
              }`}>
                {status.message}
              </div>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
}