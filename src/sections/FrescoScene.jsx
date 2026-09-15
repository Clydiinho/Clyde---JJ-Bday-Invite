import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollScene } from '../animations/useScrollScene.js'
import KeepScrolling from '../components/KeepScrolling.jsx'

gsap.registerPlugin(ScrollTrigger)

const birthday = {
  child: 'Jorge',
  age: 2,
  date: 'Saturday, December 12',
  time: '2:00 PM',
  venue: 'The Garden House, 14 Willow Lane',
  rsvp: 'call or text 555-0142',
}

const styles = {
  wrap: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  layer: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    willChange: 'transform',
  },
  clouds: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  goldParticles: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    opacity: 0,
  },
  sky: {
    position: 'absolute',
    inset: 0,
    opacity: 0,
    backgroundImage: "url('/sky%20painting.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    transformOrigin: 'center',
    boxShadow: '0 30px 90px rgba(0, 0, 0, 0.65)',
    willChange: 'transform, opacity',
  },
  wall: {
    position: 'absolute',
    inset: 0,
    opacity: 0,
    backgroundImage: "url('/gallery-wall.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    transformOrigin: 'center',
    willChange: 'transform, opacity',
    zIndex: 0,
  },
  wallShade: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(90% 70% at 50% 42%, rgba(255, 225, 170, 0.16) 0%, rgba(0, 0, 0, 0.28) 62%, rgba(0, 0, 0, 0.62) 100%)',
    pointerEvents: 'none',
  },
  frameWrap: {
    position: 'absolute',
    inset: 0,
    opacity: 0,
    pointerEvents: 'none',
    transformOrigin: 'center',
    willChange: 'transform, opacity',
    zIndex: 4,
  },
  frameRailH: {
    position: 'absolute',
    left: 58,
    right: 58,
    height: 30,
    backgroundImage: "url('/frame-rail-h.png')",
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 100%',
    mixBlendMode: 'screen',
  },
  frameRailV: {
    position: 'absolute',
    top: 58,
    bottom: 58,
    width: 30,
    backgroundImage: "url('/frame-rail-v.png')",
    backgroundRepeat: 'repeat-y',
    backgroundSize: '100% auto',
    mixBlendMode: 'screen',
  },
  frameCorner: {
    position: 'absolute',
    width: 88,
    height: 88,
    mixBlendMode: 'screen',
  },
  frameCrest: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: -72,
    width: 110,
    mixBlendMode: 'screen',
    pointerEvents: 'none',
  },
  frameLiner: {
    position: 'absolute',
    inset: -7,
    border: '2px solid rgba(216, 178, 90, 0.95)',
    boxShadow: 'inset 0 0 0 1px rgba(90, 60, 20, 0.8)',
    pointerEvents: 'none',
  },
  frameEdge: {
    position: 'absolute',
    inset: -33,
    border: '2px solid rgba(0, 0, 0, 0.55)',
    pointerEvents: 'none',
  },
  cloud: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '0 auto',
    top: '10%',
    width: '86%',
    aspectRatio: '1 / 1',
    backgroundImage: "url('/white%20cloud.png')",
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0,
    filter: 'drop-shadow(0 18px 28px rgba(80, 95, 120, 0.35))',
    willChange: 'transform, opacity',
    zIndex: 3,
  },
  cloud2: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '0 auto',
    top: '22%',
    width: '72%',
    aspectRatio: '1 / 1',
    backgroundImage: "url('/white%20cloud.png')",
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0,
    filter: 'drop-shadow(0 14px 22px rgba(80, 95, 120, 0.25))',
    willChange: 'transform, opacity',
    zIndex: 2,
    transform: 'scaleX(-1)',
  },
  oneDad: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '0 auto',
    top: '50%',
    textAlign: 'center',
    fontFamily: "'Griffith', 'Cormorant Garamond', Georgia, serif",
    fontStyle: 'italic',
    fontWeight: 400,
    color: '#fffaf0',
    fontSize: 'clamp(1.5rem, 6vw, 2.1rem)',
    lineHeight: 1.2,
    letterSpacing: '0.02em',
    textShadow: '0 3px 22px rgba(60, 70, 95, 0.55), 0 1px 2px rgba(60,70,95,0.4)',
    opacity: 0,
    willChange: 'transform, opacity',
    zIndex: 2,
  },
  oneLegend: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '0 auto',
    top: '50%',
    textAlign: 'center',
    fontFamily: "'Griffith', 'Cormorant Garamond', Georgia, serif",
    fontStyle: 'italic',
    fontWeight: 400,
    color: '#fffaf0',
    fontSize: 'clamp(1.5rem, 6vw, 2.1rem)',
    lineHeight: 1.2,
    letterSpacing: '0.02em',
    textShadow: '0 3px 22px rgba(60, 70, 95, 0.55), 0 1px 2px rgba(60,70,95,0.4)',
    opacity: 0,
    willChange: 'transform, opacity',
    zIndex: 2,
  },
  scrollHint: {
    position: 'absolute',
    bottom: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
    pointerEvents: 'none',
  },
  intro: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 2rem',
    zIndex: 15,
    pointerEvents: 'none',
  },
  introLine: {
    fontFamily: "'Griffith', 'Cormorant Garamond', Georgia, serif",
    fontStyle: 'italic',
    fontWeight: 400,
    color: '#f6e3b0',
    fontSize: 'clamp(1.4rem, 5.5vw, 2.1rem)',
    lineHeight: 1.25,
    letterSpacing: '0.03em',
    textShadow: '0 2px 24px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.4)',
    margin: 0,
    opacity: 0,
    willChange: 'transform, opacity',
  },
}

