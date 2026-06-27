import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import Gjx from './pages/Gjx'
import Pu from './pages/Pu'
import Tonglan from './pages/Tonglan'

export default function App() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gjx" element={<Gjx />} />
        <Route path="/pu" element={<Pu />} />
        <Route path="/tonglan" element={<Tonglan />} />
      </Routes>
      <Footer />
    </>
  )
}
