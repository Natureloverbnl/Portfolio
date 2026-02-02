import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { megaMenuData } from '../data/galleryData';

const Navigation = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToGallery = (category = 'All') => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);

    // Smooth scroll to gallery section
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });

      // If a specific category was clicked, trigger filter after scroll
      if (category !== 'All') {
        setTimeout(() => {
          // Dispatch custom event to gallery component
          window.dispatchEvent(new CustomEvent('filterGallery', { detail: { category } }));
        }, 500);
      }
    }
  };

  const handleMenuItemClick = (category) => {
    scrollToGallery(category);
  };

  // Curtain drop animation variants
  const curtainVariants = {
    closed: {
      y: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20
      }
    }
  };

  // Text mask animation variants
  const textMaskVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 120,
        damping: 20
      }
    })
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.h1
            className="text-sm font-bold font-serif italic text-[#fafaf9] tracking-wide cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            ✦ nature_loverbnl
          </motion.h1>

          <div className="hidden md:flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <motion.button
                className="text-xs font-semibold uppercase tracking-wider text-[#fafaf9]/70 hover:text-[#4a7c59] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Work
              </motion.button>

              <AnimatePresence mode="wait">
                {isMegaMenuOpen && (
                  <motion.div
                    variants={curtainVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute top-full left-0 right-0 bg-[#0a0a0a] border-t border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {/* Poetic Categories Column */}
                        <div className="p-12 border-r border-white/5">
                          <motion.h3
                            custom={0}
                            variants={textMaskVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-sm font-semibold uppercase tracking-wider text-[#fafaf9]/50 mb-8"
                          >
                            Narrative
                          </motion.h3>
                          <div className="space-y-6">
                            {megaMenuData.poetic.map((item, index) => (
                              <motion.div
                                key={item.title}
                                custom={index + 1}
                                variants={textMaskVariants}
                                initial="hidden"
                                animate="visible"
                                className="group cursor-pointer"
                                onClick={() => handleMenuItemClick(item.title)}
                              >
                                <motion.h4
                                  className="font-serif italic text-[#fafaf9] group-hover:text-[#4a7c59] transition-colors duration-300 text-lg"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  {item.title}
                                </motion.h4>
                                <p className="text-xs text-[#fafaf9]/50 mt-2 group-hover:text-[#fafaf9]/70 transition-colors duration-300 leading-relaxed">
                                  {item.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Professional Services Column */}
                        <div className="p-12 border-r border-white/5">
                          <motion.h3
                            custom={4}
                            variants={textMaskVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-sm font-semibold uppercase tracking-wider text-[#fafaf9]/50 mb-8"
                          >
                            Professional
                          </motion.h3>
                          <div className="space-y-6">
                            {megaMenuData.professional.map((item, index) => (
                              <motion.div
                                key={item.title}
                                custom={index + 5}
                                variants={textMaskVariants}
                                initial="hidden"
                                animate="visible"
                                className="group cursor-pointer"
                                onClick={() => scrollToGallery()}
                              >
                                <motion.h4
                                  className="font-serif italic text-[#fafaf9] group-hover:text-[#4a7c59] transition-colors duration-300 text-lg"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  {item.title}
                                </motion.h4>
                                <p className="text-xs text-[#fafaf9]/50 mt-2 group-hover:text-[#fafaf9]/70 transition-colors duration-300 leading-relaxed">
                                  {item.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Featured Image Column */}
                        <div className="p-12">
                          <motion.div
                            custom={8}
                            variants={textMaskVariants}
                            initial="hidden"
                            animate="visible"
                            className="relative group cursor-pointer"
                            onClick={() => scrollToGallery()}
                          >
                            <img
                              src={megaMenuData.featured.src}
                              alt={megaMenuData.featured.title}
                              className="w-full h-64 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMS41IiBmaWxsPSIjZmFmYWY5IiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-20 rounded-lg" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <motion.h4
                                className="font-serif italic text-[#fafaf9] text-xl mb-2"
                                whileHover={{ scale: 1.05 }}
                              >
                                {megaMenuData.featured.title}
                              </motion.h4>
                              <p className="text-xs text-[#fafaf9]/70">{megaMenuData.featured.description}</p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.a
              href="#about"
              className="text-xs font-semibold uppercase tracking-wider text-[#fafaf9]/70 hover:text-[#4a7c59] transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              className="text-xs font-semibold uppercase tracking-wider text-[#fafaf9]/70 hover:text-[#4a7c59] transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#fafaf9]/70 hover:text-[#4a7c59] transition-colors duration-300"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#0a0a0a] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 pt-20">
                <div className="space-y-8">
                  {/* Mobile Work Menu */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#fafaf9]/50 mb-4">Work</h3>
                    <div className="space-y-4">
                      {megaMenuData.poetic.map((item) => (
                        <div
                          key={item.title}
                          className="cursor-pointer"
                          onClick={() => handleMenuItemClick(item.title)}
                        >
                          <h4 className="font-serif italic text-[#fafaf9] hover:text-[#4a7c59] transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#fafaf9]/50 mt-1">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Professional Menu */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#fafaf9]/50 mb-4">Professional</h3>
                    <div className="space-y-4">
                      {megaMenuData.professional.map((item) => (
                        <div
                          key={item.title}
                          className="cursor-pointer"
                          onClick={() => scrollToGallery()}
                        >
                          <h4 className="font-serif italic text-[#fafaf9] hover:text-[#4a7c59] transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#fafaf9]/50 mt-1">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="border-t border-white/10 pt-8 space-y-4">
                    <a
                      href="#about"
                      className="block text-[#fafaf9]/70 hover:text-[#4a7c59] transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </a>
                    <a
                      href="#contact"
                      className="block text-[#fafaf9]/70 hover:text-[#4a7c59] transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;