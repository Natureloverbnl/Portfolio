import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { portfolioData, categories } from '../data/portfolioData';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredImages, setFilteredImages] = useState(portfolioData);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredImages(portfolioData);
    } else {
      setFilteredImages(portfolioData.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Listen for filter events from navigation
  useEffect(() => {
    const handleFilterEvent = (event) => {
      setSelectedCategory(event.detail.category);
    };

    window.addEventListener('filterGallery', handleFilterEvent);
    return () => window.removeEventListener('filterGallery', handleFilterEvent);
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Magnetic button component
  const MagneticButton = ({ category, isActive, onClick }) => {
    const buttonRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 30 });
    const springY = useSpring(y, { stiffness: 300, damping: 30 });

    useEffect(() => {
      if (!buttonRef.current) return;

      const handleMouseMove = (e) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        // Only apply magnetic effect when close (within 100px)
        if (distance < 100) {
          const strength = (100 - distance) / 100;
          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          const moveDistance = strength * 8;

          x.set(Math.cos(angle) * moveDistance);
          y.set(Math.sin(angle) * moveDistance);
        } else {
          x.set(0);
          y.set(0);
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        style={{ x: springX, y: springY }}
        className={`px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
          isActive
            ? 'bg-[#4a7c59] text-white'
            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {category}
      </motion.button>
    );
  };

  // 3D Tilt component
  const TiltCard = ({ image, onClick }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-300, 300], [15, -15]);
    const rotateY = useTransform(x, [-300, 300], [-15, 15]);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(image)}
        layoutId={`image-${image.id}`}
        className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Shimmer Loading State */}
        {!loadedImages.has(image.id) && (
          <div className="absolute inset-0 bg-gray-800 shimmer rounded-lg z-10 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <motion.img
          src={image.src}
          alt={image.title}
          className="w-full h-auto object-cover transition-all duration-500"
          onLoad={() => handleImageLoad(image.id)}
          loading="lazy"
          style={{ transform: 'translateZ(0)' }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-serif italic text-white text-xl mb-2">
              {image.title}
            </h3>
            <div className="flex items-center text-white/80 text-sm">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {image.location}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]" ref={galleryRef}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif italic text-center mb-12 text-white"
          >
            Featured Work
          </motion.h2>

          {/* Filter Bar */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide max-w-full">
              {categories.map((category) => (
                <MagneticButton
                  key={category}
                  category={category}
                  isActive={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="columns-1 md:columns-2 lg:columns-3 gap-6"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                animate="show"
                className="contents"
              >
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.8 },
                      show: { opacity: 1, y: 0, scale: 1 }
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    className="contents"
                  >
                    <TiltCard image={image} onClick={openModal} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Full-Screen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
            onClick={closeModal}
          >
            <motion.div
              layoutId={`image-${selectedImage.id}`}
              className="relative max-w-5xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto object-contain rounded-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm rounded-b-lg p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-serif italic text-white text-2xl mb-3">
                      {selectedImage.title}
                    </h3>
                    <div className="flex items-center text-white/80 text-sm mb-4">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {selectedImage.location}
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      {selectedImage.story || "A captivating moment captured in Nepal's diverse landscapes, showcasing the raw beauty and cultural richness of this remarkable country."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Technical Details</h4>
                      <div className="space-y-2 text-sm text-white/70">
                        <div className="flex justify-between">
                          <span>Camera:</span>
                          <span>{selectedImage.exif?.camera || "Sony A7R IV"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lens:</span>
                          <span>{selectedImage.exif?.lens || "FE 24-70mm f/2.8"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span>{selectedImage.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span>{selectedImage.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-times text-2xl"></i>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;