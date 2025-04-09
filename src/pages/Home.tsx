import { Box, Text, VStack, Heading, List, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionText = motion(Text);
const MotionBox = motion(Box);

const Home = () => {
  return (
    <VStack spacing={8} alignItems="flex-start">
      <Box>
        <MotionText
          color="terminal.accent"
          fontFamily="mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to my portfolio
        </MotionText>
        <Heading
          size="2xl"
          mb={4}
          bgGradient="linear(to-r, terminal.accent, terminal.success)"
          bgClip="text"
        >
          Software Engineer
        </Heading>
        <Text color="terminal.text" fontSize="lg">
          4+ years of experience building modern web applications
        </Text>
      </Box>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Text color="terminal.muted" mb={2}>
          $ cat skills.txt
        </Text>
        <List spacing={2}>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Frontend Development: React, TypeScript, Next.js
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Backend Development: Node.js, Python, RESTful APIs
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Database: PostgreSQL, MongoDB, Redis
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> DevOps: Docker, AWS, CI/CD
          </ListItem>
        </List>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Text color="terminal.muted" mb={2}>
          $ cat about.txt
        </Text>
        <Text color="terminal.text" lineHeight="tall">
          I'm a passionate software engineer with a focus on building scalable and maintainable applications.
          My experience spans across the full stack, from crafting beautiful user interfaces to designing
          robust backend systems. I love learning new technologies and solving complex problems.
        </Text>
      </MotionBox>
    </VStack>
  );
};

export default Home; 