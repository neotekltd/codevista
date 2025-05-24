
import React from 'react';
import { useCurrency } from '@/contexts/CurrencyContext.jsx';
import { Button } from '@/components/ui/button';
import { DollarSign, Euro, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { useTranslation } from 'react-i18next';

const CurrencySelector = ({ buttonClassName, iconClassName }) => {
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const { t } = useTranslation();

  const currencyIcons = {
    EUR: <Euro className={`h-4 w-4 ${iconClassName}`} />,
    TND: <span className={`font-semibold text-xs ${iconClassName}`}>TND</span>,
    USD: <DollarSign className={`h-4 w-4 ${iconClassName}`} />,
  };

  // Ensure availableCurrencies is an array and has items before using find
  const currentCurrencyDetails = 
    availableCurrencies && availableCurrencies.length > 0 
    ? availableCurrencies.find(c => c.code === currency) || availableCurrencies[0]
    : { code: 'EUR', name: 'Euro' }; // Fallback default

  if (!availableCurrencies || availableCurrencies.length === 0) {
    return null; // Or some fallback UI if currencies are not available
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`flex items-center space-x-1.5 text-sm ${buttonClassName}`}>
          {currencyIcons[currentCurrencyDetails.code] || <DollarSign className={`h-4 w-4 ${iconClassName}`} />}
          <span>{currentCurrencyDetails.code}</span>
          <ChevronDown className={`h-4 w-4 opacity-70 ${iconClassName}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border shadow-medium">
        {availableCurrencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className={`cursor-pointer hover:bg-muted/50 ${currency === curr.code ? 'bg-muted text-primary font-semibold' : 'text-foreground'}`}
          >
            {curr.name} ({curr.code})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
