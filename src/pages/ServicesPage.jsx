
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import SectionWrapper, { MotionCard, MotionDiv, itemVariantsRight, fadeIn, staggerContainer } from '@/components/shared/SectionWrapper';
import { ShoppingCart, Palette, Code, TrendingUp, ShieldCheck, Headphones, CheckCircle, MessageSquare, ArrowRight, PenTool, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const servicePageIconsList = {
  'Boutique en Ligne Complète': <ShoppingCart size={32} className="text-brand-dark" />,
  'Complete Online Store': <ShoppingCart size={32} className="text-brand-dark" />,
  'Refonte et Modernisation': <Palette size={32} className="text-brand-dark" />,
  'Redesign & Modernization': <Palette size={32} className="text-brand-dark" />,
  'Développements Spécifiques': <Code size={32} className="text-brand-dark" />,
  'Specific Developments': <Code size={32} className="text-brand-dark" />,
  'Optimisation SEO & Marketing': <TrendingUp size={32} className="text-brand-dark" />,
  'SEO & Marketing Optimization': <TrendingUp size={32} className="text-brand-dark" />,
  'Maintenance & Sécurité': <ShieldCheck size={32} className="text-brand-dark" />,
  'Maintenance & Security': <ShieldCheck size={32} className="text-brand-dark" />,
  'Consulting & Stratégie E-commerce': <Headphones size={32} className="text-brand-dark" />,
  'E-commerce Consulting & Strategy': <Headphones size={32} className="text-brand-dark" />,
  'Graphic Design': <PenTool size={32} className="text-brand-dark" />,
  'Motion Graphics': <Zap size={32} className="text-brand-dark" />,
  'Brand Identity Design': <Award size={32} className="text-brand-dark" />,
};

const ServicesPage = () => {
  const { t } = useTranslation();
  const detailedServices = t('servicesPage.detailedServicesDuck', { returnObjects: true });

  return (
    <SectionWrapper id="services-page" className="bg-brand-background-light" disableAnimation>
      <MotionDiv variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-16 md:mb-20">
        <motion.h1 variants={fadeIn} className="font-heading text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-brand-dark leading-tight" dangerouslySetInnerHTML={{ __html: t('servicesPage.hero.titleDuck', { defaultValue: "Our Design Services" }) }} />
        <motion.p variants={fadeIn} className="text-lg md:text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed">{t('servicesPage.hero.subtitleDuck', {defaultValue: "Explore our comprehensive range of design services tailored to elevate your brand and captivate your audience."})}</motion.p>
      </MotionDiv>

      <motion.div 
        variants={staggerContainer} 
        initial="hidden" 
        animate="visible" 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        {detailedServices.map((service, index) => (
          <MotionCard
            key={index}
            variants={itemVariantsRight}
            className={`light-theme-card flex flex-col p-0 overflow-hidden transform hover:-translate-y-1.5 hover:shadow-strong ${service.bgColor === 'yellow' ? 'bg-brand-yellow-accent' : 'bg-white'}`}
          >
            <CardHeader className="p-8">
              <div className={`mb-5 p-3 rounded-full w-fit ${service.bgColor === 'yellow' ? 'bg-black/10' : 'bg-brand-yellow-accent/20'}`}>
                {servicePageIconsList[service.title] || <ShoppingCart size={32} className="text-brand-dark" />}
              </div>
              <CardTitle className={`font-heading text-2xl md:text-3xl font-semibold mb-3 ${service.bgColor === 'yellow' ? 'text-brand-dark' : 'text-brand-dark'}`}>{service.title}</CardTitle>
              <CardDescription className={`text-sm min-h-[60px] leading-relaxed ${service.bgColor === 'yellow' ? 'text-brand-dark/80' : 'text-brand-secondary'}`}>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-8 pt-0">
              <ul className="space-y-2.5 mt-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start text-sm ${service.bgColor === 'yellow' ? 'text-brand-dark/80' : 'text-brand-secondary'}`}>
                    <CheckCircle className={`h-5 w-5 mr-3 mt-0.5 shrink-0 ${service.bgColor === 'yellow' ? 'text-brand-dark' : 'text-brand-yellow-accent-dark'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className={`p-8 mt-auto ${service.bgColor === 'yellow' ? 'bg-brand-yellow-accent-dark/10' : 'bg-gray-50'}`}>
               <Button asChild className={`w-full font-semibold py-3 rounded-lg group ${service.bgColor === 'yellow' ? 'bg-brand-dark text-brand-yellow-accent hover:bg-black/80' : 'btn-primary-yellow'}`}>
                 <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
                    {service.learnMore} <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                 </Link>
               </Button>
            </CardFooter>
          </MotionCard>
        ))}
      </motion.div>

      <SectionWrapper id="cta-services" className="text-center !pt-24 md:!pt-32 !pb-0">
        <motion.h2 variants={itemVariantsRight} className="font-heading text-3xl md:text-4xl font-bold mb-6 text-brand-dark" dangerouslySetInnerHTML={{ __html: t('servicesPage.cta.titleDuck', { defaultValue: "Have a project in mind?" }) }} />
        <motion.p variants={itemVariantsRight} className="text-lg text-brand-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('servicesPage.cta.subtitleDuck', {defaultValue: "We're excited to learn about your vision. Contact us today for a free consultation and let's create something amazing together."})}
        </motion.p>
        <motion.div variants={itemVariantsRight}>
          <Button size="lg" asChild className="btn-primary-yellow text-lg px-10 py-7">
            <Link to="/contact">{t('servicesPage.cta.button')} <MessageSquare className="ml-3 h-6 w-6" /></Link>
          </Button>
        </motion.div>
      </SectionWrapper>
    </SectionWrapper>
  );
};

export default ServicesPage;
