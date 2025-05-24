
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import SoftwareDesignPage from '@/pages/SoftwareDesignPage';
import AboutPage from '@/pages/AboutPage';
import PricingPage from '@/pages/PricingPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import ContactPage from '@/pages/ContactPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PageTransition from '@/components/shared/PageTransition';

const RouteWithTransition = ({ element }) => (
  <PageTransition>{element}</PageTransition>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RouteWithTransition element={<HomePage />} />} />
        <Route path="/services" element={<RouteWithTransition element={<ServicesPage />} />} />
        <Route path="/design-services" element={<RouteWithTransition element={<SoftwareDesignPage />} />} />
        <Route path="/a-propos" element={<RouteWithTransition element={<AboutPage />} />} />
        <Route path="/tarifs" element={<RouteWithTransition element={<PricingPage />} />} />
        <Route path="/temoignages" element={<RouteWithTransition element={<TestimonialsPage />} />} />
        <Route path="/contact" element={<RouteWithTransition element={<ContactPage />} />} />
        <Route path="/payment-success" element={<RouteWithTransition element={<PaymentSuccessPage />} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
