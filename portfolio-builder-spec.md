# Portfolio Builder — Product Specification

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | Clerk |
| File Storage | Cloudinary |
| Hosting (FE) | Vercel |
| Hosting (BE) | Railway |
| Email | Resend |

---

## Project Structure

```
portfolio-builder/
├── client/                          # React frontend
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                  # Static images, fonts
│   │   ├── components/
│   │   │   ├── common/              # Reusable UI components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   └── ConfirmDialog.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── DashboardLayout.jsx
│   │   │   ├── editor/              # Portfolio editor components
│   │   │   │   ├── EditorCanvas.jsx
│   │   │   │   ├── SectionToolbar.jsx
│   │   │   │   ├── DragDropContext.jsx
│   │   │   │   ├── SectionRenderer.jsx
│   │   │   │   └── LivePreview.jsx
│   │   │   ├── sections/            # Portfolio section types
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── AboutSection.jsx
│   │   │   │   ├── ProjectsSection.jsx
│   │   │   │   ├── SkillsSection.jsx
│   │   │   │   ├── ExperienceSection.jsx
│   │   │   │   ├── EducationSection.jsx
│   │   │   │   ├── ContactSection.jsx
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   └── CustomSection.jsx
│   │   │   ├── templates/           # Template selection & preview
│   │   │   │   ├── TemplateCard.jsx
│   │   │   │   ├── TemplateGallery.jsx
│   │   │   │   └── TemplatePreview.jsx
│   │   │   ├── portfolio/           # Public portfolio rendering
│   │   │   │   ├── PortfolioView.jsx
│   │   │   │   ├── PortfolioHeader.jsx
│   │   │   │   └── PortfolioFooter.jsx
│   │   │   └── dashboard/           # Dashboard widgets
│   │   │       ├── AnalyticsCard.jsx
│   │   │       ├── PortfolioList.jsx
│   │   │       └── QuickActions.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Editor.jsx
│   │   │   ├── Templates.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── PublicPortfolio.jsx
│   │   │   └── NotFound.jsx
│   │   ├── hooks/
│   │   │   ├── usePortfolio.js
│   │   │   ├── useAutoSave.js
│   │   │   ├── useCloudinary.js
│   │   │   ├── useAnalytics.js
│   │   │   └── useDragDrop.js
│   │   ├── context/
│   │   │   ├── EditorContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance + interceptors
│   │   │   ├── portfolioService.js
│   │   │   ├── templateService.js
│   │   │   ├── uploadService.js
│   │   │   └── analyticsService.js
│   │   ├── utils/
│   │   │   ├── validators.js
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── router.jsx
│   ├── .env.example
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                # MongoDB connection
│   │   │   ├── cloudinary.js        # Cloudinary config
│   │   │   ├── clerk.js             # Clerk webhook + middleware
│   │   │   └── resend.js            # Email config
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Portfolio.js
│   │   │   ├── Template.js
│   │   │   └── Analytics.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── portfolio.routes.js
│   │   │   ├── template.routes.js
│   │   │   ├── upload.routes.js
│   │   │   ├── analytics.routes.js
│   │   │   └── public.routes.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── portfolio.controller.js
│   │   │   ├── template.controller.js
│   │   │   ├── upload.controller.js
│   │   │   ├── analytics.controller.js
│   │   │   └── public.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.js              # Clerk JWT verification
│   │   │   ├── rateLimiter.js
│   │   │   ├── errorHandler.js
│   │   │   ├── validateRequest.js
│   │   │   └── uploadMiddleware.js   # Multer config
│   │   ├── services/
│   │   │   ├── emailService.js
│   │   │   ├── cloudinaryService.js
│   │   │   └── analyticsService.js
│   │   ├── utils/
│   │   │   ├── slugify.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   └── app.js                   # Express app setup
│   ├── .env.example
│   ├── server.js                    # Entry point
│   └── package.json
│
├── .gitignore
├── README.md
└── docker-compose.yml               # Local dev (MongoDB, Redis)
```

---

## Global Design System

### US-0.1 — Design Tokens & Tailwind Theme

**As a** developer,
**I want to** have a consistent design system configured in Tailwind,
**so that** every page and component shares a unified visual language.

**Acceptance Criteria:**
- [ ] `tailwind.config.js` defines a custom colour palette: `brand-50` through `brand-900` (primary blue-indigo range), `accent` (warm amber/orange), `surface` (neutral grays for cards/backgrounds), `success` (green), `warning` (amber), `error` (red)
- [ ] Two font families configured: a geometric sans-serif for headings (e.g. Inter or Plus Jakarta Sans) and a clean sans-serif for body text (e.g. Inter or DM Sans)
- [ ] Consistent spacing scale: cards use `p-6`, sections use `py-16 md:py-24`, page max-width is `max-w-7xl mx-auto`
- [ ] Border radius tokens: `rounded-lg` for cards, `rounded-xl` for modals, `rounded-full` for avatars and pills
- [ ] Shadow tokens: `shadow-sm` for subtle cards, `shadow-lg` for elevated modals and dropdowns
- [ ] Transition defaults: `transition-all duration-200 ease-in-out` on all interactive elements
- [ ] Dark mode support via Tailwind's `dark:` variant (app shell uses dark mode, portfolio themes are user-controlled)

### US-0.2 — Reusable UI Component Library

**As a** developer,
**I want to** have a set of shared UI components,
**so that** the entire app has consistent interactions and visuals.

**Acceptance Criteria:**
- [ ] **Button.jsx**: Variants — `primary` (solid brand colour, white text), `secondary` (outlined, brand border), `ghost` (transparent with hover background), `danger` (red). Sizes — `sm`, `md`, `lg`. Supports `loading` state with a spinner replacing the label. Disabled state reduces opacity to 50% and blocks pointer events.
- [ ] **Input.jsx**: Styled text input with label above, placeholder text in gray-400, focus ring in brand colour (`ring-2 ring-brand-500`). Supports `error` state with red border and error message below. Supports `disabled` state. Optional left/right icon slots.
- [ ] **Modal.jsx**: Centred overlay with `bg-black/50` backdrop, white card with `rounded-xl shadow-2xl`, header with title and X close button, scrollable body, sticky footer with action buttons. Closes on backdrop click and Escape key. Animates in with scale + fade (from 95% opacity/scale to 100%).
- [ ] **Toast.jsx**: Fixed bottom-right position, pill-shaped with icon (checkmark for success, X for error, info icon for info). Auto-dismisses after 4 seconds with a shrinking progress bar. Stacks multiple toasts vertically with `gap-3`. Slide-in animation from the right.
- [ ] **ConfirmDialog.jsx**: Modal variant with warning icon, bold title, descriptive body text, and two buttons — a ghost "Cancel" and a danger "Delete"/"Confirm". Used before all destructive actions.
- [ ] **Loader.jsx**: Full-page variant (centred spinner with brand colour on white background) and inline variant (small spinner next to text). Uses CSS animation, not GIF.

### US-0.3 — Global Navigation Bar

**As a** user,
**I want to** see a consistent navigation bar across the app,
**so that** I can easily move between pages.

