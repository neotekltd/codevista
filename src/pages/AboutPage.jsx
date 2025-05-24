
import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper, { MotionDiv, itemVariants, fadeIn, staggerContainer } from '@/components/shared/SectionWrapper';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Zap, Users, Target, Award, Lightbulb, HeartHandshake as Handshake, Rocket, CheckSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const valueIconsList = {
  "Innovation": <Lightbulb size={32} className="text-brand-accent" />,
  "Partenariat": <Handshake size={32} className="text-brand-accent" />,
  "Partnership": <Handshake size={32} className="text-brand-accent" />,
  "Résultats": <Rocket size={32} className="text-brand-accent" />,
  "Results": <Rocket size={32} className="text-brand-accent" />,
  "Qualité": <CheckSquare size={32} className="text-brand-accent" />,
  "Quality": <CheckSquare size={32} className="text-brand-accent" />,
};

const AboutPage = () => {
  const { t } = useTranslation();
  const teamMember = t('aboutPage.teamSection.member', { returnObjects: true });
  const values = t('aboutPage.valuesSection.values', { returnObjects: true });

  return (
    <>
      <SectionWrapper id="about-hero" className="bg-brand-dark text-center" disableAnimation>
        <MotionDiv variants={staggerContainer} initial="hidden" animate="visible">
          <motion.h1 variants={fadeIn} className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 text-brand-light" dangerouslySetInnerHTML={{ __html: t('aboutPage.hero.title', { gradient: (text) => `<span class="gradient-text-alt">${text}</span>` }) }} />
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-brand-secondary max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
            {t('aboutPage.hero.subtitle')}
          </motion.p>
          <MotionDiv variants={fadeIn} className="px-4">
            <img  alt="Inspiring image of a team collaborating or a symbolic representation of growth" class="rounded-xl shadow-2xl mx-auto max-w-3xl w-full h-auto object-contain border-2 border-brand-border" src="https://images.unsplash.com/photo-1565841327798-694bc2074762" />
          </MotionDiv>
        </MotionDiv>
      </SectionWrapper>

      <SectionWrapper id="mission-vision" className="bg-brand-dark/70">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <MotionDiv variants={itemVariants}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-brand-light" dangerouslySetInnerHTML={{ __html: t('aboutPage.missionSection.title', { gradient: (text) => `<span class="gradient-text-alt">${text}</span>` }) }} />
            <p className="text-md md:text-lg text-brand-secondary mb-6 leading-relaxed">
              {t('aboutPage.missionSection.p1')}
            </p>
            <p className="text-md md:text-lg text-brand-secondary leading-relaxed">
              {t('aboutPage.missionSection.p2')}
            </p>
          </MotionDiv>
          <MotionDiv variants={itemVariants} className="mt-10 md:mt-0 relative">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-brand-accent/5 rounded-full blur-2xl -z-10"></div>
            <img  alt="Abstract visual representing forward-thinking mission and clear vision" class="rounded-xl shadow-2xl w-full h-auto object-contain border border-brand-border" src="https://images.unsplash.com/photo-1581182394437-2a9876866966" />
          </MotionDiv>
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="my-story" className="bg-brand-dark">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-brand-light" dangerouslySetInnerHTML={{ __html: t('aboutPage.storySection.title', { gradient: (text) => `<span class="gradient-text-alt">${text}</span>` }) }} />
        <div className="max-w-3xl mx-auto">
          <MotionDiv variants={itemVariants} className="bg-brand-dark/50 p-8 md:p-10 rounded-xl border border-brand-border shadow-xl">
            <p className="text-md md:text-lg text-brand-secondary mb-6 leading-relaxed">
              {t('aboutPage.storySection.p1')}
            </p>
            <p className="text-md md:text-lg text-brand-secondary mb-6 leading-relaxed">
              {t('aboutPage.storySection.p2')}
            </p>
            <p className="text-md md:text-lg text-brand-secondary leading-relaxed">
              {t('aboutPage.storySection.p3')}
            </p>
          </MotionDiv>
        </div>
      </SectionWrapper>

      <SectionWrapper id="team" className="bg-brand-dark/70">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-brand-light" dangerouslySetInnerHTML={{ __html: t('aboutPage.teamSection.title', { gradient: (text) => `<span class="gradient-text-alt">${text}</span>` }) }} />
        <div className="max-w-md mx-auto">
            <MotionDiv 
              variants={itemVariants}
              className="bg-brand-dark p-8 text-center hover:shadow-brand-accent/10 shadow-xl transition-all duration-300 rounded-xl border border-brand-border hover:border-brand-accent transform hover:-translate-y-1"
            >
              <Avatar className="h-32 w-32 md:h-36 md:w-36 mx-auto mb-6 border-4 border-brand-accent">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&q=60" alt={teamMember.name} />
                <AvatarFallback className="bg-brand-accent text-brand-dark text-5xl font-semibold">{teamMember.name ? teamMember.name.split(" ").map(n => n[0]).join("") : "MJ"}</AvatarFallback>
              </Avatar>
              <h3 className="font-heading text-3xl font-semibold mb-1 text-brand-light">{teamMember.name}</h3>
              <p className="text-brand-accent font-medium mb-4 text-lg">{teamMember.role}</p>
              <p className="text-brand-secondary text-sm leading-relaxed">{teamMember.bio}</p>
            </MotionDiv>
        </div>
      </SectionWrapper>

      <SectionWrapper id="values" className="bg-brand-dark">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-brand-light" dangerouslySetInnerHTML={{ __html: t('aboutPage.valuesSection.title', { gradient: (text) => `<span class="gradient-text-alt">${text}</span>` }) }} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <MotionDiv 
              key={index} 
              variants={itemVariants}
              className="bg-brand-dark p-8 text-center hover:shadow-brand-accent/10 shadow-xl transition-all duration-300 rounded-xl border border-brand-border hover:border-brand-accent transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-5">{valueIconsList[value.title] || <Zap size={32} className="text-brand-accent" />}</div>
              <h3 className="font-heading text-2xl font-semibold mb-3 text-brand-light">{value.title}</h3>
              <p className="text-brand-secondary text-sm leading-relaxed">{value.description}</p>
            </MotionDiv>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default AboutPage;
