export const theme = {
  colors: {
    primary: {
      main: '#6C63FF',
      light: '#8F89FF',
      dark: '#4B45B2'
    },
    secondary: {
      main: '#FF6584',
      light: '#FF89A1',
      dark: '#B2475D'
    },
    neutral: {
      black: '#1A1A2E',
      darkGray: '#16213E',
      gray: '#0F3460',
      lightGray: '#E9ECEF',
      white: '#FFFFFF'
    },
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800'
  },
  typography: {
    fontFamily: {
      primary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      secondary: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      code: "'Fira Code', 'Courier New', monospace"
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem'      // 48px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    }
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem'    // 48px
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out'
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.1)',
    md: '0 4px 8px rgba(0,0,0,0.15)',
    lg: '0 8px 16px rgba(0,0,0,0.2)',
    xl: '0 12px 24px rgba(0,0,0,0.25)'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  }
};

export const devices = {
  mobile: `(min-width: ${theme.breakpoints.xs})`,
  tablet: `(min-width: ${theme.breakpoints.md})`,
  desktop: `(min-width: ${theme.breakpoints.lg})`,
  largeDesktop: `(min-width: ${theme.breakpoints.xl})`
};