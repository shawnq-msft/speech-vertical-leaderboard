# Error analysis — mazda_en-GB_20260509_155254.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **en-GB_DT1** — Mazda en-GB DT1 voice commands (male + female pooled)
- **en-GB_DT2** — Mazda en-GB DT2 voice commands (male + female pooled)
- **en-GB_DT3** — Mazda en-GB DT3 voice commands (male + female pooled)
- **en-GB_DT4** — Mazda en-GB DT4 voice commands (male + female pooled)
- **en-GB_DT5** — Mazda en-GB DT5 voice commands (male + female pooled)
- **en-GB_JT1** — Mazda en-GB JT1 voice commands (male + female pooled)
- **en-GB_JT2** — Mazda en-GB JT2 voice commands (male + female pooled)
- **en-GB_JT3** — Mazda en-GB JT3 voice commands (male + female pooled)
- **en-GB_JT4** — Mazda en-GB JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_en-GB_20260509_155254_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=6, `trim_both`=5, `trim_first`=5, `trim_last`=6

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| en-GB_DT1 | fast_default | 30 | 0.268 | 0.500 | 1.2 | 9.9 | 13.7 | 608 / 663 | 1184 / 1297 |
| en-GB_DT1 | fast_llm | 30 | 0.276 | 0.500 | 3.7 | 3.7 | 19.3 | 483 / 554 | 982 / 1151 |
| en-GB_DT1 | fast_mai | 30 | 0.249 | 0.433 | 3.1 | 8.1 | 11.2 | 471 / 568 | 922 / 1059 |
| en-GB_DT1 | realtime | 30 | 0.282 | 0.600 | 3.1 | 8.1 | 16.1 | -200 / 356 | 673 / 853 |
| en-GB_DT1 | realtime_refine | 30 | 0.292 | 0.500 | 5.6 | 6.8 | 18.6 | 286 / 708 | 1271 / 1464 |
| en-GB_DT1 | whisper_v3 | 30 | 0.268 | 0.500 | 1.2 | 9.9 | 13.7 | 607 / 673 | 1183 / 1402 |
| en-GB_DT2 | fast_default | 30 | 0.346 | 0.667 | 4.3 | 9.3 | 22.4 | 609 / 670 | 1166 / 1256 |
| en-GB_DT2 | fast_llm | 30 | 0.304 | 0.600 | 5.0 | 11.2 | 14.9 | 468 / 503 | 1007 / 1093 |
| en-GB_DT2 | fast_mai | 30 | 0.299 | 0.533 | 8.1 | 4.3 | 23.0 | 459 / 540 | 921 / 1092 |
| en-GB_DT2 | realtime | 30 | 0.375 | 0.767 | 5.6 | 10.6 | 21.7 | -201 / 314 | 731 / 1183 |
| en-GB_DT2 | realtime_refine | 30 | 0.377 | 0.667 | 6.8 | 4.3 | 27.3 | 234 / 668 | 1328 / 1848 |
| en-GB_DT2 | whisper_v3 | 30 | 0.346 | 0.667 | 4.3 | 9.3 | 22.4 | 626 / 678 | 1182 / 1272 |
| en-GB_DT3 | fast_default | 30 | 0.070 | 0.300 | 2.5 | 0.6 | 5.0 | 615 / 666 | 1097 / 1218 |
| en-GB_DT3 | fast_llm | 30 | 0.054 | 0.233 | 1.9 | 0.6 | 3.7 | 485 / 564 | 966 / 1154 |
| en-GB_DT3 | fast_mai | 30 | 0.038 | 0.167 | 1.2 | 0.6 | 2.5 | 459 / 524 | 931 / 1101 |
| en-GB_DT3 | realtime | 30 | 0.116 | 0.400 | 3.7 | 0.6 | 8.1 | -174 / 301 | 628 / 778 |
| en-GB_DT3 | realtime_refine | 30 | 0.083 | 0.300 | 2.5 | 0.6 | 5.6 | 206 / 660 | 1132 / 1276 |
| en-GB_DT3 | whisper_v3 | 30 | 0.070 | 0.300 | 2.5 | 0.6 | 5.0 | 619 / 675 | 1102 / 1228 |
| en-GB_DT4 | fast_default | 30 | 0.287 | 0.667 | 6.8 | 6.8 | 16.1 | 635 / 734 | 1123 / 1279 |
| en-GB_DT4 | fast_llm | 30 | 0.176 | 0.467 | 3.7 | 5.0 | 8.7 | 471 / 514 | 959 / 1082 |
| en-GB_DT4 | fast_mai | 30 | 0.222 | 0.567 | 3.7 | 3.1 | 13.0 | 471 / 560 | 959 / 1098 |
| en-GB_DT4 | realtime | 30 | 0.234 | 0.667 | 3.1 | 5.0 | 16.1 | -202 / 501 | 671 / 1011 |
| en-GB_DT4 | realtime_refine | 30 | 0.270 | 0.700 | 8.1 | 2.5 | 17.4 | 263 / 820 | 1254 / 1445 |
| en-GB_DT4 | whisper_v3 | 30 | 0.287 | 0.667 | 6.8 | 6.8 | 16.1 | 617 / 688 | 1105 / 1224 |
| en-GB_DT5 | fast_default | 30 | 0.049 | 0.233 | 1.9 | 0.6 | 3.7 | 610 / 656 | 1084 / 1198 |
| en-GB_DT5 | fast_llm | 30 | 0.049 | 0.167 | 1.9 | 0.6 | 3.1 | 476 / 524 | 950 / 1077 |
| en-GB_DT5 | fast_mai | 30 | 0.038 | 0.167 | 1.2 | 0.6 | 2.5 | 470 / 582 | 944 / 1084 |
| en-GB_DT5 | realtime | 30 | 0.060 | 0.267 | 1.2 | 0.6 | 5.0 | -172 / 335 | 622 / 790 |
| en-GB_DT5 | realtime_refine | 30 | 0.057 | 0.233 | 1.9 | 0.6 | 4.3 | 220 / 647 | 1157 / 1347 |
| en-GB_DT5 | whisper_v3 | 30 | 0.049 | 0.233 | 1.9 | 0.6 | 3.7 | 601 / 667 | 1075 / 1192 |
| en-GB_JT1 | fast_default | 30 | 0.031 | 0.133 | 1.9 | 0.6 | 1.2 | 595 / 680 | 1044 / 1212 |
| en-GB_JT1 | fast_llm | 30 | 0.071 | 0.233 | 1.9 | 0.6 | 5.0 | 468 / 508 | 917 / 1049 |
| en-GB_JT1 | fast_mai | 30 | 0.060 | 0.200 | 1.9 | 0.6 | 3.1 | 474 / 562 | 923 / 1058 |
| en-GB_JT1 | realtime | 30 | 0.063 | 0.267 | 1.9 | 0.6 | 5.0 | -148 / 311 | 591 / 803 |
| en-GB_JT1 | realtime_refine | 30 | 0.039 | 0.167 | 1.9 | 0.6 | 2.5 | 209 / 663 | 1115 / 1231 |
| en-GB_JT1 | whisper_v3 | 30 | 0.031 | 0.133 | 1.9 | 0.6 | 1.2 | 604 / 669 | 1053 / 1194 |
| en-GB_JT2 | fast_default | 30 | 0.136 | 0.433 | 3.7 | 1.9 | 10.6 | 592 / 673 | 1103 / 1252 |
| en-GB_JT2 | fast_llm | 30 | 0.147 | 0.500 | 1.9 | 3.7 | 8.7 | 476 / 542 | 986 / 1070 |
| en-GB_JT2 | fast_mai | 30 | 0.097 | 0.333 | 1.9 | 1.9 | 5.6 | 470 / 533 | 953 / 1070 |
| en-GB_JT2 | realtime | 30 | 0.217 | 0.600 | 5.6 | 1.9 | 14.3 | -204 / 330 | 664 / 857 |
| en-GB_JT2 | realtime_refine | 30 | 0.220 | 0.567 | 5.6 | 2.5 | 15.5 | 190 / 669 | 1144 / 1301 |
| en-GB_JT2 | whisper_v3 | 30 | 0.136 | 0.433 | 3.7 | 1.9 | 10.6 | 610 / 652 | 1121 / 1213 |
| en-GB_JT3 | fast_default | 30 | 0.036 | 0.133 | 1.9 | 0.6 | 1.9 | 610 / 682 | 1072 / 1210 |
| en-GB_JT3 | fast_llm | 30 | 0.042 | 0.167 | 1.9 | 0.6 | 2.5 | 486 / 537 | 948 / 1087 |
| en-GB_JT3 | fast_mai | 30 | 0.060 | 0.200 | 1.9 | 0.6 | 3.1 | 494 / 601 | 956 / 1142 |
| en-GB_JT3 | realtime | 30 | 0.040 | 0.200 | 1.2 | 0.6 | 3.1 | -164 / 312 | 582 / 768 |
| en-GB_JT3 | realtime_refine | 30 | 0.036 | 0.133 | 1.9 | 0.6 | 1.9 | 231 / 670 | 1137 / 1244 |
| en-GB_JT3 | whisper_v3 | 30 | 0.036 | 0.133 | 1.9 | 0.6 | 1.9 | 610 / 691 | 1072 / 1244 |
| en-GB_JT4 | fast_default | 30 | 0.046 | 0.200 | 1.9 | 0.6 | 3.1 | 579 / 645 | 1038 / 1207 |
| en-GB_JT4 | fast_llm | 30 | 0.046 | 0.200 | 1.9 | 0.6 | 3.1 | 468 / 502 | 927 / 1065 |
| en-GB_JT4 | fast_mai | 30 | 0.063 | 0.233 | 1.9 | 0.6 | 3.7 | 462 / 571 | 921 / 1045 |
| en-GB_JT4 | realtime | 30 | 0.055 | 0.233 | 1.9 | 0.6 | 4.3 | -165 / 307 | 584 / 778 |
| en-GB_JT4 | realtime_refine | 30 | 0.046 | 0.200 | 1.9 | 0.6 | 3.1 | 233 / 681 | 1138 / 1306 |
| en-GB_JT4 | whisper_v3 | 30 | 0.046 | 0.200 | 1.9 | 0.6 | 3.1 | 616 / 672 | 1075 / 1244 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/en-GB_DT2/2r_en-GB_male-DT2/higher%20volume%20please.wav.wav) | en-GB_DT2 | 2r_en-GB_male-DT2/higher volume please.wav | fast_mai | 2.667 | `higher volume please` | `I will call you in a few minutes.` |
| [▶](audio/en-GB_DT1/1r_en-GB_female-DT1/Add%20Starbucks%20as%20a%20waypoint.wav.wav) | en-GB_DT1 | 1r_en-GB_female-DT1/Add Starbucks as a waypoint.wav | realtime_refine | 2.000 | `Add Starbucks as a waypoint` | `I want to spell them, and do you want to?` |
| [▶](audio/en-GB_DT1/2r_en-GB_male-DT1/higher%20volume%20please.wav.wav) | en-GB_DT1 | 2r_en-GB_male-DT1/higher volume please.wav | realtime_refine | 1.667 | `higher volume please` | `I have all the based.` |
| [▶](audio/en-GB_DT1/2r_en-GB_male-DT1/higher%20volume%20please.wav.wav) | en-GB_DT1 | 2r_en-GB_male-DT1/higher volume please.wav | realtime | 1.333 | `higher volume please` | `I am vulnerable, pleased.` |
| [▶](audio/en-GB_DT2/2r_en-GB_male-DT2/higher%20volume%20please.wav.wav) | en-GB_DT2 | 2r_en-GB_male-DT2/higher volume please.wav | fast_llm | 1.333 | `higher volume please` | `How important is this?` |
| [▶](audio/en-GB_DT2/1r_en-GB_female-DT2/Enable%20automatic%20window%20closing%20when%20locking%20the%20car.wav.wav) | en-GB_DT2 | 1r_en-GB_female-DT2/Enable automatic window closing when locking the car.wav | fast_mai | 1.250 | `Enable automatic window closing when locking the car` | `Then I do 1st mark the winter's light there.` |
| [▶](audio/en-GB_DT2/2l_en-GB_female-DT2/Fold%20in%20rearview%20Mirrors.wav.wav) | en-GB_DT2 | 2l_en-GB_female-DT2/Fold in rearview Mirrors.wav | fast_mai | 1.250 | `Fold in rearview Mirrors` | `Phone Dan Will you marry?` |
| [▶](audio/en-GB_DT1/1r_en-GB_female-DT1/Add%20Starbucks%20as%20a%20waypoint.wav.wav) | en-GB_DT1 | 1r_en-GB_female-DT1/Add Starbucks as a waypoint.wav | fast_llm | 1.200 | `Add Starbucks as a waypoint` | `And it's still and still.` |
| [▶](audio/en-GB_DT2/1r_en-GB_female-DT2/Add%20Starbucks%20as%20a%20waypoint.wav.wav) | en-GB_DT2 | 1r_en-GB_female-DT2/Add Starbucks as a waypoint.wav | realtime_refine | 1.200 | `Add Starbucks as a waypoint` | `Fill a mouse on the road.` |
| [▶](audio/en-GB_DT2/1r_en-GB_female-DT2/Add%20Starbucks%20as%20a%20waypoint.wav.wav) | en-GB_DT2 | 1r_en-GB_female-DT2/Add Starbucks as a waypoint.wav | whisper_v3 | 1.200 | `Add Starbucks as a waypoint` | `Fill a mouse on the road.` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 62 | `lights` | `light` |
| 50 | `window` | `windows` |
| 45 | `brightness` | `s` |
| 45 | `by` | `brightness` |
| 45 | `20` | `by` |
| 45 | `percent` | `20` |
| 19 | `center` | `centre` |
| 18 | `favourites` | `favorites` |
| 15 | `3` | `three` |
| 9 | `to` | `for` |
| 8 | `android` | `joint` |
| 7 | `configure` | `figure` |
| 7 | `exit` | `set` |
| 6 | `trailer` | `train` |
| 6 | `disable` | `enable` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

