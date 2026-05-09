# Error analysis — mazda_sv-SE_20260509_165620.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **sv-SE_DT1** — Mazda sv-SE DT1 voice commands (male + female pooled)
- **sv-SE_DT2** — Mazda sv-SE DT2 voice commands (male + female pooled)
- **sv-SE_DT3** — Mazda sv-SE DT3 voice commands (male + female pooled)
- **sv-SE_DT4** — Mazda sv-SE DT4 voice commands (male + female pooled)
- **sv-SE_DT5** — Mazda sv-SE DT5 voice commands (male + female pooled)
- **sv-SE_JT1** — Mazda sv-SE JT1 voice commands (male + female pooled)
- **sv-SE_JT2** — Mazda sv-SE JT2 voice commands (male + female pooled)
- **sv-SE_JT3** — Mazda sv-SE JT3 voice commands (male + female pooled)
- **sv-SE_JT4** — Mazda sv-SE JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_sv-SE_20260509_165620_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=21, `trim_both`=30, `trim_first`=30, `trim_last`=22

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| sv-SE_DT1 | fast_default | 30 | 0.500 | 0.867 | 8.5 | 5.4 | 38.0 | 926 / 1010 | 1596 / 2439 |
| sv-SE_DT1 | fast_mai | 30 | 0.298 | 0.600 | 10.1 | 3.9 | 17.8 | 487 / 648 | 957 / 1164 |
| sv-SE_DT1 | realtime | 30 | 0.518 | 0.900 | 8.5 | 5.4 | 38.0 | -622 / -320 | 931 / 1021 |
| sv-SE_DT1 | whisper_v3 | 30 | 0.500 | 0.867 | 8.5 | 5.4 | 38.0 | 921 / 1004 | 1591 / 2606 |
| sv-SE_DT2 | fast_default | 30 | 0.539 | 0.867 | 10.9 | 7.0 | 36.4 | 881 / 979 | 1520 / 2005 |
| sv-SE_DT2 | fast_mai | 30 | 0.434 | 0.667 | 13.2 | 7.0 | 24.0 | 499 / 663 | 988 / 1214 |
| sv-SE_DT2 | realtime | 30 | 0.585 | 0.900 | 13.2 | 7.0 | 43.4 | -572 / -287 | 1014 / 1336 |
| sv-SE_DT2 | whisper_v3 | 30 | 0.539 | 0.867 | 10.9 | 7.0 | 36.4 | 941 / 985 | 1580 / 2601 |
| sv-SE_DT3 | fast_default | 30 | 0.477 | 0.867 | 7.0 | 6.2 | 30.2 | 899 / 968 | 1539 / 2055 |
| sv-SE_DT3 | fast_mai | 30 | 0.226 | 0.500 | 3.1 | 1.6 | 17.1 | 470 / 543 | 967 / 1081 |
| sv-SE_DT3 | realtime | 30 | 0.463 | 0.900 | 6.2 | 6.2 | 31.0 | -509 / -172 | 981 / 1130 |
| sv-SE_DT3 | whisper_v3 | 30 | 0.477 | 0.867 | 7.0 | 6.2 | 30.2 | 903 / 1009 | 1542 / 2067 |
| sv-SE_DT4 | fast_default | 30 | 0.485 | 0.833 | 7.0 | 8.5 | 32.6 | 874 / 989 | 1456 / 1564 |
| sv-SE_DT4 | fast_mai | 30 | 0.418 | 0.767 | 10.1 | 2.3 | 29.5 | 478 / 587 | 1006 / 1090 |
| sv-SE_DT4 | realtime | 30 | 0.514 | 0.833 | 7.0 | 9.3 | 37.2 | -578 / -189 | 961 / 1100 |
| sv-SE_DT4 | whisper_v3 | 30 | 0.485 | 0.833 | 7.0 | 8.5 | 32.6 | 872 / 953 | 1454 / 1498 |
| sv-SE_DT5 | fast_default | 30 | 0.399 | 0.767 | 3.1 | 4.7 | 30.2 | 883 / 1008 | 1451 / 1525 |
| sv-SE_DT5 | fast_mai | 30 | 0.339 | 0.733 | 4.7 | 3.1 | 23.3 | 475 / 531 | 988 / 1070 |
| sv-SE_DT5 | realtime | 30 | 0.465 | 0.833 | 7.8 | 4.7 | 34.1 | -527 / -219 | 981 / 1052 |
| sv-SE_DT5 | whisper_v3 | 30 | 0.399 | 0.767 | 3.1 | 4.7 | 30.2 | 882 / 981 | 1450 / 1525 |
| sv-SE_JT1 | fast_default | 30 | 0.376 | 0.800 | 6.2 | 4.7 | 24.8 | 891 / 1010 | 1491 / 1613 |
| sv-SE_JT1 | fast_mai | 30 | 0.186 | 0.533 | 2.3 | 0.8 | 12.4 | 464 / 541 | 981 / 1121 |
| sv-SE_JT1 | realtime | 30 | 0.390 | 0.867 | 6.2 | 3.9 | 27.9 | -537 / -198 | 925 / 1002 |
| sv-SE_JT1 | whisper_v3 | 30 | 0.376 | 0.800 | 6.2 | 4.7 | 24.8 | 891 / 968 | 1492 / 1536 |
| sv-SE_JT2 | fast_default | 30 | 0.495 | 0.900 | 7.8 | 8.5 | 32.6 | 932 / 1025 | 1579 / 2412 |
| sv-SE_JT2 | fast_mai | 30 | 0.278 | 0.567 | 3.1 | 3.1 | 19.4 | 479 / 572 | 944 / 1085 |
| sv-SE_JT2 | realtime | 30 | 0.479 | 0.867 | 7.8 | 7.0 | 32.6 | -601 / -335 | 928 / 1082 |
| sv-SE_JT2 | whisper_v3 | 30 | 0.495 | 0.900 | 7.8 | 8.5 | 32.6 | 893 / 1009 | 1540 / 2282 |
| sv-SE_JT3 | fast_default | 30 | 0.328 | 0.667 | 6.2 | 3.9 | 21.7 | 883 / 950 | 1517 / 1983 |
| sv-SE_JT3 | fast_mai | 30 | 0.152 | 0.400 | 3.9 | 0.8 | 10.1 | 472 / 566 | 962 / 1140 |
| sv-SE_JT3 | realtime | 30 | 0.350 | 0.667 | 7.0 | 2.3 | 25.6 | -532 / -195 | 945 / 996 |
| sv-SE_JT3 | whisper_v3 | 30 | 0.328 | 0.667 | 6.2 | 3.9 | 21.7 | 880 / 980 | 1514 / 1984 |
| sv-SE_JT4 | fast_default | 30 | 0.332 | 0.700 | 5.4 | 4.7 | 22.5 | 875 / 935 | 1418 / 1498 |
| sv-SE_JT4 | fast_mai | 30 | 0.142 | 0.367 | 3.1 | 0.8 | 8.5 | 478 / 584 | 1021 / 1145 |
| sv-SE_JT4 | realtime | 30 | 0.364 | 0.800 | 5.4 | 3.1 | 27.9 | -532 / -196 | 938 / 1051 |
| sv-SE_JT4 | whisper_v3 | 30 | 0.332 | 0.700 | 5.4 | 4.7 | 22.5 | 890 / 929 | 1433 / 1520 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/sv-SE_DT2/2r_sv-SE_male-DT2/Bakruteavfrostning.wav.wav) | sv-SE_DT2 | 2r_sv-SE_male-DT2/Bakruteavfrostning.wav | realtime | 4.000 | `Bakruteavfrostning` | `Ja ut och avlossning.` |
| [▶](audio/sv-SE_DT1/2r_sv-SE_male-DT1/Bakruteavfrostning.wav.wav) | sv-SE_DT1 | 2r_sv-SE_male-DT1/Bakruteavfrostning.wav | fast_default | 3.000 | `Bakruteavfrostning` | `Baklutar av prostning.` |
| [▶](audio/sv-SE_DT1/2r_sv-SE_male-DT1/Bakruteavfrostning.wav.wav) | sv-SE_DT1 | 2r_sv-SE_male-DT1/Bakruteavfrostning.wav | whisper_v3 | 3.000 | `Bakruteavfrostning` | `Baklutar av prostning.` |
| [▶](audio/sv-SE_DT2/2r_sv-SE_male-DT2/Bakruteavfrostning.wav.wav) | sv-SE_DT2 | 2r_sv-SE_male-DT2/Bakruteavfrostning.wav | fast_mai | 3.000 | `Bakruteavfrostning` | `Bakluta av blåsten.` |
| [▶](audio/sv-SE_DT2/2r_sv-SE_male-DT2/Bakruteavfrostning.wav.wav) | sv-SE_DT2 | 2r_sv-SE_male-DT2/Bakruteavfrostning.wav | fast_default | 3.000 | `Bakruteavfrostning` | `Ja luta avblåst.` |
| [▶](audio/sv-SE_DT2/2r_sv-SE_male-DT2/Bakruteavfrostning.wav.wav) | sv-SE_DT2 | 2r_sv-SE_male-DT2/Bakruteavfrostning.wav | whisper_v3 | 3.000 | `Bakruteavfrostning` | `Ja luta avblåst.` |
| [▶](audio/sv-SE_DT4/2r_sv-SE_male-DT4/Bakruteavfrostning.wav.wav) | sv-SE_DT4 | 2r_sv-SE_male-DT4/Bakruteavfrostning.wav | realtime | 3.000 | `Bakruteavfrostning` | `Ja pluta avforskningen.` |
| [▶](audio/sv-SE_DT5/2r_sv-SE_male-DT5/Bakruteavfrostning.wav.wav) | sv-SE_DT5 | 2r_sv-SE_male-DT5/Bakruteavfrostning.wav | realtime | 3.000 | `Bakruteavfrostning` | `Bakrute av förlossning.` |
| [▶](audio/sv-SE_JT1/2r_sv-SE_male-JT1/Bakruteavfrostning.wav.wav) | sv-SE_JT1 | 2r_sv-SE_male-JT1/Bakruteavfrostning.wav | realtime | 3.000 | `Bakruteavfrostning` | `Bakrutar av proffssning.` |
| [▶](audio/sv-SE_JT1/2r_sv-SE_male-JT1/Bakruteavfrostning.wav.wav) | sv-SE_JT1 | 2r_sv-SE_male-JT1/Bakruteavfrostning.wav | whisper_v3 | 3.000 | `Bakruteavfrostning` | `Bakrutar av proffsnning.` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 81 | `3` | `tre` |
| 23 | `förarsätet` | `sätet` |
| 22 | `stäng` | `stänga` |
| 21 | `ta` | `ha` |
| 17 | `dra` | `draföra` |
| 16 | `förarsätet` | `passagerarsätet` |
| 15 | `bak` | `aktivera` |
| 13 | `sätesventilation` | `ventilation` |
| 13 | `inaktivera` | `aktivera` |
| 12 | `aktivera` | `sätet` |
| 11 | `flytta` | `nytta` |
| 10 | `passageraren` | `passagerare` |
| 10 | `baksäte` | `baksätet` |
| 10 | `luftrening` | `luftreningen` |
| 9 | `carplay` | `copy` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

