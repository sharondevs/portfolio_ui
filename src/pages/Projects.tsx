import { Box, Text, Heading, Link, Tag, Wrap, WrapItem, VStack, HStack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const MotionBox = motion(Box);

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  status?: 'completed' | 'in-progress' | 'planned';
  demoLink?: string;
}

const ProjectCard = ({ title, description, technologies, link, status = 'completed', demoLink }: ProjectCardProps) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    p={6}
    border="1px solid"
    borderColor="terminal.accent"
    borderRadius="md"
    position="relative"
    bg="terminal.bg"
    _hover={{
      transform: 'translateY(-4px)',
      transition: 'all 0.2s',
      borderColor: 'terminal.success',
    }}
  >
    <VStack align="stretch" spacing={4}>
      <Box>
        <HStack justify="space-between" align="flex-start" mb={2}>
          <Heading size="md" color="terminal.success">
            {title}
          </Heading>
          <HStack spacing={3}>
            {link && (
              <Link href={link} isExternal _hover={{ color: 'terminal.success' }}>
                <Icon as={FaGithub} boxSize={5} />
              </Link>
            )}
            {demoLink && (
              <Link href={demoLink} isExternal _hover={{ color: 'terminal.success' }}>
                <Icon as={FaExternalLinkAlt} boxSize={4} />
              </Link>
            )}
          </HStack>
        </HStack>
        
        <Tag
          size="sm"
          colorScheme={
            status === 'completed' ? 'green' : 
            status === 'in-progress' ? 'yellow' : 
            'gray'
          }
          mb={3}
        >
          {status}
        </Tag>
      </Box>

      <Text color="terminal.text" fontSize="sm" lineHeight="tall">
        {description}
      </Text>

      <Box>
        <Text color="terminal.muted" fontSize="xs" mb={2}>
          $ tech stack
        </Text>
        <Wrap spacing={2}>
          {technologies.map((tech, index) => (
            <WrapItem key={index}>
              <Tag
                size="sm"
                bg="terminal.secondary"
                color="terminal.text"
                borderRadius="full"
                px={3}
                fontSize="xs"
              >
                {tech}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </VStack>
  </MotionBox>
);

const Projects = () => {
  const projects = [
    {
      title: 'ECHO',
      description: 'Coming soon!',
      technologies: ['Agentic', 'Reasoning', 'Chain-of-Thought', '*****'],
      status: 'in-progress' as const,
      link: 'https://github.com/yourusername/echo-chat',
      demoLink: '',
    },
    {
      title: 'ECHO-chat',
      description: 'Engaged Conversation with Human Oversight (ECHO) chat is a responsive chatbot powered by large language model, designed for natural, context-aware conversations across a wide range of topics.',
      technologies: [ 'LLM','Chain-of-Thought', 'Ollama', 'HuggingFace'],
      status: 'in-progress' as const,
      link: 'https://github.com/yourusername/portfolio-ui',
      demoLink: '',
    },
    {
      title: 'Visual Question Answering (VQA)',
      description: 'An assistive VQA system built using CLIP to answer natural language questions about real-world images from the VizWiz dataset. Combines computer vision and language understanding for accessibility-focused AI.',
      technologies: ['Pytorch', 'Transformers', 'OpenAI CLIP', 'Python'],
      status: 'completed' as const,
      link: 'https://github.com/sharondevs/VQA_bot',
      demoLink: '',
    },
    {
      title: 'Data Augmentation using DCGANs',
      description: 'A Deep Convolutional GAN implementation for medical image synthesis. Generates realistic chest X-ray images to enhance training datasets, improving medical image classification models.',
      technologies: ['Pytorch', 'GANs', 'pandas', 'Computer Vision'],
      status: 'completed' as const,
      link: 'https://github.com/sharondevs/DCGAN',
      demoLink: '',
    }
  ];

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Text color="terminal.muted" fontFamily="mono">
          $ ls -l
        </Text>
        <Text color="terminal.accent" fontFamily="mono" mb={4}>
          /projects
        </Text>
        <Text color="terminal.text" fontSize="sm">
          A collection of projects I've worked on. Each project is a learning experience and a step forward in my journey.
        </Text>
      </Box>

      <VStack spacing={6} align="stretch">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </VStack>
    </VStack>
  );
};

export default Projects;