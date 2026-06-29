import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Gamepad2, Code } from 'lucide-react';

const services = [
  {
    title: 'Web App Development',
    description: 'High-performance, scalable web applications tailored to your business needs.',
    icon: <Globe size={32} className="text-brand-blue" />,
  },
  {
    title: 'iOS & Android Apps',
    description: 'Native and cross-platform mobile experiences that users love.',
    icon: <Smartphone size={32} className="text-brand-purple" />,
  },
  {
    title: 'Game Development',
    description: 'Immersive gaming experiences built with cutting-edge engines.',
    icon: <Gamepad2 size={32} className="text-brand-blue" />,
  },
  {
    title: 'Custom Software',
    description: 'Bespoke enterprise solutions designed to streamline your workflows.',
    icon: <Code size={32} className="text-brand-purple" />,
  }
];

export default function Services() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto mt-12 overflow-hidden">
      {/* Header Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Our <span className="text-brand-blue">Expertise</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          From concept to deployment, we deliver top-tier digital solutions across all platforms.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-brand-blue/10 transition-all cursor-pointer"
          >
            <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold font-heading mb-3">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}