const FrescoScene = () => {
  const sceneRef = useRef(null)

  useScrollScene(
    sceneRef,
    {
      scrollTrigger: {
        end: '+=680%',
      },
      build: (tl) => {
        const q = gsap.utils.selector(sceneRef)
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // Opening: only background visible, figures hidden & pushed off-screen
        tl.set(q('.father'), { opacity: 0, x: -250 })
          .set(q('.son'), { opacity: 0, x: 250 })
          .set(q('.glow'), { scale: 0.35 })
          .set(q('.gold-particles'), { opacity: 0, scale: 0.6 })
          .set(q('.wipe'), { opacity: 0 })
          .set(q('.intro-line-1'), { opacity: 1, y: 40 })
          .fromTo(q('.intro-line-1'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0)
          .set(q('.intro-line-2'), { opacity: 0, y: 40 })

          // 20–60%: fresco paint-mask reveal on both sides — father left, son right
          .to(q('.father'), { opacity: 1, x: -24, duration: 2.4, ease: 'power2.out' }, 1.0)
          .to(q('.son'), { opacity: 1, x: 24, duration: 2.4, ease: 'power2.out' }, 1.0)

          // Touch: fingers travel toward the center and meet at the spark point (x:0)
          .to(q('.father'), { x: 0, duration: 1.2, ease: 'power1.inOut' }, 3.4)
          .to(q('.son'), { x: 0, duration: 1.2, ease: 'power1.inOut' }, 3.4)

          // Intro swap: as fingers are about to touch, line 1 yields to line 2
          .to(q('.intro-line-1'), { opacity: 0, y: -30, duration: 0.5, ease: 'power1.in' }, 2.7)
          .to(q('.intro-line-2'), { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 2.9)

          // Sparkle ignition at the exact moment of contact — golden bloom ignites
          .to(q('.glow'), { opacity: 1, scale: 1.15, duration: 0.5, ease: 'power2.out' }, 4.4)
          .to(q('.gold-particles'), { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' }, 4.4)
          .to(q('.glow'), { scale: 1.4, duration: 1.1, ease: 'sine.inOut' }, 4.95)

          // Line 2 departs just as the bloom starts — it never reaches the next section
          .to(q('.intro-line-2'), { opacity: 0, y: -26, duration: 0.45, ease: 'power1.in' }, 5.35)

          // Cinematic particle-bloom transition: the touch sparks particles outward,
          // gold wash rises, figures recede into the light — a single smooth bloom
          .to(q('.gold-particles'), { scale: 1.9, duration: 0.9, ease: 'power2.in' }, 5.4)
          .to(q('.father'), { opacity: 0.15, x: -130, duration: 0.8, ease: 'power2.in' }, 5.5)
          .to(q('.son'), { opacity: 0.15, x: 130, duration: 0.8, ease: 'power2.in' }, 5.5)
          .to(q('.wipe'), { opacity: 0.95, duration: 0.8, ease: 'power2.in' }, 5.6)
          .to(q('.background'), { opacity: 0, duration: 0.7, ease: 'power1.in' }, 5.8)
          .to(q('.clouds'), { opacity: 0, duration: 0.6, ease: 'power1.in' }, 5.9)
          .to(q('.son'), { opacity: 0, duration: 0.5, ease: 'power1.in' }, 6.0)
          .to(q('.father'), { opacity: 0, duration: 0.5, ease: 'power1.in' }, 6.0)
          .to(q('.gold-particles'), { opacity: 0, duration: 0.6, ease: 'power1.in' }, 6.1)
          .to(q('.wipe'), { opacity: 0, duration: 0.6, ease: 'power2.out' }, 6.0)

          // Reveal the sky painting as the scene settles
          .to(q('.sky'), { opacity: 1, duration: 1.0, ease: 'power2.out' }, 5.5)

          // As the sky transitions, both clouds sweep in at the same time
          .fromTo(q('.cloud'), { opacity: 0, x: 520 }, { opacity: 1, x: 0, duration: 1.1, ease: 'power2.inOut' }, 5.5)
          .fromTo(q('.cloud2'), { opacity: 0, x: -520 }, { opacity: 1, x: 0, duration: 1.1, ease: 'power2.inOut' }, 5.5)

          // "One dad." glides down gently, at full opacity, settling under the cloud
          .set(q('.one-dad'), { opacity: 1, y: -320 }, 5.5)
          .to(q('.one-dad'), { y: -68, duration: 2.0, ease: 'sine.inOut' }, 5.5)

          // Once they meet, the text glides into "One tiny legend." — smooth cross-fade
          .to(q('.one-dad'), { opacity: 0, y: -70, duration: 0.45, ease: 'power2.inOut' }, 7.5)
          .fromTo(q('.one-legend'), { opacity: 0, y: -46, scale: 0.98 }, { opacity: 1, y: -58, scale: 1, duration: 0.6, ease: 'power2.inOut' }, 7.5)

          // Both clouds sweep out at the same time, opposite directions
          .to(q('.cloud'), { x: -560, duration: 1.3, ease: 'power1.in' }, 8.1)
          .to(q('.cloud2'), { x: 560, duration: 1.3, ease: 'power1.in' }, 8.1)

          // The new text drifts fully down and out of view, staying fully visible
          .to(q('.one-legend'), { y: 620, duration: 1.6, ease: 'power1.in' }, 8.1);

        // ---- Gallery pullback: the sky was a framed painting all along ----
        if (reducedMotion) {
          // Simplified: cut straight to the final framed state, no zoom
          tl.set(q('.sky'), { scale: 0.6 }, 10.3)
          tl.set(q('.frame-wrap'), { opacity: 1, scale: 0.6 }, 10.3)
          tl.set(q('.gallery-wall'), { opacity: 1, scale: 1 }, 10.3)
        } else {
          // Anticipation hold on the full-bleed sky, then the camera pulls back
          tl.fromTo(q('.gallery-wall'), { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 2.6, ease: 'power1.out' }, 10.3)
          tl.fromTo(q('.frame-wrap'), { opacity: 0, scale: 1 }, { opacity: 1, scale: 0.6, duration: 2.5, ease: 'power2.inOut' }, 10.3)
          tl.to(q('.sky'), { scale: 0.6, duration: 2.5, ease: 'power2.inOut' }, 10.3)
          // Faint spotlight drift sells the camera move; painting settles into the wall
          tl.to(q('.gallery-wall'), { x: 10, duration: 2.5, ease: 'sine.inOut' }, 10.3)
        }
      },
    },
    []
  )

  return (
    <section
      ref={sceneRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <div style={styles.wrap}>
        {/* Painting background */}
        <div
          className="background"
          style={{
            ...styles.layer,
            backgroundImage: "url('/background.png')",
          }}
        />

        {/* Father */}
        <div
          className="father"
          style={{
            ...styles.layer,
            backgroundImage: "url('/father.png')",
          }}
        />

        {/* Son */}
        <div
          className="son"
          style={{
            ...styles.layer,
            backgroundImage: "url('/son.png')",
          }}
        />

        {/* Clouds parallax layers */}
        <div className="clouds" style={styles.clouds}>
          <div style={{ position: 'absolute', top: '12%', left: '-10%', width: '60%', opacity: 0.3 }}>
            <img src="/cloud-particles.png" alt="" style={{ width: '100%', mixBlendMode: 'screen' }} />
          </div>
          <div style={{ position: 'absolute', top: '28%', right: '-15%', width: '70%', opacity: 0.2 }}>
            <img src="/cloud-particles.png" alt="" style={{ width: '100%', mixBlendMode: 'screen' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '20%', left: '-20%', width: '80%', opacity: 0.15 }}>
            <img src="/cloud-particles.png" alt="" style={{ width: '100%', mixBlendMode: 'screen' }} />
          </div>
        </div>

        {/* Golden glow near fingertips */}
        <div
          className="glow"
          style={{
            position: 'absolute',
            left: '50%',
            top: '38%',
            transform: 'translate(-50%, -50%)',
            width: '60vmin',
            height: '60vmin',
            borderRadius: '50%',
            opacity: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(255,215,120,0.85) 0%, rgba(255,200,90,0.45) 35%, rgba(255,190,80,0.15) 60%, transparent 78%)',
            filter: 'blur(4px)',
          }}
        />

        {/* Gold particles — twinkling embers around the fingertips */}
        <div className="gold-particles" style={styles.goldParticles}>
          <img src="/gold-particles.png" alt="" className="gp gp-1" style={{ position: 'absolute', left: '50%', top: '28%', width: '55vmin', transform: 'translateX(-50%)', mixBlendMode: 'screen' }} />
          <img src="/gold-particles.png" alt="" className="gp gp-2" style={{ position: 'absolute', left: '34%', top: '45%', width: '34vmin', transform: 'translateX(-50%)', mixBlendMode: 'screen' }} />
          <img src="/gold-particles.png" alt="" className="gp gp-3" style={{ position: 'absolute', left: '56%', top: '52%', width: '28vmin', transform: 'translateX(-50%)', mixBlendMode: 'screen' }} />
          <img src="/gold-particles.png" alt="" className="gp gp-4" style={{ position: 'absolute', left: '46%', top: '62%', width: '22vmin', transform: 'translateX(-50%)', mixBlendMode: 'screen' }} />
        </div>

        {/* Gold wash bloom — cinematic particle transition layer */}
        <div
          className="wipe"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 42%, rgba(255,225,140,0.9) 0%, rgba(255,200,100,0.5) 34%, rgba(255,180,70,0.18) 58%, transparent 80%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Intro lines — cinematic opening text */}
        <div style={styles.intro}>
          <p className="intro-line-1" style={styles.introLine}>Before there was a<br />Festival</p>
          <p className="intro-line-2" style={{ ...styles.introLine, position: 'absolute' }}>There was a creation.</p>
        </div>

        {/* Gallery wall — revealed as the camera pulls back from the painting */}
        <div className="gallery-wall" style={styles.wall}>
          <div style={styles.wallShade} />
        </div>

        {/* Sky painting — fills the viewport after the transition */}
        <div className="sky" style={styles.sky} />

        {/* Cloud — flows in from the right once the sky appears */}
        <div className="cloud" style={styles.cloud} />

        {/* Cloud 2 — flows in from the left, slightly lower */}
        <div className="cloud2" style={styles.cloud2} />

        {/* "One dad." — falls from the top, meets the cloud, then swaps to "One tiny legend." */}
        <p className="one-dad" style={styles.oneDad}>One dad.</p>
        <p className="one-legend" style={styles.oneLegend}>One tiny legend.</p>

        {/* Ornate frame — tracks the painting edges as the camera pulls back */}
        <div className="frame-wrap" style={styles.frameWrap}>
          <div style={{ ...styles.frameRailH, top: -30 }} />
          <div style={{ ...styles.frameRailH, bottom: -30 }} />
          <div style={{ ...styles.frameRailV, left: -30 }} />
          <div style={{ ...styles.frameRailV, right: -30 }} />
          <div style={styles.frameLiner} />
          <div style={styles.frameEdge} />
          <img src="/frame-corner.png" alt="" style={{ ...styles.frameCorner, left: -29, top: -29 }} />
          <img src="/frame-corner.png" alt="" style={{ ...styles.frameCorner, right: -29, top: -29, transform: 'scaleX(-1)' }} />
          <img src="/frame-corner.png" alt="" style={{ ...styles.frameCorner, left: -29, bottom: -29, transform: 'scaleY(-1)' }} />
          <img src="/frame-corner.png" alt="" style={{ ...styles.frameCorner, right: -29, bottom: -29, transform: 'scale(-1, -1)' }} />
          <img src="/frame-crest.png" alt="" style={styles.frameCrest} />
        </div>

        {/* Keep-scrolling indicator — circular animation with rotating text */}
        <KeepScrolling />
      </div>
    </section>
  )
}

export default FrescoScene