import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  VStack,
  useDisclosure,
  Circle,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import EchoIcon from './EchoIcon';

const MotionBox = motion(Box);
const MotionCircle = motion(Circle);

const Echo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isListening, setIsListening] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isListening) {
      interval = setInterval(() => {
        setWaveform(Array.from({ length: 30 }, () => Math.random() * 40 + 10));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleVoiceButtonClick = () => {
    onOpen();
    setIsListening(true);
  };

  const handleClose = () => {
    setIsListening(false);
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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

      {/* Chat Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}
        isCentered
        motionPreset="scale"
        closeOnOverlayClick={true}
        blockScrollOnMount={false}
      >
        <ModalOverlay 
          bg="rgba(15, 10, 60, 0.4)"
          backdropFilter="blur(8px)"
        />
        <ModalContent
          maxW="100vw"
          h="100vh"
          m="0"
          bg="transparent"
          boxShadow="none"
          onClick={handleClose}
          sx={{
            WebkitTapHighlightColor: 'transparent',
            '&:focus': {
              outline: 'none',
            },
            '& *': {
              WebkitTapHighlightColor: 'transparent',
            }
          }}
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            onClick={handleContentClick}
          >
            <VStack 
              spacing={8} 
              justify="center"
              sx={{
                WebkitTapHighlightColor: 'transparent',
                '&:focus': {
                  outline: 'none',
                }
              }}
            >
              {/* Animated Orb */}
              <MotionBox
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Circle
                  size="200px"
                  bg="rgba(15, 10, 60, 0.6)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="rgba(96, 165, 250, 0.3)"
                  position="relative"
                  overflow="hidden"
                  boxShadow="0 0 30px rgba(96, 165, 250, 0.2)"
                  _focus={{ outline: 'none' }}
                  sx={{
                    WebkitTapHighlightColor: 'transparent',
                    '&:focus': {
                      outline: 'none',
                    }
                  }}
                >
                  <EchoIcon />
                </Circle>
              </MotionBox>

              {/* Status Text */}
              <Text
                color="white"
                fontSize="xl"
                fontWeight="medium"
                textAlign="center"
                textShadow="0 0 10px rgba(0,0,0,0.3)"
                sx={{
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                {isListening ? "Listening..." : "Tap to speak"}
              </Text>
            </VStack>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Echo; 