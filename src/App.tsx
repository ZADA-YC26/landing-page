import './App.css'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import ColdOpen from './components/ColdOpen'
import SpontaneousChapter from './components/SpontaneousChapter'
import SocialChapter from './components/SocialChapter'
import PlayfulChapter from './components/PlayfulChapter'
import ProductReveal from './components/ProductReveal'
import CoreLoop from './components/CoreLoop'
import CompanionEvolution from './components/CompanionEvolution'
import ProofMemoryTrail from './components/ProofMemoryTrail'
import WhyZada from './components/WhyZada'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-near-black min-h-screen overflow-x-hidden">
      <CursorGlow />
      <Navbar />
      <main>
        <ColdOpen />
        <SpontaneousChapter />
        <SocialChapter />
        <PlayfulChapter />
        <ProductReveal />
        <CoreLoop />
        <CompanionEvolution />
        <ProofMemoryTrail />
        <WhyZada />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
