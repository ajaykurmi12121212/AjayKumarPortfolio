import { useState } from 'react';
import Loader         from './components/Loader';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor   from './components/CustomCursor';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import TechMarquee    from './components/TechMarquee';
import About          from './components/About';
import Counter        from './components/Counter';
import Skills         from './components/Skills';
import GitHubStats    from './components/GitHubStats';
import Projects       from './components/Projects';
import Timeline       from './components/Timeline';
import Education      from './components/Education';
import Achievements   from './components/Achievements';
import Blog           from './components/Blog';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import BackToTop      from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
import VisitorCounter from './components/VisitorCounter';
import HireMeModal    from './components/HireMeModal';

export default function App() {
  const [loaded,   setLoaded]   = useState(false);
  const [hireOpen, setHireOpen] = useState(false);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <PageTransition />
      <ScrollProgress />
      <CustomCursor />
      <Navbar onHireMe={() => setHireOpen(true)} />
      <Hero onHireMe={() => setHireOpen(true)} />
      <TechMarquee />
      <About />
      <Counter />
      <Skills />
      <GitHubStats />
      <Projects />
      <Timeline />
      <Education />
      <Achievements />
      <Blog />
      <Contact />
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <VisitorCounter />
      <HireMeModal open={hireOpen} onClose={() => setHireOpen(false)} />
    </>
  );
}
