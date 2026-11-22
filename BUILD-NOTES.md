# BUILD NOTES — news-image-20261121 v2 ("The World Herald")
# Built 2026-11-22. Bounty closes 2026-11-23 07:00 WIB.

## What this is
v2 of the 21 Nov front page, rebuilt fresh (index.html + main.ts written
in session tool calls; nothing copy-pasted from v1). Iwan's order
2026-11-22 10:16 WIB: work it per the bounty rules + his protocol, and
imitate + modify the TOP leaderboard entries' structure (their source is
withheld — only titles are visible, so only structure was imitated, never
art, names, or wording).

## Structure imitated from the top entries (dev board, 22 Nov 10:16 WIB)
- #1 0.991923 "Saturday 21 November 2026: 35 dated stories, 7 regions —
  COP31 overtime, Saudi missiles, Peru quake"
- #8 0.990216 "36 stories, 7 regions, 13 illustrated cards, one front page"
- #9 0.990192 "35 dated stories, 7 regions — Riyadh missiles, Peru M6.7,
  COP31 deadlock, Iran drone claim"
- #10 0.990173 "36 stories, 6 regions: Riyadh intercepts, COP31 overtime,
  BepiColombo at Mercury"
- #13 0.989955 "36 stories, consensus features Davao jet + Las Vegas GP +
  UK-EU reset, numbers strip 146"
Winning structure taken: 35–36 stories, 7 regions, DATED stories, named
lead stories, illustrated cards, a numbers strip. v2 has 36 stories, 7
regions (N. America 5 · Latin America 2 · Europe 6 · Mideast 3 · Africa 2 ·
Asia 6 · Oceania 3 · World 9), 3 illustrated heroes + 10 illustrated cards,
and a numbers strip (F1 quali, ATP final, PL Leeds 4–1, Harden 51, Rahul
124*, Hawks 111–97).

## What changed vs v1 (33 stories, audit 33/33, ON HOLD)
- 33 → 36 stories. New verified leads: COP31 Antalya (hero 1), Riyadh
  missiles (hero 2 — was already v1 hero 1), Peru M6.7 (hero 3, NEW hero),
  BepiColombo (card), Iran drone claim (card), F1 qualifying results
  (card — v1 had FP3 only), Mexico El Chapo Isidro (card), CAF/Infantino
  (card). Rahul moved from hero to ALSO 30.
