import { Box, Text, VStack, Heading, List, ListItem, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.png';

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
          <Box display="flex" alignItems="center">
            <MotionText
              fontFamily="heading"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="wider"
              bgGradient="linear(to-r, pink.400, purple.500)"
              bgClip="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Hi! I'm Sharon
            </MotionText>
            <MotionText
              fontSize="2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              ml={2}
            >
              👋
            </MotionText>
          </Box>
          <Heading
            size="2xl"
            mb={4}
            bgGradient="linear(to-r, terminal.accent, terminal.success)"
            bgClip="text"
          >
            Software Engineer
          </Heading>
          <Text color="terminal.text" fontSize="lg">
            Building scalable, AI-native systems — agentic backends, RAG, and full-stack products.
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
          height={{ base: "400px", md: "300px" }}  // Increased height for mobile
          
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
              $ display profile.png
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
          I'm a software engineer focused on building scalable, production-grade systems — increasingly at the
          intersection of AI and infrastructure. My experience spans full-stack web apps and Golang microservices to
          agentic LLM systems (MCP, RAG, multi-model inference) and observability. I love diving into new tech and
          solving complex problems by shipping impactful tools.
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
            <Text as="span" color="terminal.success">→</Text> Languages: TypeScript, Go, Python, Java, Dart, SQL
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> AI / Agentic: MCP, LLM inference (vLLM, OpenAI-compatible APIs), RAG, ReAct agents, LangChain, LlamaIndex
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Frontend: React, Next.js, TypeScript
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Backend: Golang, FastAPI, Spring Boot, REST, Kafka, n8n
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Data: PostgreSQL, MongoDB, Pinecone, Elasticsearch, Redis
          </ListItem>
          <ListItem color="terminal.text">
            <Text as="span" color="terminal.success">→</Text> Cloud / DevOps: Azure, GCP, Docker, GitHub Actions, Prometheus, Grafana
          </ListItem>
        </List>
      </MotionBox>
    </VStack>
  );
};

export default Home;