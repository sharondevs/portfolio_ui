import { Box, VStack, Text, Heading, Flex, Image, HStack, Icon, useColorModeValue, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaBook } from 'react-icons/fa';

import universityBuffaloLogo from '../assets/university_buffalo.png';
import cochinUniversityLogo from '../assets/cochin_university.png';

const MotionBox = motion(Box);

type University = 'University at Buffalo - SUNY' | 'Cochin University';

interface EducationItemProps {
  university: University;
  degree: string;
  period: string;
  location: string;
  gpa: string;
  coursework: string[];
  logoUrl: string;
}

const CourseTag = ({ course }: { course: string }) => {
  return (
    <Badge
      bg="transparent"
      color="terminal.accent"
      border="1px solid"
      borderColor="terminal.accent"
      borderRadius="md"
      px={4}
      height="32px"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      fontSize="sm"
      fontWeight="normal"
      whiteSpace="nowrap"
      _hover={{ bg: 'terminal.accent', color: 'white' }}
      transition="all 0.2s"
    >
      {course}
    </Badge>
  );
};

const EducationItem = ({
  university,
  degree,
  period,
  location,
  gpa,
  coursework,
  logoUrl
}: EducationItemProps) => {
  const bgColor = useColorModeValue('whiteAlpha.900', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mb={8}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      position="relative"
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s ease' }}
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="start">
        <Box mr={{ base: 0, md: 6 }} mb={{ base: 4, md: 0 }} flexShrink={0}>
          <Image
            src={logoUrl}
            alt={`${university} logo`}
            boxSize="60px"
            objectFit="contain"
            borderRadius="md"
            bg="white"
            p={2}
          />
        </Box>

        <Box flex="1">
          <Heading size="md" color="terminal.success" mb={2}>
            {degree}
          </Heading>
          
          <HStack spacing={4} mb={3}>
            <HStack color="terminal.accent">
              <Icon as={FaGraduationCap} />
              <Text>{university}</Text>
            </HStack>
            
            <HStack color="terminal.muted">
              <Icon as={FaCalendarAlt} />
              <Text fontSize="sm">{period}</Text>
            </HStack>

            <HStack color="terminal.muted">
              <Icon as={FaMapMarkerAlt} />
              <Text fontSize="sm">{location}</Text>
            </HStack>
          </HStack>

          <HStack spacing={2} mb={4}>
            <Text color="terminal.text" fontWeight="bold">
              Cumulative GPA:
            </Text>
            <Text color="terminal.accent">{gpa}</Text>
          </HStack>

          <Box mt={4}>
            <HStack mb={2}>
              <Icon as={FaBook} color="terminal.muted" />
              <Text color="terminal.muted" fontSize="sm" fontWeight="medium">
                Relevant Coursework
              </Text>
            </HStack>
            <Flex flexWrap="wrap" gap={3}>
              {coursework.map((course, index) => (
                <CourseTag key={index} course={course} />
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </MotionBox>
  );
};

const Education = () => {
  const educations: EducationItemProps[] = [
    {
      university: 'University at Buffalo - SUNY',
      degree: 'Masters in Computer Science (Specialization in AI/ML)',
      period: 'August 2024 - present',
      location: 'New York, United States',
      gpa: '3.7/4',
      coursework: [
        'Machine Learning',
        'Deep Learning',
        'Data Modeling and Query Language',
        'Algorithms'
      ],
      logoUrl: universityBuffaloLogo
    },
    {
      university: 'Cochin University',
      degree: 'Bachelor of Technology in Electronics and Communication',
      period: 'June 2017 - May 2021',
      location: 'Kerala, India',
      gpa: '9.36/10',
      coursework: [
        'Computer Architecture',
        'Object Oriented Programming',
        'Embedded Systems',
        'Discrete Mathematics'
      ],
      logoUrl: cochinUniversityLogo
    }
  ];

  return (
    <Box>
      <Flex alignItems="center" mb={8}>
        <Text color="terminal.muted" fontFamily="mono">
          $ ls -l
        </Text>
        <Text color="terminal.accent" ml={2} fontFamily="mono">
          /education
        </Text>
      </Flex>
      
      <VStack spacing={6} alignItems="stretch">
        {educations.map((edu, index) => (
          <EducationItem
            key={index}
            {...edu}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Education; 