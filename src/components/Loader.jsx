import { useEffect, useRef, useState } from 'react'

const DURATION = 10000

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const startRef = useRef(null)
  const rafRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    startRef.current = performance.now()
    const tick = (now) => {
      const elapsed = now - startRef.current
      const t = Math.min(elapsed / DURATION, 1)
      setProgress(t)
      const v = videoRef.current
      if (v && v.duration) {
        const target = t * v.duration
        if (Math.abs(v.currentTime - target) > 0.05) v.currentTime = target
      } else if (v) {
        const target = t * 10.084
        if (Math.abs(v.currentTime - target) > 0.05) v.currentTime = target
      }
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setFading(true)
          setTimeout(onComplete, 800)
        }, 400)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  const months = Math.floor(progress * 24)
  let label
  if (months === 0) label = '0 months'
  else if (months < 12) label = `${months} month${months !== 1 ? 's' : ''}`
  else if (months === 12) label = '1 year'
  else if (months < 24) label = `${months} months`
  else label = '2 years'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f0e8',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Subtle radial glow behind the video */}
      <div
        style={{
          position: 'absolute',
          width: '60vmin',
          height: '60vmin',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,150,100,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Transparent WebM — scrubbed to loading bar */}
      <video
        ref={videoRef}
        src="/b_A_minimalist_line-ar-nobg.webm"
        muted
        playsInline
        preload="auto"
        width={1280}
        height={720}
        style={{
          width: 'min(60vw, 300px)',
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />

      {/* Progress bar */}
      <div
        style={{
          width: 'min(55vw, 280px)',
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(60,50,40,0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progress * 100}%`,
              backgroundColor: 'rgba(120,90,50,0.5)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        {/* Month / year label */}
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            textShadow: '0 1px 10px rgba(60, 50, 40, 0.3)',
            color: 'rgba(60,50,40,0.55)',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default Loader
