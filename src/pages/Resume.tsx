import { Box, Button, Flex, Text, Icon, useColorModeValue, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf } from 'react-icons/fa';

const MotionBox = motion(Box);

const Resume = () => {
  const bgColor = useColorModeValue('whiteAlpha.900', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleDownload = () => {
    const resumeUrl = '../resume_sharon_june2025.pdf';
    window.open(resumeUrl, '_blank');
  };

  return (
    <Box>
      <Flex alignItems="center" mb={8}>
        <Text color="terminal.muted" fontFamily="mono">
          $ cat
        </Text>
        <Text color="terminal.accent" ml={2} fontFamily="mono">
          resume.pdf
        </Text>
      </Flex>

      <VStack spacing={8} align="stretch">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          p={6}
          borderRadius="xl"
          boxShadow="lg"
          bg={bgColor}
          border="1px"
          borderColor={borderColor}
        >
          <Flex 
            direction={{ base: "column", md: "row" }} 
            align="center" 
            justify="space-between"
            gap={4}
          >
            <Flex align="center" gap={3}>
              <Icon as={FaFilePdf} boxSize={8} color="terminal.accent" />
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" color="terminal.success" fontWeight="bold">
                  Sharon's Resume
                </Text>
                <Text fontSize="sm" color="terminal.muted">
                  Last updated: June 2025
                </Text>
              </VStack>
            </Flex>
            
            <Button
              leftIcon={<FaDownload />}
              onClick={handleDownload}
              variant="terminal"
              size="lg"
              _hover={{
                transform: 'translateY(-2px)',
                bg: 'terminal.accent',
                color: 'white'
              }}
            >
              Download Resume
            </Button>
          </Flex>
        </MotionBox>

        {/* PDF Preview Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          borderRadius="xl"
          overflow="hidden"
          height="800px"
          border="1px"
          borderColor={borderColor}
        >
          <iframe
            src="../resume_sharon_june2025.pdf#view=FitH"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="Resume Preview"
          />
        </MotionBox>
      </VStack>
    </Box>
  );
};

export default Resume; 