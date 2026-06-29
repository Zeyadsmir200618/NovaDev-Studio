import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Zap, ShieldCheck, Award } from 'lucide-react';

const coreValues = [
  {
    title: 'Relentless Innovation',
    description: 'We do not just use technology; we push its boundaries to build future-proof solutions.',
    icon: <Rocket size={28} className="text-brand-blue" />,
  },
  {
    title: 'Pixel-Perfect Quality',
    description: 'Every line of code and every UI component is crafted with absolute precision.',
    icon: <Award size={28} className="text-brand-purple" />,
  },
  {
    title: 'Client-Centric Approach',
    description: 'Your success is our success. We collaborate closely to turn your exact vision into reality.',
    icon: <Users size={28} className="text-brand-blue" />,
  },
  {
    title: 'Lightning Fast Delivery',
    description: 'Optimized agile workflows ensure we hit our deadlines without compromising on quality.',
    icon: <Zap size={28} className="text-brand-purple" />,
  },
  {
    title: 'Bulletproof Security',
    description: 'Enterprise-grade security standards are baked into everything we build from day one.',
    icon: <ShieldCheck size={28} className="text-brand-blue" />,
  },
  {
    title: 'Results-Driven',
    description: 'We do not just build pretty apps; we build software engineered to drive ROI and growth.',
    icon: <Target size={28} className="text-brand-purple" />,
  }
];

const stats = [
  { number: '10+', label: 'Built Projects' },
  { number: '99%', label: 'Client Satisfaction' },
  { number: '3+', label: 'Years Experience' },
  { number: '24/7', label: 'Support & Maintenance' },
];

export default function About() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      
      {/* Hero Header */}
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-brand-purple"
        >
          Behind The Code
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-heading font-extrabold mt-4 mb-6"
        >
          Architects of the <br />
          <span className="text-brand-blue">Digital Frontier.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          NovaDev Studio was born from a singular vision: to bridge the gap between complex engineering and beautiful design. We are an elite collective of developers, designers, and strategists dedicated to building software that elevates brands.
        </motion.p>
      </div>

      {/* Stats Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-lg mb-24"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <h3 className="text-4xl md:text-5xl font-heading font-extrabold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent mb-2">
              {stat.number}
            </h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Core Values Section */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16">
          Our <span className="text-brand-purple">Core Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 transition-colors"
            >
              <div className="bg-white dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">{value.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}