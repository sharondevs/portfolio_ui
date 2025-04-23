import { Box } from '@chakra-ui/react';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import React, { ReactNode, useRef } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
}

interface ScrollSectionProps {
  children: ReactNode;
  id: string;
}

export const ScrollSection = ({ children, id }: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  }) as { scrollYProgress: MotionValue<number> };

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
        px={4}
        position="relative"
      >
        {children}
      </Box>
    </motion.div>
  );
};

const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={containerRef}
      position="relative"
    >
      {children}
    </Box>
  );
};

export default ScrollContainer; 