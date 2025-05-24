
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import SectionWrapper, { MotionCard, MotionDiv, itemVariantsRight, fadeIn, staggerContainer } from '@/components/shared/SectionWrapper';
import { Edit3, Video, Layers, Zap, Aperture, CheckCircle, Users, Briefcase, Clock, RefreshCw, FileText, Shield, DollarSign, Gift, ArrowRight, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const designServiceIcons = {
  "Graphic Design": <Edit3 size={48} className="text-white" />,
  "Motion Graphics": <Video size={48} className="text-white" />,
  "Brand Identity Design": <Layers size={48} className="text-black" />,
  "UI/UX Design": <Zap size={48} className="text-black" />,
  "Marketing Design": <Aperture size={48} className="text-white" />,
};

const whatMakesUsDifferentIcons = {
  "unlimited requests": <RefreshCw className="text-brand-yellow-accent-darker" />,
  "unlimited revisions": <RefreshCw className="text-brand-yellow-accent-darker" />,
  "unlimited brand profiles": <Users className="text-brand-yellow-accent-darker" />,
  "native source files": <FileText className="text-brand-yellow-accent-darker" />,
  "art director": <Briefcase className="text-brand-yellow-accent-darker" />,
  "project manager": <Briefcase className="text-brand-yellow-accent-darker" />,
  "real-time collaboration": <Users className="text-brand-yellow-accent-darker" />,
  "trello project management": <Briefcase className="text-brand-yellow-accent-darker" />,
  "7-day money-back guarantee": <Shield className="text-brand-yellow-accent-darker" />,
  "cancel anytime": <Clock className="text-brand-yellow-accent-darker" />,
  "middle+/senior designer": <Users className="text-brand-yellow-accent-darker" />,
};

const howItWorksIcons = {
    "fixed monthly rate": <DollarSign className="text-brand-yellow-accent-darker" />,
    "unlimited requests": <Gift className="text-brand-yellow-accent-darker" />,
    "unlimited revisions": <RefreshCw className="text-brand-yellow-accent-darker" />,
    "same-day delivery": <Clock className="text-brand-yellow-accent-darker" />,
    "professional designers": <Users className="text-brand-yellow-accent-darker" />,
    "designer match": <Users className="text-brand-yellow-accent-darker" />,
};

const SoftwareDesignPage = () => {
  const { t } = useTranslation();
  const designServices = t('softwareDesignPage.designServices', { returnObjects: true, defaultValue: [] });
  const whatMakesUsDifferent = t('softwareDesignPage.whatMakesUsDifferent.items', { returnObjects: true, defaultValue: [] });
  const howItWorks = t('softwareDesignPage.howItWorks.items', { returnObjects: true, defaultValue: [] });
  const partners = t('softwareDesignPage.trustedBy.partners', { returnObjects: true, defaultValue: [] });


  return (
    <>
      <SectionWrapper id="design-hero" className="bg-brand-background-light" disableAnimation>
        <MotionDiv variants={staggerContainer} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.h1 variants={fadeIn} className="font-heading text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-brand-dark leading-tight">
            {t('softwareDesignPage.hero.title', { defaultValue: "Scale your success with outstanding design" })}
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-brand-secondary max-w-2xl mx-auto lg:mx-0 mb-8">
            {t('softwareDesignPage.hero.subtitle', { defaultValue: "Leading companies trust Neotek LTD to deliver high-quality design at scale. Book a call and start working with a dedicated team of professional designers." })}
          </motion.p>
          <motion.div variants={fadeIn}>
            <Button size="lg" asChild className="btn-primary-yellow text-base md:text-lg px-8 py-6">
              <Link to="/contact">{t('header.bookCall')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </MotionDiv>
      </SectionWrapper>

      <SectionWrapper id="design-services-list" className="bg-brand-background-light !pt-12 md:!pt-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center md:text-left mb-12 text-brand-dark">
            {t('softwareDesignPage.designServicesTitle', { defaultValue: "Design Services"})}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {designServices.map((service, index) => (
            <MotionCard
              key={service.title}
              variants={itemVariantsRight}
              className={`relative overflow-hidden rounded-3xl p-8 min-h-[380px] md:min-h-[450px] flex flex-col justify-between items-start group
                ${index % 4 < 2 ? 'bg-brand-dark text-brand-light' : 'bg-brand-yellow-accent text-brand-dark'}`}
            >
              <div className="relative z-10">
                <CardTitle className={`font-heading text-3xl md:text-4xl font-bold ${index % 4 < 2 ? 'text-brand-light' : 'text-brand-dark'}`}>{service.title}</CardTitle>
              </div>
              <div className={`absolute right-6 bottom-6 md:right-8 md:bottom-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110`}>
                 {designServiceIcons[service.title] || <Edit3 size={48} className={index % 4 < 2 ? 'text-white' : 'text-black'}/>}
              </div>
              <img  class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300" alt={service.altText || service.title} src="https://images.unsplash.com/photo-1577639136688-14687666fa25" />
            </MotionCard>
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="trusted-by" className="bg-brand-background-light">
        <h3 className="text-center text-xl md:text-2xl font-semibold text-brand-dark mb-10">
          {t('softwareDesignPage.trustedBy.title', {defaultValue: "\"Clients we are proud of\" Trust from major international companies"})}
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-16 gap-y-8">
          {partners.map(partner => (
            <MotionDiv key={partner.name} variants={fadeIn} className="opacity-60 hover:opacity-100 transition-opacity duration-300">
              <img  class="h-7 md:h-8 lg:h-9" alt={partner.name + " logo"} src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
            </MotionDiv>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="what-makes-us-different" className="bg-brand-background-light">
        <div className="text-left max-w-3xl mb-12">
            <p className="text-sm font-semibold text-brand-yellow-accent uppercase tracking-wider mb-3">
              {t('softwareDesignPage.whatMakesUsDifferent.comparisonTag', {defaultValue: "See how we compare"})}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark mb-4">
                {t('softwareDesignPage.whatMakesUsDifferent.title', {defaultValue: "What Makes Us Different?"})}
            </h2>
            <p className="text-brand-secondary text-md">
                {t('softwareDesignPage.whatMakesUsDifferent.subtitle', {defaultValue: "We will take care of all your creative needs. No lengthy hiring procedures. No contracts. Just your work getting done!"})}
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {whatMakesUsDifferent.map((item) => (
                <MotionDiv key={item.name} variants={itemVariantsRight} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 p-2.5 bg-brand-yellow-accent/20 rounded-full">
                        {React.cloneElement(whatMakesUsDifferentIcons[item.name.toLowerCase()] || <CheckCircle />, {className: "h-5 w-5"})}
                    </div>
                    <span className="text-brand-dark font-medium text-md">{item.name}</span>
                </MotionDiv>
            ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="how-design-works" className="bg-brand-background-light">
        <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
                <MotionCard key={item.title} variants={itemVariantsRight} className="light-theme-card p-8">
                    <div className="mb-5 p-3 bg-brand-yellow-accent/20 rounded-full w-fit">
                        {React.cloneElement(howItWorksIcons[item.title.toLowerCase()] || <CheckCircle />, {className: "h-7 w-7 text-brand-yellow-accent-darker"})}
                    </div>
                    <CardTitle className="font-heading text-2xl font-semibold text-brand-dark mb-2">{item.title}</CardTitle>
                    <CardDescription className="text-brand-secondary text-sm">{item.description}</CardDescription>
                </MotionCard>
            ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="clutch-rating" className="bg-brand-background-light text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark">
            {t('softwareDesignPage.clutchRating.text', {defaultValue: "4.9 average rating on Clutch"})}
        </h2>
      </SectionWrapper>

      <SectionWrapper id="cta-design-services" className="text-center bg-brand-dark !py-20 md:!py-28">
        <motion.h2 variants={itemVariantsRight} className="font-heading text-4xl md:text-5xl font-bold mb-6 text-brand-light" dangerouslySetInnerHTML={{ __html: t('softwareDesignPage.cta.title', { defaultValue: "Ready to transform your brand?", gradient: (text) => `<span class="gradient-text-yellow">${text}</span>` }) }} />
        <motion.p variants={itemVariantsRight} className="text-lg text-brand-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('softwareDesignPage.cta.subtitle', {defaultValue: "Let's discuss your design needs and how we can help you create a stunning visual identity. Book a free consultation call."})}
        </motion.p>
        <motion.div variants={itemVariantsRight}>
          <Button size="lg" asChild className="btn-primary-yellow text-lg px-10 py-7">
            <Link to="/contact">{t('header.bookCall')} <MessageSquare className="ml-3 h-6 w-6" /></Link>
          </Button>
        </motion.div>
      </SectionWrapper>

    </>
  );
};

export default SoftwareDesignPage;
