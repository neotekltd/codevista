
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';
import { itemVariantsRight } from '@/components/shared/SectionWrapper';
import { useTranslation } from 'react-i18next';
import { useAppState } from '@/contexts/AppStateContext';

const MotionCard = motion(Card);

const ContactForm = ({ title, description, showTitle = true, lightTheme = false }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { appConfig } = useAppState();
  const FORMSPREE_ENDPOINT = appConfig.formspreeEndpoint || "https://formspree.io/f/YOUR_UNIQUE_FORM_ID";

  const inputClasses = lightTheme 
    ? "mt-1.5 bg-white border-brand-border focus:ring-brand-yellow-accent focus:border-brand-yellow-accent text-brand-dark placeholder-brand-secondary/70 rounded-lg text-sm py-2.5 px-3.5" 
    : "mt-1.5 bg-brand-dark/70 border-brand-dark-border focus:ring-brand-yellow-accent focus:border-brand-yellow-accent text-brand-light placeholder-brand-secondary/70 rounded-lg text-sm py-2.5 px-3.5";
  
  const labelClasses = lightTheme ? "text-brand-secondary font-medium text-xs" : "text-brand-secondary font-medium text-xs";
  const buttonClasses = lightTheme 
    ? "w-full btn-primary-yellow text-base py-3.5 font-semibold"
    : "w-full bg-brand-yellow-accent hover:bg-brand-yellow-accent-dark text-brand-dark text-base py-3.5 font-semibold rounded-lg";


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    toast({
      title: t('homePage.contactSection.status.sending'),
      description: t('homePage.contactSection.status.pleaseWait'),
      className: `${lightTheme ? 'bg-brand-dark text-brand-light' : 'bg-brand-dark border-brand-dark-border text-brand-light'}`
    });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: t('homePage.contactSection.status.successTitle'),
          description: t('homePage.contactSection.status.successDescription'),
          variant: "default",
          className: "bg-brand-accent text-brand-dark" 
        });
        form.reset();
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) serviceSelect.value = "";
      } else {
        const responseData = await response.json();
        let errorMessage = t('homePage.contactSection.status.errorDescription');
        if (responseData && responseData.errors && responseData.errors.length > 0) {
          errorMessage = responseData.errors.map(err => err.message).join(", ");
        } else if (FORMSPREE_ENDPOINT.includes("YOUR_UNIQUE_FORM_ID")) {
            errorMessage = t('homePage.contactSection.form.formspreeNote');
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: t('homePage.contactSection.status.errorTitle'),
        description: error.message || t('homePage.contactSection.status.errorDescription'),
        variant: "destructive",
        className: "bg-red-700 border-red-900 text-white"
      });
    }
  };

  return (
    <div className="container-custom p-0">
      {showTitle && (
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`font-heading text-4xl md:text-5xl font-bold mb-5 ${lightTheme ? 'text-brand-dark' : 'text-brand-light'}`}>{title}</h2>
          <p className={`text-md md:text-lg text-brand-secondary mb-12 md:mb-16`}>{description}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name" className={labelClasses}>{t('homePage.contactSection.form.fullName')}</Label>
          <Input id="name" name="name" type="text" placeholder={t('homePage.contactSection.form.fullNamePlaceholder')} required className={inputClasses} />
        </div>
        <div>
          <Label htmlFor="email" className={labelClasses}>{t('homePage.contactSection.form.emailAddress')}</Label>
          <Input id="email" name="_replyto" type="email" placeholder={t('homePage.contactSection.form.emailAddressPlaceholder')} required className={inputClasses} />
        </div>
        <div>
          <Label htmlFor="company" className={labelClasses}>{t('homePage.contactSection.form.companyOptional')}</Label>
          <Input id="company" name="company" type="text" placeholder={t('homePage.contactSection.form.companyPlaceholder')} className={inputClasses} />
        </div>
        <div>
          <Label htmlFor="service" className={labelClasses}>{t('homePage.contactSection.form.desiredService')}</Label>
          <select 
            id="service" 
            name="service" 
            defaultValue=""
            className={`${inputClasses} appearance-none`} 
          >
            <option value="" disabled>{t('homePage.contactSection.form.selectService')}</option>
            <option value="essentiel-e-commerce">{t('homePage.contactSection.form.essentialECommerce')}</option>
            <option value="croissance-e-commerce">{t('homePage.contactSection.form.growthECommerce')}</option>
            <option value="performance-e-commerce">{t('homePage.contactSection.form.performanceECommerce')}</option>
            <option value="devis-personnalise">{t('homePage.contactSection.form.customQuote')}</option>
            <option value="autre">{t('homePage.contactSection.form.otherConsultation')}</option>
          </select>
        </div>
        <div>
          <Label htmlFor="message" className={labelClasses}>{t('homePage.contactSection.form.yourMessage')}</Label>
          <textarea id="message" name="message" rows="4" placeholder={t('homePage.contactSection.form.messagePlaceholder')} required className={`${inputClasses} min-h-[100px]`}></textarea>
        </div>
        <input type="hidden" name="_subject" value="Nouvelle demande de contact depuis Neotek LTD" />
        <Button type="submit" size="lg" className={buttonClasses}>
          {t('homePage.contactSection.form.sendRequest')} <Send className="ml-2 h-4 w-4" />
        </Button>
        {FORMSPREE_ENDPOINT.includes("YOUR_UNIQUE_FORM_ID") && (
          <p className={`text-xs ${lightTheme ? 'text-yellow-600' : 'text-yellow-500/80'} mt-2 text-center`}>
            {t('homePage.contactSection.form.formspreeNote')}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