**Acceptance Criteria:**
- [ ] Navbar is a sticky `top-0` bar with `bg-white dark:bg-gray-900 border-b border-gray-200` and `h-16`
- [ ] Left side: App logo (text-based "PortfolioBuilder" in brand colour with a small geometric icon, or custom SVG logo) that links to dashboard if logged in, landing page if not
- [ ] Right side (logged out): "Log In" ghost button and "Get Started" primary button
- [ ] Right side (logged in): "Templates" link, "Dashboard" link, and a user avatar dropdown
- [ ] User avatar dropdown contains: display name and email at top (non-clickable), "Settings" link, "Help" link, divider, "Sign Out" button
- [ ] Dropdown opens on click with a subtle scale animation, closes on outside click
- [ ] On mobile (below `md`): links collapse into a hamburger menu icon; clicking it opens a full-height slide-in drawer from the right with all nav items stacked vertically
- [ ] Active page link has a `border-b-2 border-brand-500` underline indicator
- [ ] Navbar has `z-50` to stay above all page content

---

## Epic 1: Authentication & User Management

### US-1.1 — User Registration

**As a** new visitor,
**I want to** create an account using email or social login,
**so that** I can start building my portfolio.

**Acceptance Criteria:**
- [ ] User can sign up via email/password through Clerk
- [ ] User can sign up via Google OAuth
- [ ] User can sign up via GitHub OAuth
- [ ] On first sign-up, a User document is created in MongoDB via Clerk webhook
- [ ] User is redirected to the dashboard after successful registration
- [ ] Duplicate email registration shows a clear error message
- [ ] Password must meet minimum requirements (8+ chars, 1 uppercase, 1 number)
- [ ] A welcome email is sent via Resend upon successful registration

### US-1.2 — User Login

**As a** returning user,
**I want to** log into my account,
**so that** I can access and manage my portfolios.

**Acceptance Criteria:**
- [ ] User can log in with email/password
- [ ] User can log in with Google or GitHub
- [ ] Invalid credentials show a clear, non-specific error message
- [ ] Session persists across browser refreshes (Clerk session management)
- [ ] User is redirected to the dashboard after login
- [ ] "Forgot password" flow sends a reset email

### US-1.3 — User Profile Settings

**As a** logged-in user,
**I want to** manage my account settings,
**so that** I can update my personal details and preferences.

**Acceptance Criteria:**
- [ ] User can update display name and email
- [ ] User can upload/change a profile avatar (stored in Cloudinary)
- [ ] User can change their password
- [ ] User can delete their account (with confirmation dialog)
- [ ] Account deletion removes all portfolios, uploads, and analytics data
- [ ] User can toggle email notification preferences
- [ ] Changes save with a visible success/error toast

### US-1.4 — Auth Pages UI

**As a** visitor,
**I want to** see a clean, trustworthy sign-up and login experience,
**so that** I feel confident creating an account.

**Acceptance Criteria:**
- [ ] Auth pages use Clerk's hosted/embedded components, styled to match the app's brand colours and font
- [ ] Clerk components are wrapped in a centred layout: vertically and horizontally centred on the viewport
- [ ] Left side (desktop only, hidden on mobile): a full-height decorative panel with a gradient background (`from-brand-600 to-brand-800`), the app logo in white, a tagline like "Build your portfolio in minutes", and a subtle decorative illustration or abstract SVG pattern
- [ ] Right side: the Clerk sign-in/sign-up component on a white card
- [ ] Social login buttons (Google, GitHub) appear above the email form with visible brand icons and "Continue with Google" / "Continue with GitHub" labels
- [ ] A divider with "or" text separates social buttons from the email/password form
- [ ] Page has no navbar — clean full-bleed layout
- [ ] Below the Clerk form: a small link toggling between "Already have an account? Log in" and "Don't have an account? Sign up"

### US-1.5 — Settings Page UI

**As a** logged-in user,
**I want to** see a well-organised settings page,
**so that** I can easily find and update my preferences.

**Acceptance Criteria:**
- [ ] Settings page uses the `DashboardLayout` with sidebar navigation
- [ ] Page has a left-side vertical tab nav with sections: "Profile", "Account", "Notifications", "Danger Zone"
- [ ] On mobile, the tab nav becomes horizontal scrollable pills at the top of the page
- [ ] **Profile tab**: Avatar upload area (circular, 96px, with a camera overlay icon on hover that opens the file picker), display name input, email input (read-only with Clerk badge), bio textarea. "Save Changes" primary button at the bottom.
- [ ] **Account tab**: "Change Password" section with current/new/confirm password fields. "Connected Accounts" section showing linked Google/GitHub with connect/disconnect toggles.
- [ ] **Notifications tab**: Toggle switches (styled as pill toggles with brand colour when active) for: email on new contact form submission, email on weekly analytics digest, product updates.
- [ ] **Danger Zone tab**: Red-bordered card with "Delete Account" button. Clicking opens a `ConfirmDialog` that requires typing the user's email to confirm. Warning text explains that all portfolios and data will be permanently deleted after 30 days.
- [ ] All sections have clear section headings (`text-lg font-semibold`) with subtle descriptions in `text-gray-500` below them

---

## Epic 2: Template System

### US-2.1 — Browse Templates

**As a** user,
**I want to** browse a gallery of pre-built portfolio templates,
**so that** I can choose a starting point for my portfolio.

**Acceptance Criteria:**
- [ ] Template gallery page shows all available templates as cards
- [ ] Each card displays a thumbnail preview, template name, and category tag
- [ ] Templates can be filtered by category (Developer, Designer, Freelancer, Minimal, Creative)
- [ ] Templates can be sorted by popularity and newest
- [ ] Gallery is responsive — 3 columns on desktop, 2 on tablet, 1 on mobile
- [ ] Loading skeleton is shown while templates are being fetched

### US-2.2 — Preview Template

**As a** user,
**I want to** preview a template in full before choosing it,
**so that** I can see exactly what it looks like with sample content.

**Acceptance Criteria:**
- [ ] Clicking a template card opens a full-page preview
- [ ] Preview shows the template populated with realistic sample data
- [ ] User can toggle between desktop and mobile preview
- [ ] Preview includes a "Use This Template" CTA button
- [ ] User can navigate back to the gallery without losing their place
- [ ] Preview loads within 2 seconds

### US-2.3 — Select Template

**As a** user,
**I want to** select a template to start building my portfolio,
**so that** I don't have to design everything from scratch.

**Acceptance Criteria:**
- [ ] Clicking "Use This Template" creates a new portfolio based on that template
- [ ] The new portfolio copies the template's section structure and default styling
- [ ] User is redirected to the editor with the template loaded
- [ ] The portfolio is saved as a draft in the database immediately
- [ ] User can change templates later (with a warning about losing customisations)

### US-2.4 — Template Gallery Page UI

**As a** user,
**I want to** see an attractive and browsable template gallery,
**so that** I can visually compare templates and pick the best one.