_(none detected)_

## Top fast_default vs realtime disagreements

### sv-SE_DT4/2r_sv-SE_male-DT4/Minimera ljusstyrkan på mittdisplayen.wav [▶](audio/sv-SE_DT4/2r_sv-SE_male-DT4/Minimera%20ljusstyrkan%20p%C3%A5%20mittdisplayen.wav.wav)  Δwer=0.750  (fast_default=0.750, realtime=0.000)  speech=[1.65s, 4.57s] fix=none
- ref:           `Minimera ljusstyrkan på mittdisplayen`
- fast_default   `Minimera ljusstyrkan och mitt displayen.`
- fast_mai       `Minimera ljusstyrkan på mittdisplayen.`
- realtime       `Minimera ljusstyrkan på mitt displayen.`
- whisper_v3     `Minimera ljusstyrkan och mitt displayen.`

### sv-SE_DT3/1l_sv-SE_male-DT3/högre volym tack.wav [▶](audio/sv-SE_DT3/1l_sv-SE_male-DT3/h%C3%B6gre%20volym%20tack.wav.wav)  Δwer=0.667  (fast_default=1.000, realtime=0.333)  speech=[2.26s, 3.06s] fix=none
- ref:           `högre volym tack`
- fast_default   `Kan du köpa volym tack?`
- fast_mai       `Högre volym, tack.`
- realtime       `Volym tack.`
- whisper_v3     `Kan du köpa volym tack?`

