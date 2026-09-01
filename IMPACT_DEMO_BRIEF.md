# Impact Demo — Build Brief for Claude Code

**Repo:** `afc-loan-sparkle` (Vite + React + TypeScript + shadcn-ui + Tailwind, deployed on Vercel)
**Goal:** Add a small set of *indicative* impact-management screens to the existing AFC loan-workflow demo, for a client demo on Friday.
**Read this whole file before writing any code.** Then follow the scope exactly — do not add more than what's listed here.

---

## 1. What this is (and isn't)

This app is a **non-functional demo**. Every existing screen is a click-through with hard-coded mock content — no backend, no persistence, no real logic. Buttons fire a toast and nothing else. You are adding new screens in the **same style and to the same standard** — indicative, not finished software.

We are deliberately showing a **light footprint**. Two screens get built properly (but still indicative); two or three are **placeholders on purpose**. Do not "improve" this by building the placeholders out — a finished-looking screen for those pieces defeats the purpose.

---

## 2. Golden rules (do not break these)

1. **No new npm dependencies.** Everything needed is already installed — shadcn/ui, `lucide-react`, and `recharts` (via `src/components/ui/chart.tsx`). If you think you need a new package, you don't.
2. **Reuse the existing design system.** All colours, radius, gradients and shadows are defined as CSS variables in `src/index.css` (e.g. `--primary`, `--accent`, `--warning`, `--gradient-primary`, `--shadow-card`). Use the existing shadcn/ui components and Tailwind tokens. **Do not introduce new colours or restyle anything.**
3. **Match the existing page pattern exactly.** Copy the structure from `src/pages/dashboard/origination/IDMemo.tsx`: a `container mx-auto p-6 max-w-5xl` wrapper, a gradient `h1` title (`text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent`), a muted `p` description, then shadcn `Card`s. Status uses `Badge` (`variant="warning" | "success" | "secondary"`). Actions use `Button` + `useToast`.
4. **Everything is indicative.** Hard-coded mock data only. No state that persists, no API calls, no real calculations. Mirror how the existing pages work.
5. **Keep scope tight.** Build only what Section 4 lists. Do not touch the existing loan-workflow pages except for the two small, specified edits. Do not refactor anything.
6. **It must compile and run.** When done, run `npm run build` (or at least `npm run dev`) and fix any TypeScript/import errors before finishing.

---

## 3. Where things live (so you match conventions)

