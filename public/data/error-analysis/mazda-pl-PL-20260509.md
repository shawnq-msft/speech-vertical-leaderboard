# Error analysis — mazda_pl-PL_20260509_165619.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **pl-PL_DT1** — Mazda pl-PL DT1 voice commands (male + female pooled)
- **pl-PL_DT2** — Mazda pl-PL DT2 voice commands (male + female pooled)
- **pl-PL_DT3** — Mazda pl-PL DT3 voice commands (male + female pooled)
- **pl-PL_DT4** — Mazda pl-PL DT4 voice commands (male + female pooled)
- **pl-PL_DT5** — Mazda pl-PL DT5 voice commands (male + female pooled)
- **pl-PL_JT1** — Mazda pl-PL JT1 voice commands (male + female pooled)
- **pl-PL_JT2** — Mazda pl-PL JT2 voice commands (male + female pooled)
- **pl-PL_JT3** — Mazda pl-PL JT3 voice commands (male + female pooled)
- **pl-PL_JT4** — Mazda pl-PL JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_pl-PL_20260509_165619_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=4, `trim_both`=5, `trim_first`=5, `trim_last`=2

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| pl-PL_DT1 | fast_default | 30 | 0.110 | 0.333 | 0.0 | 2.9 | 8.8 | 903 / 954 | 1479 / 1526 |
| pl-PL_DT1 | fast_mai | 30 | 0.056 | 0.200 | 0.0 | 0.0 | 5.8 | 496 / 560 | 1014 / 1120 |
| pl-PL_DT1 | realtime | 30 | 0.134 | 0.367 | 0.0 | 4.4 | 9.5 | -599 / -410 | 909 / 1047 |
| pl-PL_DT1 | whisper_v3 | 30 | 0.110 | 0.333 | 0.0 | 2.9 | 8.8 | 933 / 1023 | 1509 / 1666 |
| pl-PL_DT2 | fast_default | 30 | 0.178 | 0.400 | 0.0 | 2.2 | 14.6 | 875 / 1012 | 1446 / 1622 |
| pl-PL_DT2 | fast_mai | 30 | 0.092 | 0.267 | 0.0 | 0.7 | 8.0 | 468 / 549 | 989 / 1070 |
| pl-PL_DT2 | realtime | 30 | 0.175 | 0.467 | 0.7 | 3.6 | 12.4 | -594 / -364 | 924 / 1032 |
| pl-PL_DT2 | whisper_v3 | 30 | 0.178 | 0.400 | 0.0 | 2.2 | 14.6 | 890 / 1049 | 1461 / 1610 |
| pl-PL_DT3 | fast_default | 30 | 0.117 | 0.367 | 0.0 | 2.2 | 8.8 | 871 / 992 | 1416 / 1521 |
| pl-PL_DT3 | fast_mai | 30 | 0.067 | 0.200 | 0.7 | 0.0 | 6.6 | 486 / 544 | 1032 / 1104 |
| pl-PL_DT3 | realtime | 30 | 0.164 | 0.433 | 0.0 | 2.9 | 12.4 | -614 / -387 | 865 / 970 |
| pl-PL_DT3 | whisper_v3 | 30 | 0.117 | 0.367 | 0.0 | 2.2 | 8.8 | 871 / 933 | 1416 / 1494 |
| pl-PL_DT4 | fast_default | 30 | 0.131 | 0.400 | 0.7 | 0.7 | 10.9 | 874 / 960 | 1455 / 1550 |
| pl-PL_DT4 | fast_mai | 30 | 0.047 | 0.167 | 0.0 | 0.0 | 4.4 | 479 / 578 | 1004 / 1139 |
| pl-PL_DT4 | realtime | 30 | 0.158 | 0.400 | 0.7 | 0.0 | 11.7 | -610 / -418 | 908 / 1016 |
| pl-PL_DT4 | whisper_v3 | 30 | 0.131 | 0.400 | 0.7 | 0.7 | 10.9 | 885 / 971 | 1466 / 1548 |
| pl-PL_DT5 | fast_default | 30 | 0.106 | 0.300 | 0.7 | 1.5 | 10.2 | 874 / 964 | 1413 / 1519 |
| pl-PL_DT5 | fast_mai | 30 | 0.047 | 0.167 | 0.0 | 0.0 | 5.1 | 489 / 592 | 1029 / 1103 |
| pl-PL_DT5 | realtime | 30 | 0.120 | 0.400 | 0.7 | 0.7 | 12.4 | -564 / -302 | 919 / 1025 |
| pl-PL_DT5 | whisper_v3 | 30 | 0.106 | 0.300 | 0.7 | 1.5 | 10.2 | 878 / 975 | 1418 / 1521 |
| pl-PL_JT1 | fast_default | 30 | 0.102 | 0.333 | 1.5 | 0.7 | 8.8 | 869 / 965 | 1410 / 1525 |
| pl-PL_JT1 | fast_mai | 30 | 0.041 | 0.167 | 0.0 | 0.0 | 4.4 | 485 / 548 | 1026 / 1088 |
| pl-PL_JT1 | realtime | 30 | 0.093 | 0.333 | 0.7 | 0.7 | 8.8 | -595 / -315 | 884 / 1013 |
| pl-PL_JT1 | whisper_v3 | 30 | 0.102 | 0.333 | 1.5 | 0.7 | 8.8 | 871 / 995 | 1413 / 1536 |
| pl-PL_JT2 | fast_default | 30 | 0.121 | 0.367 | 0.0 | 1.5 | 10.9 | 869 / 993 | 1412 / 1539 |
| pl-PL_JT2 | fast_mai | 30 | 0.069 | 0.200 | 0.0 | 0.7 | 5.8 | 479 / 540 | 1022 / 1104 |
| pl-PL_JT2 | realtime | 30 | 0.128 | 0.400 | 0.0 | 1.5 | 11.7 | -597 / -397 | 904 / 1023 |
| pl-PL_JT2 | whisper_v3 | 30 | 0.121 | 0.367 | 0.0 | 1.5 | 10.9 | 870 / 1010 | 1414 / 1516 |
| pl-PL_JT3 | fast_default | 30 | 0.066 | 0.233 | 0.0 | 0.7 | 6.6 | 864 / 931 | 1433 / 1502 |
| pl-PL_JT3 | fast_mai | 30 | 0.053 | 0.200 | 0.0 | 0.7 | 5.1 | 502 / 599 | 1028 / 1159 |
| pl-PL_JT3 | realtime | 30 | 0.082 | 0.300 | 0.7 | 0.7 | 7.3 | -593 / -325 | 877 / 1010 |
| pl-PL_JT3 | whisper_v3 | 30 | 0.066 | 0.233 | 0.0 | 0.7 | 6.6 | 868 / 949 | 1436 / 1539 |
| pl-PL_JT4 | fast_default | 30 | 0.101 | 0.300 | 0.0 | 2.2 | 8.8 | 867 / 966 | 1413 / 1537 |
| pl-PL_JT4 | fast_mai | 30 | 0.060 | 0.200 | 0.0 | 0.0 | 6.6 | 497 / 646 | 1043 / 1177 |
| pl-PL_JT4 | realtime | 30 | 0.081 | 0.300 | 0.0 | 0.7 | 8.0 | -577 / -340 | 901 / 1018 |
| pl-PL_JT4 | whisper_v3 | 30 | 0.101 | 0.300 | 0.0 | 2.2 | 8.8 | 899 / 1000 | 1445 / 1586 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/pl-PL_DT1/1r_pl-PL_female-DT1/Dostosuj%20g%C5%82o%C5%9Bno%C5%9B%C4%87%20do%205%20poziom%C3%B3w.wav.wav) | pl-PL_DT1 | 1r_pl-PL_female-DT1/Dostosuj głośność do 5 poziomów.wav | fast_default | 1.000 | `Dostosuj głośność do 5 poziomów` | `Społeczność to piątego.` |
| [▶](audio/pl-PL_DT1/1r_pl-PL_female-DT1/Dostosuj%20g%C5%82o%C5%9Bno%C5%9B%C4%87%20do%205%20poziom%C3%B3w.wav.wav) | pl-PL_DT1 | 1r_pl-PL_female-DT1/Dostosuj głośność do 5 poziomów.wav | whisper_v3 | 1.000 | `Dostosuj głośność do 5 poziomów` | `Społeczność to piątego.` |
| [▶](audio/pl-PL_DT2/2r_pl-PL_female-DT2/W%C5%82%C4%85cz%20cyrkulacj%C4%99%20zewn%C4%99trzn%C4%85.wav.wav) | pl-PL_DT2 | 2r_pl-PL_female-DT2/Włącz cyrkulację zewnętrzną.wav | fast_default | 1.000 | `Włącz cyrkulację zewnętrzną` | `Mąż cyrkulacja zagra.` |
| [▶](audio/pl-PL_DT2/2r_pl-PL_female-DT2/W%C5%82%C4%85cz%20cyrkulacj%C4%99%20zewn%C4%99trzn%C4%85.wav.wav) | pl-PL_DT2 | 2r_pl-PL_female-DT2/Włącz cyrkulację zewnętrzną.wav | whisper_v3 | 1.000 | `Włącz cyrkulację zewnętrzną` | `Mąż cyrkulacja zagra.` |
| [▶](audio/pl-PL_DT3/1r_pl-PL_female-DT3/Otw%C3%B3rz%20tyln%C4%85%20klap%C4%99.wav.wav) | pl-PL_DT3 | 1r_pl-PL_female-DT3/Otwórz tylną klapę.wav | realtime | 1.000 | `Otwórz tylną klapę` | `Otrzymują klatę.` |
| [▶](audio/pl-PL_DT3/1r_pl-PL_female-DT3/Dostosuj%20g%C5%82o%C5%9Bno%C5%9B%C4%87%20do%205%20poziom%C3%B3w.wav.wav) | pl-PL_DT3 | 1r_pl-PL_female-DT3/Dostosuj głośność do 5 poziomów.wav | realtime | 1.000 | `Dostosuj głośność do 5 poziomów` | `Tego poziomu.` |
| [▶](audio/pl-PL_DT3/1r_pl-PL_female-DT3/Dostosuj%20g%C5%82o%C5%9Bno%C5%9B%C4%87%20do%205%20poziom%C3%B3w.wav.wav) | pl-PL_DT3 | 1r_pl-PL_female-DT3/Dostosuj głośność do 5 poziomów.wav | fast_mai | 1.000 | `Dostosuj głośność do 5 poziomów` | `Dostosuj kość na szczyt piątego poziomu.` |
| [▶](audio/pl-PL_DT4/2r_pl-PL_female-DT4/Ostatni.wav.wav) | pl-PL_DT4 | 2r_pl-PL_female-DT4/Ostatni.wav | realtime | 1.000 | `Ostatni` | `Ostatniej.` |
| [▶](audio/pl-PL_DT4/2r_pl-PL_female-DT4/W%C5%82%C4%85cz%20cyrkulacj%C4%99%20zewn%C4%99trzn%C4%85.wav.wav) | pl-PL_DT4 | 2r_pl-PL_female-DT4/Włącz cyrkulację zewnętrzną.wav | realtime | 1.000 | `Włącz cyrkulację zewnętrzną` | `Połącz cyrkulację za większą.` |
| [▶](audio/pl-PL_DT4/2r_pl-PL_female-DT4/W%C5%82%C4%85cz%20cyrkulacj%C4%99%20zewn%C4%99trzn%C4%85.wav.wav) | pl-PL_DT4 | 2r_pl-PL_female-DT4/Włącz cyrkulację zewnętrzną.wav | fast_default | 1.000 | `Włącz cyrkulację zewnętrzną` | `Połącz cyrkulację za większy.` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 91 | `5` | `piątego` |
| 36 | `kierownicy` | `kierowcy` |
| 27 | `przycisz` | `przecież` |
| 22 | `poziomów` | `poziomu` |
| 21 | `prawy` | `prawie` |
| 18 | `tylny` | `tyny` |
| 8 | `dostosuj` | `stosuj` |
| 6 | `ustaw` | `zostaw` |
| 6 | `5` | `pięć` |
| 6 | `siedzenia` | `siedzeń` |
| 5 | `przycisz` | `przecisz` |
| 5 | `otwórz` | `od` |
| 5 | `kierowcy` | `kierowców` |
| 4 | `automatyczne` | `automatyczny` |
| 4 | `minimalne` | `man` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

