
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Instagram, Facebook } from 'lucide-react';
import LanguageSelector from '@/components/shared/LanguageSelector.jsx';
import CurrencySelector from '@/components/shared/CurrencySelector.jsx';
import ThemeToggle from '@/components/shared/ThemeToggle.jsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "#", name: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "#", name: "Twitter" },
    { icon: <Github size={20} />, href: "#", name: "GitHub" },
    { icon: <Instagram size={20} />, href: "#", name: "Instagram" },
    { icon: <Facebook size={20} />, href: "#", name: "Facebook" },
  ];

  const footerSections = t('footer.sections', { returnObjects: true });
  if (footerSections && Array.isArray(footerSections)) {
    const companySection = footerSections.find(s => s.title === t('footer.sections.0.title'));
    if (companySection && !companySection.links.find(l => l.href === '/design-services')) {
      companySection.links.splice(2, 0, { name: t('header.designServices', {defaultValue: "Design Services"}), href: '/design-services' });
    }
  }

  return (
    <footer className="py-16 md:py-20 bg-brand-background-light text-brand-dark border-t border-brand-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2.5 mb-5">
              <span className="text-brand-accent text-2xl font-bold font-heading">Code<span className="text-brand-dark">Vista</span></span>
            </Link>
            <p className="text-sm text-brand-secondary max-w-md mb-6">
              {t('footer.tagline', { defaultValue: "Your partner for innovative e-commerce solutions. We build digital experiences that drive growth."})}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(social => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 bg-brand-border/60 hover:bg-brand-accent rounded-lg transition-colors group"
                  aria-label={social.name}
                >
                  {React.cloneElement(social.icon, { className: "text-brand-secondary group-hover:text-white" })}
                </a>
              ))}
            </div>
          </div>

          {footerSections && Array.isArray(footerSections) && footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-brand-dark mb-5 uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3 text-sm">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-brand-secondary hover:text-brand-accent transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:justify-self-end">
             <h3 className="text-sm font-semibold text-brand-dark mb-5 uppercase tracking-wider">{t('footer.settings', {defaultValue: "Settings"})}</h3>
            <div className="flex flex-col space-y-4 items-start mb-6">
              <LanguageSelector buttonClassName="text-brand-secondary hover:text-brand-yellow-accent" iconClassName="text-brand-secondary/70" />
              <CurrencySelector buttonClassName="text-brand-secondary hover:text-brand-yellow-accent" iconClassName="text-brand-secondary/70" />
              <ThemeToggle />
            </div>
              <Button asChild size="md" className="w-full md:w-auto bg-brand-accent hover:bg-brand-accent-dark text-white px-6 py-3 rounded-lg shadow-sm">
                <Link to="/contact">{t('header.bookCall', {defaultValue: "Book a Call"})}</Link>
              </Button>
          </div>
        </div>
        
        <div className="mt-12 pt-10 border-t border-brand-border/50 text-center md:flex md:justify-between md:items-center">
          <p className="text-xs text-brand-secondary mb-4 md:mb-0">&copy; {year} Neotek LTD. {t('footer.copyrightNotice', {defaultValue: "All Rights Reserved."})}</p>
          <div className="flex justify-center space-x-4 text-xs">
            <Link to="/privacy-policy" className="text-brand-secondary hover:text-brand-yellow-accent">{t('footer.privacyPolicy', {defaultValue: "Privacy Policy"})}</Link>
            <Link to="/terms-of-service" className="text-brand-secondary hover:text-brand-yellow-accent">{t('footer.termsOfService', {defaultValue: "Terms of Service"})}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