**Acceptance Criteria:**
- [ ] Page header: large heading "Choose a Template" (`text-3xl font-bold`), subtitle "Pick a starting point — you can customise everything later" in `text-gray-500`, both centred
- [ ] Below the header: a horizontal filter bar with pill-shaped buttons for categories — "All", "Developer", "Designer", "Freelancer", "Minimal", "Creative". Active pill has `bg-brand-500 text-white`, inactive has `bg-gray-100 text-gray-700 hover:bg-gray-200`. Right-aligned sort dropdown: "Popular" / "Newest"
- [ ] Templates display as a `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` below the filter bar
- [ ] **TemplateCard.jsx**: White card with `rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow`. Top 60% is a thumbnail image (aspect-ratio 16/9, `object-cover`). Bottom 40% is a padded area with: template name (`font-semibold text-lg`), category as a small coloured pill badge (`text-xs px-2 py-0.5 rounded-full`), and a subtle "Preview →" text link. On hover, the thumbnail slightly zooms in (`scale-105`) with `overflow-hidden` on the card to clip.
- [ ] While loading, show 6 skeleton cards with a pulsing gray rectangle for the thumbnail and two pulsing gray bars for name/category
- [ ] If no templates match a filter, show an empty state: illustration icon, "No templates found" text, and "Clear filters" link
- [ ] Page uses `max-w-7xl mx-auto px-4` with `py-12` vertical padding

### US-2.5 — Template Preview Modal UI

**As a** user,
**I want to** see a full-screen preview of a template,
**so that** I can evaluate it properly before committing.

**Acceptance Criteria:**
- [ ] Preview opens as a full-screen overlay (`fixed inset-0 z-50 bg-white`) with a sticky top bar
- [ ] Top bar (`h-14 bg-white border-b shadow-sm`): left side has a "← Back to Templates" button (ghost style with arrow icon), centre has device toggle buttons (desktop/tablet/mobile icons, active one has `bg-brand-100 text-brand-600` highlight), right side has a large "Use This Template" primary button
- [ ] Below the top bar, the template preview is rendered inside an iframe-like container that is centred on the page
- [ ] Desktop preview: full-width container. Tablet preview: 768px-wide container with a gray background and subtle device frame border. Mobile preview: 375px-wide container with a rounded device frame aesthetic (border, top notch bar)
- [ ] The preview container has a smooth width transition (`transition-all duration-300`) when toggling devices
- [ ] Template is rendered with realistic placeholder content: a real-sounding name ("Alex Chen"), a tagline ("Full-Stack Developer"), sample project cards with placeholder images (use gradient placeholders or abstract SVGs), sample skills, and a sample contact section
- [ ] Scroll within the preview container is independent from the page body

### US-2.6 — Built-In Template Designs

**As a** user,
**I want to** have high-quality template options to choose from,
**so that** my portfolio looks professional without design effort.

**Acceptance Criteria:**
- [ ] **"Developer" template**: Clean, code-inspired aesthetic. Hero section has a dark navy/charcoal background with the user's name in large white text, a green-tinted monospace tagline (like a terminal prompt), and two CTA buttons. Projects section uses a 2-column card grid with hover overlays showing tech stack tags. Skills section uses a horizontal bar chart or tag cloud. Colour scheme: dark navy bg, emerald/green accents, white text.
- [ ] **"Designer" template**: Elegant, whitespace-heavy layout. Hero is minimal with a large serif heading, thin subtitle, and a single understated CTA. Projects section uses a masonry or asymmetric grid with large image previews and minimal text. About section features a large circular profile photo beside flowing paragraph text. Colour scheme: off-white background, black text, a single warm accent colour (coral or terracotta).
- [ ] **"Freelancer" template**: Friendly, conversion-oriented design. Hero has a split layout — left side text with name, services offered as animated typed text, and a prominent "Hire Me" CTA; right side has a profile photo or illustration. Testimonials section is prominent with a carousel of quote cards. Contact section has a bold CTA area with a form. Colour scheme: white background, vibrant blue primary, warm yellow accent.
- [ ] **"Minimal" template**: Ultra-clean, single-column layout. Entire portfolio is one scrolling page with generous whitespace. Sections are separated by subtle horizontal rules. No background colours — just typography hierarchy. Heading in a modern sans-serif, body in a slightly smaller weight. Colour scheme: white background, near-black text, single muted accent (slate blue or warm gray).
- [ ] **"Creative" template**: Bold, expressive layout with personality. Hero uses a full-bleed gradient or image background with large overlaid text and an animated scroll indicator. Projects section uses large, full-width alternating image/text rows. A marquee or scrolling ticker with skills/tools. Colour scheme: vibrant gradients (purple-to-pink or blue-to-teal), white text, playful accent colours.
- [ ] Each template stores its full section structure, default content, and theme configuration in the Template MongoDB document
- [ ] Each template has a high-quality thumbnail (1200x800 minimum) generated from its rendered preview for the gallery

---

## Epic 3: Portfolio Editor

### US-3.1 — Add & Remove Sections

**As a** user,
**I want to** add and remove sections in my portfolio,
**so that** I can control what content appears on my page.

**Acceptance Criteria:**
- [ ] Sidebar/toolbar shows all available section types (Hero, About, Projects, Skills, Experience, Education, Contact, Testimonials, Custom)
- [ ] User can add a section by clicking it in the toolbar
- [ ] New section is added at the bottom of the portfolio by default
- [ ] User can remove a section via a delete button with confirmation
- [ ] Removing a section does not affect other sections
- [ ] At least one section (Hero) is required and cannot be removed
- [ ] Maximum of 15 sections per portfolio

### US-3.2 — Reorder Sections via Drag and Drop

**As a** user,
**I want to** drag and drop sections to reorder them,
**so that** I can arrange my portfolio layout as I see fit.

**Acceptance Criteria:**
- [ ] User can click and hold a section's drag handle to initiate dragging
- [ ] Visual feedback shows the section being dragged and the target drop position
- [ ] Dropping a section in a new position reorders the portfolio immediately
- [ ] Section order persists after saving
- [ ] Drag and drop works smoothly without layout jank
- [ ] On mobile, reorder is available via up/down arrow buttons as a fallback

### US-3.3 — Edit Section Content

**As a** user,
**I want to** edit the content within each section,
**so that** I can personalise my portfolio with my own information.

**Acceptance Criteria:**
- [ ] Clicking a section opens an inline editing panel or side panel
- [ ] Text fields support basic rich text (bold, italic, links)
- [ ] Hero section: editable name, tagline, subtitle, CTA button text and link
- [ ] About section: editable bio text, profile image upload
- [ ] Projects section: add/edit/remove project cards (title, description, image, tags, links)
- [ ] Skills section: add/remove skills with optional proficiency level
- [ ] Experience section: add/edit/remove entries (company, role, dates, description)
- [ ] Education section: add/edit/remove entries (institution, degree, dates)
- [ ] Contact section: editable email, social links, contact form toggle
- [ ] Testimonials section: add/edit/remove quotes (name, role, quote text, avatar)
- [ ] Custom section: editable title and rich text content
- [ ] All fields validate input (required fields, URL formats, date logic)
- [ ] Unsaved changes show a visual indicator

### US-3.4 — Upload Images & Media

**As a** user,
**I want to** upload images for my portfolio,
**so that** I can showcase my work visually.

**Acceptance Criteria:**
- [ ] User can upload images via file picker or drag-and-drop
- [ ] Accepted formats: JPG, PNG, WebP, GIF
- [ ] Maximum file size: 5MB per image
- [ ] Images are uploaded to Cloudinary and the returned URL is stored
- [ ] Upload progress indicator is shown during upload
- [ ] Images are automatically optimised and resized by Cloudinary
- [ ] User can remove/replace an uploaded image
- [ ] Error message is shown for invalid file type or oversized file

### US-3.5 — Auto-Save

**As a** user,
**I want to** have my changes auto-saved as I edit,
**so that** I never lose my work.