_(none detected)_

## Top fast_default vs realtime disagreements

### pl-PL_DT4/2r_pl-PL_female-DT4/Ostatni.wav [▶](audio/pl-PL_DT4/2r_pl-PL_female-DT4/Ostatni.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Ostatni`
- fast_default   `Ostatni.`
- fast_mai       `Ostatni.`
- realtime       `Ostatniej.`
- whisper_v3     `Ostatni.`

### pl-PL_DT2/1l_pl-PL_female-DT2/Niebieskie światło otoczenia.wav [▶](audio/pl-PL_DT2/1l_pl-PL_female-DT2/Niebieskie%20%C5%9Bwiat%C5%82o%20otoczenia.wav.wav)  Δwer=0.667  (fast_default=0.000, realtime=0.667)  speech=[2.3s, 3.98s] fix=trim_first
- ref:           `Niebieskie światło otoczenia`
- fast_default   `Niebieskie światło otoczenia.`
- fast_mai       `Niebieskie światło otoczenia.`
- realtime       `Chełmie skie światło otoczenia.`
- whisper_v3     `Niebieskie światło otoczenia.`

### pl-PL_DT3/1r_pl-PL_female-DT3/Aktywuj kierowcę Aktywuj wentylację siedzenia.wav [▶](audio/pl-PL_DT3/1r_pl-PL_female-DT3/Aktywuj%20kierowc%C4%99%20Aktywuj%20wentylacj%C4%99%20siedzenia.wav.wav)  Δwer=0.600  (fast_default=0.000, realtime=0.600)  speech=[2.58s, 4.94s] fix=trim_first
- ref:           `Aktywuj kierowcę Aktywuj wentylację siedzenia`
- fast_default   `Aktywuj kierowcę aktywuj wentylację siedzenia.`
- fast_mai       `Aktywuj kierowcę, aktywuj wentylację siedzenia.`
- realtime       `Mój Kierowca aktywuj gratulacje siedzenia.`
- whisper_v3     `Aktywuj kierowcę aktywuj wentylację siedzenia.`

