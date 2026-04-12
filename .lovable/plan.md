

## The Science Legends Archive — Hackathon Build Plan

### Concept
Transform the existing HTML draft into a fully interactive React app styled as an aged research journal/library, with rich animations, mouse-reactive elements, and smooth transitions — all while using Gen-Z slang and Wikipedia-sourced content.

### Mapping to Required Components (min 4, need 1 hover + 1 scroll)

| Your Feature | Drive Component It Maps To |
|---|---|
| **Book pull-from-shelf animation** when selecting a scientist | **Home-Transition / Home page scroll** ✅ (scroll transition — mandatory) |
| **Scientist card hover** — line drawing morphs to portrait sketch | **hover effect carousel group** or **hover buttons** ✅ (hover effect — mandatory) |
| **Math ↔ Physics toggle** with animated background swap | **toggle** component |
| **Parallax old-paper layers** reacting to mouse cursor | **parallax animation** component |
| **Page loader** — ink bleeding onto paper | **animated loader** |
| **Horizontal scroll** for scientist timeline ribbon | **Horizontal Scroll** component |

That's **6 components** — well above the 4 minimum.

---

### Feature Breakdown

#### 1. Library Bookshelf Landing / Navigation
- Full-screen bookshelf background with book spines (each labeled with a scientist name)
- Clicking a spine **pulls the book out** with a 3D CSS transform, opens it, and reveals the notebook-style detail page inside
- Selecting another scientist **slides the book back** and pulls the next one — smooth sequential animation
- This replaces the current simple card grid as the primary navigation

#### 2. Mouse-Reactive Paper UI
- Subtle **parallax layers**: paper texture, coffee stains, ink splatters shift with cursor position
- Paper **crinkle/shadow** effect near the cursor (CSS radial gradient follows mouse)
- Slight page curl at corners on hover
- Candle flicker light effect (subtle warm glow that follows cursor)

#### 3. Scientist Icon Transition (Line Drawing → Portrait)
- Each scientist has TWO layered images: a simple line drawing (on top) and a detailed engraving/sketch (behind)
- On hover, the line drawing **fades out with a "sketching" animation** — strokes appear to complete themselves — revealing the detailed portrait beneath
- Uses CSS clip-path or mask animation to simulate the drawing being completed stroke by stroke
- Based on the uploaded reference images (Einstein, Newton)

#### 4. Math ↔ Physics Toggle
- Styled as an old brass lever/switch on the paper
- **Math mode**: background subtly shows faint equation watermarks (∑, ∫, π), blue-tinted ink
- **Physics mode**: background shows faint diagrams (prisms, orbits, waves), red-tinted ink
- Smooth crossfade transition between the two watermark layers
- Content sections swap with a page-turn animation

#### 5. Detail Page (Inside the "Book")
- Retains the notebook aesthetic (ruled lines, margin line, holes, coffee stains)
- Sections: Vibe Check (intro), Key Contributions (toggleable math/physics), Fun Facts, Famous Quotes
- All text in Gen-Z slang pulled from Wikipedia facts
- Scroll-triggered animations for each section (fade-in, slide-in from margin)

#### 6. Additional Polish
- **Custom cursor**: old quill/pen icon
- **Page load animation**: ink bleeding/spreading to form the title
- **Horizontal scrolling timeline** ribbon showing key dates across all scientists
- **Responsive**: works on mobile as a single-column journal; bookshelf becomes a horizontal scroll of book spines

---

### Hackathon Edge — What Could Win It

Based on the rulebook scoring (Interactivity 25, Animation 20, Creativity 15, Components 20, AI Usage 20):

1. **Deploy to Vercel** — easy +10 bonus marks, don't skip this
2. **README**: list all 6 components and explain how each maps to a Drive reference
3. **AI Usage Doc**: save key prompts from this chat as your submission doc
4. **Sound design** (optional): subtle paper rustling on interactions, book thud when pulled from shelf — huge interactivity points
5. **Easter eggs**: hidden "doodles" in the margins that appear on certain interactions (e.g., a small rocket drawing appears when reading about Newton's laws)
6. **Scroll-triggered storytelling**: as you scroll through a scientist's page, equations/diagrams animate in the margins like someone is writing them in real-time — this hits the "scrollytelling" theme hard
7. **Performance**: use `will-change`, `transform` only animations to keep it 60fps — judges notice janky animations

### Tech Stack
- React + Vite + Tailwind (already set up)
- Framer Motion for complex animations (bookshelf, page transitions, parallax)
- CSS custom properties for the paper theme system
- Google Fonts: Special Elite, Lora, Caveat (from original)
- Images stored in `src/assets` for the scientist portraits

