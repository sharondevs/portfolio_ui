import { Box, VStack, Text, Heading, Flex, Image, HStack, Icon, useColorModeValue, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import ustGlobalLogo from '../assets/ust_global.jpg';
import moonraftLogo from '../assets/moonraft.webp';
import microsoftLogo from '../assets/microsoft.png';
import oxmaintLogo from '../assets/oxmaint.jpg';

const MotionBox = motion(Box);

type CompanyName = 'Oxmaint AI' | 'UST Global' | 'Moonraft Innovation Labs (acquired by UST Global)' | 'Microsoft';

const TechnologyBadge = ({ tech }: { tech: string }) => {
  return (
    <Box
      as={motion.div}
      whileHover={{ scale: 1.05 }}
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
      whiteSpace="nowrap"
      _hover={{ bg: 'terminal.accent', color: 'white' }}
      transition="all 0.2s"
    >
      {tech}
    </Box>
  );
};

const TechnologySection = ({ technologies }: { technologies: string[] }) => {
  return (
    <Flex flexWrap="wrap" gap={3}>
      {technologies.map((tech, index) => (
        <TechnologyBadge key={index} tech={tech} />
      ))}
    </Flex>
  );
};

interface ExperienceItemProps {
  role: string;
  company: CompanyName;
  period: string;
  location: string;
  description: string[];
  logoUrl: string;
  technologies?: string[];
}

const ExperienceItem = ({ 
  role, 
  company, 
  period,
  location,
  description,
  logoUrl,
  technologies
}: ExperienceItemProps) => {
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
            alt={`${company} logo`}
            boxSize="60px"
            objectFit="contain"
            borderRadius="md"
            bg="white"
            p={2}
          />
        </Box>

        <Box flex="1">
          <Heading size="md" color="terminal.success" mb={2}>
            {role}
          </Heading>
          
          <HStack spacing={4} mb={3}>
            <HStack color="terminal.accent">
              <Icon as={FaBriefcase} />
              <Text>{company}</Text>
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

          <VStack align="stretch" spacing={2} mb={4}>
            {description.map((point, index) => (
              <HStack key={index} align="start" spacing={3}>
                <Text color="terminal.accent" mt={1}>•</Text>
                <Text color="terminal.text">{point}</Text>
              </HStack>
            ))}
          </VStack>

          {technologies && (
            <Box mt={4}>
              <Text color="terminal.muted" mb={2} fontSize="sm" fontWeight="medium">
                Technologies & Skills
              </Text>
              <TechnologySection technologies={technologies} />
            </Box>
          )}
        </Box>
      </Flex>
    </MotionBox>
  );
};

const Experience = () => {
  const experiences: ExperienceItemProps[] = [
    {
      role: 'Software Engineer (Co-op + FT)',
      company: 'Oxmaint AI',
      period: 'Current',
      location: 'Sunnyvale, CA',
      description: [
        "Built OXmaint's next-gen AI-enabled CMMS portal (Next.js + Golang), migrating from legacy workflows with 40% increased engagement through simplified admin UX",
        "Shipped i18n locale routing with middleware-driven auto-detection and per-locale SSG, improving multilingual onboarding",
        "Hardened Next.js frontend security with CSP headers, cache-control, and security patches to mitigate cache poisoning and client-side attacks",
        "Led OxyAI chatbot agentic automation using n8n workflows with org-context grounding; integrated Salesforce lead capture and sandbox provisioning flows, improving lead-to-opportunity conversion by 30%",
        "Engineered end-to-end IoT ingestion pipeline integrating ChirpStack sensor networks via MQTT (Eclipse Paho) and HTTPS webhooks with Golang backend; reduced sensor setup time by 60%",
        "Owned OXmaint Flutter app distribution with modular MVVM, OAuth2, Firebase notifications, on-device TTS, wake-word interaction, and Meta wearable integration; improved field-user turnaround by 30%",
        "Prototyped organization-scale digital twin for manufacturing using NVIDIA Omniverse + OpenUSD with Unitree Go2 virtual navigation and WebRTC-based robot streaming from Next.js"
      ],
      logoUrl: oxmaintLogo,
      technologies: ['Next.js', 'TypeScript', 'Golang', 'gorm', 'n8n', 'Flutter', 'MQTT', 'Eclipse Paho', 'ChirpStack', 'NVIDIA Omniverse', 'OpenUSD', 'WebRTC', 'OAuth2', 'Firebase', 'Salesforce', 'CSP', 'MVVM']
    },
    {
      role: 'Developer 1',
      company: 'UST Global',
      period: 'Jan 2024 - July 2024',
      location: 'Bangalore, India',
      description: [
        'Worked for a UK-based mortgage corporation on their frontend cross-platform mobile stack, carrying the project from its MVP phase to first production release in record time',
        'Created app launch animations and complex loader widgets for file uploads',
        'Implemented in-app Equifax score dashboards showcasing user spending and analytics for mortgage eligibility'
      ],
      logoUrl: ustGlobalLogo,
      technologies: ['Flutter', 'FlutterFlow', 'Google Analytics']
    },
    {
      role: 'Software Engineer (Digital Experience)',
      company: 'Moonraft Innovation Labs (acquired by UST Global)',
      period: 'Feb 2023 - Dec 2023',
      location: 'Bangalore, India',
      description: [
        'Worked as part of the solutions team, building POCs and solutions for internal use cases',
        'Designed and delivered a POC on an end-to-end conversational semantic search module',
        'Deployed a backend Spring Boot app capable of running concurrent scraping and indexing jobs, along with an admin UI',
        'Contributed to DL Vision team for Product Comparison Engine POC, generating image embeddings for vector similarity search',
        'Led ETL team for collecting and transforming 40k+ product listing data across different ecommerce platforms'
      ],
      logoUrl: moonraftLogo,
      technologies: ['Spring Boot', 'Flask', 'ElasticSearch', 'PineconeDB', 'MongoDB', 'LangChain', 'Serverless GPU']
    },
    {
      role: 'CSA-Engineering',
      company: 'Microsoft',
      period: 'Aug 2021 - Feb 2023',
      location: 'Hyderabad, India',
      description: [
        'SME for Microsoft Endpoint Manager and Azure AD, part of Microsoft M365 product suite',
        'Responsible for training, advisory, and building POCs for premier customers on Microsoft PaaS/SaaS platforms',
        'Led delivery of multi-day onsite/remote engagements for Microsoft customers across the world'
      ],
      logoUrl: microsoftLogo,
      technologies: ['Microsoft Intune', 'Azure AD', 'MECM', 'Microsoft Defender']
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
      
      <VStack spacing={6} alignItems="stretch">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            {...exp}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Experience;