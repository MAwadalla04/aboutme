# Portfolio extension finish review

Reviewed September 7, 2026 by an independent fresh-context reviewer.

## Initial disposition: fix

- Homepage and Projects UI passed the scoped visual review at 1440, 768, 390, and 320 pixels, including the existing Knicks theme.
- Case-study screenshots at 1440 and 768 revealed the image overlapping tabs and narrative. A screenshot-specific sizing override is being verified in the verdict pass.
- The real screenshot, first/default-expanded KnicksIQ entry, live links, and numeric typography were retained. Hero graph and animation source remain unchanged.
- The three old Knicks-theme side-tab flags remain intentionally retained through the existing narrow `side-tab` + `src/index.css` exception; no global rule suppression.
- Rickroll dialog interactions pass, but YouTube reports unavailable/auth for the corrected official ID. Playback remains unresolved pending the user's alternate-provider or file choice. No successful playback claim is made.
- DESIGN.md is recorded after the layout correction.

## Verdict pass: ship for reviewed UI scope

The independent reviewer re-read the same four case-study captures and scored the screenshot collision resolved at 1440, 768, 390, and 320. The contained, uncropped image, tabs, and narrative are visibly separate; homepage and Projects sizing are preserved. No further correction was requested for the listed UI issue.

Browser regression checks pass at all four widths: screenshot loads, default featured expansion, no horizontal overflow in either theme, every case-study tab usable, and native Rickroll close focus/scroll cleanup without creating a new tab. The final unit suite has 12 passing tests, including the complete 11-character video ID and trigger focus restoration.

This verdict covers the reviewed UI only. YouTube playback remains unavailable in the test browser and is not certified; the overall three-task goal is not complete.

## Follow-up playback check

The unchanged local Projects app returned HTTP 200. A diagnostic-only iframe swap to the public Vimeo embed `https://player.vimeo.com/video/1024530426` also failed: the provider reported that it could not verify the connection's security and restricted access. No playable video element was present in either sampled state. The browser session ended normally; application source was not switched away from YouTube, and no access restriction was bypassed.

Changing providers is therefore not a verified remedy in this environment. Next evidence needed: the user checks `/useless` in their ordinary browser, or supplies an authorized video file for a same-origin player. Playback remains explicitly unverified.

## User-confirmed failure

The user subsequently confirmed the same “video is not available / watch on YouTube” message in their ordinary browser. This is a confirmed playback defect, not merely an automation limitation.

The red-capable check `python3 .artifacts/portfolio-finish/rickroll_playback.py` drives `/useless` and requires a ready, unpaused video with advancing playback time. It fails on the actual source with `AssertionError: PLAYBACK FAILED: This video is unavailable`. Diagnostic-only tests of `oHg5SJYRHA0` and the artist-linked official animated/live uploads `LLFhKaqnWwk` and `DD70oKDlemE` fail with the same message. The artist's source page is https://rickastley.co.uk/videos/ . No provider restrictions were bypassed and no unverified alternate source was installed.

A video file the user is authorized to host is needed for a same-origin native player. All visual implementation and the graph remain unchanged while awaiting that source.

## User-supplied embed trial

Replaced the iframe source with the user's exact URL, `https://www.youtube.com/embed/QDia3e12czc?si=iCIT4c2Tyxc7MCAt`, and matched the supplied feature permissions while preserving responsive dialog sizing and cleanup. The source regression test now asserts this video ID and share parameter. Production build and all 12 unit tests pass.

The actual playback check still fails with “This video is unavailable / Watch on YouTube” in the automated browser. The supplied URL remains installed for the user to try; this change is not claimed as verified playback. No typography, graph, or layout source was changed in this trial.

## Confirmed cause for the supplied video

The public YouTube IFrame API reports `onError` code **150** for `QDia3e12czc`. Google's API reference defines this as equivalent to 101: the video owner does not allow playback in embedded players. The actual iframe request includes `Referer: http://127.0.0.1:3000/`, ruling out a missing-referrer explanation for that request.

As a control, YouTube's own documented sample video `M7lc1UVf-VE` plays in the same local dialog, with playback time advancing from 0.510 to 2.021 seconds. Its screenshot is `.artifacts/portfolio-finish/youtube-control-playing.png`; it is NOT evidence of successful Rickroll playback. These results identify a video-specific embedding restriction, rather than a generally broken dialog or a blanket inability to play YouTube in the test browser. Earlier speculation about requiring an MP4 or general network restrictions was too broad.

Evidence commands: `python3 .artifacts/portfolio-finish/youtube_error_code.py` and `python3 .artifacts/portfolio-finish/rickroll_playback.py 'https://www.youtube.com/embed/M7lc1UVf-VE'`. Definition: https://developers.google.com/youtube/iframe_api_reference#onError . The user-supplied source remains installed; no app changes were made during this diagnosis.

The user's next candidate, `https://www.youtube.com/embed/xMHJGd3wwZk?si=n8G8uYn5azlXL0mL`, was tested in the same dialog before installation. It also fails the advancing-playback assertion and reports IFrame API error 150. It was not installed; application source remains on the previous user-supplied `QDia3e12czc` embed. The restriction remains video-specific embedding permission, with no app or graph changes in this candidate trial.

## Current installed source: official embed requested by user

After another rejected candidate (`nnu-mzqm6FQ`, error 150), the user explicitly requested the official embed `https://www.youtube.com/embed/dQw4w9WgXcQ?si=3lWz-tXwk-1xnebm`. This exact URL is now installed in RickrollDialog.js, with the source regression assertion updated to match. All 12 unit tests pass. The actual in-page playback check still returns “This video is unavailable / Watch on YouTube”; playback is not verified. The user-selected source remains installed, and the graph and visual layouts are unchanged.

## Final user decision: restore new-tab behavior

The user explicitly requested reverting `/useless` to a new tab until an alternative is found. This supersedes the in-page playback requirement for the current delivery. Header.js now renders a standard link to `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, with `target="_blank"`, `rel="noopener noreferrer"`, an accessible new-tab label, and mobile-menu cleanup. The header no longer imports or mounts RickrollDialog. Its implementation is retained for future investigation, not shipped as active behavior.

Completion audit under this revised request:

- New-tab link: browser tests at 1440, 768, 390, and 320 confirm a separate YouTube tab opens, the portfolio remains on Projects, no video dialog mounts, and the mobile menu closes.
- KnicksIQ on Projects: same browser matrix confirms it is first, expanded by default, and displays its real screenshot. All case-study tabs remain usable without image overlap.
- Homepage showcase: same matrix confirms the image loads after the unchanged hero, with no horizontal overflow; Knicks theme checks also pass.
- Typography and graph invariants: Inter numeric roles remain; Hero.js and Hero.test.js have no diff. All 13 unit tests pass, including the new-tab link and preserved hero timeline/graph tests.
- Production build passes. DESIGN.md and its JSON sidecar record the user's new-tab decision.

The current requested work is complete. Embedded Rickroll playback remains a deferred future task, not a claimed success.
