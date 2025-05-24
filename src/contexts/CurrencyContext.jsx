
import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const EUR_TO_TND_RATE = 3.3; 

const defaultAvailableCurrencies = [
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'TND', name: 'Dinar Tunisien', symbol: 'TND' },
];

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(localStorage.getItem('selectedCurrency') || 'EUR');
  const [availableCurrencies, setAvailableCurrencies] = useState(defaultAvailableCurrencies);

  useEffect(() => {
    localStorage.setItem('selectedCurrency', currency);
  }, [currency]);

  const convertPrice = (priceInEur) => {
    if (currency === 'TND') {
      return (priceInEur * EUR_TO_TND_RATE / 2).toFixed(0); 
    }
    return (priceInEur / 2).toFixed(0);
  };
  
  const getPriceSuffix = () => {
    const current = availableCurrencies.find(c => c.code === currency);
    return current ? (currency === 'TND' ? 'TND' : current.symbol) : '€';
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, getPriceSuffix, EUR_TO_TND_RATE, availableCurrencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};
