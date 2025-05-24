
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SectionWrapper from '@/components/shared/SectionWrapper';
import ContactForm from '@/components/shared/ContactForm';
import { MapPin, Phone, Mail, Clock, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { itemVariantsRight, fadeIn, staggerContainer } from '@/components/shared/SectionWrapper';
import { useTranslation } from 'react-i18next';

const MotionDiv = motion.div;

const ContactPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      const serviceSelect = document.getElementById('service');
      if (serviceSelect) {
        const optionExists = Array.from(serviceSelect.options).some(opt => opt.label === service || opt.value === service.toLowerCase().replace(/\s+/g, '-'));
        if (optionExists) {
          serviceSelect.value = service.toLowerCase().replace(/\s+/g, '-');
        } else {
          const customOption = Array.from(serviceSelect.options).find(opt => opt.label.toLowerCase().includes('personnalisé') || opt.value.toLowerCase().includes('personnalisé') || opt.label.toLowerCase().includes('custom') || opt.value.toLowerCase().includes('custom'));
          if (customOption) {
             serviceSelect.value = customOption.value;
             const messageTextarea = document.getElementById('message');
             if(messageTextarea) messageTextarea.value = `${t('homePage.contactSection.form.messagePlaceholder').split(" ")[0]} ${service}\n\n`;
          }
        }
      }
    }
  }, [location, t]);


  const contactDetails = [
    { icon: <MapPin className="h-6 w-6 text-brand-yellow-accent-dark" />, title: t('contactPage.detailsSection.addressTitle'), lines: t('contactPage.detailsSection.addressLines', { returnObjects: true}) },
    { icon: <Phone className="h-6 w-6 text-brand-yellow-accent-dark" />, title: t('contactPage.detailsSection.phoneTitle'), lines: ["+216 53 858 099"] },
    { icon: <Mail className="h-6 w-6 text-brand-yellow-accent-dark" />, title: t('contactPage.detailsSection.emailTitle'), lines: ["jaidanem6@gmail.com"] },
    { icon: <Clock className="h-6 w-6 text-brand-yellow-accent-dark" />, title: t('contactPage.detailsSection.hoursTitle'), lines: t('contactPage.detailsSection.hoursLines', { returnObjects: true}) },
  ];

  return (
    <>
      <SectionWrapper id="contact-hero" className="bg-brand-background-light text-center" disableAnimation>
        <MotionDiv variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 variants={fadeIn} className="font-heading text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-brand-dark leading-tight" dangerouslySetInnerHTML={{ __html: t('contactPage.hero.titleDuck', { defaultValue: "Get In Touch" }) }} />
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed">
            {t('contactPage.hero.subtitleDuck', {defaultValue: "We're here to help and answer any question you might have. We look forward to hearing from you."})}
            </motion.p>
        </MotionDiv>
      </SectionWrapper>

      <SectionWrapper id="contact-form-section" className="bg-brand-background-light">
        <div className="grid lg:grid-cols-5 gap-12 md:gap-16 items-start">
          <MotionDiv variants={itemVariantsRight} className="lg:col-span-3 bg-white p-8 md:p-10 rounded-2xl shadow-strong border border-brand-border">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-brand-dark">
              {t('contactPage.formSection.titleAlt', { defaultValue: "Send Us a Message"})}
            </h2>
            <p className="text-brand-secondary mb-8 text-md leading-relaxed">
              {t('contactPage.formSection.descriptionAlt', {defaultValue: "Fill out the form below and we'll get back to you as soon as possible."})}
            </p>
            <ContactForm showTitle={false} lightTheme={true} />
          </MotionDiv>

          <MotionDiv variants={itemVariantsRight} className="lg:col-span-2 mt-12 lg:mt-0">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6 text-brand-dark">
              {t('contactPage.detailsSection.titleAlt', {defaultValue: "Contact Information"})}
            </h2>
            <p className="text-brand-secondary mb-10 text-md leading-relaxed">
              {t('contactPage.detailsSection.descriptionAlt', {defaultValue: "Alternatively, you can reach us through the following channels."})}
            </p>
            <div className="space-y-8">
              {contactDetails.map((detail, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1 p-3 bg-brand-yellow-accent/10 rounded-full">{detail.icon}</div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-brand-dark mb-1">{detail.title}</h3>
                    {detail.lines.map((line, i) => (
                      <p key={i} className="text-brand-secondary">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 md:mt-16">
              <h3 className="font-heading text-xl font-semibold text-brand-dark mb-4">{t('contactPage.socialSection.titleAlt', {defaultValue: "Follow Us"})}</h3>
               <p className="text-brand-secondary mb-5 text-sm leading-relaxed">{t('contactPage.socialSection.descriptionAlt', {defaultValue: "Stay connected with us on social media."})}</p>
              <div className="flex space-x-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 hover:bg-brand-yellow-accent/20 rounded-lg transition-colors group">
                  <Linkedin size={20} className="text-brand-secondary group-hover:text-brand-yellow-accent-dark" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 hover:bg-brand-yellow-accent/20 rounded-lg transition-colors group">
                  <Twitter size={20} className="text-brand-secondary group-hover:text-brand-yellow-accent-dark" />
                </a>
              </div>
            </div>
          </MotionDiv>
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="map-section" className="!py-0 pb-16 md:pb-24 bg-brand-background-light">
          <MotionDiv variants={itemVariantsRight} className="h-[400px] md:h-[500px] w-full bg-gray-200 overflow-hidden rounded-2xl border border-brand-border shadow-strong">
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=10.1815,36.8000,10.1915,36.8100&layer=mapnik&marker=36.8050,10.1865" 
              style={{border:0, width: '100%', height: '100%', filter: 'grayscale(0.8) contrast(0.9) brightness(1.05) saturate(0.5)'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte OpenStreetMap de Neotek LTD"
            ></iframe>
          </MotionDiv>
      </SectionWrapper>
    </>
  );
};

export default ContactPage;
