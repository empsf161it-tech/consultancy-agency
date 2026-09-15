# Vanguard Strategy Partners — Consulting Agency Website

A modern, luxury-refined corporate website engineered for top-tier business and management consulting firms. Designed with executive authority, clean editorial typography, and full responsiveness across desktop, tablet, and mobile devices.

---

## 🏛️ Brand & Aesthetic Direction
- **Industry / Niche**: Business Consulting / Management Consulting / Corporate Finance Advisory
- **Aesthetic**: Luxury-Refined & Editorial Corporate
- **Color Palette (Max 3 Primary Tokens)**:
  - **Primary**: Deep Executive Midnight Navy (`#0A192F` | Dark Mode: `#070D18`)
  - **Secondary**: Slate Charcoal (`#1E293B` | Dark Mode: `#94A3B8`)
  - **Accent**: Champagne Bronze Gold (`#C5A059` | Dark Mode: `#D4AF37`)
- **Typography Pairing**:
  - Headings: `'Outfit', sans-serif` (Google Font)
  - Body & UI: `'DM Sans', sans-serif` (Google Font)
  - Strict Intermediate Weights: H1 (580), H2 (540), H3 (520), H4–H6 (500), Body (420), Lead (460), Button (510), Label (470), Caption (400), Bold Inline (500). **Headings never exceed font-weight 580**.
- **Border Radius**: Unified global token `--border-radius: 12px;`
- **Shadow Style**: Unified global shadow `--box-shadow: 0 10px 30px -10px rgba(10, 25, 47, 0.08);`
- **Icon Library**: Remix Icons (`ri-*` via CDN)
- **Photography**: Unsplash CDN business, finance, and corporate imagery with zero repeated images.

---

## 📁 File Structure

```
d:\karthii\New folder\
├── index.html            # Primary Home: Staggered hero reveal, statistics, services, about, case studies, testimonials, team, FAQ, CTA
├── home2.html            # Alternative Home: Split layout with interactive consulting ROI / EBITDA calculator, capabilities matrix
├── services.html         # Consulting Solutions: 6 specialized practices, engagement pricing & partnership models
├── about.html            # Firm Pedigree: Mission & vision, 18-year interactive milestones timeline, global hubs
├── blog.html             # Executive Insights: Filterable thought leadership, search & category navigation
├── blog-single.html      # Editorial Memorandum: Key takeaways callout, pull-quotes, author card, related reading
├── contact.html          # Consultation Request: Client-side validated form, direct partner lines, interactive map canvas
├── login.html            # Centered auth layout (no scroll), Google & Apple SSO, full validation, link to Register (no theme toggle)
├── register.html         # Centered registration, Terms checkbox validation, Google & Apple SSO, link to Login (no theme toggle)
├── dashboard.html        # Client Advisory Portal: KPI cards, active workstreams, deliverable vault, milestone tracking
├── 404.html              # Custom luxury error page with return navigation
├── coming-soon.html      # Flagship research countdown timer, embargoed report email capture
├── assets/
│   ├── css/
│   │   ├── style.css     # Design tokens, typography rules, dark mode overrides, layout grids, components, breakpoints
│   │   └── rtl.css       # Dedicated RTL overrides with logical properties and left-sliding drawer
│   └── js/
│       ├── main.js       # Sticky nav, mobile drawer, theme toggle, RTL toggle, form validation, FAQ accordion, filter, ROI calculator
│       └── dashboard.js  # Advisory portal tabs, workstream filters, metric period simulator
└── README.md             # Project documentation and specifications
```

---

## ⚡ Key Features & Requirements Compliance

### 1. Navigation & Hamburger Threshold
- **`> 1024px`**: Full horizontal navbar displaying all navigation links (`Home | Home 2 | Services | Case Studies | About | Blog | Contact | Dashboard`), Desktop Theme Toggle, Desktop RTL Toggle (`⇆`), and `Login` button.
- **`≤ 1024px`**: Desktop menu and action buttons hidden; hamburger trigger activates a slide-drawer with smooth overlay backdrop blur and touch-friendly 48px links.
- **`360px`**: Drawer expands to full width with centered touch targets.
- **Auth Pages (`login.html`, `register.html`)**: **Zero theme toggles** and **zero back-to-home buttons** to guarantee distraction-free authentication.

### 2. Bidirectional RTL Support
- Instant toggle between LTR and RTL directions using the `⇆` (`ri-arrow-left-right-line`) button.
- Toggles `dir="rtl"` on `<html>` and `.rtl` on `<body>`.
- Overridden in `assets/css/rtl.css`: drawer slides from the **left** in RTL mode, text and form alignments reverse logically, and directional arrow icons flip horizontally.
- RTL state persists in browser `localStorage`.

### 3. Dark / Light Mode
- Respects system `prefers-color-scheme` by default; toggled via dedicated button in header (desktop) or mobile drawer.
- Implemented via `[data-theme="dark"]` on `<html>` in `assets/css/style.css`.
- Persists across sessions in `localStorage`.

### 4. Client-Side Form Validation (No Page Reload)
- Contact form, newsletter inputs, login, register, and coming soon forms all feature real-time client validation.
- Validates required fields, email format regex, password length (minimum 8 characters), password matching on registration, and terms acceptance checkbox.
- Visual error state: red border (`is-invalid`) + inline error message below field.
- Visual success state: green border (`is-valid`) + inline success banner on submission.

### 5. Interactive Features
- **Home 2 ROI Calculator**: Live sliders adjusting enterprise revenue and operational efficiency to dynamically calculate projected EBITDA expansion.
- **FAQ Accordion**: Smooth expand/collapse animation for advisory questions.
- **Blog Category Filter**: Instant multi-category filtering for thought leadership articles without page reload.
- **Client Advisory Portal**: Multi-tab engagement space with KPI toggles, workstream status filtering, and downloadable deliverables.
- **Coming Soon Countdown**: Real-time JavaScript timer counting down days, hours, minutes, and seconds.

---

## 🚀 Running Locally
Open any HTML file directly in modern web browsers (Chrome, Firefox, Safari, Edge) or serve via local development server:
```bash
# Optional: Using Python built-in server
python -m http.server 8080

# Or using Node.js npx serve
npx -y serve ./
```
Navigate to `http://localhost:8080/index.html`.
