
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SectionWrapper, { MotionCard, MotionDiv, itemVariants, staggerContainer, fadeIn } from '@/components/shared/SectionWrapper';
import ContactForm from '@/components/shared/ContactForm';
import { useTranslation } from 'react-i18next';
import { useToast } from "@/components/ui/use-toast";
import { useAppState } from '@/contexts/AppStateContext';
import { ArrowRight, Check, Award, Users, Rocket, MessageCircle, Search, ClipboardList, Settings, TrendingUp } from 'lucide-react';

const BlinHeroSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { appConfig } = useAppState();
  const FORMSPREE_ENDPOINT_MINI = appConfig.formspreeEndpoint || "https://formspree.io/f/YOUR_UNIQUE_FORM_ID";

  const handleMiniFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    toast({
      title: t('homePage.contactSection.status.sending'),
      description: t('homePage.contactSection.status.pleaseWait'),
      className: "bg-card text-card-foreground"
    });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT_MINI, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        toast({
          title: t('homePage.contactSection.status.successTitle'),
          description: t('homePage.contactSection.status.successDescription'),
           className: "bg-green-600 text-white"
        });
        form.reset();
      } else {
        throw new Error(t('homePage.contactSection.status.errorDescription'));
      }
    } catch (error) {
      toast({
        title: t('homePage.contactSection.status.errorTitle'),
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <SectionWrapper className="bg-brand-background-light !pt-12 md:!pt-16 !pb-8 md:!pb-12" disableAnimation>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <MotionDiv variants={fadeIn} initial="hidden" animate="visible">
            <p className="text-primary font-semibold mb-2">{t('homePage.blinHero.subtag')}</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-brand-dark mb-8">
              {t('homePage.blinHero.title')}
            </h1>
            <div className="grid sm:grid-cols-2 gap-6">
              <MotionCard variants={itemVariants} className="light-theme-card p-6 text-center hover:shadow-strong">
                <CardTitle className="text-xl mb-1">{t('homePage.blinHero.showcaseSite.title')}</CardTitle>
                <CardDescription className="text-brand-yellow-accent-dark font-semibold text-lg">{t('homePage.blinHero.showcaseSite.price')}</CardDescription>
              </MotionCard>
              <MotionCard variants={itemVariants} className="light-theme-card p-6 text-center hover:shadow-strong">
                <CardTitle className="text-xl mb-1">{t('homePage.blinHero.ecommerceSite.title')}</CardTitle>
                <CardDescription className="text-brand-yellow-accent-dark font-semibold text-lg">{t('homePage.blinHero.ecommerceSite.price')}</CardDescription>
              </MotionCard>
            </div>
          </MotionDiv>
          <MotionDiv variants={fadeIn} initial="hidden" animate="visible" transition={{delay: 0.2}} className="hidden lg:block">
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/2948e226cca1deb538040f6d2a8bd927.png" alt={t('homePage.blinHero.imageAlt')} className="w-full h-auto rounded-xl object-contain" />
          </MotionDiv>
        </div>

        <MotionCard variants={fadeIn} initial="hidden" animate="visible" transition={{delay: 0.5}} className="mt-12 md:mt-16 bg-brand-yellow-accent p-6 md:p-10 rounded-2xl shadow-strong">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-dark mb-2 text-center">{t('homePage.blinHero.freeEvaluation.title')}</h2>
          <p className="text-brand-dark/80 mb-6 text-center text-sm md:text-base">{t('homePage.blinHero.freeEvaluation.subtitle')}</p>
          <form onSubmit={handleMiniFormSubmit} className="grid sm:grid-cols-3 gap-4 items-end">
            <div className="sm:col-span-1">
              <Label htmlFor="phone-hero" className="text-brand-dark font-medium text-xs">{t('homePage.blinHero.freeEvaluation.phoneLabel')}</Label>
              <Input type="tel" id="phone-hero" name="phone" placeholder={t('homePage.blinHero.freeEvaluation.phonePlaceholder')} required className="bg-white/80 border-brand-yellow-accent-dark placeholder:text-brand-dark/50 focus:bg-white rounded-md" />
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="name-hero" className="text-brand-dark font-medium text-xs">{t('homePage.blinHero.freeEvaluation.nameLabel')}</Label>
              <Input type="text" id="name-hero" name="name" placeholder={t('homePage.blinHero.freeEvaluation.namePlaceholder')} required className="bg-white/80 border-brand-yellow-accent-dark placeholder:text-brand-dark/50 focus:bg-white rounded-md" />
            </div>
            <Button type="submit" className="sm:col-span-1 w-full bg-brand-dark hover:bg-black text-brand-yellow-accent font-semibold text-sm py-3 rounded-md">{t('homePage.blinHero.freeEvaluation.cta')}</Button>
          </form>
          {FORMSPREE_ENDPOINT_MINI.includes("YOUR_UNIQUE_FORM_ID") && (
            <p className="text-xs text-brand-dark/70 mt-3 text-center">{t('homePage.contactSection.form.formspreeNote')}</p>
          )}
        </MotionCard>
      </div>
    </SectionWrapper>
  );
};

const BlinServiceAdvantageSection = ({titleKey, descriptionKey, features, imageSrc, imageAltKey, ctaTextKey, ctaLink, reverse = false}) => {
  const { t } = useTranslation();
  return (
    <SectionWrapper className={`bg-brand-background-light ${reverse ? '' : 'border-t border-brand-border'}`} disableAnimation>
      <MotionDiv variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <MotionDiv variants={fadeIn} className={`text-left ${reverse ? 'lg:order-2' : ''}`}>
          <p className="text-sm font-semibold text-primary mb-2">{t(titleKey)}</p>
          <h2 className="font-heading text-3xl md:text-4xl text-brand-dark mb-4">{t(descriptionKey)}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-6 mb-8">
            {features.map((featureKey, idx) => (
              <li key={idx} className="flex items-center text-brand-secondary">
                <Check className="h-5 w-5 text-brand-yellow-accent mr-2 shrink-0" />
                <span className="text-sm">{t(featureKey)}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="btn-primary-yellow">
            <Link to={ctaLink}>{t(ctaTextKey)}</Link>
          </Button>
        </MotionDiv>
        <MotionDiv variants={fadeIn} className={`${reverse ? 'lg:order-1' : ''}`}>
          <img src={imageSrc} alt={t(imageAltKey)} className="w-full h-auto rounded-xl shadow-medium object-contain max-h-[400px]" />
        </MotionDiv>
      </MotionDiv>
    </SectionWrapper>
  );
};


const BlinWhyTrustUsSection = () => {
  const { t } = useTranslation();
  const trustPoints = t('homePage.blinWhyTrustUs.points', { returnObjects: true, defaultValue: [] });
  if (!Array.isArray(trustPoints) || trustPoints.length === 0) return null;

  const icons = [<Award className="h-8 w-8 text-brand-yellow-accent"/>, <Users className="h-8 w-8 text-brand-yellow-accent"/>, <Rocket className="h-8 w-8 text-brand-yellow-accent"/>, <MessageCircle className="h-8 w-8 text-brand-yellow-accent"/>];
  
  return (
    <SectionWrapper className="bg-brand-background-light border-t border-brand-border">
      <MotionDiv variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div variants={fadeIn} className="text-center lg:text-left mb-8 md:mb-12 max-w-xl">
          <p className="text-sm font-semibold text-primary mb-1">{t('homePage.blinWhyTrustUs.tag')}</p>
          <h2 className="font-heading text-3xl md:text-4xl text-brand-dark mb-4">{t('homePage.blinWhyTrustUs.title')}</h2>
          <p className="text-brand-secondary text-sm md:text-base">{t('homePage.blinWhyTrustUs.subtitle')}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => (
            <MotionCard key={index} variants={itemVariants} className="bg-white p-6 rounded-xl shadow-medium hover:shadow-strong transition-shadow">
              <div className="mb-4">{icons[index % icons.length]}</div>
              <h3 className="font-heading text-xl text-brand-dark mb-2">{point.title}</h3>
              <p className="text-brand-secondary text-sm">{point.description}</p>
            </MotionCard>
          ))}
        </div>
        <motion.div variants={fadeIn} className="mt-10 text-center lg:text-left">
            <Button asChild className="btn-primary-yellow">
              <Link to="/a-propos">{t('homePage.blinWhyTrustUs.cta')}</Link>
            </Button>
        </motion.div>
      </MotionDiv>
    </SectionWrapper>
  );
};

const BlinHowWeWorkSection = () => {
  const { t } = useTranslation();
  const workSteps = t('homePage.blinHowWeWork.steps', { returnObjects: true, defaultValue: [] });
  if (!Array.isArray(workSteps) || workSteps.length === 0) return null;

  const stepImages = [
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/8652dddfe1aec3bee515094c627eac0e.png", // Discovery
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/61cac6832d57ccfb2e77d5676fee60bc.png", // Planning
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/86ee4c409d7a014f7df0d9c3983c921a.png", // Design & Dev
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/d73a76bd45be47105356184b8ec5cfad.png"  // Launch
  ];

  return (
    <SectionWrapper className="bg-brand-background-light border-t border-brand-border">
      <MotionDiv variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div variants={fadeIn} className="text-center mb-10 md:mb-16">
          <p className="text-sm font-semibold text-primary mb-1">{t('homePage.blinHowWeWork.tag')}</p>
          <h2 className="font-heading text-3xl md:text-4xl text-brand-dark mb-4">{t('homePage.blinHowWeWork.title')}</h2>
          <p className="text-brand-secondary max-w-2xl mx-auto text-sm md:text-base">{t('homePage.blinHowWeWork.subtitle')}</p>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-1 bg-brand-border -translate-x-1/2"></div>
          {workSteps.map((step, index) => (
            <MotionDiv 
              key={index} 
              variants={itemVariants}
              className={`flex flex-col lg:flex-row items-center mb-10 lg:mb-0 lg:items-start ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right lg:flex-row-reverse'}`}
            >
              <div className={`lg:w-5/12 mb-6 lg:mb-0 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'} flex justify-center lg:justify-start`}>
                <img src={stepImages[index % stepImages.length]} alt={step.altText} className="w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 h-auto rounded-lg shadow-medium" />
              </div>
              <div className="lg:w-1/12 hidden lg:flex justify-center items-start pt-4">
                <div className="w-10 h-10 rounded-full bg-brand-yellow-accent text-brand-dark flex items-center justify-center font-bold text-lg ring-4 ring-brand-background-light z-10">
                  {`0${index + 1}`}
                </div>
              </div>
              <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'} text-center lg:text-left pt-4`}>
                <h3 className="font-heading text-2xl text-brand-dark mb-2">{step.title}</h3>
                <p className="text-brand-secondary text-sm">{step.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </SectionWrapper>
  );
};

const BlinFinalCTASection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { appConfig } = useAppState();
  const FORMSPREE_ENDPOINT_MINI = appConfig.formspreeEndpoint || "https://formspree.io/f/YOUR_UNIQUE_FORM_ID";


   const handleMiniFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    toast({
      title: t('homePage.contactSection.status.sending'),
      description: t('homePage.contactSection.status.pleaseWait'),
      className: "bg-card text-card-foreground"
    });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT_MINI, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        toast({
          title: t('homePage.contactSection.status.successTitle'),
          description: t('homePage.contactSection.status.successDescription'),
           className: "bg-green-600 text-white"
        });
        form.reset();
      } else {
        throw new Error(t('homePage.contactSection.status.errorDescription'));
      }
    } catch (error) {
      toast({
        title: t('homePage.contactSection.status.errorTitle'),
        description: error.message,
        variant: "destructive"
      });
    }
  };


  return (
    <SectionWrapper className="bg-brand-yellow-accent !py-12 md:!py-16" disableAnimation>
       <MotionDiv variants={fadeIn} initial="hidden" animate="visible" className="container-custom">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-dark mb-2 text-center">{t('homePage.blinFinalCTA.title')}</h2>
        <p className="text-brand-dark/80 mb-6 text-center text-sm md:text-base">{t('homePage.blinFinalCTA.subtitle')}</p>
        <form onSubmit={handleMiniFormSubmit} className="grid sm:grid-cols-3 gap-4 items-end max-w-2xl mx-auto">
           <div className="sm:col-span-1">
              <Label htmlFor="phone-final" className="text-brand-dark font-medium text-xs">{t('homePage.blinHero.freeEvaluation.phoneLabel')}</Label>
              <Input type="tel" id="phone-final" name="phone_final" placeholder={t('homePage.blinHero.freeEvaluation.phonePlaceholder')} required className="bg-white/80 border-brand-yellow-accent-dark placeholder:text-brand-dark/50 focus:bg-white rounded-md" />
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="name-final" className="text-brand-dark font-medium text-xs">{t('homePage.blinHero.freeEvaluation.nameLabel')}</Label>
              <Input type="text" id="name-final" name="name_final" placeholder={t('homePage.blinHero.freeEvaluation.namePlaceholder')} required className="bg-white/80 border-brand-yellow-accent-dark placeholder:text-brand-dark/50 focus:bg-white rounded-md" />
            </div>
          <Button type="submit" className="sm:col-span-1 w-full bg-brand-dark hover:bg-black text-brand-yellow-accent font-semibold text-sm py-3 rounded-md">{t('homePage.blinHero.freeEvaluation.cta')}</Button>
        </form>
         {FORMSPREE_ENDPOINT_MINI.includes("YOUR_UNIQUE_FORM_ID") && (
            <p className="text-xs text-brand-dark/70 mt-3 text-center">{t('homePage.contactSection.form.formspreeNote')}</p>
          )}
      </MotionDiv>
    </SectionWrapper>
  );
};


const HomeContactSection = () => {
  const { t } = useTranslation();
  return (
    <SectionWrapper id="home-contact-detailed" className="bg-brand-dark">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5 text-brand-light" dangerouslySetInnerHTML={{ __html: t('homePage.contactSection.title', { gradient: (text) => `<span class="gradient-text-yellow">${text}</span>` }) }} />
        <p className="text-md md:text-lg text-brand-secondary mb-10">{t('homePage.contactSection.description')}</p>
      </div>
      <MotionCard
        variants={itemVariants}
        className="dark-theme-card max-w-xl mx-auto p-8 md:p-10"
      >
        <ContactForm showTitle={false} lightTheme={false} />
      </MotionCard>
    </SectionWrapper>
  );
};


const HomePage = () => {
  const showcaseFeaturesKeys = [
    "homePage.blinShowcaseSite.features.0", "homePage.blinShowcaseSite.features.1", 
    "homePage.blinShowcaseSite.features.2", "homePage.blinShowcaseSite.features.3",
    "homePage.blinShowcaseSite.features.4", "homePage.blinShowcaseSite.features.5"
  ];
  const ecommerceFeaturesKeys = [
    "homePage.blinEcommerceSite.features.0", "homePage.blinEcommerceSite.features.1",
    "homePage.blinEcommerceSite.features.2", "homePage.blinEcommerceSite.features.3",
    "homePage.blinEcommerceSite.features.4", "homePage.blinEcommerceSite.features.5"
  ];

  return (
    <>
      <BlinHeroSection />
      <BlinServiceAdvantageSection 
        titleKey="homePage.blinShowcaseSite.tag"
        descriptionKey="homePage.blinShowcaseSite.title"
        features={showcaseFeaturesKeys}
        imageSrc="https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/741ed5e94097a83e558558f52f97e7fd.png"
        imageAltKey="homePage.blinShowcaseSite.imageAlt"
        ctaTextKey="homePage.blinShowcaseSite.cta"
        ctaLink="/services#showcase"
      />
       <BlinServiceAdvantageSection 
        titleKey="homePage.blinEcommerceSite.tag"
        descriptionKey="homePage.blinEcommerceSite.title"
        features={ecommerceFeaturesKeys}
        imageSrc="https://storage.googleapis.com/hostinger-horizons-assets-prod/ec999e98-f757-4104-a433-d4cc6a4be42b/ee2b22a16ac0b01fe7492320d3222ac3.png"
        imageAltKey="homePage.blinEcommerceSite.imageAlt"
        ctaTextKey="homePage.blinEcommerceSite.cta"
        ctaLink="/services#ecommerce"
        reverse={true}
      />
      <BlinWhyTrustUsSection />
      <BlinHowWeWorkSection />
      <BlinFinalCTASection />
      <HomeContactSection />
    </>
  );
};

export default HomePage;
