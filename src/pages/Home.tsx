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
          3+ years of expertise building scalable modern web-apps.
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
            <Text as="span" color="terminal.success">→</Text> Frontend Development: ReactJS, JS, CSS
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Backend Development: Flask, ElasticSearch, Spring Boot(JavaEE), Spring Sec, REST API
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Mobile: FlutterFlow, Flutter
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Database: PostgreSQL, MongoDB, PineconeDB, Redis
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> DevOps: Docker, AWS, CI/CD
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> ML&Ops: LangChain, PyTorch
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
          My experience spans working on full-stack web-apps, from enabling rich UXs to designing
          robust backend systems. I love indulging in new tech and solving complex problems by building impactful tools.
          <br />
          <br />
          Feel free to reach out to put my expertise to the test! 
        </Text>
      </MotionBox>
    </VStack>
  );
};

export default Home; 