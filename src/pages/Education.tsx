import { Box, VStack, Text, Heading, Flex, Image, HStack, Icon, useColorModeValue, Badge, Grid, GridItem } from '@chakra-ui/react';
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
  isLeft?: boolean;
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
  logoUrl,
  isLeft = true
}: EducationItemProps) => {
  const bgColor = useColorModeValue('whiteAlpha.900', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Grid
      templateColumns="1fr auto 1fr"
      gap={4}
      alignItems="center"
      position="relative"
      mb={8}
    >
      {/* Left side content */}
      <GridItem colSpan={1} textAlign={isLeft ? "right" : "center"}>
        {isLeft && (
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
            _hover={{ transform: 'translateX(-5px)', transition: 'all 0.3s ease' }}
          >
            <Flex direction="column" align="end">
              <Image
                src={logoUrl}
                alt={`${university} logo`}
                boxSize="60px"
                objectFit="contain"
                borderRadius="md"
                bg="white"
                p={2}
                mb={4}
              />
              <Heading size="md" color="terminal.success" mb={2}>
                {degree}
              </Heading>
              <HStack spacing={2} mb={2} justify="flex-end">
                <Icon as={FaGraduationCap} color="terminal.accent" />
                <Text color="terminal.accent">{university}</Text>
              </HStack>
              <HStack spacing={2} mb={2} justify="flex-end">
                <Icon as={FaCalendarAlt} color="terminal.muted" />
                <Text fontSize="sm" color="terminal.muted">{period}</Text>
              </HStack>
              <HStack spacing={2} mb={4} justify="flex-end">
                <Icon as={FaMapMarkerAlt} color="terminal.muted" />
                <Text fontSize="sm" color="terminal.muted">{location}</Text>
              </HStack>
              <HStack spacing={2} mb={4} justify="flex-end">
                <Text color="terminal.text" fontWeight="bold">GPA:</Text>
                <Text color="terminal.accent">{gpa}</Text>
              </HStack>
              {/* <Box>
                <HStack mb={2} justify="flex-end">
                  <Icon as={FaBook} color="terminal.muted" />
                  <Text color="terminal.muted" fontSize="sm" fontWeight="medium">
                    Relevant Coursework
                  </Text>
                </HStack>
                <Flex flexWrap="wrap" gap={3} justify="flex-end">
                  {coursework.map((course, index) => (
                    <CourseTag key={index} course={course} />
                  ))}
                </Flex>
              </Box> */}
            </Flex>
          </MotionBox>
        )}
      </GridItem>

      {/* Timeline center */}
      <GridItem colSpan={1} justifySelf="center" height="100%">
        <Flex
          direction="column"
          alignItems="center"
          height="100%"
          position="relative"
        >
          <Box
            w="3px"
            h="100%"
            bg="terminal.accent"
            position="absolute"
            top="0"
            left="50%"
            transform="translateX(-50%)"
          />
          <Box
            w="15px"
            h="15px"
            borderRadius="full"
            bg="terminal.accent"
            border="3px solid"
            borderColor="terminal.bg"
            position="relative"
            zIndex={1}
          />
        </Flex>
      </GridItem>

      {/* Right side content */}
      <GridItem colSpan={1} textAlign={!isLeft ? "left" : "center"}>
        {!isLeft && (
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
            _hover={{ transform: 'translateX(5px)', transition: 'all 0.3s ease' }}
          >
            <Flex direction="column" align="start">
              <Image
                src={logoUrl}
                alt={`${university} logo`}
                boxSize="60px"
                objectFit="contain"
                borderRadius="md"
                bg="white"
                p={2}
                mb={4}
              />
              <Heading size="md" color="terminal.success" mb={2}>
                {degree}
              </Heading>
              <HStack spacing={2} mb={2}>
                <Icon as={FaGraduationCap} color="terminal.accent" />
                <Text color="terminal.accent">{university}</Text>
              </HStack>
              <HStack spacing={2} mb={2}>
                <Icon as={FaCalendarAlt} color="terminal.muted" />
                <Text fontSize="sm" color="terminal.muted">{period}</Text>
              </HStack>
              <HStack spacing={2} mb={4}>
                <Icon as={FaMapMarkerAlt} color="terminal.muted" />
                <Text fontSize="sm" color="terminal.muted">{location}</Text>
              </HStack>
              <HStack spacing={2} mb={4}>
                <Text color="terminal.text" fontWeight="bold">GPA:</Text>
                <Text color="terminal.accent">{gpa}</Text>
              </HStack>
              <Box>
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
            </Flex>
          </MotionBox>
        )}
      </GridItem>
    </Grid>
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
      logoUrl: universityBuffaloLogo,
      isLeft: true
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
      logoUrl: cochinUniversityLogo,
      isLeft: false
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
      
      <Box position="relative">
        {educations.map((edu, index) => (
          <EducationItem
            key={index}
            {...edu}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Education; 