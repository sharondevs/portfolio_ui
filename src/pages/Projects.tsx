import { Box, SimpleGrid, Text, Heading, Link, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

const ProjectCard = ({ title, description, technologies, link }: ProjectCardProps) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    p={6}
    border="1px solid"
    borderColor="terminal.accent"
    borderRadius="4px"
    _hover={{
      transform: 'translateY(-4px)',
      transition: 'all 0.2s',
      borderColor: 'terminal.success',
    }}
  >
    <Link href={link} isExternal color="terminal.accent" _hover={{ textDecoration: 'none' }}>
      <Heading size="md" mb={3} color="terminal.success">
        {title}
      </Heading>
    </Link>
    <Text color="terminal.text" mb={4}>
      {description}
    </Text>
    <Wrap spacing={2}>
      {technologies.map((tech, index) => (
        <WrapItem key={index}>
          <Tag
            size="sm"
            bg="terminal.secondary"
            color="terminal.text"
            borderRadius="full"
          >
            {tech}
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  </MotionBox>
);

const Projects = () => {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with real-time inventory management and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://github.com/username/ecommerce',
    },
    {
      title: 'Task Management System',
      description: 'A collaborative task management system with real-time updates and team features.',
      technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'WebSocket'],
      link: 'https://github.com/username/task-manager',
    },
    {
      title: 'AI Content Generator',
      description: 'An AI-powered content generation tool using natural language processing.',
      technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
      link: 'https://github.com/username/ai-content',
    },
    {
      title: 'Analytics Dashboard',
      description: 'A real-time analytics dashboard with customizable widgets and data visualization.',
      technologies: ['Vue.js', 'D3.js', 'Express', 'Redis'],
      link: 'https://github.com/username/analytics',
    },
  ];

  return (
    <Box>
      <Box mb={8}>
        <Text color="terminal.muted" fontFamily="mono">
          $ ls -l
        </Text>
        <Text color="terminal.accent" fontFamily="mono">
          /projects
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Projects; 