Found **8** likely hallucinations (WER ≥ 0.8 and ≤ 1 word overlap with reference):

| Audio | Dataset | Sample | WER | Boundary | Reference | Hypothesis |
|---|---|---|---:|---|---|---|
| [▶](audio/en-GB_DT1/1r_en-GB_female-DT1/Add%20Starbucks%20as%20a%20waypoint.wav.wav) | en-GB_DT1 | 1r_en-GB_female-DT1/Add Starbucks as a waypoint.wav | 1.200 | trim_both | `Add Starbucks as a waypoint` | `And it's still and still.` |
| [▶](audio/en-GB_DT1/2l_en-GB_female-DT1/Fold%20in%20rearview%20Mirrors.wav.wav) | en-GB_DT1 | 2l_en-GB_female-DT1/Fold in rearview Mirrors.wav | 1.000 | none | `Fold in rearview Mirrors` | `Golden Rev Yimery.` |
| [▶](audio/en-GB_DT1/2l_en-GB_male-DT1/Open%20front%20row%20window%20to%2060%25.wav.wav) | en-GB_DT1 | 2l_en-GB_male-DT1/Open front row window to 60%.wav | 0.833 | skip | `Open front row window to 60%` | `The window is 50%.` |
| [▶](audio/en-GB_DT1/2r_en-GB_female-DT1/Open%20rear%20row%20window.wav.wav) | en-GB_DT1 | 2r_en-GB_female-DT1/Open rear row window.wav | 1.000 | trim_last | `Open rear row window` | `Open, read, write, and type.` |
| [▶](audio/en-GB_DT2/1l_en-GB_male-DT2/Close%20front%20row%20window%20to%20half.wav.wav) | en-GB_DT2 | 1l_en-GB_male-DT2/Close front row window to half.wav | 0.833 | trim_both | `Close front row window to half` | `Window.` |
| [▶](audio/en-GB_DT2/1r_en-GB_female-DT2/Add%20Starbucks%20as%20a%20waypoint.wav.wav) | en-GB_DT2 | 1r_en-GB_female-DT2/Add Starbucks as a waypoint.wav | 1.000 | skip | `Add Starbucks as a waypoint` | `你知道吗？` |
| [▶](audio/en-GB_DT2/2r_en-GB_male-DT2/higher%20volume%20please.wav.wav) | en-GB_DT2 | 2r_en-GB_male-DT2/higher volume please.wav | 1.333 | skip | `higher volume please` | `How important is this?` |
| [▶](audio/en-GB_DT4/1l_en-GB_female-DT4/Unmute%20the%20media.wav.wav) | en-GB_DT4 | 1l_en-GB_female-DT4/Unmute the media.wav | 1.000 | trim_first | `Unmute the media` | `Yeah.` |

