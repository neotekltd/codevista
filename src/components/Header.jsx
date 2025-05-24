
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '@/components/LanguageSelector';
import CurrencySelector from '@/components/CurrencySelector';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: t('header.home'), href: '/' },
    { name: t('header.services'), href: '/services' },
    { name: t('header.about'), href: '/a-propos' },
    { name: t('header.pricing'), href: '/tarifs' },
    { name: t('header.testimonials'), href: '/temoignages' },
    { name: t('header.contact'), href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeInOut' } },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out 
                  ${isScrolled ? 'py-3 bg-brand-dark/90 backdrop-blur-lg shadow-xl border-b border-brand-border' 
                               : 'py-4 bg-transparent border-b border-transparent'}`}
    >
      <nav className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img alt="Logo Neotek LTD" className="h-9 md:h-10" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/366d4355f546106830b9a333e642a83f.png" />
          <span className="font-heading text-xl font-bold text-brand-light">Neotek LTD</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-accent' : 'text-brand-secondary hover:text-brand-light'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-3">
          <LanguageSelector />
          <CurrencySelector />
          <Button asChild size="sm" className="bg-brand-accent hover:bg-brand-accent-dark text-brand-dark font-semibold px-5 py-2.5 rounded-md">
           <Link to="/contact">{t('header.freeQuote')}</Link>
          </Button>
        </div>
        <button
          className="md:hidden text-brand-secondary hover:text-brand-light"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-brand-dark/95 backdrop-blur-md absolute w-full left-0 top-full shadow-2xl py-5 border-t border-brand-border"
          >
            <div className="container-custom flex flex-col space-y-2.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-brand-light hover:text-brand-accent transition-colors duration-200 py-3 text-base ${isActive ? 'text-brand-accent font-semibold' : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-3 mt-3 border-t border-brand-border/50 flex flex-col space-y-4">
                <LanguageSelector />
                <CurrencySelector />
                <Button asChild className="w-full mt-2 bg-brand-accent hover:bg-brand-accent-dark text-brand-dark font-semibold py-3">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t('header.freeQuote')}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
