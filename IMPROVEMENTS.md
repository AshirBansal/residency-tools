# Phone Directory — Improvements & Changelog

A living tracker for the St. Joseph's phone directory PWA. Three sections:
**Pending** (waiting on info), **Future Ideas** (enhancements to consider),
and **Changelog** (shipped, newest first).

---

## Pending — blocked on correct numbers

These need real phone/pager numbers before they can ship; no code work required.

#### #7 — IM Resident contact (St. Joe's)
Pager number or direct line for the Internal Medicine resident on call. Goes in On-Call Services alongside SICU/OB/Ortho residents.

#### #9 — MICU Resident contact (St. Joe's)
Same placement as SICU Resident in On-Call Services. Number/pager not yet known.

#### #10 — ICU floor/unit distinction (St. Joe's)
Departments currently has PICU (3320) and NICU (3360) as generic entries.
Need individual unit phone numbers to distinguish:
- MICU
- SICU
- Neuro ICU
- Cardiac ICU

---

## Future Ideas — not started

Enhancements worth considering; none blocking.

- **Paging integration** — let a user send a page from the app (dial-then-pager-# flow, or the myairmail.com web form). Parked earlier: the web form blocks automated requests and only works on hospital WiFi. Revisit if a supported path becomes available.
- **Real screenshots on the install page** — `install.html` currently describes the Share/Add-to-Home-Screen steps in text. Small annotated screenshots per step could make it even clearer, at the cost of maintaining images.
- **Usage sense-check** — no analytics today (by design). If it ever matters which numbers get used most, consider a lightweight privacy-respecting approach.

---

## Changelog — shipped

### Install helper + PWA name consistency
- **Install landing page** (`phone-directory/install.html`) — a shareable page that walks people through adding the app to their home screen. Auto-detects iPhone vs Android, auto-redirects to the directory if already installed (standalone), and on Android Chrome offers a native one-tap install via `beforeinstallprompt`.
- iPhone instructions unified into one box with a small Safari vs Chrome/Firefox branch (Safari: ⋯ → Share → View More → Add to Home Screen; Chrome/Firefox: Share in address bar). Uses a proper share-icon SVG, not an emoji.
- Demoted the "open directory" action to a subtle "Use directory in browser" link so the page leads with installing.
- **Consistent home-screen name "St. Joe's Directory"** across all browsers — set in manifest `name`/`short_name` (Chrome/Firefox) and `apple-mobile-web-app-title` + `<title>` (Safari). Added manifest link + web-app meta tags to the install page so it installs with the correct icon and name.

### Feedback link
"Have feedback?" replaced with **"Report missing or incorrect numbers"**, now shown on **every page** (previously only Services).

### Offline support + code cleanup
- Added a **service worker** (`sw.js`) — network-first for content (HTML/CSV/JSON), cache-first for static assets, so the directory works offline once visited.
- Removed dead code, consolidated duplicate functions, extracted magic strings to constants, hardened the CSV parser, and removed `user-scalable=no` for accessibility.

### Premium swipe-tab UI + cross-device PWA polish
- Horizontal scroll-snap paging with per-page accent colors; `IntersectionObserver` tracks the active tab on manual swipes.
- Fixed the active-tab **"ripple"** when tapping a non-adjacent tab (a `programmaticScroll` guard suppresses observer updates during tap-driven smooth scrolls).
- Larger tab-bar icons and labels for legibility.
- Fixed **safe-area spacing** across devices/browsers (Safari vs Firefox PWA, iPhone vs Android) by letting the OS handle insets natively and using an opaque `black` status bar.

### CSV-driven rebuild + St. Mike's removed
- All contact data moved to `phone-directory/data/contacts.csv` — update numbers without touching code.
- St. Mike's panel and site selector removed; app opens directly to the St. Joe's directory.
- Row UX: green **Call** button for direct dial; tap a row label to expand a detail panel showing all number types (cell, in-hospital ext, external ext, pager) with individual call buttons. Critical grid stays direct tap-to-call.
- Number type semantics: `type2` = in-hospital ext (4-digit from a hospital phone); `type3` = external-only ext (must dial 973-754-XXXX); both can coexist on one row when the extensions differ.

### Critical section redesigned
Always-visible tap-to-call button grid replacing the tall phone-row list. Numbers hidden, label only. Urgent items (5933, Blood Bank, Security) highlighted in red. Every critical number also lives in a regular accordion section so search finds it.

### Number & section corrections
- Pharmacy: 7525 → **3032** (critical grid + Services)
- ED: 2232 → **2222** · Trauma: 2757 → **1818**
- CCB 2 North: 3360 → **3260** · Regan 4 North: 3380 → **3350** · Regan 5 North: 3226 → **3225** · Seton S6 North: 5801 → **3801**
- "Units & Floors" split into **Departments** (ED, Trauma, ICUs, Endo, Blood Bank) and **Floors** (CCB, Regan, Seton + L&D); L&D gains search aliases (labor, delivery, obstetrics, ob).
- "Anesthesia" renamed **PAT Office** with full nurse roster; PAT/Pain/OB-Anesthesia/Code-Airway lines moved to On-Call Services.
- SICU moved to On-Call Services and relabeled "SICU Resident".
- Board Runner renamed **5933** everywhere.

### Resolved
- ~~**#1 — Site selector**~~ — added then removed; app now opens straight to St. Joe's.
- ~~**#8 — St. Joe's Pharmacy extension**~~ — resolved as **3032**.