## Top fast_default vs realtime disagreements

### en-GB_JT2/1l_en-GB_female-JT2/Unmute the media.wav [▶](audio/en-GB_JT2/1l_en-GB_female-JT2/Unmute%20the%20media.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[1.6s, 2.16s] fix=trim_first
- ref:           `Unmute the media`
- fast_default   `Unmute the media.`
- fast_llm       `Unmute the media.`
- fast_mai       `Unmute the media.`
- realtime       `On which the?`
- realtime_refine `Unmute the media.`
- whisper_v3     `Unmute the media.`

### en-GB_DT2/1l_en-GB_female-DT2/Enable Android AUTO.wav [▶](audio/en-GB_DT2/1l_en-GB_female-DT2/Enable%20Android%20AUTO.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[1.32s, 2.72s] fix=trim_last
- ref:           `Enable Android AUTO`
- fast_default   `Enable Android Auto.`
- fast_llm       `Enable man joint auto.`
- fast_mai       `Enable Android Auto.`
- realtime       `Enable and joint autom.`
- realtime_refine `Enable Android Auto`
- whisper_v3     `Enable Android Auto.`

### en-GB_DT1/2r_en-GB_male-DT1/higher volume please.wav [▶](audio/en-GB_DT1/2r_en-GB_male-DT1/higher%20volume%20please.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[1.45s, 2.21s] fix=trim_last
- ref:           `higher volume please`
- fast_default   `Higher volume, please.`
- fast_llm       `High volume, please.`
- fast_mai       `Higher volume, please.`
- realtime       `I am vulnerable, pleased.`
- realtime_refine `I have all the based.`
- whisper_v3     `Higher volume, please.`

