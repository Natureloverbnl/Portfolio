import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  useEffect(() => {
    // Simulate loading time for premium feel
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => setShowLoader(false), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return (
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: showLoader ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="text-6xl font-serif italic text-white mb-4">✦</div>
            <h1 className="text-2xl font-serif italic text-white/80">Baliman Tamang</h1>
          </motion.div>

          <motion.div
            className="w-16 h-1 bg-white/20 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <motion.p
            className="text-white/60 text-sm mt-4 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Loading portfolio...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-black overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navigation />

      {/* Premium Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        {/* Background with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.9, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full"
            animate={{
              y: [0, -25, 0],
              opacity: [0.25, 0.7, 0.25]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
                Award-Winning Photographer
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif italic text-white mb-8 leading-tight"
            style={{
              textShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 80px rgba(0,0,0,0.3), 0 0 120px rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Capturing the Soul
            <br />
            <span className="text-5xl md:text-7xl lg:text-8xl text-white/95">of Nepal</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed font-light">
              Award-Recognized Photographer | Filmmaker | Storyteller
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              I photograph landscapes, cultures, and human moments that reveal the profound emotion and deep meaning embedded in everyday life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => {
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Explore Work
                <motion.i
                  className="fas fa-arrow-down"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </motion.button>

            <motion.button
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 border border-white/40 rounded-full text-white/90 font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              About Me
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      <Gallery />

      {/* Premium About Section */}
      <section id="about" className="py-32 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block px-4 py-2 bg-slate-200 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-slate-700 text-sm font-medium tracking-wider uppercase">
                About the Artist
              </span>
            </motion.div>

            <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl text-black mb-8 leading-tight">
              Meet the Storyteller
            </h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
              A passionate visual storyteller dedicated to capturing the essence of Nepal&apos;s landscapes,
              cultures, and the resilient human spirit that defines this extraordinary land.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-camera text-white text-lg"></i>
                  </div>
                  <h3 className="text-2xl font-serif italic text-black">Visual Storytelling</h3>
                </div>
                <p className="text-black/80 leading-relaxed mb-6">
                  I am an award-winning travel photographer and filmmaker specializing in landscape and cultural photography. My work captures the raw beauty of Nepal—from the majestic Himalayas to intimate cultural moments—through a lens that honors both nature and humanity.
                </p>
                <p className="text-black/80 leading-relaxed">
                  Each photograph is a conversation between the lens and the world, revealing the profound emotion and deep meaning embedded in everyday life.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-mountain text-white text-lg"></i>
                  </div>
                  <h3 className="text-2xl font-serif italic text-black">Photography Practice</h3>
                </div>
                <p className="text-black/80 leading-relaxed">
                  My photography is defined by a deep connection to place and people. I work primarily in landscape, nature, and ethnographic storytelling, documenting diverse communities and ecosystems across Nepal.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-trophy text-white text-lg"></i>
                    </div>
                    <h3 className="text-2xl font-serif italic text-black">Recognition</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-500">9th</div>
                    <div className="text-sm text-black/60">Annual International</div>
                    <div className="text-sm text-black/60">35 AWARDS Winner</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-black/80">Featured Pexels Photographer</span>
                    <i className="fas fa-check text-green-500"></i>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-black/80">International 35 AWARDS Winner</span>
                    <i className="fas fa-check text-green-500"></i>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-black/80">Selected from 174 Countries</span>
                    <i className="fas fa-check text-green-500"></i>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-black/80">Behance Portfolio Showcase</span>
                    <i className="fas fa-check text-green-500"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-serif italic mb-6">My Philosophy</h3>
                <blockquote className="text-lg italic leading-relaxed mb-6 text-white/90">
                  &ldquo;Every photograph is a conversation between the lens and the world. I capture moments that reveal the soul of place and the essence of culture.&rdquo;
                </blockquote>
                <div className="flex items-center text-white/80">
                  <i className="fas fa-quote-left mr-2 text-amber-400"></i>
                  <span className="text-sm">Baliman Tamang</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Contact Section */}
      <section id="contact" className="py-32 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-slate-600/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
                Let&apos;s Connect
              </span>
            </motion.div>

            <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">
              Start a Conversation
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              I&apos;m actively seeking exhibitions, social impact projects, and creative partnerships that tell stories of cultural heritage, community resilience, and environmental conservation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-serif italic mb-6 text-white">Available for Collaborations</h3>
                <p className="text-white/80 leading-relaxed mb-8">
                  I&apos;m actively seeking exhibitions, social impact projects, and creative partnerships that tell stories of cultural heritage, community resilience, and environmental conservation.
                </p>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-envelope text-white"></i>
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-wider text-white/60 mb-1">Email</div>
                      <a
                        href="mailto:baliman.tamang77@gmail.com"
                        className="text-white hover:text-amber-400 transition-colors duration-300 font-medium"
                      >
                        baliman.tamang77@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-sm uppercase tracking-wider text-white/60 mb-4">Follow & Connect</div>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: 'instagram', url: 'https://www.instagram.com/nature_loverbnl', label: 'Instagram' },
                        { icon: 'image', url: 'https://www.pexels.com/@natureloverbnl', label: 'Pexels' },
                        { icon: 'youtube', url: 'https://youtube.com/@nature_loverbnl', label: 'YouTube' },
                        { icon: 'behance', url: 'https://www.behance.net/balimantamang', label: 'Behance' }
                      ].map((social, index) => (
                        <motion.a
                          key={social.icon}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <i className={`fab fa-${social.icon} text-white group-hover:text-amber-400 transition-colors duration-300`}></i>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-serif italic mb-6 text-white">Recognition & Highlights</h3>
                <div className="space-y-4">
                  {[
                    'Featured Pexels Photographer with Growing Audience',
                    '9th Annual International 35 AWARDS Winner',
                    'Selected from 174 Countries Worldwide',
                    'Behance Portfolio Showcase & Appreciation',
                    'Social Research Documentation Specialist',
                    'Media & Digital Strategy Leader'
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start p-3 bg-white/5 rounded-lg border border-white/10"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <i className="fas fa-check text-amber-400 mt-1 mr-3 flex-shrink-0"></i>
                      <span className="text-white/90 text-sm leading-relaxed">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/30">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-lightbulb text-white"></i>
                  </div>
                  <h4 className="text-lg font-serif italic text-white">Ready to Collaborate?</h4>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Whether you&apos;re planning an exhibition, need documentation for your NGO, or want to tell a compelling visual story, I&apos;m here to bring your vision to life through the power of photography and film.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-16 px-4 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="font-serif italic text-2xl text-white mb-2">Baliman Tamang</h3>
              <p className="text-white/60 text-sm tracking-wider uppercase">Visual Storyteller | Social Researcher | Nature Advocate</p>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
              Capturing stories, preserving culture, inspiring change through photography and film.
              Every image tells a story of resilience, beauty, and the human spirit.
            </p>

            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: 'instagram', url: 'https://www.instagram.com/nature_loverbnl' },
                { icon: 'image', url: 'https://www.pexels.com/@natureloverbnl' },
                { icon: 'youtube', url: 'https://youtube.com/@nature_loverbnl' },
                { icon: 'behance', url: 'https://www.behance.net/balimantamang' }
              ].map((social) => (
                <motion.a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`fab fa-${social.icon} text-white/70 hover:text-white transition-colors duration-300`}></i>
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-white/40 text-xs">
                © 2026 Baliman Tamang. All rights reserved. | Made with passion for visual storytelling.
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </motion.div>
  );
}

export default App;