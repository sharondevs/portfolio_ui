import { Box, VStack, Text, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just show a success message
    toast({
      title: 'Message sent!',
      description: 'Thank you for reaching out. I will get back to you soon.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
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