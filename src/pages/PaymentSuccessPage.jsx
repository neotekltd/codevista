
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { itemVariantsRight } from '@/components/shared/SectionWrapper';
import { useTranslation } from 'react-i18next';

const PaymentSuccessPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <SectionWrapper id="payment-success" className="text-center">
      <motion.div variants={itemVariantsRight} className="max-w-2xl mx-auto">
        <CheckCircle className="h-20 w-20 md:h-24 md:w-24 text-brand-teal mx-auto mb-8" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-white" dangerouslySetInnerHTML={{ __html: t('paymentSuccessPage.title', { gradient: (text) => `<span class="gradient-text">${text}</span>` }) }} />
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          {t('paymentSuccessPage.message')}
        </p>
        {sessionId && (
          <p className="text-sm text-gray-400 mb-8">
            {t('paymentSuccessPage.sessionId')} <span className="font-mono">{sessionId}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/80 text-white text-lg font-semibold">
            <Link to="/">{t('paymentSuccessPage.backToHome')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-brand-teal border-brand-teal hover:bg-brand-teal hover:text-brand-deep-purple text-lg font-semibold">
            <Link to="/services">{t('paymentSuccessPage.exploreServices')} <ShoppingBag className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default PaymentSuccessPage;