**Acceptance Criteria:**
- [ ] Changes are auto-saved to the backend every 10 seconds if edits have been made
- [ ] A "Saving..." indicator appears during save, changing to "Saved" on success
- [ ] Auto-save uses debouncing to avoid excessive API calls
- [ ] If auto-save fails (network error), user sees a warning with a manual "Retry" button
- [ ] Navigating away with unsaved changes triggers a browser confirmation dialog
- [ ] Last saved timestamp is visible in the editor

### US-3.6 — Live Preview

**As a** user,
**I want to** see a live preview of my portfolio as I edit,
**so that** I know exactly how it will look when published.

**Acceptance Criteria:**
- [ ] Editor has a split-pane or toggle mode showing the preview alongside the editor
- [ ] Preview updates in real-time as the user edits content
- [ ] User can toggle between desktop, tablet, and mobile preview widths
- [ ] Preview renders the portfolio exactly as it will appear when published
- [ ] Preview mode can be expanded to full-screen
- [ ] Preview accurately reflects current theme and styling choices

### US-3.7 — Customise Theme & Styling

**As a** user,
**I want to** customise the visual appearance of my portfolio,
**so that** it matches my personal brand.

**Acceptance Criteria:**
- [ ] User can select a colour scheme (primary, secondary, accent, background, text colours)
- [ ] User can choose from 5+ font pairings (heading + body)
- [ ] User can toggle between light and dark mode for the portfolio
- [ ] User can adjust section spacing (compact, normal, spacious)
- [ ] Style changes reflect immediately in the live preview
- [ ] Custom styles are saved per portfolio
- [ ] A "Reset to default" option restores the template's original styling

### US-3.8 — Editor Page Layout UI

**As a** user,
**I want to** see a professional, Figma-like editor interface,
**so that** building my portfolio feels intuitive and powerful.

**Acceptance Criteria:**
- [ ] Editor page is full-viewport (`h-screen`) with no page scroll — all scrolling is internal to panels
- [ ] **Top bar** (`h-14 bg-white border-b`): Left — "← Dashboard" back link and portfolio name (editable inline, click to type, blur to save). Centre — device preview toggles (desktop/tablet/mobile icons). Right — save status indicator ("Saved ✓" in green or "Saving..." with spinner), "Preview" ghost button (opens full-screen preview), and "Publish" primary button (or "Published ✓" green badge if already live, with a dropdown to unpublish or copy URL).
- [ ] **Left sidebar** (`w-64 bg-gray-50 border-r`, collapsible to icon-only `w-16` via a toggle chevron): Two tabs at the top — "Sections" and "Theme". Sections tab shows the ordered list of current sections with drag handles, visibility toggles (eye icon), and delete buttons (trash icon, grayed out for Hero). Below the list, an "Add Section" area with a grid of section type icons users can click to add. Theme tab shows the colour, font, mode, and spacing controls (see US-3.10).
- [ ] **Main canvas area** (fills remaining space, `bg-gray-100`): A centred white "page" container that shows the portfolio sections stacked vertically. Each section has a subtle dashed border on hover to indicate editability, and clicking a section selects it (highlighted with a `ring-2 ring-brand-500` outline). The canvas is scrollable.
- [ ] **Right panel** (`w-80 bg-white border-l`, slides in when a section is selected, hidden otherwise): Shows the editing form for the currently selected section. Has a header with the section type name and a close X button. Body is scrollable with all the relevant input fields for that section type. Footer has a "Done" button that deselects the section.
- [ ] On screens below `lg` (1024px), the left sidebar collapses to icon-only by default, and the right panel opens as a slide-over overlay instead of an inline panel
- [ ] Keyboard shortcut: `Cmd/Ctrl + S` triggers manual save, `Escape` deselects current section

### US-3.9 — Section Editing Panels UI

**As a** user,
**I want to** have clear, well-designed editing forms for each section type,
**so that** I can quickly fill in my information.

**Acceptance Criteria:**
- [ ] **Hero section panel**: "Display Name" text input, "Tagline" text input, "Subtitle" textarea (2 rows), "CTA Button Text" input, "CTA Button Link" URL input, profile image upload zone (circular preview with camera icon overlay). All inputs use the shared `Input.jsx` component.
- [ ] **About section panel**: Large textarea for bio (6 rows, with character count showing `X/500`), profile image upload zone (square with rounded corners, 200px preview), and a rich text toolbar above the textarea (bold, italic, link buttons).
- [ ] **Projects section panel**: A list of project cards, each as a collapsible accordion item showing the project title. Expanded view shows: title input, description textarea (3 rows), image upload zone (16:9 aspect ratio preview), "Tags" input (type and press Enter to add chips, click X on chip to remove, max 6 tags), "Live URL" input, "Source Code URL" input, and a red "Remove Project" text button. Below the list: an "Add Project" button (dashed border, `+` icon) that appends a new empty project card. Projects can be reordered via drag handles.
- [ ] **Skills section panel**: A tag-input interface — text input at top with "Add a skill" placeholder. Typing and pressing Enter creates a pill tag below. Each pill shows the skill name with an X to remove. Optional: clicking a pill opens a popover to set proficiency level via a 1-5 star rating or slider. Skills wrap in a flex container.
- [ ] **Experience section panel**: List of experience entries as collapsible accordions. Each contains: "Company" input, "Role/Title" input, "Start Date" month/year picker, "End Date" month/year picker (with a "Current" checkbox that disables end date), "Description" textarea (4 rows). "Add Experience" dashed button below. Entries can be reordered via drag handles.
- [ ] **Education section panel**: Same accordion pattern as Experience. Fields: "Institution" input, "Degree/Program" input, "Start Year" input, "End Year" input (with "Current" checkbox), "Description" textarea (2 rows).
- [ ] **Contact section panel**: "Email" input (pre-filled from profile), social links section with labelled inputs for: GitHub, LinkedIn, Twitter/X, personal website (each with the platform icon on the left of the input). "Show contact form" toggle switch — when on, the published portfolio includes a visitor-facing contact form.
- [ ] **Testimonials section panel**: List of testimonial cards. Each contains: "Name" input, "Role/Company" input, "Quote" textarea (3 rows), small avatar upload zone (48px circle). "Add Testimonial" dashed button below.
- [ ] **Custom section panel**: "Section Title" input and a rich text editor (bold, italic, underline, link, bullet list, numbered list) for freeform content.
- [ ] All panels have consistent vertical spacing (`space-y-4`), section labels in `text-sm font-medium text-gray-700`, and the same `Input.jsx` styling throughout

### US-3.10 — Theme Customisation Panel UI

**As a** user,
**I want to** have an intuitive theme panel with visual controls,
**so that** I can style my portfolio without any code knowledge.

