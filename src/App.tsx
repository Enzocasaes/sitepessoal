import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  return (
    // LazyMotion carrega só os recursos de animação usados (componentes `m.*`);
    // reducedMotion="user" respeita a preferência do sistema por menos movimento.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
