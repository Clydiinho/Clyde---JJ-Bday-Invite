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
    backgroundImage: "url('/sky.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    transformOrigin: 'center',
    boxShadow: '0 30px 90px rgba(0, 0, 0, 0.65)',
    willChange: 'transform, opacity',
  },
  scene2: {
    position: 'absolute',
    inset: -10,
    opacity: 0,
    backgroundImage: "url('/scene2.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    transformOrigin: '50% 42%',
    willChange: 'transform, opacity',
    zIndex: 4,
  },
  // wall / frame / foreground removed — site ends after "One tiny legend"
  cloudBacking: {
    position: 'absolute',
    left: '8%',
    right: '8%',
    top: '31%',
    height: '18%',
    background: 'rgba(255,255,255,0.96)',
    borderRadius: '999px',
    filter: 'blur(18px)',
    opacity: 0,
    willChange: 'transform, opacity',
    zIndex: 2.1,
  },
  cloud2Backing: {
    position: 'absolute',
    left: '12%',
    right: '12%',
    top: '38%',
    height: '15%',
    background: 'rgba(255,255,255,0.92)',
    borderRadius: '999px',
    filter: 'blur(16px)',
    opacity: 0,
    willChange: 'transform, opacity',
    zIndex: 1.9,
  },
  cloud: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '0 auto',
    top: '18%',
    width: 'min(86%, 60vh)',
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
    top: '26%',
    width: 'min(72%, 50vh)',
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
    fontSize: 'clamp(1.75rem, 7vw, 2.5rem)',
    lineHeight: 1.2,
    letterSpacing: '0.02em',
    textShadow: '0 3px 22px rgba(60, 70, 95, 0.55), 0 1px 2px rgba(60,70,95,0.4)',
    opacity: 0,
    willChange: 'transform, opacity',
    zIndex: 1,
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
    fontSize: 'clamp(1.75rem, 7vw, 2.5rem)',
    lineHeight: 1.2,
    letterSpacing: '0.02em',
    textShadow: '0 3px 22px rgba(60, 70, 95, 0.55), 0 1px 2px rgba(60,70,95,0.4)',
    opacity: 0,
    willChange: 'transform, opacity',
    zIndex: 1,
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
    fontSize: 'clamp(1.65rem, 6.5vw, 2.4rem)',
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
        end: '+=880%',
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
          .fromTo(q('.cloud-backing'), { opacity: 0, x: 520 }, { opacity: 1, x: 0, duration: 1.1, ease: 'power2.inOut' }, 5.5)
          .fromTo(q('.cloud2-backing'), { opacity: 0, x: -520 }, { opacity: 1, x: 0, duration: 1.1, ease: 'power2.inOut' }, 5.5)

          // "One dad." glides down slowly and tucks in behind the clouds
          .set(q('.one-dad'), { opacity: 1, y: -260 }, 5.5)
          .to(q('.one-dad'), { y: -95, duration: 3.2, ease: 'power1.out' }, 5.5)

          // Hidden behind the clouds where they meet, the text swaps to
          // "One tiny legend." — which then slowly peels out from underneath
          .to(q('.one-dad'), { opacity: 0, y: -95, duration: 0.45, ease: 'power2.inOut' }, 7.5)
          .fromTo(q('.one-legend'), { opacity: 0, y: -95, scale: 0.98 }, { opacity: 1, y: 40, scale: 1, duration: 2.2, ease: 'sine.inOut' }, 7.5)
          .to(q('.one-legend'), { y: 160, duration: 1.3, ease: 'sine.inOut' }, 9.0)

          // Two-stage cloud exit — PHASE A: slow drift while the legend is still emerging
          .to(q('.cloud'), { x: -120, duration: 1.3, ease: 'sine.inOut' }, 8.8)
          .to(q('.cloud2'), { x: 120, duration: 1.3, ease: 'sine.inOut' }, 8.8)
          .to(q('.cloud-backing'), { x: -120, duration: 1.3, ease: 'sine.inOut' }, 8.8)
          .to(q('.cloud2-backing'), { x: 120, duration: 1.3, ease: 'sine.inOut' }, 8.8)

          // PHASE B: legend clear — clouds accelerate into their exit
          .to(q('.cloud'), { x: -560, duration: 1.3, ease: 'power1.in' }, 10.2)
          .to(q('.cloud2'), { x: 560, duration: 1.3, ease: 'power1.in' }, 10.2)
          .to(q('.cloud-backing'), { x: -560, duration: 1.3, ease: 'power1.in' }, 10.2)
          .to(q('.cloud2-backing'), { x: 560, duration: 1.3, ease: 'power1.in' }, 10.2)

          // The new text drifts fully down and out of view — end of experience
          .to(q('.one-legend'), { y: 620, duration: 1.4, ease: 'power1.in' }, 11.0);

        // ---- scene2 handoff — sky painting becomes the painting on the wall ----
        // Visually verified: at 12.4 sky is full-bleed cover center.
        // scene2 starts zoomed so its blue interior coincides with sky's box.
        // Responsive tweak: narrower viewports need slightly more scale to keep the gilt lip hidden.
        const vw = window.innerWidth
        const isNarrow = vw <= 360
        const isWide = vw >= 412
        const handoffScale = isNarrow ? 2.42 : isWide ? 2.26 : 2.34
        const handoffY = isNarrow ? '-7%' : isWide ? '-5%' : '-6%'

        if (reducedMotion) {
          tl.set(q('.sky'), { opacity: 0 }, 12.4)
          tl.set(q('.scene2'), { opacity: 1, scale: 1, y: '0%' }, 12.4)
        } else {
          tl.set(q('.scene2'), { opacity: 1 }, 12.4)
          tl.fromTo(q('.scene2'), { scale: handoffScale, y: handoffY }, { scale: 1, y: '0%', duration: 5.2, ease: 'power2.out' }, 12.4)
          tl.to(q('.sky'), { opacity: 0, duration: 0.7, ease: 'power1.in' }, 12.4)
          tl.to(q('.scene2'), { scale: 1.02, duration: 1.0, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 17.6)
        }
      },
    },
    []
  )

  return (
    <section
      ref={sceneRef}
      className="fresco-scene"
    >
      <div className="fresco-wrap">
        {/* Painting background */}
        <div
          className="background"
          style={{
            ...styles.layer,
            backgroundImage: "url('/background.webp')",
          }}
        />

        {/* Father — reframed so the face stays in view on narrow screens */}
        <div
          className="father"
          style={{
            ...styles.layer,
            backgroundImage: "url('/father.png')",
            backgroundPosition: '25% 50%',
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
            top: '47%',
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
            background: 'radial-gradient(circle at 50% 47%, rgba(255,225,140,0.9) 0%, rgba(255,200,100,0.5) 34%, rgba(255,180,70,0.18) 58%, transparent 80%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Intro lines — cinematic opening text */}
        <div style={styles.intro}>
          <p className="intro-line-1" style={styles.introLine}>Before there was a<br />Festival</p>
          <p className="intro-line-2" style={{ ...styles.introLine, position: 'absolute' }}>There was a creation.</p>
        </div>

        {/* Sky painting — live painting */}
        <div className="sky" style={styles.sky} />

        {/* scene2 — single finished composition, seamless handoff from sky */}
        <div className="scene2" style={styles.scene2} />

        {/* Cloud backings — solid ovals that make the text truly hide behind the clouds */}
        <div className="cloud-backing" style={styles.cloudBacking} />
        <div className="cloud2-backing" style={styles.cloud2Backing} />

        {/* Cloud — flows in from the right once the sky appears */}
        <div className="cloud" style={styles.cloud} />

        {/* Cloud 2 — flows in from the left, slightly lower */}
        <div className="cloud2" style={styles.cloud2} />

        {/* "One dad." — falls from the top, meets the cloud, then swaps to "One tiny legend." */}
        <p className="one-dad" style={styles.oneDad}>One dad.</p>
        <p className="one-legend" style={styles.oneLegend}>One tiny legend.</p>

        {/* Keep-scrolling indicator — circular animation with rotating text */}
        <KeepScrolling />
      </div>
    </section>
  )
}

export default FrescoScene