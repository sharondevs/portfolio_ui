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
      title: 'ECHO-chat',
      description: 'TBD..',
      technologies: [],
      // link: '',
    },
    {
      title: 'Visual Question Answering (VQA)',
      description: 'A collaborative task management system with real-time updates and team features.',
      technologies: ['Pytorch', 'Transformers', 'OpenAI CLIP'],
      link: 'https://github.com/sharondevs/VQA_bot',
    },
    {
      title: 'Data Augmentation using DCGANs',
      description: 'Implemented a Deep Convolutional Generative Adversarial Network (DCGAN) for medical image data augmentation. The model generates synthetic chest X-ray images to enhance training datasets, based on the original 2016 paper by Alec Radford et al. Features include strided convolutions, LeakyReLU activation, and BatchNorm layers.',
      technologies: ['Pytorch', 'GANs', 'pandas', 'Computer Vision'],
      link: 'https://github.com/sharondevs/DCGAN',
    },
    {
      title: 'TBD',
      description: '',
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