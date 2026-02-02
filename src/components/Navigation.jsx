import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { megaMenuData } from '../data/galleryData';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Default fallback data in case megaMenuData is not available
  const defaultMegaMenuData = {
    poetic: [
      { title: 'Landscape', description: 'Sacred mountains and terraced valleys' },
      { title: 'Portrait', description: 'Faces that carry stories of resilience' },
      { title: 'Culture', description: 'Living traditions and cultural heritage' }
    ],
    professional: [
      { title: 'Editorial Work', description: 'Magazine features and publications' },
      { title: 'Commercial', description: 'Brand storytelling and advertising' }
    ],
    featured: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      title: 'Explore the Collection',
      description: 'Award-winning Himalayan photography'
    }
  };

  const menuData = megaMenuData || defaultMegaMenuData;

  const handleMenuItemClick = (category) => {
    setIsMenuOpen(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mega-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Curtain animation variants
  const curtainVariants = {
    closed: {
      y: '-100%',
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    },
    open: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  // Staggered link animation variants
  const linkVariants = {
    closed: {
      y: 20,
      opacity: 0
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.h1
              className="text-sm font-bold font-serif italic text-white tracking-wide cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ✦ nature_loverbnl
            </motion.h1>

            <div className="hidden md:flex items-center space-x-8">
              <div className="relative mega-menu-container">
                <motion.button
                  className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-[#4a7c59] transition-colors duration-300 flex items-center gap-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Work
                  <motion.span
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-xs"
                  >
                    ▼
                  </motion.span>
                </motion.button>
              </div>

              <motion.button
                onClick={() => {
                  setIsMenuOpen(false);
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-[#4a7c59] transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                About
              </motion.button>
              <motion.button
                onClick={() => {
                  setIsMenuOpen(false);
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-[#4a7c59] transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/70 hover:text-[#4a7c59] transition-colors duration-300"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu - Fixed Position with High Z-Index */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={curtainVariants}
            className="fixed top-16 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10"
            style={{ height: 'calc(100vh - 4rem)' }}
          >
            <div className="max-w-7xl mx-auto h-full">
              <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                {/* Narrative Categories Column */}
                <div className="p-8 border-r border-white/10 flex flex-col justify-center">
                  <motion.h3
                    variants={linkVariants}
                    className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-8"
                  >
                    Narrative
                  </motion.h3>
                  <div className="space-y-6">
                    {menuData?.poetic?.map((item) => (
                      <motion.div
                        key={item.title}
                        variants={linkVariants}
                        className="group cursor-pointer"
                        onClick={() => handleMenuItemClick(item.title)}
                      >
                        <h4 className="font-serif italic text-white group-hover:text-[#4a7c59] transition-colors duration-300 text-xl mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                          {item.description}
                        </p>
                        <motion.div
                          className="h-px bg-[#4a7c59] mt-2"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Professional Services Column */}
                <div className="p-8 border-r border-white/10 flex flex-col justify-center">
                  <motion.h3
                    variants={linkVariants}
                    className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-8"
                  >
                    Professional
                  </motion.h3>
                  <div className="space-y-6">
                    {menuData?.professional?.map((item) => (
                      <motion.div
                        key={item.title}
                        variants={linkVariants}
                        className="group cursor-pointer"
                        onClick={() => handleMenuItemClick('All')}
                      >
                        <h4 className="font-serif italic text-white group-hover:text-[#4a7c59] transition-colors duration-300 text-xl mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                          {item.description}
                        </p>
                        <motion.div
                          className="h-px bg-[#4a7c59] mt-2"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Featured Work Column */}
                <div className="p-8 flex flex-col justify-center">
                  <motion.div
                    variants={linkVariants}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => handleMenuItemClick('All')}
                  >
                    <img
                      src={menuData?.featured?.src || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'}
                      alt={menuData?.featured?.title || 'Featured Work'}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.h4
                        variants={linkVariants}
                        className="font-serif italic text-white text-xl mb-2 drop-shadow-lg"
                      >
                        {menuData?.featured?.title || 'Explore the Collection'}
                      </motion.h4>
                      <motion.p
                        variants={linkVariants}
                        className="text-sm text-white/90 drop-shadow-md"
                      >
                        {menuData?.featured?.description || 'Award-winning Himalayan photography'}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;