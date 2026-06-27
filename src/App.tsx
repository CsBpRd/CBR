import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import Tonglan from './pages/Tonglan'

export default function App() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tonglan" element={<Tonglan />} />
      </Routes>
      <Footer />
    </>
  )
}