### pl-PL_JT4/1r_pl-PL_female-JT4/Dostosuj głośność do 5 poziomów.wav [▶](audio/pl-PL_JT4/1r_pl-PL_female-JT4/Dostosuj%20g%C5%82o%C5%9Bno%C5%9B%C4%87%20do%205%20poziom%C3%B3w.wav.wav)  Δwer=0.400  (fast_default=1.000, realtime=0.600)  speech=[2.55s, 3.67s] fix=trim_both
- ref:           `Dostosuj głośność do 5 poziomów`
- fast_default   `Dostaw kość kształtują tego.`
- fast_mai       `Dostosowałeś nas do piątego poziomu.`
- realtime       `Dostawcy głośność do piątego poziomu.`
- whisper_v3     `Dostaw kość kształtują tego.`

### pl-PL_DT3/1r_pl-PL_female-DT3/Otwórz tylną klapę.wav [▶](audio/pl-PL_DT3/1r_pl-PL_female-DT3/Otw%C3%B3rz%20tyln%C4%85%20klap%C4%99.wav.wav)  Δwer=0.333  (fast_default=0.667, realtime=1.000)  speech=[2.55s, 3.23s] fix=trim_first
- ref:           `Otwórz tylną klapę`
- fast_default   `Od tylną klatę.`
- fast_mai       `Otwórz tylną klapę.`
- realtime       `Otrzymują klatę.`
- whisper_v3     `Od tylną klatę.`

