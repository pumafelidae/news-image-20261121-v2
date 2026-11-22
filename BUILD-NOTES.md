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
