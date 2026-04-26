# Éveil

**Éveil** is a minimalist habit and focus app built around one simple idea:

> Start your hour. Put your phone away. Return when it is over.

Instead of encouraging more screen time, Éveil is designed to help users consciously step away from their phone and dedicate one intentional hour to something that matters — learning, creating, resting, reflecting, or building a better life.

## Concept

Most productivity and habit apps want users to stay engaged with the app itself.  
Éveil does the opposite.

It acts as a doorway, not a destination.

The user sets a focus session, puts the phone aside, and spends that hour offline — fully present with their chosen activity.

Éveil is not about streak obsession, noisy gamification, or digital clutter.  
It is about intentional time, quiet discipline, and meaningful repetition.

## Core Idea

One hour a day can become:

- a new skill
- a finished project
- better health
- deeper focus
- a changed identity

**What will your hour become?**

## Vision

Éveil is being built as more than just a timer.

The long-term vision is to create a digital product that supports:

- focused offline time
- habit consistency without addiction loops
- elegant, minimal interaction
- emotional distance from compulsive phone use
- identity-based self-development

## MVP Goals

The first version focuses on simplicity.

### Planned MVP features

- Start a one-hour session
- Clean and distraction-free timer screen
- Encouragement to put the phone away
- Session completion flow
- Basic session history or tracking
- Minimal, elegant UI

## Design Principles

Éveil is guided by a few core principles:

- **Minimalism over noise**
- **Intentionality over engagement metrics**
- **Calm over stimulation**
- **Offline action over in-app activity**
- **Quality over feature bloat**

## Target User

Éveil is for people who want to:

- spend less time scrolling
- build a better relationship with their phone
- focus on meaningful goals
- create structure without pressure
- improve themselves one hour at a time

## Possible Use Cases

Users may use Éveil for:

- studying
- reading
- deep work
- writing
- drawing
- exercise
- journaling
- meditation
- learning a language
- building a side project

## Product Philosophy

Éveil is intentionally anti-addictive.

It should not become another app that competes for attention.  
Its role is to help the user leave the screen, not stay on it.

That philosophy shapes both product and design decisions.

## Project Status

This project is currently in early development / concept stage.

The repository is being used to explore:

- product direction
- UX structure
- MVP scope
- design language
- future implementation

## Live Demo

[eveil.life](https://eveil.life)

## Deployment Notes

Clerk production deployments must use the publishable key from the Clerk Production instance. In Vercel, set `VITE_CLERK_PUBLISHABLE_KEY` to the live publishable key. Keep `CLERK_SECRET_KEY` server-side only and never expose it through a `VITE_` variable.

If Clerk is configured with a production custom frontend API domain, `clerk.eveil.life` must resolve using the DNS records shown in the Clerk Dashboard. If the browser reports `ERR_NAME_NOT_RESOLVED` or `failed_to_load_clerk_js` for `clerk.eveil.life`, fix DNS in the domain provider or Vercel DNS; it is not a React or Vite code issue.

## Future Ideas

Potential future features may include:

- custom session lengths
- themed focus modes
- weekly reflections
- progress visualization
- gentle identity-based prompts
- premium design system / editorial-style experience
- Floating Life Map — days as animated nodes on a journey path
- The Shift — archetypal evolution after 30 days of consistency
- Carrie moment — daily reflection question personalized to user archetype
- Circles — intimate accountability groups of max 4 women

## Tech Direction

- Frontend: HTML / CSS / JS (MVP) → React / Next.js
- Hosting: Vercel
- Domain: eveil.life
- Future: Supabase (backend + auth), PWA or React Native

## Why the Name "Éveil"?

In French, **éveil** suggests awakening, awareness, and becoming more conscious.

That meaning reflects the heart of the product:
not just productivity, but waking up to how we spend our time.

## License

TBD
