import { Box, VStack, Text, Input, Textarea, Button, useToast, Flex, Link, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const MotionBox = motion(Box);

const SocialLink = ({ icon, href, label }: { icon: React.ElementType; href: string; label: string }) => {
  const bgColor = useColorModeValue('whiteAlpha.900', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mb={4}
    >
      <Link href={href} isExternal _hover={{ textDecoration: 'none' }}>
        <Flex
          alignItems="center"
          p={4}
          borderRadius="md"
          bg="terminal.secondary"
          border="1px solid"
          borderColor="terminal.accent"
          _hover={{ 
            bg: 'terminal.bg', 
            borderColor: 'terminal.success',
            transform: 'translateY(-2px)',
            boxShadow: 'md'
          }}
          transition="all 0.2s"
        >
          <Icon as={icon} color="terminal.accent" boxSize={6} mr={3} />
          <Box>
            <Text color="terminal.muted" fontSize="sm" fontFamily="mono">
              $ connect --using
            </Text>
            <Text color="terminal.success" fontWeight="bold">
              {label}
            </Text>
          </Box>
        </Flex>
      </Link>
    </MotionBox>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the mailto URL with form data
    const mailtoUrl = `mailto:sharon.devs99@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
      `\n${formData.message}`
    )}`;
    
    window.location.href = mailtoUrl;
    
    // Show success message
    toast({
      title: 'Opening email client',
      description: 'Your default email application will open with the message.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Reset the form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box maxW="600px">
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        mb={8}
      >
        <Text color="terminal.muted" fontFamily="mono">
          $ contact --init
        </Text>
        <Text color="terminal.text" mt={4}>
          Feel free to reach out for collaboration, opportunities, or just to say hi!
        </Text>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        mb={8}
      >
        <Text color="terminal.muted" fontFamily="mono" mb={4}>
          $ find --social-profiles
        </Text>
        
        <VStack spacing={3} align="stretch">
          <SocialLink 
            icon={FaGithub} 
            href="https://github.com/sharondevs" 
            label="GitHub"
          />
          <SocialLink 
            icon={FaLinkedin} 
            href="https://www.linkedin.com/in/sharon-dev-s-8897a659/" 
            label="LinkedIn"
          />
        </VStack>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        mt={10}
        mb={6}
      >
        <Text color="terminal.muted" fontFamily="mono">
          $ contact --message
        </Text>
      </MotionBox>

      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Box>
            <Text color="terminal.muted" mb={2}>
              $ name="your name"
            </Text>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              bg="terminal.secondary"
              border="1px solid"
              borderColor="terminal.accent"
              color="terminal.text"
              _hover={{ borderColor: 'terminal.success' }}
              _focus={{ borderColor: 'terminal.success', boxShadow: 'none' }}
              required
            />
          </Box>

          <Box>
            <Text color="terminal.muted" mb={2}>
              $ email="your@email.com"
            </Text>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              bg="terminal.secondary"
              border="1px solid"
              borderColor="terminal.accent"
              color="terminal.text"
              _hover={{ borderColor: 'terminal.success' }}
              _focus={{ borderColor: 'terminal.success', boxShadow: 'none' }}
              required
            />
          </Box>

          <Box>
            <Text color="terminal.muted" mb={2}>
              $ echo "your message" {'>'} message.txt
            </Text>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              bg="terminal.secondary"
              border="1px solid"
              borderColor="terminal.accent"
              color="terminal.text"
              _hover={{ borderColor: 'terminal.success' }}
              _focus={{ borderColor: 'terminal.success', boxShadow: 'none' }}
              minH="150px"
              required
            />
          </Box>

          <Button
            type="submit"
            bg="terminal.accent"
            color="terminal.bg"
            _hover={{ bg: 'terminal.success' }}
            _active={{ bg: 'terminal.success' }}
            fontFamily="mono"
          >
            $ send_message.sh
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Contact; 