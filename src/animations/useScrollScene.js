import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollScene — re-usable hook that runs a GSAP timeline
 * bound to a ScrollTrigger pinned scene.
 */
export const useScrollScene = (ref, config, deps = []) => {
  const tl = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          pinType: document.querySelector('.fresco-scene') ? 'fixed' : 'transform',
          invalidateOnRefresh: true,
          onToggle: (self) => document.documentElement.classList.toggle('is-pinned', self.isActive),
          ...config?.scrollTrigger,
        },
        ...config?.timeline,
      })
      config?.build(tl.current)
    }, ref)

    let raf = 0
    const scheduleRefresh = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    window.addEventListener('resize', scheduleRefresh)
    window.visualViewport?.addEventListener('resize', scheduleRefresh)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', scheduleRefresh)
      window.visualViewport?.removeEventListener('resize', scheduleRefresh)
      document.documentElement.classList.remove('is-pinned')
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return tl
}