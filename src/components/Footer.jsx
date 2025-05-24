
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Instagram, Facebook } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import CurrencySelector from '@/components/CurrencySelector';
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

  return (
    <footer className="py-16 md:py-20 bg-brand-dark text-brand-light border-t border-brand-dark-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2.5 mb-5">
              <img alt="Logo Neotek LTD footer" className="h-9" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/366d4355f546106830b9a333e642a83f.png" />
              <span className="font-heading text-xl font-bold text-brand-light">Neotek LTD</span>
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
                  className="p-2.5 bg-brand-dark-border/60 hover:bg-brand-yellow-accent rounded-lg transition-colors group"
                  aria-label={social.name}
                >
                  {React.cloneElement(social.icon, { className: "text-brand-secondary group-hover:text-brand-dark" })}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-brand-light mb-5 uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3 text-sm">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-brand-secondary hover:text-brand-yellow-accent transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:justify-self-end">
             <h3 className="text-sm font-semibold text-brand-light mb-5 uppercase tracking-wider">{t('footer.settings', {defaultValue: "Settings"})}</h3>
            <div className="flex flex-col space-y-4 items-start mb-6">
              <LanguageSelector buttonClassName="text-brand-secondary hover:text-brand-yellow-accent" iconClassName="text-brand-secondary/70" />
              <CurrencySelector buttonClassName="text-brand-secondary hover:text-brand-yellow-accent" iconClassName="text-brand-secondary/70" />
            </div>
             <Button asChild size="md" className="w-full md:w-auto bg-brand-yellow-accent hover:bg-brand-yellow-accent-dark text-brand-dark font-semibold px-6 py-3 rounded-lg shadow-subtle">
               <Link to="/contact">{t('header.bookCall', {defaultValue: "Book a Call"})}</Link>
             </Button>
          </div>
        </div>
        
        <div className="mt-12 pt-10 border-t border-brand-dark-border/50 text-center md:flex md:justify-between md:items-center">
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
