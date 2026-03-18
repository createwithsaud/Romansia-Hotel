import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, Star, Utensils, Coffee, ShoppingBag, MessageCircle, Menu, X, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';

// Custom Cursor Component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-brand-red rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-brand-gold rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
}

// Navbar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-brand-cream' : 'text-white'} tracking-tight`}>
              Romansia <span className="text-brand-gold">Hotel</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-gold ${isScrolled ? 'text-brand-cream/80' : 'text-white/90'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#menu"
              className="gradient-gold-bg text-brand-dark px-5 py-2 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-brand-gold/20 transition-all transform hover:-translate-y-0.5"
            >
              Order Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-brand-cream' : 'text-white'} p-2`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-brand-cream hover:text-brand-gold hover:bg-white/5 rounded-md"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Hero Section
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-brand-dark z-10" />
        <img
          src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2070&auto=format&fit=crop"
          alt="Hyderabadi Biryani"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
            <span className="text-white text-sm font-medium">4.3 Rating (88 reviews)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Romansia Hotel <br />
            <span className="text-3xl md:text-4xl text-brand-gold font-medium mt-2 block">(రోమంసియా హోటల్)</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-cream/90 mb-10 max-w-2xl mx-auto font-light">
            Authentic Hyderabadi Taste at Affordable Prices
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#menu"
              className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-brand-red/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Utensils className="w-5 h-5" />
              View Menu
            </a>
            <a
              href="#contact"
              className="bg-transparent border border-brand-gold text-brand-gold px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-gold/10 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold rounded-2xl transform translate-x-4 translate-y-4 opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop"
                alt="Restaurant Interior"
                className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl">
                    10+
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Years of</p>
                    <p className="font-bold text-brand-dark">Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-red uppercase mb-3">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              A Taste of <span className="gradient-text">Hyderabad</span> in Every Bite
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Romansia Hotel is a budget-friendly restaurant in Hyderabad offering delicious Hyderabadi dishes, including our signature biryani, authentic Irani chai, and local favorites.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Known for generous portions and affordable pricing, it's the perfect spot for everyday dining. Whether you're craving a hearty meal or a quick tea break, we promise quality and taste that feels like home.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-red/10 rounded-lg text-brand-red">
                  <Utensils size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">Authentic</h4>
                  <p className="text-sm text-gray-500">Traditional recipes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-gold/20 rounded-lg text-yellow-700">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">Affordable</h4>
                  <p className="text-sm text-gray-500">Budget-friendly</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Menu Section
const menuItems = [
  {
    id: 1,
    name: 'Mutton Biryani',
    description: 'Tender mutton pieces cooked with fragrant basmati rice and secret spices.',
    price: '₹180 - ₹200',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2010&auto=format&fit=crop',
    tag: 'Bestseller'
  },
  {
    id: 2,
    name: 'Chicken Biryani',
    description: 'Classic Hyderabadi dum biryani with succulent chicken and aromatic rice.',
    price: '₹140 - ₹160',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Irani Chai',
    description: 'Rich, creamy, and slow-brewed traditional Hyderabadi tea.',
    price: '₹20',
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop',
    tag: 'Must Try'
  },
  {
    id: 4,
    name: 'Osmania Biscuits',
    description: 'Soft, buttery, melt-in-your-mouth biscuits. Perfect with Irani Chai.',
    price: '₹5 / piece',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=2070&auto=format&fit=crop',
  }
];

function MenuSection({ cart, setCart }: { cart: Record<number, number>, setCart: React.Dispatch<React.SetStateAction<Record<number, number>>> }) {
  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const newCart = { ...prev };
      if (next === 0) {
        delete newCart[id];
      } else {
        newCart[id] = next;
      }
      return newCart;
    });
  };

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-red uppercase mb-3">Our Menu</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              Signature <span className="gradient-text">Dishes</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience the true flavors of Hyderabad without breaking the bank.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group rounded-2xl overflow-hidden bg-brand-cream border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {item.tag && (
                  <div className="absolute top-4 right-4 bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {item.tag}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-brand-dark">{item.name}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-bold text-brand-red">{item.price}</span>
                  {cart[item.id] ? (
                    <div className="flex items-center gap-3 bg-brand-cream border border-brand-red rounded-full px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-red/10 text-brand-red hover:bg-brand-red hover:text-white transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-brand-dark text-sm w-4 text-center">{cart[item.id]}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-red/10 text-brand-red hover:bg-brand-red hover:text-white transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => updateQuantity(item.id, 1)} className="bg-brand-red text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-dark transition-colors shadow-md">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-brand-dark transition-colors border-b-2 border-brand-red pb-1">
            View Full Menu <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

// Services Section
function Services() {
  const services = [
    { icon: <Utensils size={32} />, title: 'Dine-in', desc: 'Comfortable seating for families and friends.' },
    { icon: <ShoppingBag size={32} />, title: 'Takeaway', desc: 'Quick and hygienic packaging for your convenience.' },
    { icon: <Clock size={32} />, title: 'Open 24 Hours', desc: 'Satisfy your cravings anytime, day or night.' },
  ];

  return (
    <section className="py-20 bg-brand-dark text-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-16 h-16 rounded-full gradient-gold-bg flex items-center justify-center text-brand-dark mb-6 shadow-lg shadow-brand-gold/20">
                {service.icon}
              </div>
              <h4 className="text-2xl font-bold mb-3 text-white">{service.title}</h4>
              <p className="text-brand-cream/70">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Reviews Section
function Reviews() {
  const reviews = [
    { text: "Best Irani chai and Osmania biscuits in the area. A must-visit for evening snacks!", rating: 5, author: "Mohammed S." },
    { text: "Affordable and filling meals. The chicken biryani is totally worth the price.", rating: 4, author: "Rahul K." },
    { text: "Good biryani rice, budget-friendly. Great place for students and daily workers.", rating: 4, author: "Syed A." },
  ];

  return (
    <section id="reviews" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-red uppercase mb-3">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark">
              What Our <span className="gradient-text">Customers</span> Say
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="text-4xl font-bold text-brand-dark">4.3</div>
            <div>
              <div className="flex text-brand-gold mb-1">
                {[...Array(4)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                <Star size={16} className="fill-current opacity-50" />
              </div>
              <div className="text-sm text-gray-500 font-medium">Based on 88 reviews</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
            >
              <div className="text-6xl text-brand-gold/20 absolute top-4 right-6 font-serif">"</div>
              <div className="flex text-brand-gold mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
              </div>
              <p className="text-gray-700 mb-6 text-lg italic relative z-10">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold">
                  {review.author.charAt(0)}
                </div>
                <span className="font-bold text-brand-dark">{review.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Location & Contact
function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-red uppercase mb-3">Visit Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-8">
              Location & <span className="gradient-text">Contact</span>
            </h3>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-2">Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Shop 5, Airport Road, Shaheen Nagar,<br />
                    Wadi e Omer Colony, Hyderabad,<br />
                    Telangana 500005
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-2">Phone</h4>
                  <p className="text-gray-600 text-lg">+91 91540 65368</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-2">Opening Hours</h4>
                  <div className="inline-block bg-brand-gold/20 text-yellow-800 px-3 py-1 rounded-md font-bold text-sm mb-2">
                    Open 24 Hours
                  </div>
                  <p className="text-gray-600">Monday - Sunday</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Romansia+Hotel+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-brand-red/30 transition-all inline-flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative"
          >
            {/* Popular Times Overlay (Optional feature requested) */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg z-10 w-64">
              <h5 className="font-bold text-sm mb-2 text-brand-dark">Popular Times</h5>
              <div className="flex items-end gap-1 h-16">
                {[30, 40, 60, 90, 100, 80, 50, 40].map((h, i) => (
                  <div key={i} className="flex-1 bg-brand-red/20 rounded-t-sm relative group">
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-brand-red rounded-t-sm transition-all" 
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
                <span>12 PM</span>
                <span>8 PM</span>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.071449835848!2d78.4848!3d17.3148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDE4JzUzLjMiTiA3OMKwMjknMDUuMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Romansia Hotel Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-bold text-white tracking-tight mb-6 block">
              Romansia <span className="text-brand-gold">Hotel</span>
            </span>
            <p className="text-brand-cream/70 max-w-md mb-8 leading-relaxed">
              Authentic Hyderabadi Taste at Affordable Prices. Your go-to spot for biryani, Irani chai, and local favorites.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-gold">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Menu', 'Reviews', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-brand-cream/70 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-gold">Contact</h4>
            <ul className="space-y-4 text-brand-cream/70">
              <li>+91 91540 65368</li>
              <li>Airport Road, Shaheen Nagar</li>
              <li>Hyderabad, Telangana</li>
              <li className="text-brand-gold font-bold mt-4">Open 24 Hours</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-cream/50 text-sm">
            © {new Date().getFullYear()} Romansia Hotel. All rights reserved.
          </p>
          <p className="text-brand-cream/50 text-sm">
            Designed with ❤️ in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}

// Sticky Cart Button
function StickyCart({ totalItems }: { totalItems: number }) {
  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-brand-dark text-brand-gold rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border border-brand-gold/30 cursor-pointer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingCart size={24} />
          <div className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-brand-cream">
            {totalItems}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Floating WhatsApp Button
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919154065368"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}

export default function App() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-gold selection:text-brand-dark">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection cart={cart} setCart={setCart} />
        <Services />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <StickyCart totalItems={totalItems} />
      <WhatsAppButton />
    </div>
  );
}

