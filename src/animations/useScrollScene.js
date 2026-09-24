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

    // Debounced, scroll-aware refresh: never re-measure the pin while the
    // user is actively scrubbing (toolbar show/hide fires visualViewport
    // resize mid-scroll — an immediate refresh() there causes a jump).
    let refreshTimer = 0
    let lastScrollAt = 0
    const markScroll = () => { lastScrollAt = Date.now() }
    const scheduleRefresh = (delay) => {
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => {
        if (Date.now() - lastScrollAt < 500) { scheduleRefresh(delay); return; }
        ScrollTrigger.refresh()
      }, delay)
    }
    const onResize = () => scheduleRefresh(300)
    const onViewportResize = () => scheduleRefresh(600)
    window.addEventListener('scroll', markScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.visualViewport?.addEventListener('resize', onViewportResize)

    return () => {
      clearTimeout(refreshTimer)
      window.removeEventListener('scroll', markScroll)
      window.removeEventListener('resize', onResize)
      window.visualViewport?.removeEventListener('resize', onViewportResize)
      document.documentElement.classList.remove('is-pinned')
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return tl
}