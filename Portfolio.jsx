import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';
import { client } from '../sanity'; // Make sure the path points correctly to your src/sanity.js file

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a GROQ query. It asks Sanity: "Give me all documents where type is 'project'"
    const query = `*[_type == "project"]{
      title,
      category,
      tech,
      imageColor
    }`;

    client.fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching portfolio data from Sanity:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Header Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-end mb-12"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="text-brand-purple">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            A glimpse into the digital experiences we've crafted for forward-thinking brands.
          </p>
        </div>
      </motion.div>

      {/* Loading State UI */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
          <Loader2 className="animate-spin text-brand-purple" size={40} />
          <p className="text-sm font-medium">Fetching active portfolio items from NovaDev CMS...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Image Container */}
              <div className={`h-64 w-full bg-gradient-to-br ${project.imageColor || 'from-slate-400 to-slate-500'} relative overflow-hidden`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300"
                />
              </div>

              <div className="p-8">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-purple mb-2">
                  {project.category}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold font-heading group-hover:text-brand-blue transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((badge, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}