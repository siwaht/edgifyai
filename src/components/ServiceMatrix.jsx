import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, MessageSquare, User, Video, Film, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const services = [
  {
    icon: Mic,
    title: 'Voice Agents',
    description: 'Natural voice interactions powered by advanced speech recognition and synthesis.',
    color: '#06b6d4',
  },
  {
    icon: MessageSquare,
    title: 'Chat Intelligence',
    description: 'Omnichannel messaging with context-aware responses across all platforms.',
    color: '#8b5cf6',
  },
  {
    icon: User,
    title: 'Digital Avatars',
    description: 'Photorealistic AI representatives for personalized customer engagement.',
    color: '#f59e0b',
  },
  {
    icon: Video,
    title: 'Media Generation',
    description: 'Create professional video and audio content at scale with AI.',
    color: '#ec4899',
  },
  {
    icon: Film,
    title: 'Post-Production',
    description: 'Automated editing, enhancement, and optimization for all media types.',
    color: '#10b981',
  },
];

const ServiceCard = ({ service, index }) => {
  const { isDark } = useTheme();
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="card p-6 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ 
            background: `${service.color}15`,
            color: service.color 
          }}
        >
          <Icon size={24} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowUpRight size={20} style={{ color: service.color }} />
        </motion.div>
      </div>

      <h3 
        className="text-lg font-semibold mb-2"
        style={{ color: isDark ? '#fafafa' : '#09090b' }}
      >
        {service.title}
      </h3>
      
      <p 
        className="text-sm leading-relaxed"
        style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
      >
        {service.description}
      </p>

      {/* Hover gradient */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${service.color}08, transparent 50%)`
        }}
      />
    </motion.div>
  );
};

const ServiceMatrix = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  return (
    <section 
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: isDark ? '#09090b' : '#ffffff' }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="badge mb-4">Services</span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: isDark ? '#fafafa' : '#09090b' }}
          >
            Complete AI Suite
          </h2>
          <p 
            className="text-base md:text-lg"
            style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
          >
            Everything you need to build, deploy, and scale intelligent automation.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
          
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card p-6 flex flex-col justify-center items-center text-center"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(8, 145, 178, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
              borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(8, 145, 178, 0.2)'
            }}
          >
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: isDark ? '#fafafa' : '#09090b' }}
            >
              Need something custom?
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
            >
              Let's build your perfect solution together.
            </p>
            <button className="btn-secondary text-sm py-2 px-4">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
