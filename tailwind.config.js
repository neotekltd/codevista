/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'brand-dark': '#1A1A1A', // Darker, inspired by duck.design footer
        'brand-light': '#FFFFFF', // Pure white for text on dark
        'brand-background-light': '#FFFBEB', // Pale yellow like duck.design bg
        'brand-accent': '#4ADE80', // Your existing vibrant green
        'brand-accent-dark': '#22C55E', 
        'brand-secondary': '#6B7280', // Adjusted gray for text
        'brand-border': '#E5E7EB', // Lighter border for light theme elements
        'brand-dark-border': '#374151', // Border for dark theme elements
        'brand-yellow-accent': '#FACC15', // Yellow accent from duck.design
        'brand-yellow-accent-dark': '#EAB308',
        'brand-deep-purple': '#110E19', 
        'brand-purple': '#7C3AED', 
        'brand-light-purple': '#A78BFA',
        'brand-pink': '#F472B6', 
        'brand-teal': '#2DD4BF', 
        'brand-orange': '#F97316', 
      },
      borderRadius: {
        lg: "var(--radius)", // 0.75rem
        md: "calc(var(--radius) - 4px)", // 0.5rem
        sm: "calc(var(--radius) - 8px)", // 0.25rem
        xl: "calc(var(--radius) + 4px)", // 1rem, for larger cards like duck.design
        '2xl': "calc(var(--radius) + 8px)", // 1.25rem
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, var(--brand-dark) 0%, #2C2C2C 100%)',
        'gradient-accent': 'linear-gradient(90deg, var(--brand-accent) 0%, var(--brand-accent-dark) 100%)',
        'gradient-yellow': 'linear-gradient(90deg, var(--brand-yellow-accent) 0%, var(--brand-yellow-accent-dark) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        heading: ['Poppins', 'sans-serif'], 
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 16px rgba(0, 0, 0, 0.07)',
        'strong': '0 12px 24px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}