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
          scrub: true,
          pin: true,
          anticipatePin: 1,
          ...config?.scrollTrigger,
        },
        ...config?.timeline,
      })
      config?.build(tl.current)
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return tl
}