import { Box, Container, Flex, Link, Text, useColorModeValue, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, VStack } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Echo from './Echo';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const HEADER_HEIGHT = 80; // Height of the header in pixels

// Throttle function to limit the rate of function calls
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const borderColor = useColorModeValue('terminal.accent', 'terminal.accent');
  const lastScrollY = useRef(0);
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimer = useRef<number | null>(null);
  const prevLocationRef = useRef(location.pathname);
  const [activeSection, setActiveSection] = useState(location.pathname);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleScroll = useCallback(throttle(() => {
    const currentScrollY = window.scrollY;
    
    if (isNavigating || currentScrollY < lastScrollY.current || currentScrollY < 50) {
      setShouldShowHeader(true);
    } else if (!isNavigating && currentScrollY > lastScrollY.current && currentScrollY > 50) {
      setShouldShowHeader(false);
    }
    
    lastScrollY.current = currentScrollY;
  }, 100), [isNavigating]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId === 'home' ? '/' : `/${sectionId}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    const sections = ['home', 'experience', 'education', 'projects', 'resume', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Skip if we're already on this location
    if (activeSection === location.pathname) {
      return;
    }
    
    setShouldShowHeader(true);
    setIsNavigating(true);

    if (navigationTimer.current) {
      clearTimeout(navigationTimer.current);
    }

    const sectionId = location.pathname.slice(1) || 'home';
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const isScrollingUp = rect.top < 0;
      const elementPosition = window.pageYOffset + rect.top;
      
      window.scrollTo({
        top: isScrollingUp ? elementPosition : elementPosition - HEADER_HEIGHT - 20,
        behavior: 'smooth'
      });
    }

    // Update the previous location reference
    prevLocationRef.current = location.pathname;

    navigationTimer.current = window.setTimeout(() => {
      setIsNavigating(false);
    }, 1000);

    return () => {
      if (navigationTimer.current) {
        clearTimeout(navigationTimer.current);
      }
    };
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = useCallback((path: string) => {
    setIsNavigating(true);
    setShouldShowHeader(true);
    setActiveSection(path);  // Set active section immediately
    const sectionId = path === '/' ? 'home' : path.slice(1);
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const isScrollingUp = rect.top < 0;
      const elementPosition = window.pageYOffset + rect.top;
      
      window.scrollTo({
        top: isScrollingUp ? elementPosition : elementPosition - HEADER_HEIGHT - 20,
        behavior: 'smooth'
      });
    }
    onClose();
  }, [onClose, HEADER_HEIGHT]);

  const navItems = [
    { path: '/', label: '~/home' },
    { path: '/experience', label: '~/experience' },
    { path: '/education', label: '~/education' },
    { path: '/projects', label: '~/projects' },
    { path: '/resume', label: '~/resume' },
    { path: '/contact', label: '~/contact' },
  ];

  return (
    <Box minH="100vh" bg="terminal.bg">
      <MotionFlex
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        height={`${HEADER_HEIGHT}px`}
        zIndex={1000}
        bg="terminal.bg"
        animate={{
          y: shouldShowHeader ? 0 : -HEADER_HEIGHT,
        }}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: "easeOut"
        }}
      >
        <Container maxW={{ base: "90%", md: "85%", lg: "85%" }} h="100%" py={4}>
          <Flex
            flexDir="row"
            alignItems="center"
            justify="space-between"
            borderBottom="1px solid"
            borderColor={borderColor}
            pb={4}
            h="100%"
          >
            <Text
              fontSize="lg"
              fontFamily="mono"
              color="terminal.accent"
            >
              sharon@portfolio:~$
            </Text>

            {/* Desktop Navigation */}
            <Flex display={{ base: 'none', md: 'flex' }} gap={6}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  color={activeSection === item.path ? 'terminal.success' : 'terminal.text'}
                  position="relative"
                  _hover={{ color: 'terminal.accent' }}
                  onClick={() => handleNavClick(item.path)}
                >
                  {activeSection === item.path && (
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

            {/* Mobile Hamburger */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
              color="terminal.accent"
              _hover={{ bg: 'terminal.secondary' }}
            />
          </Flex>
        </Container>
      </MotionFlex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="terminal.bg">
          <DrawerCloseButton color="terminal.accent" marginTop="8px"/>
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            <Text color="terminal.accent" fontFamily="mono">Navigation</Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  color={activeSection === item.path ? 'terminal.success' : 'terminal.text'}
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: 'terminal.secondary', color: 'terminal.accent' }}
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.label}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container maxW={{ base: "100%", md: "85%", lg: "85%" }} pt={`${HEADER_HEIGHT - 35}px`} px={{ base: 0, md: 4 }}>
        <Box as="main" pb={16}>
          {children}
        </Box>
      </Container>

      {/* Add Echo component */}
      <Echo />
    </Box>
  );
};

export default Layout; 