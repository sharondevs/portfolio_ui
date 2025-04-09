import { Box, VStack, Text, Heading, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ExperienceItem = ({ 
  role, 
  company, 
  period, 
  description 
}: { 
  role: string;
  company: string;
  period: string;
  description: string;
}) => (
  <MotionBox
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    mb={8}
    position="relative"
    _before={{
      content: '""',
      position: 'absolute',
      left: '-20px',
      top: '0',
      bottom: '0',
      width: '2px',
      bg: 'terminal.accent',
      opacity: 0.3,
    }}
  >
    <Text color="terminal.muted" fontSize="sm" mb={1}>
      {period}
    </Text>
    <Heading size="md" color="terminal.success" mb={2}>
      {role}
    </Heading>
    <Text color="terminal.accent" mb={3}>
      {company}
    </Text>
    <Text color="terminal.text">
      {description}
    </Text>
  </MotionBox>
);

const Experience = () => {
  const experiences = [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Led development of microservices architecture, mentored junior developers, and implemented CI/CD pipelines. Reduced deployment time by 40% and improved system reliability.',
    },
    {
      role: 'Full Stack Developer',
      company: 'Digital Innovations Ltd.',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using React, Node.js, and AWS. Implemented real-time features and optimized application performance.',
    },
    {
      role: 'Software Developer',
      company: 'StartUp Technologies',
      period: '2019 - 2020',
      description: 'Built and launched MVP products for startups. Worked with React, TypeScript, and Python. Collaborated closely with product teams to deliver features on time.',
    },
  ];

  return (
    <Box>
      <Flex alignItems="center" mb={8}>
        <Text color="terminal.muted" fontFamily="mono">
          $ ls -l
        </Text>
        <Text color="terminal.accent" ml={2} fontFamily="mono">
          /experience
        </Text>
      </Flex>
      
      <VStack spacing={4} alignItems="stretch" pl={5}>
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            role={exp.role}
            company={exp.company}
            period={exp.period}
            description={exp.description}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Experience; 