### sv-SE_DT5/2r_sv-SE_male-DT5/Sätesventilation till nivå 5.wav [▶](audio/sv-SE_DT5/2r_sv-SE_male-DT5/S%C3%A4tesventilation%20till%20niv%C3%A5%205.wav.wav)  Δwer=0.500  (fast_default=0.500, realtime=1.000)  speech=[2.18s, 4.18s] fix=trim_both
- ref:           `Sätesventilation till nivå 5`
- fast_default   `Förarventilationen till nivå fem.`
- fast_mai       `Ställ in förarventilationen till nivå 5.`
- realtime       `Ställ in förarventilationen till nivå fem.`
- whisper_v3     `Förarventilationen till nivå fem.`

### sv-SE_DT5/1l_sv-SE_male-DT5/Byt visningsläge till mörkt.wav [▶](audio/sv-SE_DT5/1l_sv-SE_male-DT5/Byt%20visningsl%C3%A4ge%20till%20m%C3%B6rkt.wav.wav)  Δwer=0.500  (fast_default=0.000, realtime=0.500)  speech=[1.66s, 3.86s] fix=none
- ref:           `Byt visningsläge till mörkt`
- fast_default   `Byt visningsläge till mörkt.`
- fast_mai       `Flyt visningsläge till mörkt.`
- realtime       `Utvisningsläge till mörkt.`
- whisper_v3     `Byt visningsläge till mörkt.`