### en-GB_DT1/2r_en-GB_female-DT1/Turn off rear fog lights.wav [▶](audio/en-GB_DT1/2r_en-GB_female-DT1/Turn%20off%20rear%20fog%20lights.wav.wav)  Δwer=1.000  (fast_default=1.000, realtime=0.000)  speech=[0.83s, 2.91s] fix=none
- ref:           `Turn off rear fog lights`
- fast_default   ``
- fast_llm       `Turn off real for blind.`
- fast_mai       `Turn off rear fog lamp.`
- realtime       `Turn off rear fog lights.`
- realtime_refine ``
- whisper_v3     ``

### en-GB_DT4/1r_en-GB_female-DT4/Add Starbucks as a waypoint.wav [▶](audio/en-GB_DT4/1r_en-GB_female-DT4/Add%20Starbucks%20as%20a%20waypoint.wav.wav)  Δwer=0.800  (fast_default=1.000, realtime=0.200)  speech=[0.72s, 2.88s] fix=none
- ref:           `Add Starbucks as a waypoint`
- fast_default   `At Starbucks, it has a way volunteer.`
- fast_llm       `At Starbucks, as a way to vent.`
- fast_mai       `Have fun and have a great holiday.`
- realtime       `At Starbucks as a waypoint.`
- realtime_refine `At Starbucks, it has a way volume to.`
- whisper_v3     `At Starbucks, it has a way volunteer.`

