import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number
}

export default function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return

    const ctx = cvs.getContext('2d')!

    let W = 0, H = 0
    let mouseX = -9999, mouseY = -9999
    let particles: Particle[] = []
    const COUNT = 80
    const MAX_DIST = 150
    const MOUSE_RADIUS = 180
    const ATTRACT_FORCE = 0.03

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      cvs!.width = W
      cvs!.height = H
    }
    resize()
    window.addEventListener('resize', resize)

    // Init particles
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2.5 + 1.5,
        opacity: Math.random() * 0.4 + 0.2
      })
    }

    function animate() {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < COUNT; i++) {
        const p = particles[i]

        // Mouse attract
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distToMouse = Math.sqrt(dx * dx + dy * dy)
        if (distToMouse < MOUSE_RADIUS && mouseX > 0) {
          const force = (1 - distToMouse / MOUSE_RADIUS) * ATTRACT_FORCE
          p.vx += (dx / distToMouse) * force
          p.vy += (dy / distToMouse) * force
        }

        // Move
        p.x += p.vx
        p.y += p.vy

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Add slight random drift
        p.vx += (Math.random() - 0.5) * 0.05
        p.vy += (Math.random() - 0.5) * 0.05

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 3) {
          p.vx = (p.vx / speed) * 3
          p.vy = (p.vy / speed) * 3
        }

        // Wrap around edges
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10
      }

      // Draw links
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.3
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(96,165,250,${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${p.opacity})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    const onMouseLeave = () => {
      mouseX = -9999
      mouseY = -9999
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}
    />
  )
}
