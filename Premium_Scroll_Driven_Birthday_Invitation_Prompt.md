# Premium Scroll-Driven Birthday Invitation Website

## Role
You are an award-winning creative developer specializing in immersive storytelling websites.

Build a production-ready **React + Vite** application using GSAP, ScrollTrigger and Framer Motion.

## Assets
- background.png
- father.png
- son.png
- gold-particles.png
- cloud-particles.png

Use these exact assets. Do not recreate them.

## Experience
Create a cinematic scroll experience. The hero is pinned to the viewport and only the painting background is visible at first.

### Scroll Timeline

#### 0–20%
- Show only the background.
- Father: opacity 0, translateX(-250px)
- Son: opacity 0, translateX(250px)

#### 20–60%
Reveal both characters with a textured fresco paint-mask while they slowly drift into place.
No scaling or rotation.

#### 60–75%
Continue the movement very subtly until the fingertips almost touch.

#### 75%
Pause briefly (~0.3s).
Create a soft golden glow, floating dust and gold particles around the fingertips.

### Clouds
Duplicate the cloud particle asset several times with different parallax speeds and low opacity.

### Gold Particles
Duplicate the gold particle asset and animate upward drift, slight rotation and fade.

### Dissolve
Do not fade the page.
Dissolve each layer independently:
1. Father
2. Background
3. Son
4. Clouds
5. Remaining particles

Reveal a warm cream background (#F8F4EC, #F2EEE8 or #EFE8DD).

## Invitation Section
Fade up into a centered invitation.

```js
export const birthday = {
  child: "Jorge",
  age: 2,
  date: "",
  time: "",
  venue: "",
  rsvp: ""
}
```

Display:
- You're Invited
- Child name
- Date
- Time
- Venue
- RSVP button

## Folder Structure

```text
src/
  assets/
  animations/
  components/
  hooks/
  sections/
  styles/
  utils/
  App.jsx
  main.jsx
```

## Technical Requirements
- React + Vite
- GSAP + ScrollTrigger
- Framer Motion
- Component architecture
- Reusable animation hooks
- GPU accelerated
- Responsive
- Preload hero assets
- Production ready
- No TODOs or placeholder code

## Final Goal
The experience should feel like an ancient Renaissance fresco comes alive: the father and son are painted into existence, reach toward one another, touch fingertips in a divine golden glow, then the painting crumbles into dust to reveal an elegant birthday invitation.
