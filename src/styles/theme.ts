import { defineStyleConfig, extendTheme } from '@chakra-ui/react';

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: '0',
    _hover: {
      transform: 'translateY(-2px)',
      transition: 'all 0.2s',
    },
  },
  variants: {
    terminal: {
      bg: 'terminal.secondary',
      color: 'terminal.text',
      border: '1px solid',
      borderColor: 'terminal.accent',
      _hover: {
        bg: 'terminal.accent',
        color: 'terminal.bg',
      },
    },
  },
});

const Link = defineStyleConfig({
  baseStyle: {
    color: 'terminal.accent',
    _hover: {
      textDecoration: 'none',
      color: 'terminal.success',
    },
    _after: {
      display: 'none', // This will hide the external link icon
    },
  },
});

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    terminal: {
      bg: '#1a1b26',
      text: '#a9b1d6',
      accent: '#7aa2f7',
      secondary: '#414868',
      success: '#9ece6a',
      error: '#f7768e',
      warning: '#e0af68',
      muted: '#565f89',
    },
  },
  fonts: {
    heading: '"JetBrains Mono", monospace',
    body: '"JetBrains Mono", monospace',
  },
  styles: {
    global: {
      body: {
        bg: 'terminal.bg',
        color: 'terminal.text',
      },
    },
  },
  components: {
    Button,
    Link,
  },
});

export default theme;