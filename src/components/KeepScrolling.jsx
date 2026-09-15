import { useEffect, useRef } from 'react'

const KeepScrolling = () => {
  const ringRef = useRef(null)

  useEffect(() => {
    if (!ringRef.current) return
    const el = ringRef.current
    let angle = 0
    let raf
    const tick = () => {
      angle = (angle + 0.25) % 360
      el.style.transform = `rotate(${angle}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const size = 42
  const ringPad = 12

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '1.5rem',
        transform: 'translateX(-50%)',
        width: size + ringPad * 2,
        height: size + ringPad * 2,
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      {/* Rotating text ring */}
      <svg
        ref={ringRef}
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <path
            id="ks-path"
            d="M100,100 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0"
            fill="none"
          />
        </defs>
        <text
          fill="rgba(255,240,220,0.92)"
          fontSize="19"
          fontWeight="400"
          letterSpacing="5.5"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            textTransform: 'uppercase',
          }}
        >
          <textPath href="#ks-path">
            KEEP SCROLLING · KEEP SCROLLING ·
          </textPath>
        </text>
      </svg>

      {/* Flickering arrow inside the circle */}
      <div
        className="ks-arrow"
        style={{
          position: 'absolute',
          top: ringPad,
          left: ringPad,
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.08)',
          boxShadow: '0 0 0 1px rgba(255,235,210,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,240,220,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export default KeepScrolling
