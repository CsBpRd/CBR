import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import Gjx from './pages/Gjx'
import Pu from './pages/Pu'
import Zgmz from './pages/Zgmz'
import Tonglan from './pages/Tonglan'
import Photopicker from './pages/Photopicker'

export default function App() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gjx" element={<Gjx />} />
        <Route path="/pu" element={<Pu />} />
        <Route path="/zgmz" element={<Zgmz />} />
        <Route path="/tonglan" element={<Tonglan />} />
        <Route path="/photopicker" element={<Photopicker />} />
      </Routes>
      <Footer />
    </>
  )
}
