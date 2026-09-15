---
name: ai-image-generation-pollinations
description: "Generate AI images for free with Pollinations.ai — no signup, no API key, no credits. Models: flux, turbo, kontext (image-to-image), stable-diffusion. Capabilities: text-to-image, image-to-image transforms, custom sizes, seeded/reproducible generation. Use for: AI art, mockups, placeholder images, hero images, icons, illustrations, concept art for any project. Triggers: generate image, ai image, text to image, flux, pollinations, free image generation, ai art, stable diffusion, create image, image generator, placeholder image, hero image, mockup image"
allowed-tools: Bash(curl *)
---

# AI Image Generation (Pollinations.ai — Free)

Generate images with [Pollinations.ai](https://pollinations.ai) — a free, open, no-signup image generation API. No CLI to install, no credits, no API key required for basic use.

## Quick Start

Just hit a URL. The prompt goes directly in the path, URL-encoded.

```bash
curl -o output.jpg "https://image.pollinations.ai/prompt/a%20cat%20astronaut%20in%20space"
```

That's it — no login, no auth, no install step.

## Parameters

Append as query params on the same URL:

| Parameter | Type    | Description                                    | Default | Example  |
|-----------|---------|-------------------------------------------------|---------|----------|
| model     | string  | `flux` (default, high quality), `turbo` (fast)   | flux    | turbo    |
| width     | integer | Image width in pixels                            | 1024    | 1920     |
| height    | integer | Image height in pixels                            | 1024    | 1080     |
| seed      | integer | Fixed seed for reproducible results               | random  | 42       |
| nologo    | boolean | Remove watermark (requires free account)          | false   | true     |
| enhance   | boolean | Let the model auto-improve your prompt            | false   | true     |
| safe      | boolean | Strict NSFW filtering (errors on flagged content) | false   | true     |
| private   | boolean | Don't show the image in the public feed           | false   | true     |

## Examples

### Basic image

```bash
curl -o sunset.jpg "https://image.pollinations.ai/prompt/beautiful%20sunset%20over%20ocean"
```

### Custom size + fixed seed (for reproducible results)

```bash
curl -o city.jpg "https://image.pollinations.ai/prompt/cyberpunk%20city%20at%20night?width=1920&height=1080&seed=42&model=flux"
```

### Fast draft with turbo model

```bash
curl -o draft.jpg "https://image.pollinations.ai/prompt/product%20mockup%20on%20white%20background?model=turbo"
```

### Image-to-image transform (kontext model)

Transform an existing image based on a text prompt. Pass the source image URL as `image`.

```bash
curl -o transformed.jpg "https://image.pollinations.ai/prompt/turn%20this%20into%20a%20watercolor%20painting?model=kontext&image=https://example.com/photo.jpg"
```

### List available models

```bash
curl https://image.pollinations.ai/models
```

## Using in a website directly (no download needed)

The URL itself IS a valid image source — you can drop it straight into an `<img>` tag or CSS background, no backend fetch required:

```html
<img src="https://image.pollinations.ai/prompt/hero%20banner%20mountain%20landscape?width=1600&height=600" alt="Hero banner">
```

```javascript
const prompt = encodeURIComponent("a friendly robot mascot logo");
const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&nologo=true`;
```

## Rate Limits & Upgrading (still free)

| Tier      | Rate limit            | Notes                                  |
|-----------|------------------------|-----------------------------------------|
| Anonymous | 1 request / 15 sec     | No signup, works immediately            |
| Seed      | 1 request / 5 sec      | Free registration at auth.pollinations.ai — also removes watermark |

For a personal site or occasional generation, the anonymous tier is normally enough. If you're generating a lot of images (e.g. batch-generating assets for a build), register for free at [auth.pollinations.ai](https://auth.pollinations.ai) to raise the limit and drop the watermark — still $0.

## Notes

- URL-encode the prompt (spaces → `%20` or use `+`). In Python use `urllib.parse.quote`, in JS use `encodeURIComponent`.
- Adding `?referrer=yourapp.com` on web requests helps Pollinations attribute traffic and can improve reliability — optional but good practice.
- No `allowed-tools` beyond `curl` are needed; this skill has no external CLI dependency.