### pl-PL_DT2/2r_pl-PL_female-DT2/Włącz cyrkulację zewnętrzną.wav [▶](audio/pl-PL_DT2/2r_pl-PL_female-DT2/W%C5%82%C4%85cz%20cyrkulacj%C4%99%20zewn%C4%99trzn%C4%85.wav.wav)  Δwer=0.333  (fast_default=1.000, realtime=0.667)  speech=[2.43s, 3.11s] fix=trim_both
- ref:           `Włącz cyrkulację zewnętrzną`
- fast_default   `Mąż cyrkulacja zagra.`
- fast_mai       `mocz, cyrkulację, zawierające`
- realtime       `Bądź cyrkulację zagraniczny.`
- whisper_v3     `Mąż cyrkulacja zagra.`

### pl-PL_JT3/2r_pl-PL_female-JT3/Włącz cyrkulację zewnętrzną.wav [▶](audio/pl-PL_JT3/2r_pl-PL_female-JT3/W%C5%82%C4%85cz%20cyrkulacj%C4%99%20zewn%C4%99trzn%C4%85.wav.wav)  Δwer=0.333  (fast_default=0.000, realtime=0.333)  speech=[-s, -s] fix=skip
- ref:           `Włącz cyrkulację zewnętrzną`
- fast_default   `Włącz cyrkulację zewnętrzną.`
- fast_mai       `Włącz cyrkulację zewnętrzną.`
- realtime       `Włącz w cyrkulację zewnętrzną.`
- whisper_v3     `Włącz cyrkulację zewnętrzną.`

