
import React from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { code: 'EUR', name: 'EUR (€)' },
    { code: 'TND', name: 'TND (DT)' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-200 hover:text-brand-pink hover:bg-transparent">
          <DollarSign className="h-5 w-5 mr-1" />
          {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-brand-deep-purple border-gray-700 text-gray-200">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className={`hover:bg-brand-purple/50 focus:bg-brand-purple/50 ${currency === curr.code ? 'bg-brand-purple/30' : ''}`}
          >
            {curr.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
