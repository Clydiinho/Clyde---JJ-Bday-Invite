import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const nameRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(textRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2 })
      .fromTo(nameRef.current, { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, '-=0.6')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.4')

    return () => tl.kill()
  }, [])

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-black/50 pointer-events-none" />

      <div ref={textRef} className="relative z-10">
        <p className="text-amber-400/80 tracking-[0.3em] uppercase text-sm md:text-base mb-6 font-sans">You&apos;re Invited</p>
      </div>

      <h1 ref={nameRef} className="relative z-10 text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 leading-none">
        Birthday
        <span className="block text-amber-400">Celebration</span>
      </h1>

      <p className="relative z-10 text-white/60 text-lg md:text-xl max-w-xl font-sans mb-12">
        Join us for an unforgettable evening of joy, laughter, and celebration
      </p>

      <a
        href="#rsvp"
        className="relative z-10 inline-block border-2 border-amber-400 text-amber-400 px-10 py-4 tracking-[0.2em] uppercase text-sm font-sans hover:bg-amber-400 hover:text-black transition-all duration-500"
      >
        Confirm Attendance
      </a>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
