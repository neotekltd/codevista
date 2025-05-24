
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import SectionWrapper, { MotionCard, MotionDiv, itemVariantsRight, fadeIn, staggerContainer } from '@/components/shared/SectionWrapper';
import { CheckCircle, HelpCircle, Package, TrendingUp, Zap, CreditCard, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/contexts/CurrencyContext';

const planIconsList = {
  'Essentiel E-commerce': <Package className="h-10 w-10 text-brand-dark mb-4" />,
  'Essential E-commerce': <Package className="h-10 w-10 text-brand-dark mb-4" />,
  'Croissance E-commerce': <TrendingUp className="h-10 w-10 text-brand-dark mb-4" />,
  'Growth E-commerce': <TrendingUp className="h-10 w-10 text-brand-dark mb-4" />,
  'Performance E-commerce': <Zap className="h-10 w-10 text-brand-dark mb-4" />,
};

const STRIPE_PUBLISHABLE_KEY = "YOUR_STRIPE_PUBLISHABLE_KEY"; 

const PricingPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { convertPrice, getPriceSuffix, currency } = useCurrency();

  const pricingPlansData = t('pricingPage.plans', { returnObjects: true });
  const faqs = t('pricingPage.faq.items', { returnObjects: true });
  
  const basePricesEUR = {
    "price_essential_placeholder": 600, 
    "price_growth_placeholder": 1250, 
    "contact_performance": null 
  };

  const handleCheckout = async (priceId, planName) => {
    if (STRIPE_PUBLISHABLE_KEY === "YOUR_STRIPE_PUBLISHABLE_KEY" || !priceId || priceId.includes('_placeholder')) {
      toast({
        title: t('pricingPage.stripeConfigWarning.title'),
        description: t('pricingPage.stripeConfigWarning.description', { planName }),
        variant: "destructive",
        className: "bg-red-700 border-red-900 text-white"
      });
      console.warn(`Stripe Checkout for plan "${planName}" (Price ID: ${priceId}) cannot proceed. Publishable key or Price ID is a placeholder.`);
      return;
    }

    toast({
      title: t('pricingPage.stripeRedirecting'),
      description: t('pricingPage.stripePleaseWait'),
      className: "bg-brand-dark border-brand-dark-border text-brand-light"
    });

    try {
      const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/tarifs`,
        locale: currency === 'fr' ? 'fr' : 'en', 
      });

      if (error) {
        console.error("Stripe Error:", error);
        toast({
          title: t('pricingPage.stripeError.title'),
          description: error.message || t('pricingPage.stripeError.description'),
          variant: "destructive",
          className: "bg-red-700 border-red-900 text-white"
        });
      }
    } catch (e) {
       console.error("Stripe Init Error:", e);
        toast({
          title: t('pricingPage.stripeInitError.title'),
          description: t('pricingPage.stripeInitError.description'),
          variant: "destructive",
          className: "bg-red-700 border-red-900 text-white"
        });
    }
  };


  return (
    <>
      <SectionWrapper id="pricing-hero" className="bg-brand-background-light text-center" disableAnimation>
        <MotionDiv variants={staggerContainer} initial="hidden" animate="visible">
          <motion.h1 variants={fadeIn} className="font-heading text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-brand-dark leading-tight" dangerouslySetInnerHTML={{ __html: t('pricingPage.hero.titleDuck', { defaultValue: "Simple, Transparent Pricing" }) }} />
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed">
            {t('pricingPage.hero.subtitleDuck', {defaultValue: "Choose the perfect plan for your business. No hidden fees, no surprises. Just great design at a fair price."})}
          </motion.p>
        </MotionDiv>
      </SectionWrapper>

      <SectionWrapper id="pricing-plans" className="bg-brand-background-light">
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible" 
          className="grid lg:grid-cols-3 gap-8 md:gap-10 items-stretch"
        >
          {pricingPlansData.map((plan, index) => {
            const originalPriceEUR = basePricesEUR[plan.id];
            const displayPrice = originalPriceEUR ? convertPrice(originalPriceEUR) : t(plan.price, { price: '' }).trim();
            const priceSuffix = originalPriceEUR ? getPriceSuffix() : (plan.priceSuffix === "Custom" || plan.priceSuffix === "Personnalisé" ? t('pricingPage.plans.2.priceSuffix') : t('pricingPage.plans.0.priceSuffix'));
            
            return (
              <MotionCard
                key={index}
                variants={itemVariantsRight}
                className={`light-theme-card flex flex-col ${plan.popular ? 'border-2 border-brand-yellow-accent shadow-strong' : 'shadow-medium'} transform hover:-translate-y-1.5`}
              >
                {plan.popular && (
                  <div className="bg-brand-yellow-accent text-brand-dark text-xs font-bold uppercase tracking-wider py-2 px-4 text-center rounded-t-xl -mx-px -mt-px">
                    {t('pricingPage.mostPopular')}
                  </div>
                )}
                <CardHeader className="text-center pt-8 pb-5">
                  <div className="flex justify-center p-3 bg-brand-yellow-accent/20 rounded-full w-fit mx-auto">
                    {planIconsList[plan.name] || <Package className="h-10 w-10 text-brand-dark mb-4" />}
                  </div>
                  <CardTitle className="font-heading text-2xl md:text-3xl font-bold text-brand-dark mt-3">{plan.name}</CardTitle>
                  <CardDescription className="text-4xl md:text-5xl font-extrabold text-brand-dark py-3">
                     {originalPriceEUR ? t('pricingPage.plans.0.price', { price: displayPrice }) : displayPrice} {originalPriceEUR ? priceSuffix : ''}
                  </CardDescription>
                   {!originalPriceEUR && <p className="text-brand-secondary text-sm">{priceSuffix}</p>}
                  <p className="text-brand-secondary mt-2 min-h-[40px] text-sm leading-relaxed">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-grow pt-4 pb-6 px-8">
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-yellow-accent-dark mr-3 mt-0.5 shrink-0" />
                        <span className="text-brand-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 bg-gray-50 mt-auto rounded-b-2xl">
                  {plan.ctaType === 'payment' ? (
                    <Button 
                      onClick={() => handleCheckout(plan.id, plan.name)}
                      className={`w-full text-lg py-3 font-semibold group ${plan.popular ? 'btn-primary-yellow' : 'btn-outline-dark'}`}
                    >
                      {plan.cta} <CreditCard className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:scale-110" />
                    </Button>
                  ) : (
                    <Button asChild className={`w-full text-lg py-3 font-semibold group ${plan.popular ? 'btn-primary-yellow' : 'btn-outline-dark'}`}>
                      <Link to={`/contact?service=${encodeURIComponent(plan.contactService)}`}>
                        {plan.cta} <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </MotionCard>
            );
          })}
        </motion.div>
        {STRIPE_PUBLISHABLE_KEY === "YOUR_STRIPE_PUBLISHABLE_KEY" && (
            <motion.div variants={itemVariantsRight} className="mt-10 text-center text-yellow-600 text-sm p-4 bg-yellow-50 rounded-md border border-yellow-300">
              {t('pricingPage.stripeNote')}
            </motion.div>
          )}
      </SectionWrapper>

      <SectionWrapper id="pricing-comparison" className="bg-white">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-brand-dark" dangerouslySetInnerHTML={{ __html: t('pricingPage.comparison.titleDuck', { defaultValue: "Compare Our Plans" }) }} />
        <div className="overflow-x-auto rounded-2xl border border-brand-border shadow-medium">
            <table className="w-full min-w-[700px] text-left border-collapse bg-white">
                <thead>
                    <tr className="border-b border-brand-border bg-gray-50">
                        <th className="p-5 text-lg font-semibold text-brand-dark">{t('pricingPage.comparison.featureHeader')}</th>
                        {pricingPlansData.map(plan => (
                            <th key={plan.name} className={`p-5 text-lg font-semibold text-center ${plan.popular ? 'text-brand-yellow-accent-dark' : 'text-brand-dark'}`}>{plan.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(t('pricingPage.comparison.features', { returnObjects: true })).map(featureKey => {
                        const featureName = t(`pricingPage.comparison.features.${featureKey}`);
                        const featureValues = t(`pricingPage.comparison.featureValues.${featureKey}`, { returnObjects: true });
                        return (
                            <tr key={featureKey} className="border-b border-brand-border/70 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                                <td className="p-5 text-brand-secondary font-medium">{featureName}</td>
                                {featureValues.map((value, idx) => (
                                    <td key={idx} className="p-5 text-center text-brand-secondary text-sm">
                                        {typeof value === 'boolean' ? (value ? <CheckCircle className="mx-auto text-brand-yellow-accent-dark" /> : <span className="text-gray-400">-</span>) : value}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </SectionWrapper>

      <SectionWrapper id="faq-pricing" className="bg-brand-background-light">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-brand-dark" dangerouslySetInnerHTML={{ __html: t('pricingPage.faq.titleDuck', { defaultValue: "Frequently Asked Questions" }) }} />
        <div className="max-w-3xl mx-auto space-y-5">
          {faqs.map((faq, index) => (
            <MotionCard 
              key={index} 
              variants={itemVariantsRight} 
              className="light-theme-card p-6 md:p-8"
            >
              <details className="group">
                <summary className="flex items-center justify-between font-semibold text-brand-dark cursor-pointer text-lg hover:text-brand-yellow-accent-dark transition-colors">
                  {faq.q}
                  <HelpCircle className="h-6 w-6 text-brand-secondary group-hover:text-brand-yellow-accent-dark transition-transform group-open:rotate-180 shrink-0 ml-3" />
                </summary>
                <p className="text-brand-secondary mt-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            </MotionCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="custom-quote" className="bg-white text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6 text-brand-dark">{t('pricingPage.customQuote.title')}</h2>
        <p className="text-md md:text-lg text-brand-secondary mb-10 max-w-xl mx-auto leading-relaxed">
          {t('pricingPage.customQuote.description')}
        </p>
        <Button size="lg" asChild className="btn-primary-yellow text-lg px-10 py-7">
          <Link to="/contact?service=Devis%20Personnalisé">{t('pricingPage.customQuote.button')}</Link>
        </Button>
      </SectionWrapper>
    </>
  );
};

export default PricingPage;
