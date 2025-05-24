
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppRoutes from '@/routes/AppRoutes'; 
import ScrollToTop from '@/components/shared/ScrollToTop';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { StripeProvider } from '@/contexts/StripeContext';
import { AppStateProvider } from '@/contexts/AppStateContext';
import ThemeProvider from '@/contexts/ThemeContext';

const App = () => {
  return (
    <AppStateProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <StripeProvider>
            <ThemeProvider>
              <div className="min-h-screen bg-brand-background-light text-brand-dark font-sans flex flex-col antialiased overflow-x-hidden">
                <Toaster />
                <Header />
                <ScrollToTop />
                <main className="flex-grow pt-[68px] md:pt-[76px]">
                  <AppRoutes />
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </StripeProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </AppStateProvider>
  );
};

export default App;