### en-GB_DT1/2l_en-GB_female-DT1/Fold in rearview Mirrors.wav [▶](audio/en-GB_DT1/2l_en-GB_female-DT1/Fold%20in%20rearview%20Mirrors.wav.wav)  Δwer=0.750  (fast_default=1.000, realtime=0.250)  speech=[1.27s, 3.23s] fix=none
- ref:           `Fold in rearview Mirrors`
- fast_default   `Phone Dan Rivi Maren.`
- fast_llm       `Golden Rev Yimery.`
- fast_mai       `Fold in rear view mirrors.`
- realtime       `Fold in review mirrors.`
- realtime_refine `Call Dan Rivi Maren.`
- whisper_v3     `Phone Dan Rivi Maren.`

### en-GB_JT2/1r_en-GB_female-JT2/Switch the braking mode to standard.wav [▶](audio/en-GB_JT2/1r_en-GB_female-JT2/Switch%20the%20braking%20mode%20to%20standard.wav.wav)  Δwer=0.667  (fast_default=0.000, realtime=0.667)  speech=[1.02s, 3.42s] fix=trim_first
- ref:           `Switch the braking mode to standard`
- fast_default   `Switch the braking mode to standard.`
- fast_llm       `Switch the briefing mode to standard.`
- fast_mai       `Switch the braking mode to standard.`
- realtime       `Through which the briefing mode the standard.`
- realtime_refine `through which the briefing made the standard.`
- whisper_v3     `Switch the braking mode to standard.`

