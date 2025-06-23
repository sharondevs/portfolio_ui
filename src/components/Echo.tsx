import {
  Box,
  IconButton,
  Circle,
  Text,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EchoIcon from './EchoIcon';

const MotionCircle = motion(Circle);
const MotionBox = motion(Box);

const Echo = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleVoiceButtonClick = () => {
    navigate('/echo-chat');
  };

  return (
    <>
      {/* Floating Button with Label */}
      <Box
        position="fixed"
        bottom="2rem"
        right="2rem"
        zIndex={999}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <HStack spacing={4} align="center">
          {/* Glass-like Label */}
          <MotionBox
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.9, 
              x: isHovered ? 0 : 10,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            bg="rgba(255, 255, 255, 0.03)"
            backdropFilter="blur(20px) saturate(180%)"
            borderRadius="xl"
            border="0.5px solid rgba(255, 255, 255, 0.08)"
            px={4}
            py={2}
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            _hover={{
              bg: "rgba(255, 255, 255, 0.06)",
              borderColor: "rgba(255, 255, 255, 0.12)",
              boxShadow: "0 12px 40px rgba(96, 165, 250, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
            }}
            cursor="pointer"
            onClick={handleVoiceButtonClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Text
              color="rgba(255, 255, 255, 0.9)"
              fontSize="sm"
              fontWeight="medium"
              fontFamily="mono"
              textShadow="0 1px 2px rgba(0, 0, 0, 0.3)"
              whiteSpace="nowrap"
            >
              I am ECHO 👋, Ask Me Anything!
            </Text>
          </MotionBox>

          {/* Echo Button */}
          <MotionCircle
            as={IconButton}
            size="60px"
            aria-label="Open Echo Assistant"
            icon={<EchoIcon />}
            bg="rgba(15, 10, 60, 0.8)"
            boxShadow="none"
            _hover={{ 
              transform: 'scale(1.05)',
              boxShadow: "0 0 30px rgba(96, 165, 250, 0.5)"
            }}
            _focus={{ boxShadow: 'none', outline: 'none' }}
            _active={{ outline: 'none' }}
            transition="all 0.2s"
            onClick={handleVoiceButtonClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              WebkitTapHighlightColor: 'transparent',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none',
              },
            }}
          />
        </HStack>
      </Box>
    </>
  );
};

export default Echo; 