**Acceptance Criteria:**
- [ ] Theme panel lives in the left sidebar under the "Theme" tab
- [ ] **Colour Scheme** section: 5 colour swatches in a row (Primary, Secondary, Accent, Background, Text). Clicking a swatch opens a colour picker popover (use a simple grid of 12-16 preset brand colours + a custom hex input at the bottom). The currently active colour has a checkmark overlay. Preset palettes: 4-5 curated palettes shown as horizontal rows of 5 colour dots the user can click to apply all at once (e.g. "Ocean", "Sunset", "Forest", "Monochrome", "Midnight").
- [ ] **Typography** section: A dropdown/select showing font pairing options. Each option shows the heading font and body font rendered in their actual typefaces if possible, or labelled clearly (e.g. "Inter + DM Sans", "Playfair Display + Source Sans", "Space Grotesk + Inter", "Merriweather + Open Sans", "Poppins + Nunito"). Selected pairing is highlighted.
- [ ] **Mode** section: A two-option toggle — "Light" and "Dark" with sun/moon icons. Active option has `bg-brand-500 text-white`.
- [ ] **Spacing** section: Three radio-style cards in a row — "Compact" (shows tightly spaced lines icon), "Normal" (medium spaced), "Spacious" (widely spaced). Active card has a brand-colour border.
- [ ] **Reset** section: A small text link at the bottom — "Reset to template defaults" in `text-gray-400 hover:text-gray-600`, triggers a confirm dialog before resetting.
- [ ] All changes apply instantly to the live preview canvas with no save button needed (auto-save handles persistence)

### US-3.11 — Image Upload Zone UI

**As a** user,
**I want to** have a clear, drag-and-drop-friendly image upload experience,
**so that** adding visuals to my portfolio is effortless.

**Acceptance Criteria:**
- [ ] Upload zones appear as dashed-border rectangles (`border-2 border-dashed border-gray-300 rounded-lg`) with a cloud-upload icon and "Drag & drop or click to upload" text in gray
- [ ] On drag-over, the zone highlights with `border-brand-500 bg-brand-50` and the text changes to "Drop to upload"
- [ ] After upload starts, the zone shows a progress bar (thin horizontal bar, brand colour, animated from 0% to 100%) with "Uploading..." text
- [ ] After successful upload, the zone is replaced by the image preview with a hover overlay containing "Replace" (camera icon) and "Remove" (trash icon) buttons
- [ ] For profile/avatar uploads: circular crop with the image centred and clipped to a circle
- [ ] For project images: 16:9 rectangular crop with `object-cover`
- [ ] If upload fails, the zone shows a red-tinted state with "Upload failed — click to retry" text
- [ ] File size limit reminder shown as tiny `text-xs text-gray-400` text below the zone: "Max 5MB • JPG, PNG, WebP, GIF"

### US-3.12 — Auto-Save Status Indicator UI

**As a** user,
**I want to** always know whether my work is saved,
**so that** I can edit with confidence.

**Acceptance Criteria:**
- [ ] Status indicator lives in the top bar, right-aligned, as a small inline element
- [ ] **Saved state**: A green checkmark icon with "Saved" text in `text-green-600 text-sm`. Shows the relative time since last save on hover via a tooltip ("Last saved 2 minutes ago").
- [ ] **Saving state**: A small spinning loader icon (brand colour) with "Saving..." text in `text-gray-500 text-sm`
- [ ] **Unsaved state**: An amber dot with "Unsaved changes" in `text-amber-600 text-sm`. Appears when edits have been made but auto-save hasn't triggered yet.
- [ ] **Error state**: A red exclamation icon with "Save failed" in `text-red-600 text-sm` and a small "Retry" text button next to it. Clicking "Retry" immediately triggers a save attempt.
- [ ] Transitions between states use a subtle fade animation (`transition-opacity duration-200`)

---

## Epic 4: Portfolio Management

### US-4.1 — Dashboard Overview

**As a** logged-in user,
**I want to** see a dashboard with all my portfolios,
**so that** I can manage them in one place.

**Acceptance Criteria:**
- [ ] Dashboard shows a list/grid of all user's portfolios
- [ ] Each portfolio card shows: name, thumbnail, status (draft/published), last edited date
- [ ] User can create a new portfolio from the dashboard (redirects to template selection)
- [ ] User can click a portfolio to open it in the editor
- [ ] Dashboard shows a quick analytics summary (total views across all portfolios)
- [ ] Empty state with CTA is shown if user has no portfolios
- [ ] Maximum of 5 portfolios per free account (with upgrade prompt)

### US-4.2 — Publish Portfolio

**As a** user,
**I want to** publish my portfolio so it's accessible via a public URL,
**so that** I can share it with potential employers or clients.

**Acceptance Criteria:**
- [ ] Editor has a "Publish" button that makes the portfolio publicly accessible
- [ ] Portfolio is accessible at `/{username}/{portfolio-slug}`
- [ ] User can set a custom slug for the portfolio URL
- [ ] Slug is validated for uniqueness and URL-safe characters
- [ ] Publishing updates the portfolio status from "draft" to "published"
- [ ] User can unpublish a portfolio, making it inaccessible to the public
- [ ] Published portfolio is server-side renderable for SEO
- [ ] Meta tags (title, description, OG image) are set for social sharing

### US-4.3 — Duplicate Portfolio

**As a** user,
**I want to** duplicate an existing portfolio,
**so that** I can create variations without starting from scratch.

**Acceptance Criteria:**
- [ ] "Duplicate" option available on each portfolio card in the dashboard
- [ ] Duplicated portfolio copies all sections, content, styling, and uploaded media references
- [ ] Duplicated portfolio is created as a draft with the name "[Original Name] (Copy)"
- [ ] Duplicated portfolio has a new unique slug
- [ ] User is notified of successful duplication via toast
- [ ] Duplication counts toward the portfolio limit

### US-4.4 — Delete Portfolio

**As a** user,
**I want to** delete a portfolio I no longer need,
**so that** I can keep my dashboard clean.

**Acceptance Criteria:**
- [ ] "Delete" option is available on each portfolio card
- [ ] Clicking delete opens a confirmation dialog with the portfolio name
- [ ] Deletion removes the portfolio document, associated analytics, and Cloudinary assets
- [ ] Deleted portfolios are soft-deleted with a 30-day recovery window
- [ ] User sees a success toast after deletion
- [ ] The public URL immediately returns a 404 after deletion

### US-4.5 — Custom Domain (Stretch Goal)

**As a** user,
**I want to** connect my own domain to my portfolio,
**so that** it looks more professional.

**Acceptance Criteria:**
- [ ] User can enter a custom domain in portfolio settings
- [ ] Instructions are shown for DNS configuration (CNAME record)
- [ ] System verifies DNS propagation and shows status
- [ ] SSL certificate is provisioned automatically
- [ ] Portfolio is accessible via the custom domain after verification
- [ ] User can remove custom domain and revert to default URL

### US-4.6 — Dashboard Page UI

**As a** logged-in user,
**I want to** see an organised, actionable dashboard,
**so that** I can quickly manage my portfolios and see how they're performing.

