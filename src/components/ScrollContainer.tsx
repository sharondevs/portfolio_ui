import { Box, useBreakpointValue } from '@chakra-ui/react';
import { motion, useScroll, useTransform, PanInfo, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ScrollContainerProps {
  children: ReactNode;
}

interface ScrollSectionProps {
  children: ReactNode;
  id: string;
}

const ROUTES = ['', 'experience', 'education', 'projects', 'resume', 'contact'];

export const ScrollSection = ({ children, id }: ScrollSectionProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    { stiffness: 65, damping: 13 }
  );

  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]),
    { stiffness: 65, damping: 13 }
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{
        opacity,
        y,
        width: "100%",
      }}
    >
      <Box
        id={id}
        minH="100vh"
        width="100%"
        py={10}
        px={isMobile ? 4 : 4}
        position="relative"
      >
        <Box
          bg="terminal.bg"
          borderRadius={isMobile ? "2xl" : "none"}
          overflow="hidden"
          boxShadow={isMobile ? "xl" : "none"}
          border={isMobile ? "1px solid" : "none"}
          borderColor="terminal.accent"
          p={isMobile ? 6 : 0}
          transform={isMobile ? "scale(0.98)" : "none"}
          transition="transform 0.2s"
          _hover={isMobile ? { transform: "scale(0.99)" } : {}}
        >
          {children}
        </Box>
      </Box>
    </motion.div>
  );
};

const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    const path = location.pathname.slice(1); // Remove leading slash
    return Math.max(0, ROUTES.indexOf(path));
  });

  useEffect(() => {
    const path = location.pathname.slice(1);
    const index = Math.max(0, ROUTES.indexOf(path));
    setCurrentPageIndex(index);
  }, [location]);

  const handleDragStart = () => {
    if (isMobile) {
      setIsDragging(true);
    }
  };

  const navigateToPage = (index: number) => {
    const newPath = ROUTES[index];
    navigate(`/${newPath}`);
    setCurrentPageIndex(index);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isMobile) {
      setIsDragging(false);
      const velocity = info.velocity.y;
      const offset = info.offset.y;

      if (Math.abs(velocity) > 100 || Math.abs(offset) > 50) {
        const direction = velocity < 0 || offset < 0 ? 1 : -1;
        const newIndex = Math.min(
          Math.max(0, currentPageIndex + direction),
          ROUTES.length - 1
        );

        if (newIndex !== currentPageIndex) {
          navigateToPage(newIndex);
        }
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      drag={isMobile ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
};

export default ScrollContainer; 