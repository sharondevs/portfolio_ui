import { Box, Container, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const borderColor = useColorModeValue('terminal.accent', 'terminal.accent');

  const navItems = [
    { path: '/', label: '~/home' },
    { path: '/experience', label: '~/experience' },
    { path: '/projects', label: '~/projects' },
    { path: '/contact', label: '~/contact' },
  ];

  return (
    <Box minH="100vh" bg="terminal.bg">
      <Container maxW="container.lg" pt={8}>
        <Flex
          as="header"
          borderBottom="1px solid"
          borderColor={borderColor}
          pb={4}
          mb={8}
          flexDir={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'flex-start', md: 'center' }}
          gap={4}
        >
          <Text
            fontSize="lg"
            fontFamily="mono"
            color="terminal.accent"
            mr={8}
          >
            guest@portfolio:~$
          </Text>
          <Flex gap={6} flexWrap="wrap">
            {navItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                color={location.pathname === item.path ? 'terminal.success' : 'terminal.text'}
                position="relative"
                _hover={{ color: 'terminal.accent' }}
              >
                {location.pathname === item.path && (
                  <MotionBox
                    layoutId="active"
                    position="absolute"
                    bottom="-1px"
                    left="0"
                    right="0"
                    height="2px"
                    bg="terminal.accent"
                  />
                )}
                {item.label}
              </Link>
            ))}
          </Flex>
        </Flex>
        <Box as="main" pb={16}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout; 