- **Routes:** `src/App.tsx` — nested routes under `<Route path="/dashboard" ...>`. Add new routes there, e.g. `<Route path="impact/di-report" element={<DIReportForm />} />`.
- **Sidebar nav:** `src/components/AppSidebar.tsx` — a `navigationGroups` array of `{ label, department, items: [{ title, url, icon }] }`, plus a `departmentConfig` map and a `Department` union type.
- **Pages:** `src/pages/dashboard/<phase>/<Name>.tsx`. Create a new folder `src/pages/dashboard/impact/` for the new pages.
- **Shared components:** `src/components/`. Put the reusable Impact Annex block here.
- **Existing memo pages** (you'll lightly edit two): `src/pages/dashboard/origination/IDMemo.tsx` and `src/pages/dashboard/pre-screening/EIM.tsx`.
- **Icons:** `lucide-react`. Use safe, known icons — `Target`, `ClipboardList`, `Globe`, `BarChart3`, `FileOutput`, `Send`, `Sparkles`. Don't guess exotic icon names.

---

## 4. Scope — build exactly this

### 4.1 Shared component: `ImpactAnnex` — BUILD (indicative)

Create `src/components/ImpactAnnex.tsx`. This renders the **Impact Annex** = the **Impact Radar** (a visual) + the **Impact Brief** (a summary). Lay it out as two columns (or stacked on small screens): Radar on the left, Brief on the right.

**Impact Radar** — a Recharts `RadarChart` (import `RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer` from `recharts`). Five axes with mock scores on a 0–5 domain:

- Development Gap — 3
- Jobs Intensity — 4
- Climate — 2
- Knock-on Effect — 3
- Additionality — 4

Use the primary colour for the radar fill/stroke (reference the existing CSS variables / chart usage). Add a one-line caption: *"Preliminary at ID Memo; refined at EIM, FIM and BRIC."*

**Impact Brief** — a card of read-only mock fields (use `Label` + static text, or disabled `Input`/`Textarea`, and `Badge` chips). Populate with this indicative example:

- **Impact Summary:** "Financing the construction of a key section of Guinea's Northern Corridor (~160km of paved road), improving market access, essential services and cross-border trade for currently isolated regions."
- **Stakeholder:** Population-level  ·  **Geography:** Guinea
- **Ps of Transformation:** Platforms (chip)  ·  **SDGs:** SDG 8, SDG 9 (chips)
- **Scale:** ~X million people connected; ~Y million annual trips
- **Depth:** Moderate  ·  **Duration:** Long-term (10+ years)
- **Contribution — Financial:** Access to Finance; Tenor Extension  ·  **Non-financial:** N/A
- **Risks — Default:** Evidence, External, Execution  ·  **Red Flag:** N/A

Accept an optional prop `variant?: "preliminary" | "final"` (default `"final"`). When `"preliminary"`, show a small "Preliminary" `Badge` and render the same content read-only. Keep it simple.

### 4.2 Embed the Annex in a memo — EDIT (small)

In `src/pages/dashboard/pre-screening/EIM.tsx`, add the Impact Annex **in context**. Wrap the page's existing content and a new Annex view in shadcn `Tabs`: a first tab with the current EIM content, and a second tab labelled **"Impact Annex"** that renders `<ImpactAnnex variant="final" />`. Don't rewrite the existing EIM content — just move it into the first tab.

In `src/pages/dashboard/origination/IDMemo.tsx`, add **one** compact read-only card near the bottom titled **"Preliminary Impact Radar"** that renders `<ImpactAnnex variant="preliminary" />` (or, if that's too tall, just the radar with the caption). This shows the Annex starts at ID and is refined later. Keep it minimal.

### 4.3 New page: `DIReportForm` — BUILD (indicative)

Create `src/pages/dashboard/impact/DIReportForm.tsx`. Route: `impact/di-report`. Title: **"DI Report Forms"**, description: *"Select, customise and issue the Development Impact (DI) Report Form for a deal."*

- **Template selector:** five options — **Single-country, Multi-country, Sovereign, Short-term, Letter of Credit.** Use a `Select` or a row of selectable `Card`s.
- If **Single-country / Multi-country / Sovereign** is selected, show a read-only preview of the form's fixed sections (as static cards or a `Table`): *Basic Information, Financial Indicators, General Indicators* (a few representative rows each — e.g. Client name, Reporting year, Revenue, EBITDA, Payments to government, Direct jobs supported, Absolute emissions Scope 1). Then a **"Sector-specific Indicators"** card with a short checkbox/multi-select list the user picks from — mock a per-sector list (e.g. for Power: *Installed generation capacity (MW), Electricity generated (MWh), New connections, People with new access*). Add a `Badge` note: *"Customisable — sector indicators selected by the Deal team."*
- If **Short-term** or **Letter of Credit** is selected, show a note card: *"Financial Services template — fixed, never customised."*
- A **"Send to investee"** `Button` that fires a toast (*"DI Report Form issued to investee."*). No real action.

Keep all data mock. This maps directly to AFC's five real templates — accuracy of the *structure* matters more than completeness of fields.

### 4.4 Placeholder pages — BUILD AS DELIBERATELY MINIMAL "DESIGN STAGE" SCREENS

These are the heavy pieces we are **not** showing as finished UI. Each is a single page: standard title, a `Badge` reading **"Design stage"**, and **one** `Card` with a short sentence of purpose plus a 3–5 item bullet list of what it will contain. No charts built out, no forms, no interactivity beyond nav. Do **not** flesh these out.

- **`src/pages/dashboard/impact/InvesteePortal.tsx`** — route `impact/investee-portal`. Title "Investee Portal". Purpose: external portal where investees submit DI data annually. Bullets: annual DI submission; view of historical submissions; supporting-document upload; secure external login; (note) *separate external user type.*
- **`src/pages/dashboard/impact/ImpactDashboard.tsx`** — route `impact/dashboard`. Title "Impact Portfolio Dashboard". Purpose: portfolio-level aggregation of Radar/Brief and DI data. Bullets: slice by sector, team, geography, vintage, disbursed vs pipeline; portfolio radar profile; deal ranking. You may include **one** small, clearly-labelled *"Illustrative — concept"* radar or bar to hint at it, but keep it obviously indicative. Prefer restraint.
- **`src/pages/dashboard/impact/JIMExport.tsx`** — route `impact/jim-export`. Title "JIM Export". Purpose: map submitted DI data to the Joint Impact Model (JIM) template. Bullets: field-mapping from DI form to JIM columns; one investee per row; interim export / future automation. A disabled "Export to JIM" button is fine.

### 4.5 Optional: `ImpactAnnexOverview` page

If a sidebar entry for the Annex is useful for navigating the demo, create `src/pages/dashboard/impact/ImpactAnnex.tsx` (route `impact/annex`) that renders `<ImpactAnnex variant="final" />` with a one-line note: *"This appears within the ID Memo, EIM, FIM and BRIC screens."* Reuse the component — do not duplicate its content.

---

## 5. Sidebar + routing changes

**`src/App.tsx`:** import the new pages and add these routes inside the `/dashboard` route:

```
<Route path="impact/annex" element={<ImpactAnnex />} />          {/* if 4.5 built */}
<Route path="impact/di-report" element={<DIReportForm />} />
<Route path="impact/investee-portal" element={<InvesteePortal />} />
<Route path="impact/dashboard" element={<ImpactDashboard />} />
<Route path="impact/jim-export" element={<JIMExport />} />
```

**`src/components/AppSidebar.tsx`:** add a new department and a new nav group.

- Extend the `Department` union with `"impact"`.
- Add to `departmentConfig`: `impact: { label: "Impact", icon: Sparkles, color: "text-teal-500" }` (pick a colour not already used by another group; teal or indigo is fine).
- Add a new group to `navigationGroups`, placed after "Investment Approval" (so it reads as part of the deal lifecycle):

```
{
  label: "Impact Management",
  department: "impact",
  items: [
    { title: "Impact Annex",      url: "/dashboard/impact/annex",           icon: Target },        // if 4.5 built
    { title: "DI Report Forms",   url: "/dashboard/impact/di-report",       icon: ClipboardList },
    { title: "Investee Portal",   url: "/dashboard/impact/investee-portal", icon: Globe },
    { title: "Impact Dashboard",  url: "/dashboard/impact/dashboard",       icon: BarChart3 },
    { title: "JIM Export",        url: "/dashboard/impact/jim-export",       icon: FileOutput },
  ],
},
```

Make sure any new icons are imported at the top of `AppSidebar.tsx` from `lucide-react`.

---

## 6. Do NOT do

- Do **not** build the Investee Portal or Impact Dashboard into working/polished screens. Placeholders only (Section 4.4).
- Do **not** add real data, state management, storage, or API calls anywhere.
- Do **not** add npm packages.
- Do **not** restyle, re-theme, or change existing colours/components.
- Do **not** modify existing loan-workflow pages other than the two small edits in Section 4.2.
- Do **not** expand scope "to be helpful." Tight is the point.

---

## 7. How to run it

If Claude Code isn't set up yet: install it, then from inside the repo folder run `claude`.

**First prompt to give Claude Code:**

> Read `IMPACT_DEMO_BRIEF.md` in the repo root and implement it exactly. Follow the scope and the "Do NOT do" section strictly — build the two indicative screens (Impact Annex component embedded in EIM + a preliminary card in ID Memo; and the DI Report Forms page) and the three "Design stage" placeholder pages, plus the sidebar group and routes. Reuse existing shadcn/ui components and the design tokens in `src/index.css`. Add no new dependencies. When finished, run the build and fix any errors, then give me a short list of the files you created or changed.

**Then verify:**

```
npm install      # only if you haven't already
npm run dev      # click through: EIM → Impact Annex tab; Impact Management group in the sidebar
```

Check: the radar renders, the DI template selector switches content, the placeholders are minimal and labelled "Design stage", and nothing in the existing loan workflow changed.

**Then ship:**

```
git add -A
git commit -m "Add indicative impact-management demo screens"
git push
```

Vercel redeploys on push, same as now.

---

## 8. Quick checklist before Friday

- [ ] Impact Radar renders (5 axes, 0–5) inside the EIM "Impact Annex" tab
- [ ] Impact Brief fields show the mock road-corridor example
- [ ] Preliminary radar card visible on the ID Memo page
- [ ] DI Report Forms page: 5 templates; sector-indicator picker on the 3 customisable ones; "fixed" note on Short-term / LC
- [ ] Investee Portal, Impact Dashboard, JIM Export are minimal "Design stage" placeholders
- [ ] New "Impact Management" sidebar group appears and all links work
- [ ] Existing loan workflow unchanged; app builds clean; pushed and live on Vercel
