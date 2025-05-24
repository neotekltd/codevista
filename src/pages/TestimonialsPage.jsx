
import React from 'react';
import SectionWrapper, { MotionCard, MotionDiv, itemVariants, fadeIn, staggerContainer } from '@/components/shared/SectionWrapper';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';


const TestimonialsPage = () => {
  const { t } = useTranslation();
  const testimonialsData = t('testimonialsPage.testimonials', { returnObjects: true });

  return (
    <SectionWrapper id="testimonials-page" className="bg-brand-background-light" disableAnimation>
      <MotionDiv variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-16 md:mb-20">
        <motion.h1 variants={fadeIn} className="font-heading text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-brand-dark leading-tight" dangerouslySetInnerHTML={{ __html: t('testimonialsPage.hero.titleDuck', { defaultValue: "What Our Clients Say" }) }} />
        <motion.p variants={fadeIn} className="text-lg md:text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed">{t('testimonialsPage.hero.subtitleDuck', {defaultValue: "We're proud to have partnered with amazing businesses. Here's what some of them have to say about their experience with Neotek LTD."})}</motion.p>
      </MotionDiv>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        {testimonialsData.map((testimonial, index) => (
          <MotionCard
            key={index}
            variants={itemVariants}
            className="light-theme-card p-8 flex flex-col justify-between transform hover:-translate-y-1.5 hover:shadow-strong"
          >
            <div>
              <div className="flex items-center mb-6">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 mr-5 border-2 border-brand-yellow-accent">
                  <AvatarImage src={`https://avatar.vercel.sh/${testimonial.name.replace(/\s/g, '')}.png?size=100`} alt={testimonial.name} />
                  <AvatarFallback className="bg-brand-yellow-accent text-brand-dark text-2xl font-semibold">{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-heading text-xl md:text-2xl font-semibold text-brand-dark">{testimonial.name}</h4>
                  <p className="text-sm text-brand-yellow-accent-dark font-medium">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-xs text-brand-secondary/80 mb-2 uppercase tracking-wider">{testimonial.category}</p>
              <blockquote className="text-brand-secondary italic text-sm md:text-base mb-5 leading-relaxed">"{testimonial.quote}"</blockquote>
            </div>
            <div className="flex mt-auto pt-5 border-t border-brand-border">
              {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 md:h-6 md:w-6 ${ i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />)}
            </div>
          </MotionCard>
        ))}
      </motion.div>

      <SectionWrapper id="cta-testimonials" className="text-center !pt-24 md:!pt-32 !pb-0">
        <motion.h2 variants={itemVariants} className="font-heading text-3xl md:text-4xl font-semibold mb-6 text-brand-dark">{t('testimonialsPage.shareSuccess.title')}</motion.h2>
        <motion.p variants={itemVariants} className="text-md md:text-lg text-brand-secondary mb-10 max-w-xl mx-auto leading-relaxed">{t('testimonialsPage.shareSuccess.description')}</motion.p>
        <MotionDiv variants={itemVariants}>
          <Button size="lg" asChild className="btn-primary-yellow text-lg px-10 py-7">
            <Link to="/contact?subject=Témoignage">{t('testimonialsPage.shareSuccess.button')} <MessageSquare className="ml-3 h-5 w-5" /></Link>
          </Button>
        </MotionDiv>
      </SectionWrapper>
    </SectionWrapper>
  );
};

export default TestimonialsPage;
