
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDarkFooter = false }) => {
  const { theme, toggleTheme } = useTheme();

  const iconColorClass = isDarkFooter ? 'text-brand-secondary group-hover:text-brand-yellow-accent' : 'text-foreground group-hover:text-primary';
  const buttonBgClass = isDarkFooter ? 'bg-brand-dark-border/60 hover:bg-brand-yellow-accent' : 'hover:bg-muted/50';
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors group ${buttonBgClass}`}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {theme === 'light' ? (
        <Moon className={`h-5 w-5 ${iconColorClass}`} />
      ) : (
        <Sun className={`h-5 w-5 ${iconColorClass}`} />
      )}
    </Button>
  );
};

export default ThemeToggle;
