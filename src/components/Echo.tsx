import {
  Box,
  IconButton,
  Circle,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EchoIcon from './EchoIcon';

const MotionCircle = motion(Circle);

const Echo = () => {
  const navigate = useNavigate();

  const handleVoiceButtonClick = () => {
    navigate('/echo-chat');
  };

  return (
    <>
      {/* Floating Button */}
      <Box
        position="fixed"
        bottom="2rem"
        right="2rem"
        zIndex={999}
      >
        <MotionCircle
          as={IconButton}
          size="60px"
          aria-label="Open Echo Assistant"
          icon={<EchoIcon />}
          bg="rgba(15, 10, 60, 0.8)"
          boxShadow="0 0 20px rgba(96, 165, 250, 0.3)"
          _hover={{ transform: 'scale(1.05)' }}
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
      </Box>
    </>
  );
};

export default Echo; 