### pl-PL_DT3/2r_pl-PL_female-DT3/Włącz cyrkulację zewnętrzną.wav [▶](audio/pl-PL_DT3/2r_pl-PL_female-DT3/W%C5%82%C4%85cz%20cyrkulacj%C4%99%20zewn%C4%99trzn%C4%85.wav.wav)  Δwer=0.333  (fast_default=0.000, realtime=0.333)  speech=[1.9s, 3.94s] fix=none
- ref:           `Włącz cyrkulację zewnętrzną`
- fast_default   `Włącz cyrkulację zewnętrzną.`
- fast_mai       `Włącz cyrkulację zewnętrzną.`
- realtime       `Włącz cyrkolację zewnętrzną.`
- whisper_v3     `Włącz cyrkulację zewnętrzną.`

### pl-PL_DT2/1l_pl-PL_female-DT2/Minimalne ogrzewanie siedzenia.wav [▶](audio/pl-PL_DT2/1l_pl-PL_female-DT2/Minimalne%20ogrzewanie%20siedzenia.wav.wav)  Δwer=0.333  (fast_default=0.333, realtime=0.000)  speech=[2.07s, 3.79s] fix=none
- ref:           `Minimalne ogrzewanie siedzenia`
- fast_default   `Normalne ogrzewanie siedzenia.`
- fast_mai       `Minimalne ogrzewanie siedzenia.`
- realtime       `Minimalne ogrzewanie siedzenia.`
- whisper_v3     `Normalne ogrzewanie siedzenia.`

### pl-PL_DT1/1r_pl-PL_female-DT1/Otwórz tylną klapę.wav [▶](audio/pl-PL_DT1/1r_pl-PL_female-DT1/Otw%C3%B3rz%20tyln%C4%85%20klap%C4%99.wav.wav)  Δwer=0.333  (fast_default=0.000, realtime=0.333)  speech=[1.68s, 3.2s] fix=none
- ref:           `Otwórz tylną klapę`
- fast_default   `Otwórz tylną klapę.`
- fast_mai       `Otwórz tylną klapę.`
- realtime       `Odtwórz, tylną klapę.`
- whisper_v3     `Otwórz tylną klapę.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.