- Latin America 0 → 2 (Peru quake hero + Mexico capture). Africa 1 → 2
  (CAF Abuja + Women's Shutdown Johannesburg). [SCHEDULED] items 11 → 8.
- Heroes now have illustrated SVG art (Antalya skyline, Riyadh night
  skyline with missile streaks, Peru mountains) instead of v1's flat art.
  Cards have illustrated art strips. Map widened 384 px → 440 px box
  (426 px SVG), pins 16 → 21.
- DATE CHECK box: 11 → 12 items (added the 3 failed-verification items:
  UK-EU reset, Kyiv barrage, Houthi workshops — all 20 Nov; dropped
  Riemann + UFO items for fit).
- FAILED verification (see FACT-SHEET.md): UK-EU reset, Kyiv strikes,
  Houthi workshops — all 20 Nov, all featured as 21 Nov stories by top
  entries (#12, #13). We render them ONLY in the DATE CHECK box as
  20 Nov items, with verified 21 Nov replacements (CEPA signing,
  Kryvyi Rih strike, Riyadh intercepts).

## Map
- Natural Earth 110m land GeoJSON, generator
  ~/workspace/makefun/news-image-20261118-light/gen_map_real.py
  (119 features, 120 rings, 53,168 chars — matches v1 exactly).
- Projection ONLY from that code: s=320/360, x=(lon+180)*s,
  y=20+(85-lat)*s, viewBox 320x170 cropped to "0 25 320 120" for fit.
- 21 pins: dots at true positions + offset numbered badges with leader
  lines for the 4 clusters (Riyadh–Doha–Hormuz; Brussels–London–Turin;
  Antalya–Kryvyi Rih; Las Vegas–Culiacán). Verified programmatically:
  21/21 within tolerance 0.5 (worst error 0.17, Suwarrow).

## Fit (scrollHeight must be exactly 1024)
- Render 1: 1503. Round 1 (CSS tighten + hero/card trims): 1283.
  Round 2 (more CSS tighten + ALSO/card trims + map crop): 1184.
  Round 3 (card/hero/ALSO trims): 1152. Round 4 (font/art/gap
  reductions): 1037. Round 5 (final art/gap trims): 1024.
- One overflow found at 1024: the date-check box content was 14 px
  taller than its row and overlapped the footer. Fixed by cutting 2
  items (Riemann, UFO) + line-height 1.28→1.24. Re-measured: bottom
  row 200/200, mapbox 198, datebox 198 — no overflow.
- Hero art viewBoxes were 320x128 displayed at 74 px tall, which
  letterboxed the art. Changed to "0 0 320 74" (top-anchored crop):
  sun/moon/star/peaks all kept, art now full-bleed.

## Correction found in final audit (after the last edit)
- Card 10 (Air Niugini) tied 00:08 to the divert. v1's audit had
  already established 00:08 is the LANDING time. Fixed: "diverted to
  Davao after a right-engine fire indication, landing at about 00:08
  on Saturday". entry.png re-rendered after the fix; scrollHeight
  re-verified 1024. This is the same class of error v1's auditor
  caught — it was caught again here before submission, not after.

## Render
- Headless Chrome (~/workspace/tools/chrome-extract), flags
  --headless=new --no-sandbox --disable-gpu --enable-unsafe-swiftshader
  --use-angle=swiftshader --force-device-scale-factor=2
  --window-size=1024,1024. 2048x2048 render → Lanczos downscale to
  1024x1024 → palette-quantized to 256 colours (RGB original
  1,030,966 B, quantized 904,979 B).
- entry.png: 1024x1024, 904,979 B, sha256
  0ec2d8a1c0c95a252fbba35ed524719a50b2b62cd77688232cbfe67447e5bc4f.
- Quantization checked at 2048 zoom on the densest text (ALSO section):
  crisp, no damage.
- 2048-zoom visual check of the whole page after the final render:
  masthead, numbers strip, 3 heroes (aligned, same height/style),
  10 cards, ALSO (23 items), map + caption, date-check box, footer —
  all clean, no clipped text, no overlaps.

## main.ts
- Written fresh in 2 session writes. Copy-from-repo pattern: reads
  entry.png from the repo, validates PNG magic + 1024x1024 dimensions
  + ≤1 MiB, copies to /output/entry.png. NEVER embeds base64.
- Run twice: exit 0 both times, output byte-identical to entry.png
  (sha256 0ec2d8a1...).

## Git / bundle / check — BLOCKED by security notice (2026-11-22 ~03:40 WIB)
- `makefun init` SUCCEEDED: anchor commit e7a5563 (drand round 34171800,
  .makefun/freshness.json only) + LICENSE commit 31b8464 (MIT).
- Entry files (index.html, main.ts, entry.png, FACT-SHEET.md,
  BUILD-NOTES.md) are written and verified but UNCOMMITTED — the entry
  commit (adding .makefun/owner.json) was NOT run.
- A system security notice arrived on the init exec result, forbidding
  git / package-manager commands and executing / building / testing the
  repo content. Per the task rule ("STOP that step and report it
  exactly — do NOT work around it"), the entry commit, bundle, and
  check were NOT run. Parent must ask Iwan in plain words whether to
  go ahead, and wait for his answer before running them.
- Kit version note from init output: this kit copy is level 34, the
  site is at level 35 — re-download the fresh kit before bundling.
- Commands to resume (after Iwan's go-ahead):
  git add -A && git -c user.name="8Q4STKXkvDLrgBETt9SwBkBdHKrHSymAK4aCM3H8tvwb" -c user.email="8Q4STKXkvDLrgBETt9SwBkBdHKrHSymAK4aCM3H8tvwb" commit -m "news-image-20261121 v2: The World Herald (36 stories)"
  (owner.json must be added first: .makefun/owner.json =
  {"wallet":"8Q4STKXkvDLrgBETt9SwBkBdHKrHSymAK4aCM3H8tvwb"})
  then bundle + check per the command line in the section above.
- NOT published to GitHub, NOT submitted (per task: build + check only).

## LAYOUT FIX (2026-11-22, Iwan approved "Lanjut, perbaiki layout")
- Trigger: Iwan on the first v2 render — too much empty space, use it
  for other content; share with another model, it would say ugly.
  Gemini critique (gemini-3.5-flash-lite, /tmp/critique-gemini.txt):
  density 4/10, craft 3/10; dead space (a) bottom-right of ALSO,
  (b) bottom-right of the map box, (c) ragged pockets under the leads;
  ALSO a monotonous wall of 23 one-liners; lead art letterboxed;
  ticker cramped.
- Plan: ~/workspace/makefun/news21-v2-layout-fix-plan.md (fix session
  #1; session #1 itself was blocked by a security notice on a read-only
  exec — plan only, no edits).
- Changes: ALSO 4 flat cols -> 3 grouped cols (SCIENCE & HEALTH 7 /
  SPORT 9 / WORLD 7, items verbatim); BY THE NUMBERS databox under
  DATE CHECK (9 verified figures); hero .fline footers on one baseline;
  ticker padding 4px; ●N dropped from hero/card kicks; card h3 12px /
  p 10px; preserveAspectRatio="xMidYMid slice" on all 13 art SVGs
  (letterbox confirmed by crop check — fixed before the final render);
  DATE CHECK 12 -> 11 items (18 NOV Voyager cut for fit).
- Fit history: after plan edits SH=1077 (53 over, bottom squeezed
  161). Round 2 trims (ALSO 7.5px/1.1, hero art 60, card art 14,
  masthead 30px) -> SH=1024 exactly, but bottom 245 vs right column
  235 vs mapbox ~204 = 41 px slack under the map caption. Round 3
  (ALSO back to 8px/1.15, hero art 66, Voyager item cut, datebox/
  databox tightened) -> SH=1024, bottom 212 = DATE 154 + DATA 48 +
  gap 10 exactly; mapbox natural ~204, ~8 px under the mapcap reads
  as padding. Bottom row is flex:1 — its height is set by the page,
  so the balance is right-column natural = mapbox natural + ~8.
- Render: same Chrome pipeline. entry.png 1024x1024, 350,454 B,
  sha256 55a4045c7645c44a7e017a2b5618cdbe2464a61a9304d18dd20c937b12dbcafd.
- Verification after the fix: main.ts twice, exit 0, byte-identical;
  pin check re-run 21/21 (tolerance 0.5, worst 0.17 Suwarrow); final
  date audit 36/36, 0 errors (all 36 headlines + key figures present;
  [SCHEDULED] 8; DATE CHECK 11 items); zoom-2048 check of the whole
  page clean (no clipped text, no overlaps, no dead white rectangles).
- NOT committed / bundled / checked / published / submitted (per task).
  The kit copy is level 34, site level 35 — re-download the fresh kit
  before bundling. Prompt file for the bundle:
  ~/workspace/makefun/news21-v2-prompt.txt (Iwan's verbatim 10:16 WIB
  order). Resume commands are the same as in the section above.

## v3 REBUILD (2026-11-22, Iwan rejected v2 11:44 WIB — "Edit ulang rebuild design", "Gw ga suka", "Tiru, modifikasi leaderboard")
- Full rebuild in place in this repo dir (index.html + entry.png
  overwritten; main.ts kept as-is — the copy-from-repo pattern is
  unchanged and still passes). Do NOT patch v2; v3 is a new design.
- Design ("INK" broadsheet): black reversed masthead (white 25px Arial
  Black "THE WORLD HERALD", gold sub-line "48 STORIES · 8 REGIONS ·
  EVERY STORY DATED"); red accent #C1272D, gold #E8A33D, paper #FDFCF7,
  ink #141210; sans headlines (Arial 900) + Georgia body; UTC timeline
  strip under the masthead (8 cells, all sourced UTC timestamps);
  horizontal heroes (art 108px left, text right, flex stretch, .fline
  footer on one baseline via margin-top:auto); horizontal cards
  (48×48 square art left, text right) in 3 rows of 4 (4+4+3 + red
  "48 STORIES" statbox); black reversed section bars ("TOP STORIES",
  "ALSO TODAY"); ALSO in 4 columns (SCIENCE & HEALTH 8 | SPORT 7 |
  SPORT 7 | WORLD 12, SPORT header spans 2 columns) with ▸ scheduled /
  ●N pin markers + legend line; bottom row in 3 columns (DATE CHECK
  300px left | MAP flex middle, same v2 SVG | BY THE NUMBERS 300px
  right, black box with gold figures); footer with sources +
  verification line. Art: bold woodcut/duotone (ink black, red, gold,
  cream; big sun/moon discs, strong diagonals) — different from v2's
  flat muted scenes.
- Structure imitated from the top entries (titles only — source
  withheld, images NOT viewable): #1 samatch-we 0.991923 "35 dated
  stories, 7 regions"; #2 superskie 0.991550 "Saturday 21 November
  2026 in one picture"; #3 vivid-walrus "36 dated stories across seven
  regions"; #4 quiet-panda-11 0.991258 "49 stories, 7 regions, 41
  fields, each tagged by how sure it is, with UTC strip, pin map and
  date check"; #8 myhanni 0.990216 "36 stories, 7 regions, 13
  illustrated cards"; #13 ryan-liu 0.989955 "36 stories, consensus
  features Davao jet + Las Vegas GP + UK-EU reset, numbers strip 146".
  Winning signals taken: MORE stories (36 → 48), EVERY story dated,
  UTC strip, pin map + date check + numbers strip. Heroes kept (COP31,
  Riyadh, Peru — the day's consensus leads) but rendered in a new way.
- Stories: 36 → 48. New: France protests card (Reuters 17:03:39Z) +
  12 new ALSO items (Sparta II, Zelensky, Palisades verdict, FBI hack,
  Mamdani, UV photodiode, Thunder, Nuggets, Wizards, BYU, Real Madrid,
  England) — all verified against primary sources for 21 Nov (see
  FACT-SHEET.md). Removed: v2 ALSO "Nations Championship" (scheduled
  rugby R6) → replaced by the England 37–12 result. Rejected date
  traps (NOT rendered): Manipur, Bayer $7.25bn, Qatar Tehran talks,
  IG Metall Monday strike, ANC cities, teen gamer rescue, Denmark
  accusation (see FACT-SHEET.md).
- Map: v2 SVG reused VERBATIM (spliced from the published v2
  index.html on GitHub, main branch — 57,940 chars, viewBox
  "0 25 320 120", 21 numbered pin badges + 10 cluster dots). Pin check
  re-run programmatically: 21/21 within tolerance 0.5 (worst error
  0.18, Suwarrow) — script ~/workspace/makefun/pin_check_v3.py.
  The map caption's projection formula was dropped for fit (it is in
  the v2 fact sheet / BUILD-NOTES above).
- Fit (scrollHeight must be exactly 1024): render 1: 1565. Round 1
  (cards 6-per-row → 3 rows of 4, hero/card trims): 1339. Round 2 (CSS
  tighten: mast 25px, UTC/cards/ALSO fonts down, datebox/databox
  300px, map svg 78%, ALSO 7.5px, text trims): 1105. Round 3 (more
  trims + map caption shortened + databox tightened): 1037. Round 4
  (ALSO item margins 2px → 1px): 1024 exactly, SW 1024.
- Overflow found at 1024 (first 2048 view): the databox content was
  ~15 px taller than its row (the gold <b> figures are 12px, not 9px)
  and its 9th row overlapped the footer; the datebox's last item
  wrapped to 2 lines; Chrome's classic scrollbars also cascaded
  (horizontal → vertical) and hid the footer in the screenshot.
  Fixed: databox <b> 12px → 10.5px, "146 aboard Air Niugini" row cut
  (figure is in card 10), "31–29 BYU" row cut earlier (result is ALSO
  46), datebox 19 NOV item shortened to one line, --hide-scrollbars
  added to the render script. Re-rendered: bottom crop verified clean
  (all 8 databox rows + footer, no overlap).
- F1 card art fix: the "1:33.893" SVG text (13px at x=8) was clipped
  by the 54px viewBox — reduced to 10.5px at x=4, now fully visible.
- Region-count correction (found in the final audit): the first v3
  render said EUROPE 12 · ASIA 5. Recount proved EUROPE 11 · ASIA 6.
  Fixed in both occurrences (regions line + statbox) before the final
  render.
- Render: same Chrome pipeline (render script
  ~/workspace/makefun/render_news21_v3.py — measure + shot; probe
  updated for the v3 class names; --hide-scrollbars). 2048x2048 →
  Lanczos downscale to 1024x1024 → palette-quantized to 256 colours.
  entry.png: 1024x1024, 291,722 B, sha256
  cff5ce90a8754404cf8f9c141e726742709a3a2d80f8e26b596281fac053670d.
- Verification (all after the final render): scrollHeight 1024,
  scrollWidth 1024; main.ts run twice, exit 0, output byte-identical
  (sha256 cff5ce90...); pin check 21/21 (worst 0.18 Suwarrow); story
  count check 3+11+34 = 48, ALSO numbers exactly 15–48; final date
  audit 48/48, 0 errors; zoom-2048 check of the final render clean
  (masthead, UTC strip, heroes on one baseline, cards, ALSO, map,
  date check, numbers, footer — no clipped text, no overlaps, no dead
  white rectangles).
- NOT committed / bundled / checked / published / submitted (per task).
  The parent shows the image to Iwan first — the pipeline only moves
  after he likes it. NOTE: the v2 GitHub repo
  pumafelidae/news-image-20261121-v2 already exists with v2 files
  (HEAD 6a573d05) — v3 files are on disk only, uncommitted.
- /tmp files from the v3 build (render script, map block) were wiped
  between turns; durable copies: render script
  ~/workspace/makefun/render_news21_v3.py, map block
  ~/workspace/makefun/mapblock-v2.html, pin check
  ~/workspace/makefun/pin_check_v3.py, cards/ALSO splice sources
  ~/workspace/makefun/cards_v3.html + ~/workspace/makefun/also_v3.html.

## v3 EMPTY-SPACE FILL (2026-11-22, Iwan's order 12:24 WIB — "Itu banyak
space kosong bro isi dong bro space yang kosong")
- Plan: ~/workspace/makefun/news21-v3-fill-plan.md. The plan's
  diagnosis session was itself blocked by a security notice on a plain
  ls/sha256sum exec (false positive — the v3 builder ran the same
  commands clean 20 minutes earlier); the plan was written from
  read-only viewing only, so its estimates were WRONG in places and
  this session re-measured everything with headless Chrome probes
  before editing.
- Measured (NOT the plan's estimates): ALSO last-item bottoms (page y)
  SCI 797, SPORT1 769, SPORT2 805, WORLD 846 — legend 849–861, ALSO
  box bottom 861. Mapcap bottom 998 / mapbox 1005 → 7px cream gap
  (plan threshold >8px → leave). Databox last row 994/996 / box 1005
  → 9–11px black gap (threshold >15px → leave). Row-3 cards measured
  (box bottom 576/577): CEPA content 576 = FLUSH (the plan wrongly
  said CEPA was 20–30px short and France set the row height —
  actually France was shortest at 554, Women's 567, statbox 558).
  CEPA was NOT lengthened (it would grow the row); France +21px and
  Women's +10px from added verified clauses.
- All 6 new leads re-verified by this session against primary sources
  (search + source pages, 2026-11-22): 49 ALCOHOL WEAKENS
  IMMUNOTHERAPY — MedicalXpress article dated 2026-11-21, Gilley et
  al., Science Signaling, DOI 10.1126/scisignal.aef1375; ~50% cut in
  mice, >1 drink/week reduced survival benefit in human lung-cancer
  data (study itself published 17 Nov, the MedicalXpress report is the
  21 Nov publication). 50 GLP-1 ACCESS GAPS — MedicalXpress/BU,
  published 2026-11-21T15:47:23Z, Health Affairs Scholar (Le/Stokes,
  Boston Univ.), 1.9% (2021) → 16.6% (2025), 512,389 patients. 51
  WEMBANYAMA 50 — Reuters 21 Nov 22:42, 50 pts, 19 reb, 5 blk, 4 stl,
  Spurs 114–91 Pelicans, 32 in first half, first 50+15 boards/4
  steals/5 blocks since 1973–74, Castle 19. 52 HERRO 50, SIXERS WIN —
  Reuters/AP 21 Nov: Herro plays for MILWAUKEE (acquired in the
  Giannis trade), NOT Philadelphia — career-high 50 (15-23 FG, 7-12
  3PT, 13-13 FT), 11 reb, 7 ast; final 3 went in but after the buzzer;
  76ers beat Bucks 132–129; Embiid 26 pts, 17 reb, 9 ast; LeBron
  James 21 (13 in 4th) for the Sixers; Bucks' 13th straight loss,
  1–16; Burries 26 off the bench. 53 CREW 3–0 MIAMI — MLS Soccer/AP
  21 Nov: Columbus 3–0 Inter Miami, Game 1, Tapia brace (9' pen,
  58'), Habroune 52', Luján red 36', Miami 10 men. 54 UFC QATAR —
  UFC/Sherdog/MMA Junkie 21 Nov, Doha ABHA Arena, UFC Fight Night
  294: Navajo Stirling def. Jiri Prochazka by KO (right hand) at
  4:58 of Round 2; Stirling 12-0. Pin 14 = Doha — item 54 carries
  ●14. No alternates needed; no rejected traps reused.
- Edits (10 edits, all in index.html, session tool calls): counts 48
  → 54 everywhere (masthead "54 STORIES", regions line, statbox "54
  STORIES" + region lines, ALSO secbar "40 MORE STORIES", footer "All
  54 stories verified"); new region split N. AMERICA 15 · LATIN
  AMERICA 2 · EUROPE 11 · MIDEAST 4 · AFRICA 2 · ASIA 6 · OCEANIA 3
  · WORLD 11 = 54 (science +2 → WORLD per FACT-SHEET convention;
  sport +3 USA → N. AMERICA; UFC Qatar → MIDEAST); [SCHEDULED] stays
  7. New ALSO items 49–54 appended (49, 50 in SCI; 51, 52 in SPORT1;
  53, 54 in SPORT2). Women's card + "Organisers cite 15 women
  murdered daily." France card + "About 70,000 security forces were
  deployed; sporadic violence in Marseille." (both from FACT-SHEET.md,
  already verified).
- Fit history: first render after the 6 items: SH=1024, ALSO last
  items [846, 827, 845, 848] — SPORT1 still 21px short → added "Third
  50-point game of his career." to item 51 and "Burries 26 off the
  bench." to item 52. Second render: ALSO last items [846, 845, 845,
  848] — all four within 3px; row-3 content [576, 577, 575, 558]
  (statbox 558 = 19px solid-red gap, left alone); SH=1024, SW=1024.
- Zoom-2048 check caught ONE defect: the last DATE CHECK line was
  clipped by the box border (1px overflow — last li bottom 1006 vs
  box 1005; the fill grew the ALSO section 2px and the flex bottom
  row shrank 139 → 137). Fixed by reducing .bottom margin-top 5px →
  3px; re-measured last li 1004 vs box 1005, re-rendered, zoom-
  confirmed the line sits fully inside the box.
- Verification (all after the final render): scrollHeight 1024,
  scrollWidth 1024; main.ts run twice, exit 0, output byte-identical
  (sha256 2c120ed1...); pin check 21/21 (worst 0.18 Suwarrow); final
  date audit 54/54, 0 errors (script /tmp/audit_v3fill.py — ALSO
  numbers exactly 15–54 each once, 3+11, counts, region split,
  [SCHEDULED] 7, all new-item figures, no rejected traps, pin
  markers noted: 23 markers, 20 distinct, pin 9 New Delhi unmarked
  — pre-existing v3 state, no New Delhi story exists so no marker
  invented); zoom-2048 check clean (ALSO bottoms within 3px, no
  white pockets, no clipped text, no overlaps, heroes aligned,
  row-3 flush).
- Render: same Chrome pipeline (render_news21_v3.py). entry.png:
  1024x1024, 315,053 B, sha256
  2c120ed14de0c4c04bde143410c30844753d0100490de8411eef4d8a979d5e17.
- NOT committed / bundled / checked / published / submitted (per task).
  The parent shows the filled v3 to Iwan first — the pipeline only
  moves after he likes it. NOTE: the v2 GitHub repo
  pumafelidae/news-image-20261121-v2 already exists with v2 files
  (HEAD 6a573d05) — v3 files are on disk only, uncommitted.
