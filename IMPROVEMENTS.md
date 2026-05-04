# Phone Directory — Improvements & Changelog

## Pending

### Needs Design Decision

#### #1 — Deeper department/site selector
The current selector screen lets users choose Joe's vs Mike's. The original request was a two-level picker (department + location, e.g. "Anesthesia – Joe's"). Needs UX decision before implementing.

Questions to resolve:
- Should the dropdown filter the existing accordion view, or replace it?
- What department groupings should appear?

---

### Needs Correct Number

#### #7 — IM Resident contact (St. Joe's)
Pager number or direct line for the Internal Medicine resident on call. Goes in On-Call Services alongside SICU/OB/Ortho residents.

#### #9 — MICU Resident contact (St. Joe's)
Same placement as SICU Resident in On-Call Services. Number/pager not yet known.

#### #10 — ICU floor/unit distinction (St. Joe's)
Departments section currently has PICU (3320) and NICU (3360) as generic entries.
Need individual unit phone numbers to distinguish:
- MICU
- SICU
- Neuro ICU
- Cardiac ICU

---

## Changelog

### Pharmacy number corrected (St. Joe's)
Extension corrected from 7525 → **3032**. Updated in both the critical grid and Services section.

### SICU Resident moved to On-Call Services
Removed from Departments; now lives in On-Call Services alongside Ortho, OMFS, and OB residents.

### Phone number corrections
- ED: 2232 → **2222**
- Trauma: 2757 → **1818**
- CCB 2 North: 3360 → **3260**
- Regan 4 North: 3380 → **3350**
- Regan 5 North: 3226 → **3225**
- Seton S6 North: 5801 → **3801**

### Section restructure & PAT Office overhaul
- "Units & Floors" split into **Departments** (ED, Trauma, ICUs, Endo, Blood Bank) and **Floors** (CCB, Regan, Seton + L&D)
- L&D row gains hidden search aliases: "labor", "delivery", "obstetrics", "ob"
- "Anesthesia" renamed to **PAT Office** with full nurse roster update:
  - Louis (A B C E) · Kevin (J K L M N O) · Carmen (Q R S T) · Somy (D F G H I) · Beth (P U V W X Y Z) · Patricia (covers) · Sheila (Bariatric)
  - Added PAT Office lines (2215 / 2213) and Registrar / Iris / Shayna (3890)
- PAT Pager, Pain Pager, OB Anesthesia Phone, Code/Airway Phone moved to **On-Call Services**
- SICU relabeled "SICU Resident"; OB Phone relabeled "OB Anesthesia Phone"
- Main OR: removed redundant Anes Tech (2) row

### Critical section redesigned
Always-visible tap-to-call button grid replacing tall phone-row list. Numbers hidden; label only. Urgent items (Board Runner, Blood Bank, Security) highlighted in red.
Every critical number also exists in a regular accordion section so search finds it.

### Site selector added
Mandatory first-screen picker to choose between St. Joe's and St. Mike's before entering the directory.

### ~~#8 — St. Joe's Pharmacy extension~~
Resolved: extension **3032** in Critical grid and Services section.
