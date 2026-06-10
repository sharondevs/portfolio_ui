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
      role: 'Lead Software Engineer',
      company: 'Oxmaint AI',
      period: 'July 2025 - Present',
      location: 'Sunnyvale, CA',
      description: [
        "Own service architecture for OXmaint's AI-enabled CMMS — Next.js/TypeScript frontend, Golang microservices, multi-tenant auth, and Redis caching; migrated 12+ legacy workflows (+40% daily usage)",
        "Shipped 3 OxyAI agentic workflows on n8n — org-scoped context retrieval, tool-calling over internal APIs, LLM routing with automatic fallback, and token-budgeted session state",
        "Hardened the frontend (nonce-based CSP, CSRF rotation) and built GitHub Actions CI/CD with Docker staging and Prometheus + Grafana alerting",
        "Engineered the end-to-end IoT ingestion pipeline (ChirpStack, MQTT via Eclipse Paho Go, auto device discovery); cut sensor setup time by 60%",
        "Owned the OXmaint Flutter app (MVVM, OAuth2, on-device TTS, wake-word, Meta wearable) for hands-free workflows; +30% field-user turnaround"
      ],
      logoUrl: oxmaintLogo,
      technologies: ['Next.js', 'TypeScript', 'Golang', 'n8n', 'LLM Routing', 'MQTT', 'ChirpStack', 'Flutter', 'Redis', 'Prometheus', 'GitHub Actions']
    },
    {
      role: 'Developer 1',
      company: 'UST Global',
      period: 'Jan 2024 - July 2024',
      location: 'Bangalore, India',
      description: [
        "Took a UK mortgage client's cross-platform Flutter app from MVP to production for 65k+ users (85% crash-free)",
        "Built app launch animations, complex file-upload loaders, and in-app Equifax score dashboards for mortgage eligibility"
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
        "Built a plug-and-play semantic-search module — Spring Boot/FastAPI, Kafka job queues, HuggingFace embeddings in Elasticsearch k-NN — with a React admin portal orchestrating 20+ concurrent scrape/index runs",
        "Led a 3-member ETL team scraping 50k+ product listings for a Product Comparison Engine, generating text & image embeddings for similarity search"
      ],
      logoUrl: moonraftLogo,
      technologies: ['Spring Boot', 'FastAPI', 'Elasticsearch', 'Pinecone', 'Kafka', 'MongoDB']
    },
    {
      role: 'Cloud Solution Architect',
      company: 'Microsoft',
      period: 'Aug 2021 - Feb 2023',
      location: 'Hyderabad, India',
      description: [
        "SME for Microsoft Intune, Azure AD, and MECM across 200K+ managed endpoints — onboarding, change management, and endpoint security",
        "Trained 100+ engineers via multi-day workshops and built solution POCs for premier M365/Azure customers (+15% client-side resolution)"
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