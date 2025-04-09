import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
