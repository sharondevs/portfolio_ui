import { Box } from '@chakra-ui/react';

const EchoIcon = () => {
  return (
    <Box position="relative" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
        }}
      >
        {/* Outer glow effect */}
        <defs>
          <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          {/* Wave gradient */}
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" /> {/* blue.400 */}
            <stop offset="50%" stopColor="#C084FC" /> {/* purple.400 */}
            <stop offset="100%" stopColor="#F0ABFC" /> {/* pink.300 */}
          </linearGradient>
        </defs>

        {/* Background circle with blur effect */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="rgba(30, 20, 60, 0.5)"
          filter="blur(4px)"
        />

        {/* Wave shape */}
        <path
          d="M30,50 Q40,40 50,50 T70,50"
          stroke="url(#waveGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          filter="blur(1px)"
        >
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="
              M30,50 Q40,40 50,50 T70,50;
              M30,50 Q40,60 50,50 T70,50;
              M30,50 Q40,40 50,50 T70,50
            "
          />
        </path>

        {/* Second wave for layered effect */}
        <path
          d="M30,50 Q40,60 50,50 T70,50"
          stroke="url(#waveGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
          filter="blur(2px)"
        >
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="
              M30,50 Q40,60 50,50 T70,50;
              M30,50 Q40,40 50,50 T70,50;
              M30,50 Q40,60 50,50 T70,50
            "
          />
        </path>

        {/* Outer glow */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </Box>
  );
};

export default EchoIcon; 