import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { galleryData, categories } from '../data/galleryData';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredImages, setFilteredImages] = useState(galleryData);

  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredImages(galleryData);
    } else {
      setFilteredImages(galleryData.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Listen for filter events from navigation
  useEffect(() => {
    const handleFilter = (event) => {
      setSelectedCategory(event.detail.category);
    };

    window.addEventListener('filterGallery', handleFilter);
    return () => window.removeEventListener('filterGallery', handleFilter);
  }, []);

  // Physics-based transition variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20
      }
    }
  };

  // 3D Tilt Card Component
  const TiltCard = ({ image }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-300, 300], [15, -15]);
    const rotateY = useTransform(x, [-300, 300], [-15, 15]);

    const handleMouseMove = (event) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set(event.clientX - centerX);
      y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={cardRef}
        className="relative overflow-hidden rounded-lg cursor-pointer group"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        variants={itemVariants}
        layoutId={`card-${image.id}`}
        onClick={() => setSelectedImage(image)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.02,
          transition: { type: 'spring', stiffness: 300, damping: 30 }
        }}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-[#fafaf9] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-serif italic text-lg mb-1">{image.title}</h3>
          <p className="text-sm text-[#fafaf9]/70">{image.location}</p>
          <p className="text-xs text-[#fafaf9]/50 mt-1">{image.category}</p>
        </div>
      </motion.div>
    );
  };

  // Modal Component
  const ImageModal = ({ image, onClose }) => {
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setShowDetails(true), 600);
      return () => clearTimeout(timer);
    }, []);

    const modalVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 120,
          damping: 20
        }
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
          type: 'spring',
          stiffness: 120,
          damping: 20
        }
      }
    };

    const detailVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          type: 'spring',
          stiffness: 120,
          damping: 20
        }
      })
    };

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80"
          onClick={onClose}
        >
          <motion.div
            layoutId={`card-${image.id}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#fafaf9] hover:text-[#4a7c59] transition-colors duration-300"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>

            {/* Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6"
                >
                  <motion.h2
                    custom={0}
                    variants={detailVariants}
                    className="font-serif italic text-2xl text-[#fafaf9] mb-2"
                  >
                    {image.title}
                  </motion.h2>

                  <motion.div
                    custom={1}
                    variants={detailVariants}
                    className="flex items-center text-sm text-[#fafaf9]/70 mb-4"
                  >
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {image.location}
                  </motion.div>

                  <motion.p
                    custom={2}
                    variants={detailVariants}
                    className="text-[#fafaf9]/80 leading-relaxed mb-4"
                  >
                    {image.story}
                  </motion.p>

                  <motion.div
                    custom={3}
                    variants={detailVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#fafaf9]/60"
                  >
                    <div>
                      <div className="font-semibold text-[#fafaf9]/80">Camera</div>
                      <div>{image.exif.camera}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#fafaf9]/80">Lens</div>
                      <div>{image.exif.lens}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#fafaf9]/80">Settings</div>
                      <div>{image.exif.focalLength} • f/{image.exif.aperture} • {image.exif.shutterSpeed} • ISO {image.exif.iso}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#fafaf9]/80">Category</div>
                      <div>{image.category}</div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif italic text-4xl md:text-5xl text-[#fafaf9] mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-[#fafaf9]/70 max-w-2xl mx-auto">
            A curated collection of moments captured across Nepal&apos;s diverse landscapes and cultural heritage.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#4a7c59] text-[#fafaf9]'
                  : 'bg-[#fafaf9]/10 text-[#fafaf9]/70 hover:bg-[#fafaf9]/20 hover:text-[#fafaf9]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Gallery */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {filteredImages.map((image, index) => (
              <TiltCard key={image.id} image={image} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <ImageModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;