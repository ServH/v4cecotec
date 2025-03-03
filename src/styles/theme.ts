export const theme = {
    colors: {
      // Primary palette
      primary: {
        50: '#e6f1ff',
        100: '#cce3ff',
        200: '#99c7ff',
        300: '#66aaff',
        400: '#338eff',
        500: '#0072ff', // Main primary color
        600: '#005be6',
        700: '#0044cc',
        800: '#002e99',
        900: '#001f66',
      },
      // Secondary palette
      secondary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#b9e6fe',
        300: '#7cd4fd',
        400: '#36bffa',
        500: '#0ca5e9', // Main secondary color
        600: '#0086c9',
        700: '#026aa2',
        800: '#065986',
        900: '#0b4a6f',
      },
      // Neutral palette
      neutral: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      // Semantic colors
      success: {
        light: '#d3f9d8',
        main: '#00c853',
        dark: '#00a040',
      },
      warning: {
        light: '#fff3cd',
        main: '#ffc107',
        dark: '#d39e00',
      },
      error: {
        light: '#ffebee',
        main: '#f44336',
        dark: '#c62828',
      },
      info: {
        light: '#e3f2fd',
        main: '#2196f3',
        dark: '#0d47a1',
      },
      background: {
        default: '#ffffff',
        paper: '#f8fafc',
        subtle: '#f1f5f9',
        card: '#ffffff',
      },
      text: {
        primary: '#0f172a',
        secondary: '#475569',
        disabled: '#94a3b8',
        hint: '#64748b',
      },
      divider: '#e2e8f0',
    },
    
    typography: {
      fontFamily: {
        primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },
      fontSizes: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        md: '1rem',       // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeights: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
    },
    
    spacing: {
      0: '0',
      0.5: '0.125rem', // 2px
      1: '0.25rem',    // 4px
      1.5: '0.375rem', // 6px
      2: '0.5rem',     // 8px
      2.5: '0.625rem', // 10px
      3: '0.75rem',    // 12px
      3.5: '0.875rem', // 14px
      4: '1rem',       // 16px
      5: '1.25rem',    // 20px
      6: '1.5rem',     // 24px
      7: '1.75rem',    // 28px
      8: '2rem',       // 32px
      9: '2.25rem',    // 36px
      10: '2.5rem',    // 40px
      11: '2.75rem',   // 44px
      12: '3rem',      // 48px
      14: '3.5rem',    // 56px
      16: '4rem',      // 64px
      20: '5rem',      // 80px
      24: '6rem',      // 96px
      28: '7rem',      // 112px
      32: '8rem',      // 128px
      36: '9rem',      // 144px
      40: '10rem',     // 160px
      44: '11rem',     // 176px
      48: '12rem',     // 192px
      52: '13rem',     // 208px
      56: '14rem',     // 224px
      60: '15rem',     // 240px
      64: '16rem',     // 256px
      72: '18rem',     // 288px
      80: '20rem',     // 320px
      96: '24rem',     // 384px
    },
    
    shadows: {
      none: 'none',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
    
    borders: {
      none: 'none',
      sm: '1px',
      md: '2px',
      lg: '4px',
    },
    
    radii: {
      none: '0',
      sm: '0.125rem',  // 2px
      md: '0.25rem',   // 4px
      lg: '0.5rem',    // 8px
      xl: '0.75rem',   // 12px
      '2xl': '1rem',   // 16px
      '3xl': '1.5rem', // 24px
      full: '9999px',
    },
    
    transitions: {
      default: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      easings: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
    
    zIndices: {
      hide: -1,
      auto: 'auto',
      base: 0,
      docked: 10,
      dropdown: 1000,
      sticky: 1100,
      banner: 1200,
      overlay: 1300,
      modal: 1400,
      popover: 1500,
      skipLink: 1600,
      toast: 1700,
      tooltip: 1800,
    },
    
    breakpoints: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    media: {
      sm: '(min-width: 640px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)',
      xl: '(min-width: 1280px)',
      '2xl': '(min-width: 1536px)',
      hover: '(hover: hover)',
      dark: '(prefers-color-scheme: dark)',
      light: '(prefers-color-scheme: light)',
    },
  };
  
  // Type definitions
  export type Theme = typeof theme;
  export type ColorKeys = keyof typeof theme.colors;
  export type SpacingKeys = keyof typeof theme.spacing;
  export type FontSizeKeys = keyof typeof theme.typography.fontSizes;
  export type FontWeightKeys = keyof typeof theme.typography.fontWeights;
  export type RadiiKeys = keyof typeof theme.radii;
  export type ShadowKeys = keyof typeof theme.shadows;
  export type BreakpointKeys = keyof typeof theme.breakpoints;