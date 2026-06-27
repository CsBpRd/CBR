import { useEffect } from 'react'

export default function ParticleBg() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.onload = () => {
      (window as any).particlesJS?.('particles-js', {
        particles: {
          number: { value: 80 }, color: { value: '#3b82f6' },
          shape: { type: 'circle' }, opacity: { value: 0.5 },
          size: { value: 3 }, line_linked: { enable: true, color: '#3b82f6', opacity: 0.2 },
          move: { enable: true, speed: 2 }
        }
      })
    }
    document.body.appendChild(script)
    return () => { script.remove() }
  }, [])

  return <div id="particles-js"></div>
}
