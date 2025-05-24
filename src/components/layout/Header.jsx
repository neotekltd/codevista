
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Briefcase, ShoppingCart, Sparkles, Info, DollarSign, MessageSquare, Home, Users, FileText, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '@/components/shared/LanguageSelector.jsx';
import ThemeToggle from '@/components/shared/ThemeToggle.jsx';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const NavItem = ({ to, children, onClick, isMobile = false, className }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        `text-sm font-medium transition-colors duration-200 group relative`,
        isMobile ? 'py-3.5 px-4 block w-full text-left rounded-md' : 'py-2 px-3',
        isActive 
          ? (isMobile ? 'bg-primary/10 text-primary font-semibold' : 'text-primary font-semibold')
          : (isMobile ? 'text-foreground hover:bg-muted/50 hover:text-primary' : 'text-foreground hover:text-primary'),
        className
      )
    }
  >
    {children}
    {!isMobile && (
      <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300 group-focus:w-full"></span>
    )}
     {!isMobile && (
      <span className={({isActive}) => cn("absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300", isActive ? "w-full" : "w-0")}></span>
    )}
  </NavLink>
);

const DropdownNav = ({ title, children, isMobile = false, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="py-1">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-3.5 px-4 text-sm font-medium text-foreground hover:bg-muted/50 hover:text-primary rounded-md"
        >
          <span className="flex items-center">
            {icon && React.cloneElement(icon, { className: "mr-3 h-5 w-5 text-muted-foreground"})} 
            {title}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-8 border-l border-border ml-4"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 group py-2 px-3 relative">
          {title}
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180`} />
          <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300 group-focus:w-full group-data-[state=open]:w-full"></span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-background border-border shadow-xl w-60 mt-2 rounded-xl p-2">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = {
    home: { name: t('header.home'), href: '/', icon: <Home className="mr-3 h-5 w-5 text-muted-foreground" /> },
    pricing: { name: t('header.pricing'), href: '/tarifs', icon: <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" /> },
    capabilities: {
      title: t('header.capabilities', { defaultValue: "Capabilities" }),
      icon: <Sparkles className="mr-3 h-5 w-5 text-muted-foreground" />,
      items: [
        { name: t('header.services'), href: '/services', icon: <ShoppingCart className="mr-2 h-4 w-4 text-primary" /> },
        { name: t('header.designServices'), href: '/design-services', icon: <Sparkles className="mr-2 h-4 w-4 text-primary" /> },
      ]
    },
    ourWorks: {
      title: t('header.ourWorks', { defaultValue: "Our Works" }),
      icon: <Briefcase className="mr-3 h-5 w-5 text-muted-foreground" />,
      items: [
        { name: t('header.portfolio', { defaultValue: "Portfolio" }), href: '/portfolio', icon: <Briefcase className="mr-2 h-4 w-4 text-primary" /> },
        { name: t('header.caseStudies', { defaultValue: "Case Studies" }), href: '/case-studies', icon: <Users className="mr-2 h-4 w-4 text-primary" /> },
      ]
    },
    blog: { name: t('header.blog', { defaultValue: "Blog" }), href: '/blog', icon: <FileText className="mr-3 h-5 w-5 text-muted-foreground" /> },
    company: {
      title: t('header.aboutUsSimple', { defaultValue: "About Us" }),
      icon: <Users className="mr-3 h-5 w-5 text-muted-foreground" />,
      items: [
        { name: t('header.about'), href: '/a-propos', icon: <Info className="mr-2 h-4 w-4 text-primary" /> },
        { name: t('header.testimonials'), href: '/temoignages', icon: <MessageSquare className="mr-2 h-4 w-4 text-primary" /> },
      ]
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.25, ease: [0.42, 0, 0.58, 1] } },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
                  ${isScrolled ? 'py-3 bg-background/80 backdrop-blur-lg shadow-lg border-b border-border/70' 
                               : 'py-5 bg-transparent border-b border-transparent'}`}
    >
      <nav className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <span className="text-brand-accent text-2xl font-bold font-heading">Code<span className="text-brand-dark">Vista</span></span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-1">
          <NavItem to={navLinks.pricing.href}>{navLinks.pricing.name}</NavItem>
          
          <DropdownNav title={navLinks.capabilities.title}>
            {navLinks.capabilities.items.map(link => (
              <DropdownMenuItem key={link.name} asChild className="cursor-pointer p-0">
                <Link to={link.href} className="flex items-center w-full px-3 py-2.5 text-sm hover:bg-muted/50 rounded-md">
                  {link.icon} {link.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownNav>

          <DropdownNav title={navLinks.ourWorks.title}>
            {navLinks.ourWorks.items.map(link => (
              <DropdownMenuItem key={link.name} asChild className="cursor-pointer p-0">
                <Link to={link.href} className="flex items-center w-full px-3 py-2.5 text-sm hover:bg-muted/50 rounded-md">
                  {link.icon} {link.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownNav>
          
          <NavItem to={navLinks.blog.href}>{navLinks.blog.name}</NavItem>
          
          <DropdownNav title={navLinks.company.title}>
            {navLinks.company.items.map(link => (
              <DropdownMenuItem key={link.name} asChild className="cursor-pointer p-0">
                <Link to={link.href} className="flex items-center w-full px-3 py-2.5 text-sm hover:bg-muted/50 rounded-md">
                  {link.icon} {link.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownNav>
        </div>

        <div className="hidden lg:flex items-center space-x-2">
          <LanguageSelector 
            buttonClassName={cn('px-3 py-2', isScrolled ? 'text-foreground' : 'text-brand-dark dark:text-brand-light', 'hover:text-primary')} 
            iconClassName={cn('opacity-80', isScrolled ? 'text-foreground/70' : 'text-brand-dark/70 dark:text-brand-light/70')} 
          />
          <ThemeToggle />
          <Button asChild size="sm" className="bg-brand-accent hover:bg-brand-accent-dark text-white px-6 py-2.5 text-sm font-semibold rounded-full shadow-sm">
           <Link to="/contact">{t('header.bookCall')}</Link>
          </Button>
        </div>
        
        <button
          className={cn('lg:hidden p-2 rounded-md', isScrolled ? 'text-foreground' : 'text-brand-dark dark:text-brand-light', 'hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50')}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
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
            className="lg:hidden bg-background/95 backdrop-blur-xl fixed inset-0 top-[68px] z-40 overflow-y-auto shadow-2xl"
            style={{ height: 'calc(100vh - 68px)'}}
          >
            <div className="container-custom flex flex-col space-y-1.5 py-6 px-4">
              <NavItem to={navLinks.home.href} onClick={closeMobileMenu} isMobile className="flex items-center">
                {navLinks.home.icon} {navLinks.home.name}
              </NavItem>
              <NavItem to={navLinks.pricing.href} onClick={closeMobileMenu} isMobile className="flex items-center">
                {navLinks.pricing.icon} {navLinks.pricing.name}
              </NavItem>
              
              <DropdownNav title={navLinks.capabilities.title} isMobile icon={navLinks.capabilities.icon}>
                {navLinks.capabilities.items.map(link => (
                  <NavItem key={link.name} to={link.href} onClick={closeMobileMenu} isMobile className="flex items-center text-sm">
                    {React.cloneElement(link.icon, {className: "mr-3 h-4 w-4 opacity-80"})} {link.name}
                  </NavItem>
                ))}
              </DropdownNav>

              <DropdownNav title={navLinks.ourWorks.title} isMobile icon={navLinks.ourWorks.icon}>
                {navLinks.ourWorks.items.map(link => (
                   <NavItem key={link.name} to={link.href} onClick={closeMobileMenu} isMobile className="flex items-center text-sm">
                     {React.cloneElement(link.icon, {className: "mr-3 h-4 w-4 opacity-80"})} {link.name}
                   </NavItem>
                ))}
              </DropdownNav>
              
              <NavItem to={navLinks.blog.href} onClick={closeMobileMenu} isMobile className="flex items-center">
                {navLinks.blog.icon} {navLinks.blog.name}
              </NavItem>
              
              <DropdownNav title={navLinks.company.title} isMobile icon={navLinks.company.icon}>
                {navLinks.company.items.map(link => (
                  <NavItem key={link.name} to={link.href} onClick={closeMobileMenu} isMobile className="flex items-center text-sm">
                    {React.cloneElement(link.icon, {className: "mr-3 h-4 w-4 opacity-80"})} {link.name}
                  </NavItem>
                ))}
              </DropdownNav>

              <div className="pt-8 mt-auto flex flex-col space-y-4">
                 <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground px-2">{t('footer.settings', {defaultValue: "Settings"})}:</span>
                    <div className="flex items-center space-x-1">
                        <LanguageSelector buttonClassName="text-foreground hover:text-primary px-2 py-1.5" iconClassName="text-foreground/70" />
                        <ThemeToggle />
                    </div>
                </div>
                <Button asChild className="w-full mt-2 bg-brand-accent hover:bg-brand-accent-dark text-white py-3.5 rounded-full text-base font-semibold shadow-sm">
                  <Link to="/contact" onClick={closeMobileMenu}>{t('header.bookCall')}</Link>
                </Button>
                <Button variant="outline" asChild className="w-full py-3.5 rounded-full text-base font-semibold border-primary/50 text-primary hover:bg-primary/10">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <LogIn className="mr-2 h-5 w-5"/>
                    {t('shared.login', {defaultValue: "Login"})}
                  </Link>
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
