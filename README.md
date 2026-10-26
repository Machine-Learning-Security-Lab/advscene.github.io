# AdvScene paper page

Open `index.html` directly in a browser, or serve this folder from a static
host. No package installation or build step is required. The active page
contains its own CSS, JavaScript, and manuscript figures; `content.js`,
`site.js`, and `styles.css` are retained from an earlier draft and are not
loaded by `index.html`.

```bash
python -m http.server 8000 --directory website
```

## Selected demonstrations

The demo includes exactly the nine scenes selected in
[`video_review_results.md`](../video_review_results.md), with Apple first in CO3D:

| Dataset | Scenes |
| --- | --- |
| CO3D | apple_0, ball_0, book_1, suitcase_0, skateboard_0 |
| Waymo | 095, 027, 189, 395 |

Only `comparison.mp4` is copied for each scene, together with the corresponding
first comparison frame as its poster. Clean is on the left and adversarial is
on the right. The original video files are unchanged, including their frame
order, prediction labels, and YES / NO / N/A annotations. CO3D uses ResNet-50;
Waymo uses YOLOv8n. These selected native 2DGS examples are newer implementation
media; the manuscript's study counts and reported findings describe the paper.

Source directory:

```text
/project/xiaoyon/trustai/brian/3dgs_physical_attack/web_assets/2026-10-25_all_scene_font22_r1
```

Website copies live under `assets/videos/co3d/` and `assets/videos/waymo/`.
[`assets/videos/manifest.json`](assets/videos/manifest.json) records the exact
source paths, local URLs, SHA256 hashes, dimensions, frame counts, and frame
rates. Video URLs are relative, so the folder works under a static-host
subdirectory as well as locally. The nine MP4s total about 19.7 MiB.

## Player layout

Each dataset has scene buttons above one large comparison player. Changing a
scene pauses the previous clip. Playback starts only when requested. Play/pause, seeking, elapsed time, and
fullscreen controls sit in a separate row below the video, leaving annotation
text unobstructed. Fullscreen includes both the video and its controls. Posters load without preloading every
video. Without JavaScript, all nine players remain available in document order.

Players retain each source video's aspect ratio so neither the scene nor the
caption strip is cropped. On small screens, use fullscreen or the Open video
link to inspect labels. Source load errors are shown explicitly.

## Editing

Edit scene cards, video sources, and selector buttons directly in `index.html`.
Keep each button's `data-show-scene` and `aria-controls` aligned with its card's
`id`. Update the manifest whenever replacing media. Do not use the older
`content.js` configuration to change this page.

All selected media are local copies; original experiment outputs stay in shared
project storage. Hosting and publication are separate from this local webpage
update.

## Local review — 2026-10-26

Checked on branch `advscene-v2.0`, based on commit `e8ac73ac`:

- All nine copied MP4 hashes match their source export records.
- All 36 local asset/link references resolve; selector targets, internal
  anchors, unique IDs, JavaScript syntax, and whitespace checks pass.
- Firefox screenshots reviewed at 1440px and 450px viewport widths: no
  horizontal overflow, correct selected scenes, all images loaded, and hidden
  players paused. Tall videos fit within 76% of the viewport height; wide
  comparisons keep their original aspect ratio.
- Playback could not be verified in this node's Firefox: its H.264 capability
  query returns an empty string, with decoder output
  `NS_ERROR_DOM_MEDIA_METADATA_ERR (0x806e0006)`. Original MP4s are preserved.
  Confirm playback in a browser with H.264 support before publication.

Review screenshots are under `/tmp/advscene-web-review/` and are not part of
the site bundle. This update generates no new experiment or attack result.

## Player and findings revision — 2026-10-26

Based on commit `122c6b39559af97eee163a8854de71bb7dcfd5cc`:

- CO3D now starts with apple_0, followed by ball_0, book_1, suitcase_0, and
  skateboard_0. Player order, scene buttons, and the manifest agree.
- JavaScript replaces overlaying native controls with a separate control row
  below each video. Fullscreen includes that row; annotations remain clear.
  Without JavaScript, native players remain available.
- Four numbered findings place text before figures in document order, with
  text on the left on desktop and above figures on narrow screens. Category
  tags were removed. A conclusion follows the findings.
- Firefox review at 1440px and 450px passed: correct order, no horizontal
  overflow, controls below video bounds, and correct findings layout.
- A temporary WebM generated in the browser verified actual play, pause,
  seeking, pause on scene switch, and fullscreen with separate controls.
  This checks control behavior independently of the previously documented
  H.264 decoder limitation; it does not verify playback of the original MP4s.
- All nine original MP4 hashes remain unchanged. Inline JavaScript syntax,
  local asset references, and whitespace checks pass.