### en-GB_DT1/1l_en-GB_male-DT1/Lower driver seat ventilation by 3 levels.wav [▶](audio/en-GB_DT1/1l_en-GB_male-DT1/Lower%20driver%20seat%20ventilation%20by%203%20levels.wav.wav)  Δwer=0.571  (fast_default=0.429, realtime=1.000)  speech=[1.35s, 3.31s] fix=trim_both
- ref:           `Lower driver seat ventilation by 3 levels`
- fast_default   `Lower driver seat ventilation from theaters.`
- fast_llm       `Lower cloud at sea ventilation pumps the others.`
- fast_mai       `Lower driver's seat ventilation and theaters.`
- realtime       `Well, as long as seat ventilation points the others.`
- realtime_refine `Lower drivers seek ventilation than the others.`
- whisper_v3     `Lower driver seat ventilation from theaters.`

### en-GB_DT3/2l_en-GB_female-DT3/Fold in rearview Mirrors.wav [▶](audio/en-GB_DT3/2l_en-GB_female-DT3/Fold%20in%20rearview%20Mirrors.wav.wav)  Δwer=0.500  (fast_default=0.250, realtime=0.750)  speech=[-s, -s] fix=skip
- ref:           `Fold in rearview Mirrors`
- fast_default   `Fold in rearview mirror.`
- fast_llm       `Fold in rearview mirror.`
- fast_mai       `Fold in rear view mirrors.`
- realtime       `Fold in rear view mirror.`
- realtime_refine `Fold in, rear view mirror.`
- whisper_v3     `Fold in rearview mirror.`

### en-GB_DT2/1r_en-GB_female-DT2/make the map smaller.wav [▶](audio/en-GB_DT2/1r_en-GB_female-DT2/make%20the%20map%20smaller.wav.wav)  Δwer=0.500  (fast_default=0.750, realtime=0.250)  speech=[0.71s, 2.11s] fix=none
- ref:           `make the map smaller`
- fast_default   `Make the maps and laugh.`
- fast_llm       `Make the map smaller.`
- fast_mai       `Make the map smaller.`
- realtime       `Make the map slower.`
- realtime_refine `Make the maps and laugh.`
- whisper_v3     `Make the maps and laugh.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.