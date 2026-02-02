import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData, categories } from '../data/galleryData';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredImages, setFilteredImages] = useState([]);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Filter images based on selected category
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (selectedCategory === 'All') {
        setFilteredImages(galleryData);
      } else {
        setFilteredImages(galleryData.filter(img => img.category === selectedCategory));
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Listen for filter events from navigation
  useEffect(() => {
    const handleFilter = (event) => {
      setSelectedCategory(event.detail.category);
    };

    window.addEventListener('filterGallery', handleFilter);
    return () => window.removeEventListener('filterGallery', handleFilter);
  }, []);

  const handleImageError = (imageId) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  const getImageSrc = (image) => {
    if (imageErrors.has(image.id)) {
      const fallbackImages = {
        'Landscape': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'Culture': 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&q=80',
        'Portrait': 'https://images.unsplash.com/photo-1544008230-ac1e1fb4f4f4?w=800&q=80'
      };
      return fallbackImages[image.category] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
    }
    return image.src;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-gradient-to-b from-white via-slate-50 to-white" style={{ scrollMarginTop: '80px' }}>
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block px-4 py-2 bg-slate-100 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-slate-600 text-sm font-medium tracking-wider uppercase">
              Featured Collection
            </span>
          </motion.div>

          <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl text-black mb-6 leading-tight">
            Featured Work
          </h2>
          <p className="text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
            A curated collection of moments captured across Nepal&apos;s diverse landscapes and cultural heritage.
            Each image tells a story of resilience, beauty, and the human spirit.
          </p>
        </motion.div>

        {/* Premium Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-black/70 hover:text-black border border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
              whileHover={{
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  className="absolute inset-0 bg-slate-900 rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="aspect-square bg-slate-200 rounded-lg animate-pulse"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image) => (
                  <motion.div
                    key={`${selectedCategory}-${image.id}`}
                    layout
                    variants={itemVariants}
                    className="break-inside-avoid mb-6 group cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
                      onClick={() => setSelectedImage(image)}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden">
                        {!loadedImages.has(image.id) && !imageErrors.has(image.id) && (
                          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}

                        <motion.img
                          src={getImageSrc(image)}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          onError={() => handleImageError(image.id)}
                          onLoad={() => handleImageLoad(image.id)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: loadedImages.has(image.id) ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <motion.h3
                            className="font-serif italic text-lg mb-1 drop-shadow-lg"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            {image.title}
                          </motion.h3>
                          <p className="text-sm text-white/90 drop-shadow-md mb-1">{image.location}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/80 bg-black/30 px-2 py-1 rounded-full">
                              {image.category}
                            </span>
                            <motion.i
                              className="fas fa-expand text-white/80"
                              whileHover={{ scale: 1.2 }}
                            />
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black/80 text-xs font-medium rounded-full">
                            {image.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className="relative">
                  <img
                    src={getImageSrc(selectedImage)}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />

                  {/* Close Button */}
                  <motion.button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-times"></i>
                  </motion.button>

                  {/* Navigation Arrows */}
                  <div className="absolute inset-y-0 left-4 flex items-center">
                    <motion.button
                      className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </motion.button>
                  </div>
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <motion.button
                      className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif italic text-3xl text-black mb-4"
                      >
                        {selectedImage.title}
                      </motion.h2>

                      <div className="flex items-center text-black/60 mb-6">
                        <i className="fas fa-map-marker-alt mr-2 text-slate-400"></i>
                        <span className="font-medium">{selectedImage.location}</span>
                        <span className="mx-2">•</span>
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium">
                          {selectedImage.category}
                        </span>
                      </div>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-black/80 leading-relaxed mb-6"
                      >
                        {selectedImage.story}
                      </motion.p>
                    </div>

                    <div>
                      <h3 className="font-serif italic text-xl text-black mb-4">Technical Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Camera</div>
                          <div className="font-medium text-black">{selectedImage.exif.camera}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Lens</div>
                          <div className="font-medium text-black">{selectedImage.exif.lens}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Focal Length</div>
                          <div className="font-medium text-black">{selectedImage.exif.focalLength}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Aperture</div>
                          <div className="font-medium text-black">f/{selectedImage.exif.aperture}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Shutter Speed</div>
                          <div className="font-medium text-black">{selectedImage.exif.shutterSpeed}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">ISO</div>
                          <div className="font-medium text-black">{selectedImage.exif.iso}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;