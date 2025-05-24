
import React, { createContext, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripeContext = createContext();

export const useStripeContext = () => useContext(StripeContext);

const STRIPE_PUBLISHABLE_KEY = "YOUR_STRIPE_PUBLISHABLE_KEY"; 
let stripePromise;

if (STRIPE_PUBLISHABLE_KEY && STRIPE_PUBLISHABLE_KEY !== "YOUR_STRIPE_PUBLISHABLE_KEY") {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
}


export const StripeProvider = ({ children }) => {
  useEffect(() => {
    if (STRIPE_PUBLISHABLE_KEY && STRIPE_PUBLISHABLE_KEY !== "YOUR_STRIPE_PUBLISHABLE_KEY") {
      console.log("Stripe.js loaded via context.");
    } else {
      console.warn("Stripe Publishable Key is not configured. Payments will not work.");
    }
  }, []);

  return (
    <StripeContext.Provider value={{ stripePromise, STRIPE_PUBLISHABLE_KEY }}>
      {children}
    </StripeContext.Provider>
  );
};
