import { Box, useBreakpointValue } from '@chakra-ui/react';
import { motion, useScroll, useTransform, MotionValue, PanInfo, useMotionValue, useSpring } from 'framer-motion';
import React, { ReactNode, useRef, useState, useEffect } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
}

interface ScrollSectionProps {
  children: ReactNode;
  id: string;
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    if (isMobile) {
      setIsDragging(true);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isMobile) {
      setIsDragging(false);
      const scrollThreshold = 50;
      const velocity = info.velocity.y;
      const offset = info.offset.y;

      if (Math.abs(velocity) > 100 || Math.abs(offset) > scrollThreshold) {
        const direction = velocity < 0 || offset < 0 ? 1 : -1;
        const currentScroll = window.scrollY;
        const viewportHeight = window.innerHeight;
        const targetScroll = currentScroll + (direction * viewportHeight);

        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
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