**Acceptance Criteria:**
- [ ] Dashboard uses the `DashboardLayout`: a left sidebar (`w-64 bg-gray-900 text-white`) with nav links (Dashboard, Templates, Analytics, Settings icons + labels, active item has `bg-gray-800 rounded-lg` highlight) and a main content area with a `bg-gray-50` background
- [ ] **Top section**: Greeting "Welcome back, {displayName}" (`text-2xl font-bold`), and a row of 3 stat cards: "Total Portfolios" (count), "Total Views" (sum across all), "Published" (count of published). Stat cards are white with `rounded-xl shadow-sm`, an icon in a coloured circle (brand, green, blue), the number in `text-3xl font-bold`, and the label in `text-sm text-gray-500`.
- [ ] **Portfolio grid section**: Heading "Your Portfolios" with a "Create New +" primary button right-aligned. Below is a `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- [ ] **PortfolioCard** (in the grid): White card with `rounded-xl overflow-hidden shadow-sm hover:shadow-md`. Top: thumbnail image (16:9, shows a miniature screenshot of the portfolio or a gradient placeholder if no content yet). Bottom padding with: portfolio name (`font-semibold`), status badge ("Draft" in amber pill or "Published" in green pill, `text-xs px-2 py-0.5 rounded-full`), "Edited 3 hours ago" in `text-xs text-gray-400`. A three-dot kebab menu icon in the top-right corner of the card that opens a dropdown with: "Edit", "Duplicate", "Copy Link" (only if published), divider, "Delete" in red.
- [ ] **Empty state** (if no portfolios): Centred area with a large illustration or icon (e.g. an empty page/canvas icon), heading "Create your first portfolio", subtitle "Choose a template and start building in minutes", and a "Browse Templates" primary button.
- [ ] **Portfolio limit warning**: If user has 4/5 portfolios, show a subtle amber banner above the grid: "You've used 4 of 5 free portfolios. Upgrade for unlimited." with an "Upgrade" link.
- [ ] On mobile, the sidebar collapses to a bottom tab bar with icons for Dashboard, Templates, Analytics, Settings

### US-4.7 — Publish Flow UI

**As a** user,
**I want to** have a clear and exciting publishing experience,
**so that** I feel confident sharing my portfolio.

**Acceptance Criteria:**
- [ ] Clicking "Publish" in the editor top bar opens a publish modal (`Modal.jsx`)
- [ ] Modal heading: "Publish Your Portfolio 🚀"
- [ ] Modal body shows: a preview of the public URL (`text-brand-600` in a gray rounded box that the user can click to copy), a slug input field (pre-filled, editable, with live URL preview updating as they type), SEO fields (title input, description textarea limited to 160 chars with counter), OG image upload zone
- [ ] If slug is taken, show inline red error: "This URL is already taken"
- [ ] Modal footer: "Cancel" ghost button and "Publish" primary button
- [ ] After successful publish: modal content transitions to a success state — large green checkmark animation, "Your portfolio is live!" heading, the full URL as a clickable link, and share buttons (Copy Link, Twitter, LinkedIn). A confetti animation plays briefly on the background.
- [ ] If portfolio is already published, the editor top bar shows "Published ✓" as a green badge. Clicking it opens a dropdown with: "Copy Link", "View Live", "SEO Settings", divider, "Unpublish" in red.

---

## Epic 5: Public Portfolio & SEO

### US-5.1 — View Published Portfolio

**As a** visitor (not logged in),
**I want to** view someone's published portfolio,
**so that** I can learn about their work and skills.

**Acceptance Criteria:**
- [ ] Public portfolio loads at `/{username}/{portfolio-slug}`
- [ ] Portfolio renders all sections with the creator's content and styling
- [ ] Page is fully responsive (mobile, tablet, desktop)
- [ ] Page loads within 3 seconds on a 3G connection
- [ ] Images are lazy-loaded for performance
- [ ] Smooth scroll navigation between sections
- [ ] 404 page shown for non-existent or unpublished portfolios
- [ ] A small "Built with PortfolioBuilder" badge appears in the footer (removable on paid plan)

### US-5.2 — Contact Form Submission

**As a** visitor,
**I want to** send a message through the portfolio's contact form,
**so that** I can reach out to the portfolio owner.

**Acceptance Criteria:**
- [ ] Contact section includes a form with: name, email, subject, message
- [ ] All fields are validated (required, email format)
- [ ] Form submission sends an email to the portfolio owner via Resend
- [ ] Submitter sees a success message after sending
- [ ] Rate limiting prevents spam (max 5 submissions per IP per hour)
- [ ] Honeypot field is included for basic bot protection
- [ ] Portfolio owner can toggle contact form on/off in editor

### US-5.3 — SEO & Social Sharing

**As a** user,
**I want to** my portfolio to be SEO-friendly and shareable on social media,
**so that** it appears well in search results and link previews.

**Acceptance Criteria:**
- [ ] User can set a custom page title and meta description in portfolio settings
- [ ] Open Graph tags are generated (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags are generated
- [ ] Portfolio pages use semantic HTML (proper heading hierarchy, landmarks)
- [ ] Auto-generated sitemap includes all published portfolios
- [ ] Canonical URLs are set correctly
- [ ] Portfolio pages are server-side rendered or pre-rendered for crawlers
- [ ] User can upload a custom OG image or one is auto-generated from the hero section

### US-5.4 — Public Portfolio Section Rendering UI

**As a** visitor,
**I want to** see a beautifully rendered portfolio with clear visual hierarchy,
**so that** I get a strong impression of the portfolio owner's work.

**Acceptance Criteria:**
- [ ] **Sticky navigation**: On published portfolios, a subtle floating nav bar appears at the top after scrolling past the hero. It contains the owner's name (left, `text-sm font-semibold`) and horizontal links to each visible section (right, `text-sm text-gray-600 hover:text-brand-500`). Active section link is highlighted based on scroll position (intersection observer). Nav has `bg-white/80 backdrop-blur-md shadow-sm` for a frosted glass effect. Hidden when at the top of the page.
- [ ] **Hero section rendering**: Full-viewport height (`min-h-screen`) with content vertically centred. Name in `text-5xl md:text-7xl font-bold`, tagline in `text-xl md:text-2xl text-gray-500` (or theme-appropriate muted colour), CTA button(s) with appropriate template styling. If a profile image exists, it renders according to the template layout (beside text, or as a background). Subtle scroll-down indicator at the bottom (animated bouncing chevron).
- [ ] **About section rendering**: Two-column layout on desktop (image left, text right or vice versa), stacked on mobile. Profile image is `rounded-2xl` with a subtle shadow. Bio text uses comfortable line-height (`leading-relaxed`), `text-lg`.
- [ ] **Projects section rendering**: Grid of project cards (`grid-cols-1 md:grid-cols-2 gap-8`). Each card: image at top (`rounded-t-xl`, aspect-ratio 16/9), padded body with title (`text-xl font-semibold`), description (line-clamped to 3 lines), tag pills at bottom (`bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full`), and icon links for live site (external link icon) and source code (GitHub icon). Cards have `hover:shadow-lg transition-shadow` and a slight translateY lift on hover (`hover:-translate-y-1`).
- [ ] **Skills section rendering**: Flexible layout depending on template — either a tag cloud (pills in a wrapping flex container with `gap-2`, varying sizes based on proficiency), a horizontal bar chart with skill name and percentage bar, or a simple multi-column grid of skill names with optional dot-rating indicators. Pills use the theme accent colour for background.
- [ ] **Experience section rendering**: Vertical timeline layout. Left side: year/date range in `text-sm text-gray-400 font-mono`. Right side: company name (`font-semibold`), role (`text-brand-600`), description paragraph. A vertical line (`border-l-2 border-gray-200`) connects the entries, with a small dot (`w-3 h-3 rounded-full bg-brand-500`) at each entry point. On mobile, the timeline is single-column with dates above each entry.
- [ ] **Education section rendering**: Same timeline layout as Experience but with institution and degree as primary fields. Uses a subtle academic icon (graduation cap) as the dot marker.
- [ ] **Contact section rendering**: Centred layout with a heading like "Get In Touch" (`text-3xl font-bold`), social links as a row of circular icon buttons (`w-12 h-12 rounded-full bg-gray-100 hover:bg-brand-500 hover:text-white transition-colors`), and if the contact form is enabled, a form below with `max-w-lg mx-auto` — name, email, subject inputs and a message textarea, all with the shared input styling, and a "Send Message" primary button full-width at the bottom. Success state replaces the form with a green checkmark and "Thanks! Your message has been sent." text.
- [ ] **Testimonials section rendering**: Horizontal carousel or grid of quote cards. Each card has: large opening quotation mark icon (`text-4xl text-brand-200`), the quote text in `italic text-lg`, the person's name (`font-semibold`), their role/company (`text-sm text-gray-500`), and a small circular avatar. Cards have `bg-white rounded-xl shadow-sm p-8`. If carousel, show left/right arrow buttons and dots indicator.
- [ ] **Custom section rendering**: Full-width section with the custom title as a heading and rich text content rendered as styled HTML (paragraphs, bold, italic, links, lists all properly styled).
- [ ] **Footer**: At the bottom of every published portfolio, a minimal footer with "Built with PortfolioBuilder" in `text-xs text-gray-400` with a subtle link to the app. On paid plan, this badge is hidden.

### US-5.5 — 404 / Not Found Page UI

**As a** visitor,
**I want to** see a friendly error page when a portfolio doesn't exist,
**so that** I know I've reached a dead end and can navigate somewhere useful.

**Acceptance Criteria:**
- [ ] 404 page is centred on the viewport with generous whitespace
- [ ] Large "404" heading in `text-8xl font-bold text-gray-200` as a background element
- [ ] Foreground heading: "Portfolio not found" in `text-2xl font-semibold`
- [ ] Subtitle: "This portfolio doesn't exist or has been unpublished." in `text-gray-500`
- [ ] A "Go Home" primary button linking to the landing page
- [ ] Simple abstract SVG illustration (e.g. a broken page or lost astronaut)
- [ ] Page uses the app's standard font and colour scheme, not the portfolio's theme

---

## Epic 6: Analytics

### US-6.1 — Track Portfolio Views

**As a** user,
**I want to** see how many people have viewed my portfolio,
**so that** I can measure its reach.

**Acceptance Criteria:**
- [ ] Each public portfolio page view is recorded in the Analytics collection
- [ ] View tracking captures: timestamp, referrer, country (via IP geolocation), device type
- [ ] Bot traffic is filtered out and not counted
- [ ] Views are deduplicated per session (same IP within 30 minutes = 1 view)
- [ ] Analytics data is stored efficiently (aggregated daily)

### US-6.2 — Analytics Dashboard

**As a** user,
**I want to** see analytics for my portfolios,
**so that** I can understand my audience and improve.

**Acceptance Criteria:**
- [ ] Analytics page shows: total views, unique visitors, views over time (line chart)
- [ ] Date range filter (last 7 days, 30 days, 90 days, all time)
- [ ] Breakdown by referrer source (direct, social, search)
- [ ] Breakdown by device type (desktop, mobile, tablet)
- [ ] Breakdown by country (top 5)
- [ ] Per-portfolio analytics if user has multiple portfolios
- [ ] Data refreshes on page load (not real-time)
- [ ] Empty state shown when no analytics data exists yet

### US-6.3 — Analytics Dashboard UI

**As a** user,
**I want to** see my portfolio analytics presented in a clean, visual dashboard,
**so that** I can quickly understand my traffic at a glance.

**Acceptance Criteria:**
- [ ] Analytics page lives within the `DashboardLayout` and is accessible via an "Analytics" link in the sidebar (bar-chart icon)
- [ ] **Top controls row**: A portfolio selector dropdown (if user has multiple portfolios; "All Portfolios" default option) on the left, and date range pills on the right — "7 Days", "30 Days", "90 Days", "All Time". Active pill has `bg-brand-500 text-white`.
- [ ] **Stat cards row**: 4 cards in a horizontal row (`grid-cols-2 md:grid-cols-4 gap-4`): "Total Views" (eye icon), "Unique Visitors" (users icon), "Avg. Daily Views" (trending-up icon), "Top Referrer" (link icon with the source name). Each card is white with `rounded-xl shadow-sm p-5`, icon in a coloured circle at top, value in `text-2xl font-bold`, label in `text-sm text-gray-500`. Values show a small green/red percentage change badge compared to previous period.
- [ ] **Views over time chart**: A line chart (using Recharts) spanning the full content width, `h-64`. White card container with `rounded-xl shadow-sm p-6`. X-axis shows dates, Y-axis shows view count. Line in brand colour with a subtle gradient fill below it (`fill-brand-100`). Hover tooltip shows exact date and view count. Title "Views Over Time" in `text-lg font-semibold` above the chart.
- [ ] **Breakdown row**: Two cards side by side (`grid-cols-1 md:grid-cols-2 gap-6`). Left card: "Traffic Sources" — a horizontal bar chart or donut chart showing referrer breakdown (Direct, Social, Search, Other) with a legend. Right card: "Devices" — a donut chart showing desktop/mobile/tablet split with percentage labels.
- [ ] **Top countries section**: A simple ranked list (1–5) with country flag emoji, country name, view count, and a small horizontal bar showing relative proportion. Card with `rounded-xl shadow-sm p-6`.
- [ ] **Empty state**: If no analytics data exists yet, show a centred illustration with "No data yet" heading, "Share your portfolio to start seeing analytics" subtitle, and a "Copy Portfolio Link" button.
- [ ] All charts use smooth animations on load (`animationDuration={800}`) and the brand colour palette

---

## Epic 7: Responsive Design & Accessibility

### US-7.1 — Responsive Layout

**As a** user,
**I want to** my portfolio and the editor to work on all screen sizes,
**so that** I can edit on any device and visitors can view on any device.

**Acceptance Criteria:**
- [ ] Editor is usable on desktop (full functionality) and tablet (core editing)
- [ ] Mobile editor shows a simplified view with core editing capabilities
- [ ] All public portfolios are fully responsive (320px to 2560px)
- [ ] Navigation adapts (hamburger menu on mobile)
- [ ] Images resize appropriately per breakpoint
- [ ] No horizontal scrolling on any viewport
- [ ] Touch interactions work correctly on mobile devices

### US-7.2 — Accessibility

**As a** user or visitor,
**I want to** the application to be accessible,
**so that** people with disabilities can use it.

**Acceptance Criteria:**
- [ ] All interactive elements are keyboard navigable
- [ ] ARIA labels are present on all non-text interactive elements
- [ ] Colour contrast meets WCAG 2.1 AA standards
- [ ] Images have meaningful alt text (user-editable for portfolio images)
- [ ] Focus indicators are visible on all focusable elements
- [ ] Screen reader announces page changes and dynamic content updates
- [ ] Form errors are associated with their fields via aria-describedby
- [ ] Skip-to-content link is present on all pages

---

## Epic 8: Performance & Security

### US-8.1 — Performance Optimisation

**As a** user or visitor,
**I want to** the application to load fast,
**so that** I have a smooth experience.

**Acceptance Criteria:**
- [ ] Lighthouse performance score ≥ 85 on public portfolio pages
- [ ] First Contentful Paint < 1.5s on 4G connection
- [ ] Images served in WebP format via Cloudinary transformations
- [ ] Code splitting implemented — editor code not loaded on public pages
- [ ] API responses cached where appropriate (templates list, published portfolios)
- [ ] Database queries use proper indexes (user ID, portfolio slug, analytics timestamps)
- [ ] Static assets served with cache headers (1 year for hashed assets)

### US-8.2 — Security

**As a** user,
**I want to** my account and data to be secure,
**so that** I can trust the platform.

**Acceptance Criteria:**
- [ ] All API routes require authentication except public portfolio and template routes
- [ ] Users can only access/modify their own portfolios (ownership check middleware)
- [ ] File uploads are validated server-side (type, size, dimensions)
- [ ] API rate limiting: 100 requests/min per authenticated user, 30/min for public
- [ ] Input sanitisation on all user-provided content (XSS prevention)
- [ ] MongoDB injection prevention via Mongoose schema validation
- [ ] CORS configured to allow only the frontend domain
- [ ] Environment variables used for all secrets (no hardcoded keys)
- [ ] Cloudinary upload uses signed uploads to prevent abuse
- [ ] HTTPS enforced on all endpoints

---

## Epic 9: Landing Page

### US-9.1 — Landing Page UI

**As a** first-time visitor,
**I want to** see a compelling landing page that explains the product,
**so that** I understand the value and am motivated to sign up.

**Acceptance Criteria:**
- [ ] **Hero section**: Full-viewport height with a gradient background (`from-brand-600 via-brand-700 to-brand-900`). Large heading in white: "Build a Stunning Portfolio in Minutes" (`text-4xl md:text-6xl font-bold leading-tight`). Subtitle: "No design skills needed. Choose a template, add your content, and publish — it's that simple." in `text-brand-200 text-lg md:text-xl max-w-2xl`. Two CTA buttons: "Get Started Free" (white button with brand text, large) and "See Templates" (ghost white-outlined button). Below the buttons: a hero image/mockup showing a sample portfolio on a laptop/browser frame, slightly tilted with a subtle shadow. The mockup floats with a very gentle CSS animation (`animate-float` — 3s ease-in-out infinite translateY 0 to -10px).
- [ ] **Social proof bar**: Below the hero, a narrow strip (`py-4 bg-white`) with centred text: "Trusted by 1,000+ professionals" with small grayscale logo placeholders or user count metric.
- [ ] **Features section** (`py-20 bg-white`): Section heading "Everything You Need" centred, with subtitle "Build, customise, and share — all in one place." 3-column grid of feature cards (`grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto`). Each card: an icon in a coloured circle (`w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center`), a bold title, and 2 lines of descriptive text. Features: "Beautiful Templates" (palette icon), "Visual Editor" (edit icon), "Custom Themes" (paintbrush icon), "One-Click Publish" (rocket icon), "Analytics Dashboard" (bar-chart icon), "SEO Optimised" (search icon).
- [ ] **Template showcase section** (`py-20 bg-gray-50`): Section heading "Choose Your Style", subtitle "Start with a professional template and make it yours." Below: a horizontal scrolling row (on mobile) or 3-column grid (on desktop) showing 3 featured template previews as tilted/overlapping cards with `shadow-xl rounded-xl`. "Browse All Templates →" link below.
- [ ] **How it works section** (`py-20 bg-white`): Heading "Three Simple Steps". A horizontal stepper with 3 numbered circles connected by a dashed line. Step 1: "Pick a Template" with browse icon. Step 2: "Add Your Content" with edit icon. Step 3: "Publish & Share" with rocket icon. Each step has a brief description below. On mobile, the stepper is vertical.
- [ ] **CTA section** (`py-20`): A full-width card (`rounded-2xl`) with a vibrant gradient background (`from-brand-500 to-accent-500`), large white heading "Ready to Build Your Portfolio?", subtitle "Join thousands of professionals showcasing their work.", and a large "Get Started Free" white button. The card has `max-w-4xl mx-auto`.
- [ ] **Footer** (`py-12 bg-gray-900 text-gray-400`): 4-column grid — Column 1: logo and short description. Column 2: "Product" links (Features, Templates, Pricing). Column 3: "Company" links (About, Blog, Contact). Column 4: "Legal" links (Privacy Policy, Terms of Service). Below the grid: a divider and "© 2025 PortfolioBuilder. All rights reserved." with social icons (GitHub, Twitter/X).
- [ ] All sections use `scroll-mt-20` for smooth anchor scrolling from nav links
- [ ] Entire page has subtle reveal animations on scroll (elements fade-up as they enter viewport using intersection observer, `opacity-0 translate-y-4` → `opacity-100 translate-y-0` transition)

---

## Sprint Planning Suggestion

| Sprint | Epics | Duration |
|--------|-------|----------|
| Sprint 1 | Epic 0 (Design System) + Epic 9 (Landing Page) + Epic 1 (Auth) | 2 weeks |
| Sprint 2 | Epic 2 (Templates — gallery, preview, selection, built-in designs) | 2 weeks |
| Sprint 3 | Epic 3 (Editor — layout, sections, editing panels, image upload) | 2 weeks |
| Sprint 4 | Epic 3 (Editor — theme panel, auto-save, live preview) + Epic 4 (Dashboard, publish flow) | 2 weeks |
| Sprint 5 | Epic 5 (Public portfolio rendering, contact form, SEO, 404) + Epic 6 (Analytics) | 2 weeks |
| Sprint 6 | Epic 7 (Responsive, A11y) + Epic 8 (Perf, Security) + Polish | 2 weeks |
| Sprint 7 | Testing, bug fixes, deployment, custom domain stretch goal | 1–2 weeks |

**Estimated total: 12–14 weeks**

---

## Database Schema Overview

### User
```
{
  _id: ObjectId,
  clerkId: String (unique, indexed),
  email: String (unique),
  displayName: String,
  avatarUrl: String,
  plan: String (enum: "free", "pro"),
  emailNotifications: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Portfolio
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User, indexed),
  templateId: ObjectId (ref: Template),
  name: String,
  slug: String (unique, indexed),
  status: String (enum: "draft", "published"),
  sections: [
    {
      type: String (enum: "hero", "about", "projects", ...),
      order: Number,
      content: Mixed (schema varies by type),
      visible: Boolean
    }
  ],
  theme: {
    colorScheme: { primary, secondary, accent, background, text },
    fontPairing: String,
    mode: String (enum: "light", "dark"),
    spacing: String (enum: "compact", "normal", "spacious")
  },
  seo: {
    title: String,
    description: String,
    ogImage: String
  },
  customDomain: String,
  isDeleted: Boolean,
  deletedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Template
```
{
  _id: ObjectId,
  name: String,
  category: String (enum: "developer", "designer", "freelancer", "minimal", "creative"),
  thumbnail: String,
  previewData: Mixed,
  sections: [{ type, order, defaultContent }],
  defaultTheme: { ... },
  popularity: Number,
  createdAt: Date
}
```

### Analytics
```
{
  _id: ObjectId,
  portfolioId: ObjectId (ref: Portfolio, indexed),
  date: Date (indexed),
  views: Number,
  uniqueVisitors: Number,
  referrers: [{ source: String, count: Number }],
  devices: { desktop: Number, mobile: Number, tablet: Number },
  countries: [{ code: String, count: Number }]
}
```
