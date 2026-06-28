import { useEffect } from 'react'

let initialized = false

export default function ParticleBg() {
  useEffect(() => {
    if (initialized) return

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@tsparticles/all@3/tsparticles.all.bundle.min.js'
    script.onload = async () => {
      const tsp = (window as any).tsParticles
      if (!tsp) return
      initialized = true

      await tsp.load({
        id: 'tsparticles',
        options: {
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true } },
            color: { value: '#60a5fa' },
            shape: { type: 'circle' },
            opacity: {
              value: 0.5,
              animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
            },
            size: {
              value: 3,
              animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
            },
            links: {
              enable: true, distance: 150, color: '#60a5fa', opacity: 0.4, width: 1
            },
            move: {
              enable: true, speed: 2, direction: 'none',
              random: false, straight: false, outModes: 'out'
            }
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'attract' },
              onClick: { enable: true, mode: 'push' }
            },
            modes: {
              attract: { distance: 200, duration: 0.4, speed: 1 },
              push: { quantity: 4 }
            }
          }
        }
      })
    }
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return <div id="tsparticles" style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />
}
