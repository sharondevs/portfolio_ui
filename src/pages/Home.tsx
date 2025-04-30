import { Box, Text, VStack, Heading, List, ListItem, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg';

const MotionText = motion(Text);
const MotionBox = motion(Box);

const Home = () => {
  return (
    <VStack spacing={8} alignItems="flex-start">
      <Box 
      display="flex" 
      alignItems="center" 
      gap={8} 
      flexDir={{ base: "column", md: "row" }}  // Changed from flexWrap to flexDir
      width="full"
      >
        <Box flex={{ base: "1", md: "2" }}>
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
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          borderWidth="2px"
          borderColor="terminal.accent"
          borderRadius="md"
          overflow="hidden"
          position="relative"
          width={{ base: "full", md: "300px" }}
          height={{ base: "300px", md: "300px" }}
          
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            p={2}
            bg="terminal.bg"
            borderBottom="2px"
            borderColor="terminal.accent"
          >
            <Text color="terminal.muted" fontSize="sm" fontFamily="mono">
              $ display profile.jpg
            </Text>
          </Box>
          <Image src={profileImage} alt="Profile Photo" objectFit="cover" width="full" height="full" mt="40px" />
        </MotionBox>
      </Box>
     

      <MotionBox
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Text color="terminal.muted" mb={2}>
          $ cat about.txt
        </Text>
        <Text color="terminal.text" lineHeight="tall">
          I'm a passionate software engineer with a focus on building scalable and maintainable applications.
          My experience spans working on full-stack web-apps, from enabling rich UXs to designing
          robust backend systems. I love indulging in new tech and solving complex problems by building impactful tools.
        </Text>
      </MotionBox>
      <MotionBox
        
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
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
    </VStack>
  );
};

export default Home;