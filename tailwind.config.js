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
        'brand-dark': '#0F172A', // Dark blue for text and backgrounds
        'brand-light': '#FFFFFF', // Pure white for text on dark
        'brand-background-light': '#F8FAFC', // Light blue-gray background
        'brand-accent': '#3B82F6', // Vibrant blue accent
        'brand-accent-dark': '#2563EB', // Darker blue for hover states
        'brand-secondary': '#64748B', // Slate gray for secondary text
        'brand-border': '#E2E8F0', // Light border for light theme elements
        'brand-dark-border': '#334155', // Border for dark theme elements
        'brand-yellow-accent': '#3B82F6', // Changed from yellow to blue
        'brand-yellow-accent-dark': '#2563EB', // Changed to darker blue
        'brand-deep-purple': '#1E293B', // Darker blue-gray
        'brand-purple': '#6366F1', // Indigo
        'brand-light-purple': '#818CF8', // Lighter indigo
        'brand-pink': '#EC4899', // Pink
        'brand-teal': '#14B8A6', // Teal
        'brand-orange': '#F97316', // Orange
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