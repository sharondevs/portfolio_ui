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

const Card = defineStyleConfig({
  baseStyle: {
    container: {
      bg: 'terminal.secondary',
      borderColor: 'terminal.muted',
      borderWidth: '1px',
      borderRadius: 'md',
    },
  },
  variants: {
    echo: {
      container: {
        bg: 'terminal.secondary',
        borderColor: 'terminal.accent',
        borderWidth: '1px',
        borderRadius: 'md',
        boxShadow: '0 0 10px rgba(122, 162, 247, 0.1)',
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
      cardBg: '#24283b',
      inputBg: '#1f2335',
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
      // Global styles for ReactMarkdown content
      '.markdown-content': {
        h1: {
          fontSize: 'xl',
          fontWeight: 'bold',
          mb: 3,
          color: 'terminal.accent',
        },
        h2: {
          fontSize: 'lg',
          fontWeight: 'bold',
          mb: 2,
          color: 'terminal.accent',
        },
        h3: {
          fontSize: 'md',
          fontWeight: 'bold',
          mb: 2,
          color: 'terminal.accent',
        },
        p: {
          mb: 2,
          lineHeight: '1.6',
        },
        ul: {
          mb: 2,
          pl: 4,
        },
        ol: {
          mb: 2,
          pl: 4,
        },
        li: {
          mb: 1,
        },
        code: {
          bg: 'terminal.inputBg',
          color: 'terminal.accent',
          px: 1,
          py: 0.5,
          borderRadius: 'sm',
          fontSize: 'sm',
        },
        pre: {
          bg: 'terminal.inputBg',
          p: 3,
          borderRadius: 'md',
          overflow: 'auto',
          mb: 3,
          code: {
            bg: 'transparent',
            p: 0,
          },
        },
        blockquote: {
          borderLeft: '4px solid',
          borderColor: 'terminal.accent',
          pl: 4,
          ml: 0,
          fontStyle: 'italic',
          color: 'terminal.muted',
        },
      },
    },
  },
  components: {
    Button,
    Card,
    Link,
  },
});

export default theme;