import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './styles/theme';
import Layout from './components/Layout';
import ScrollContainer, { ScrollSection } from './components/ScrollContainer';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <ScrollContainer>
            <ScrollSection id="home">
              <Home />
            </ScrollSection>

            <ScrollSection id="experience">
              <Experience />
            </ScrollSection>

            <ScrollSection id="projects">
              <Projects />
            </ScrollSection>

            <ScrollSection id="contact">
              <Contact />
            </ScrollSection>
          </ScrollContainer>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