### sv-SE_DT4/2r_sv-SE_male-DT4/Sänk ventilationen för förarsätet.wav [▶](audio/sv-SE_DT4/2r_sv-SE_male-DT4/S%C3%A4nk%20ventilationen%20f%C3%B6r%20f%C3%B6rars%C3%A4tet.wav.wav)  Δwer=0.500  (fast_default=0.500, realtime=1.000)  speech=[2.35s, 4.07s] fix=trim_both
- ref:           `Sänk ventilationen för förarsätet`
- fast_default   `Sänk betraktionen för passagerarsätet.`
- fast_mai       `Sänk ventilationen på passagerarsätet.`
- realtime       `Sänkt befruktionen för passagerare sättet.`
- whisper_v3     `Sänk betraktionen för passagerarsätet.`

### sv-SE_DT2/2r_sv-SE_male-DT2/Minska värmen i högra baksätet något.wav [▶](audio/sv-SE_DT2/2r_sv-SE_male-DT2/Minska%20v%C3%A4rmen%20i%20h%C3%B6gra%20baks%C3%A4tet%20n%C3%A5got.wav.wav)  Δwer=0.500  (fast_default=0.333, realtime=0.833)  speech=[-s, -s] fix=skip
- ref:           `Minska värmen i högra baksätet något`
- fast_default   `Minska värmen i högre baksätet.`
- fast_mai       `Minska värmen i högra baksätet.`
- realtime       `Minska värmen, det är ju högre baksätet.`
- whisper_v3     `Minska värmen i högre baksätet.`

### sv-SE_JT3/1l_sv-SE_male-JT3/Flytta dynan till nedersta läget.wav [▶](audio/sv-SE_JT3/1l_sv-SE_male-JT3/Flytta%20dynan%20till%20nedersta%20l%C3%A4get.wav.wav)  Δwer=0.400  (fast_default=0.200, realtime=0.600)  speech=[2.27s, 3.91s] fix=trim_first
- ref:           `Flytta dynan till nedersta läget`
- fast_default   `Flytta dyra till nedersta läget.`
- fast_mai       `Flytta dynan till nedersta läget.`
- realtime       `Byta dygn till lädersta läget.`
- whisper_v3     `Flytta dyra till nedersta läget.`

### sv-SE_JT4/2l_sv-SE_male-JT4/Ställ in HUD-ljusstyrkan på minimum.wav [▶](audio/sv-SE_JT4/2l_sv-SE_male-JT4/St%C3%A4ll%20in%20HUD-ljusstyrkan%20p%C3%A5%20minimum.wav.wav)  Δwer=0.333  (fast_default=0.333, realtime=0.667)  speech=[2.1s, 4.1s] fix=trim_first
- ref:           `Ställ in HUD-ljusstyrkan på minimum`
- fast_default   `Ställ in hojstyrkan på minimum.`
- fast_mai       `Ställ in hatljusstyrkan på minimum.`
- realtime       `Dellin hadiestyrkan på minimum.`
- whisper_v3     `Ställ in hojstyrkan på minimum.`

### sv-SE_JT4/1r_sv-SE_male-JT4/Inaktivera Apple Carplay.wav [▶](audio/sv-SE_JT4/1r_sv-SE_male-JT4/Inaktivera%20Apple%20Carplay.wav.wav)  Δwer=0.333  (fast_default=0.333, realtime=0.667)  speech=[1.91s, 3.07s] fix=trim_last
- ref:           `Inaktivera Apple Carplay`
- fast_default   `Inaktivera Apple.`
- fast_mai       `aktivera Apple CarPlay.`
- realtime       `Aktivera Apple copy.`
- whisper_v3     `Inaktivera Apple.`

### sv-SE_JT1/1l_sv-SE_male-JT1/Skjut sätet framåt.wav [▶](audio/sv-SE_JT1/1l_sv-SE_male-JT1/Skjut%20s%C3%A4tet%20fram%C3%A5t.wav.wav)  Δwer=0.333  (fast_default=0.667, realtime=0.333)  speech=[1.61s, 2.93s] fix=none
- ref:           `Skjut sätet framåt`
- fast_default   `Utsätet framåt.`
- fast_mai       `Skjut sätet framåt.`
- realtime       `Ut sätet framåt.`
- whisper_v3     `Utsätet framåt.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.