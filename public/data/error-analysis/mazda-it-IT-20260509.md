# Error analysis — mazda_it-IT_20260509_162044.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **it-IT_DT1** — Mazda it-IT DT1 voice commands (male + female pooled)
- **it-IT_DT2** — Mazda it-IT DT2 voice commands (male + female pooled)
- **it-IT_DT3** — Mazda it-IT DT3 voice commands (male + female pooled)
- **it-IT_DT4** — Mazda it-IT DT4 voice commands (male + female pooled)
- **it-IT_DT5** — Mazda it-IT DT5 voice commands (male + female pooled)
- **it-IT_JT1** — Mazda it-IT JT1 voice commands (male + female pooled)
- **it-IT_JT2** — Mazda it-IT JT2 voice commands (male + female pooled)
- **it-IT_JT3** — Mazda it-IT JT3 voice commands (male + female pooled)
- **it-IT_JT4** — Mazda it-IT JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_it-IT_20260509_162044_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=2, `trim_first`=4, `trim_last`=1

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| it-IT_DT1 | fast_default | 30 | 0.025 | 0.133 | 0.0 | 1.4 | 1.4 | 1077 / 3111 | 1467 / 3372 |
| it-IT_DT1 | fast_llm | 30 | 0.025 | 0.133 | 0.0 | 1.4 | 1.4 | 486 / 519 | 876 / 1077 |
| it-IT_DT1 | fast_mai | 30 | 0.028 | 0.133 | 0.7 | 0.0 | 2.1 | 482 / 572 | 872 / 1122 |
| it-IT_DT1 | realtime | 30 | 0.032 | 0.167 | 0.0 | 1.4 | 2.1 | -126 / 320 | 554 / 833 |
| it-IT_DT1 | realtime_refine | 30 | 0.020 | 0.100 | 0.0 | 0.7 | 1.4 | 467 / 831 | 1183 / 1582 |
| it-IT_DT1 | whisper_v3 | 30 | 0.025 | 0.133 | 0.0 | 1.4 | 1.4 | 1214 / 5022 | 1604 / 5302 |
| it-IT_DT2 | fast_default | 30 | 0.115 | 0.333 | 0.0 | 2.7 | 8.9 | 600 / 683 | 1003 / 1194 |
| it-IT_DT2 | fast_llm | 30 | 0.134 | 0.300 | 0.7 | 2.1 | 9.6 | 494 / 587 | 942 / 1074 |
| it-IT_DT2 | fast_mai | 30 | 0.158 | 0.367 | 0.7 | 1.4 | 11.6 | 521 / 519 | 923 / 1066 |
| it-IT_DT2 | realtime | 30 | 0.158 | 0.467 | 0.7 | 2.7 | 11.6 | -132 / 330 | 624 / 772 |
| it-IT_DT2 | realtime_refine | 30 | 0.138 | 0.367 | 0.0 | 1.4 | 11.6 | 277 / 700 | 1083 / 1509 |
| it-IT_DT2 | whisper_v3 | 30 | 0.115 | 0.333 | 0.0 | 2.7 | 8.9 | 635 / 706 | 1038 / 1204 |
| it-IT_DT3 | fast_default | 30 | 0.032 | 0.100 | 0.0 | 0.0 | 2.7 | 596 / 671 | 974 / 1191 |
| it-IT_DT3 | fast_llm | 30 | 0.015 | 0.067 | 0.0 | 0.0 | 1.4 | 489 / 528 | 868 / 1098 |
| it-IT_DT3 | fast_mai | 30 | 0.054 | 0.200 | 0.7 | 0.0 | 3.4 | 454 / 537 | 832 / 1045 |
| it-IT_DT3 | realtime | 30 | 0.051 | 0.133 | 0.7 | 0.0 | 4.1 | -104 / 313 | 548 / 794 |
| it-IT_DT3 | realtime_refine | 30 | 0.023 | 0.100 | 0.0 | 0.0 | 2.1 | 338 / 685 | 1034 / 1500 |
| it-IT_DT3 | whisper_v3 | 30 | 0.032 | 0.100 | 0.0 | 0.0 | 2.7 | 622 / 682 | 1001 / 1243 |
| it-IT_DT4 | fast_default | 30 | 0.028 | 0.133 | 0.0 | 0.0 | 2.7 | 604 / 690 | 1025 / 1220 |
| it-IT_DT4 | fast_llm | 30 | 0.021 | 0.100 | 0.0 | 0.7 | 2.1 | 492 / 534 | 930 / 1071 |
| it-IT_DT4 | fast_mai | 30 | 0.032 | 0.067 | 0.7 | 0.0 | 2.1 | 458 / 549 | 843 / 1042 |
| it-IT_DT4 | realtime | 30 | 0.077 | 0.200 | 0.0 | 3.4 | 4.1 | -84 / 309 | 594 / 816 |
| it-IT_DT4 | realtime_refine | 30 | 0.051 | 0.133 | 0.0 | 2.1 | 2.7 | 320 / 700 | 1052 / 1439 |
| it-IT_DT4 | whisper_v3 | 30 | 0.028 | 0.133 | 0.0 | 0.0 | 2.7 | 606 / 689 | 1027 / 1180 |
| it-IT_DT5 | fast_default | 30 | 0.052 | 0.200 | 0.7 | 0.0 | 4.1 | 698 / 1181 | 1067 / 1731 |
| it-IT_DT5 | fast_llm | 30 | 0.036 | 0.167 | 0.7 | 0.7 | 2.1 | 496 / 562 | 865 / 1113 |
| it-IT_DT5 | fast_mai | 30 | 0.032 | 0.133 | 0.7 | 0.0 | 2.1 | 459 / 542 | 827 / 1053 |
| it-IT_DT5 | realtime | 30 | 0.074 | 0.267 | 0.0 | 0.0 | 6.8 | -89 / 321 | 553 / 779 |
| it-IT_DT5 | realtime_refine | 30 | 0.036 | 0.167 | 0.0 | 0.0 | 3.4 | 433 / 838 | 1113 / 1633 |
| it-IT_DT5 | whisper_v3 | 30 | 0.052 | 0.200 | 0.7 | 0.0 | 4.1 | 680 / 987 | 1048 / 1537 |
| it-IT_JT1 | fast_default | 30 | 0.037 | 0.133 | 0.0 | 0.0 | 3.4 | 655 / 718 | 1032 / 1278 |
| it-IT_JT1 | fast_llm | 30 | 0.032 | 0.100 | 0.7 | 0.0 | 2.1 | 495 / 575 | 871 / 1056 |
| it-IT_JT1 | fast_mai | 30 | 0.032 | 0.100 | 0.7 | 0.0 | 2.1 | 453 / 486 | 829 / 1021 |
| it-IT_JT1 | realtime | 30 | 0.037 | 0.133 | 0.7 | 0.0 | 2.7 | -106 / 306 | 527 / 719 |
| it-IT_JT1 | realtime_refine | 30 | 0.023 | 0.100 | 0.0 | 0.0 | 2.1 | 325 / 679 | 990 / 1269 |
| it-IT_JT1 | whisper_v3 | 30 | 0.037 | 0.133 | 0.0 | 0.0 | 3.4 | 647 / 719 | 1023 / 1224 |
| it-IT_JT2 | fast_default | 30 | 0.040 | 0.167 | 0.0 | 0.7 | 3.4 | 657 / 848 | 1059 / 1246 |
| it-IT_JT2 | fast_llm | 30 | 0.058 | 0.167 | 1.4 | 1.4 | 2.1 | 543 / 754 | 945 / 1251 |
| it-IT_JT2 | fast_mai | 30 | 0.048 | 0.133 | 0.7 | 0.0 | 3.4 | 491 / 575 | 893 / 1133 |
| it-IT_JT2 | realtime | 30 | 0.041 | 0.200 | 0.0 | 1.4 | 2.7 | -112 / 300 | 567 / 765 |
| it-IT_JT2 | realtime_refine | 30 | 0.051 | 0.200 | 0.7 | 0.0 | 4.1 | 351 / 705 | 1066 / 1442 |
| it-IT_JT2 | whisper_v3 | 30 | 0.040 | 0.167 | 0.0 | 0.7 | 3.4 | 652 / 873 | 1054 / 1261 |
| it-IT_JT3 | fast_default | 30 | 0.023 | 0.100 | 0.0 | 0.0 | 2.1 | 659 / 840 | 1025 / 1365 |
| it-IT_JT3 | fast_llm | 30 | 0.015 | 0.067 | 0.0 | 0.0 | 1.4 | 495 / 552 | 861 / 1076 |
| it-IT_JT3 | fast_mai | 30 | 0.023 | 0.100 | 0.7 | 0.0 | 1.4 | 484 / 598 | 850 / 1059 |
| it-IT_JT3 | realtime | 30 | 0.045 | 0.100 | 0.7 | 0.7 | 2.7 | -117 / 303 | 509 / 708 |
| it-IT_JT3 | realtime_refine | 30 | 0.015 | 0.067 | 0.0 | 0.0 | 1.4 | 379 / 826 | 1034 / 1303 |
| it-IT_JT3 | whisper_v3 | 30 | 0.023 | 0.100 | 0.0 | 0.0 | 2.1 | 662 / 852 | 1028 / 1274 |
| it-IT_JT4 | fast_default | 30 | 0.037 | 0.100 | 0.0 | 0.0 | 3.4 | 617 / 676 | 992 / 1208 |
| it-IT_JT4 | fast_llm | 30 | 0.023 | 0.067 | 0.0 | 0.0 | 2.1 | 487 / 545 | 863 / 1054 |
| it-IT_JT4 | fast_mai | 30 | 0.023 | 0.100 | 0.7 | 0.0 | 1.4 | 482 / 588 | 857 / 1095 |
| it-IT_JT4 | realtime | 30 | 0.029 | 0.100 | 0.7 | 0.7 | 1.4 | -107 / 311 | 529 / 749 |
| it-IT_JT4 | realtime_refine | 30 | 0.023 | 0.067 | 0.0 | 0.0 | 2.1 | 411 / 757 | 1072 / 1444 |
| it-IT_JT4 | whisper_v3 | 30 | 0.037 | 0.100 | 0.0 | 0.0 | 3.4 | 622 / 683 | 998 / 1238 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/it-IT_DT2/1r_it-IT_female-DT2/Chiama%20Jane.wav.wav) | it-IT_DT2 | 1r_it-IT_female-DT2/Chiama Jane.wav | fast_mai | 1.000 | `Chiama Jane` | `Namastè.` |
| [▶](audio/it-IT_DT2/1r_it-IT_female-DT2/Chiama%20Jane.wav.wav) | it-IT_DT2 | 1r_it-IT_female-DT2/Chiama Jane.wav | fast_llm | 1.000 | `Chiama Jane` | `Chiamaci.` |
| [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Attiva%20il%20riscaldamento%20del%20volante.wav.wav) | it-IT_DT2 | 1l_it-IT_female-DT2/Attiva il riscaldamento del volante.wav | fast_mai | 1.000 | `Attiva il riscaldamento del volante` | `di Giovanni e Luca Vispas` |
| [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Attiva%20il%20riscaldamento%20del%20volante.wav.wav) | it-IT_DT2 | 1l_it-IT_female-DT2/Attiva il riscaldamento del volante.wav | fast_llm | 1.000 | `Attiva il riscaldamento del volante` | `Wie war Ihre Reispastete?` |
| [▶](audio/it-IT_DT4/1l_it-IT_female-DT4/Seleziona%20il%20percorso%20due.wav.wav) | it-IT_DT4 | 1l_it-IT_female-DT4/Seleziona il percorso due.wav | realtime | 1.000 | `Seleziona il percorso due` | `` |
| [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Attiva%20il%20riscaldamento%20del%20volante.wav.wav) | it-IT_DT2 | 1l_it-IT_female-DT2/Attiva il riscaldamento del volante.wav | realtime | 0.800 | `Attiva il riscaldamento del volante` | `Il risparmiatore.` |
| [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Attiva%20il%20riscaldamento%20del%20volante.wav.wav) | it-IT_DT2 | 1l_it-IT_female-DT2/Attiva il riscaldamento del volante.wav | fast_default | 0.800 | `Attiva il riscaldamento del volante` | `il` |
| [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Attiva%20il%20riscaldamento%20del%20volante.wav.wav) | it-IT_DT2 | 1l_it-IT_female-DT2/Attiva il riscaldamento del volante.wav | whisper_v3 | 0.800 | `Attiva il riscaldamento del volante` | `il` |
| [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Seleziona%20il%20percorso%20due.wav.wav) | it-IT_DT2 | 1l_it-IT_female-DT2/Seleziona il percorso due.wav | realtime | 0.750 | `Seleziona il percorso due` | `Se c'è percorso due.` |
| [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Seleziona%20il%20percorso%20due.wav.wav) | it-IT_DT2 | 1l_it-IT_female-DT2/Seleziona il percorso due.wav | realtime_refine | 0.750 | `Seleziona il percorso due` | `Selezione percorso 2.` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 53 | `cinque` | `5` |
| 25 | `attiva` | `la` |
| 16 | `due` | `2` |
| 13 | `il` | `i` |
| 13 | `passeggero` | `passeggeri` |
| 12 | `minimo` | `mi` |
| 10 | `il` | `del` |
| 5 | `minimo` | `b` |
| 4 | `chiudi` | `il` |
| 4 | `apri` | `prendi` |
| 4 | `jane` | `c` |
| 4 | `regola` | `regole` |
| 4 | `apri` | `metti` |
| 4 | `seleziona` | `inizia` |
| 3 | `fari` | `fa` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

Found **2** likely hallucinations (WER ≥ 0.8 and ≤ 1 word overlap with reference):

| Audio | Dataset | Sample | WER | Boundary | Reference | Hypothesis |
|---|---|---|---:|---|---|---|
| [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Attiva%20il%20riscaldamento%20del%20volante.wav.wav) | it-IT_DT2 | 1l_it-IT_female-DT2/Attiva il riscaldamento del volante.wav | 1.000 | trim_last | `Attiva il riscaldamento del volante` | `Wie war Ihre Reispastete?` |
| [▶](audio/it-IT_DT2/1r_it-IT_female-DT2/Chiama%20Jane.wav.wav) | it-IT_DT2 | 1r_it-IT_female-DT2/Chiama Jane.wav | 1.000 | none | `Chiama Jane` | `Chiamaci.` |

## Top fast_default vs realtime disagreements

### it-IT_DT4/1l_it-IT_female-DT4/Seleziona il percorso due.wav [▶](audio/it-IT_DT4/1l_it-IT_female-DT4/Seleziona%20il%20percorso%20due.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Seleziona il percorso due`
- fast_default   `Seleziona il percorso due.`
- fast_llm       `Seleziona il percorso due.`
- fast_mai       `Selezionare il percorso di domanda.`
- realtime       ``
- realtime_refine `Seccia percorso due.`
- whisper_v3     `Seleziona il percorso due.`

### it-IT_DT2/1l_it-IT_female-DT2/Seleziona il percorso due.wav [▶](audio/it-IT_DT2/1l_it-IT_female-DT2/Seleziona%20il%20percorso%20due.wav.wav)  Δwer=0.500  (fast_default=0.250, realtime=0.750)  speech=[-s, -s] fix=skip
- ref:           `Seleziona il percorso due`
- fast_default   `Seleziona il percorso 2.`
- fast_llm       `Sezione percorso due.`
- fast_mai       `Seleziona il percorso 2.`
- realtime       `Se c'è percorso due.`
- realtime_refine `Selezione percorso 2.`
- whisper_v3     `Seleziona il percorso 2.`

### it-IT_JT3/2l_it-IT_female-JT3/Regola il volume a cinque.wav [▶](audio/it-IT_JT3/2l_it-IT_female-JT3/Regola%20il%20volume%20a%20cinque.wav.wav)  Δwer=0.400  (fast_default=0.200, realtime=0.600)  speech=[1.88s, 3.64s] fix=trim_first
- ref:           `Regola il volume a cinque`
- fast_default   `Regola il volume a 5.`
- fast_llm       `Regola il volume a 5.`
- fast_mai       `Regola il volume a 5.`
- realtime       `Regole del volume a 5.`
- realtime_refine `Regola il volume a 5.`
- whisper_v3     `Regola il volume a 5.`

### it-IT_DT5/2l_it-IT_female-DT5/Regola il volume a cinque.wav [▶](audio/it-IT_DT5/2l_it-IT_female-DT5/Regola%20il%20volume%20a%20cinque.wav.wav)  Δwer=0.400  (fast_default=0.200, realtime=0.600)  speech=[1.85s, 3.53s] fix=trim_first
- ref:           `Regola il volume a cinque`
- fast_default   `Regola il volume a 5.`
- fast_llm       `Regola il volume a 5.`
- fast_mai       `Regola il volume a 5.`
- realtime       `Regole del volume a 5.`
- realtime_refine `Regola il volume a 5.`
- whisper_v3     `Regola il volume a 5.`

### it-IT_DT4/2l_it-IT_female-DT4/Regola il volume a cinque.wav [▶](audio/it-IT_DT4/2l_it-IT_female-DT4/Regola%20il%20volume%20a%20cinque.wav.wav)  Δwer=0.400  (fast_default=0.200, realtime=0.600)  speech=[1.87s, 3.47s] fix=trim_first
- ref:           `Regola il volume a cinque`
- fast_default   `Regola il volume a 5.`
- fast_llm       `Regola il volume a 5.`
- fast_mai       `Regola il volume a 5.`
- realtime       `Regole del volume a 5.`
- realtime_refine `Regola il volume a 5.`
- whisper_v3     `Regola il volume a 5.`

### it-IT_DT3/2l_it-IT_female-DT3/Regola il volume a cinque.wav [▶](audio/it-IT_DT3/2l_it-IT_female-DT3/Regola%20il%20volume%20a%20cinque.wav.wav)  Δwer=0.400  (fast_default=0.200, realtime=0.600)  speech=[1.86s, 3.5s] fix=trim_first
- ref:           `Regola il volume a cinque`
- fast_default   `Regola il volume a 5.`
- fast_llm       `Regola il volume a 5.`
- fast_mai       `Regola il volume a 5.`
- realtime       `Regole del volume a 5.`
- realtime_refine `Regola il volume a 5.`
- whisper_v3     `Regola il volume a 5.`

### it-IT_DT5/1l_it-IT_male-DT5/Attiva Modalità scenario.wav [▶](audio/it-IT_DT5/1l_it-IT_male-DT5/Attiva%20Modalit%C3%A0%20scenario.wav.wav)  Δwer=0.333  (fast_default=0.667, realtime=0.333)  speech=[1.63s, 2.99s] fix=none
- ref:           `Attiva Modalità scenario`
- fast_default   `Va a modalità scenario.`
- fast_llm       `Attiva modalità scenario.`
- fast_mai       `Attiva modalità scenario.`
- realtime       `La modalità scenario.`
- realtime_refine `Prima modalità scenario.`
- whisper_v3     `Va a modalità scenario.`

### it-IT_DT2/2l_it-IT_male-DT2/Chiudi Lettore multimediale per il passeggero.wav [▶](audio/it-IT_DT2/2l_it-IT_male-DT2/Chiudi%20Lettore%20multimediale%20per%20il%20passeggero.wav.wav)  Δwer=0.333  (fast_default=0.500, realtime=0.167)  speech=[1.54s, 3.7s] fix=none
- ref:           `Chiudi Lettore multimediale per il passeggero`
- fast_default   `Il lettore multimediale per i passeggeri.`
- fast_llm       `Di lettore multimediale per il passeggero.`
- fast_mai       `di lettore multimediale per i passeggeri`
- realtime       `Il lettore multimediale per il passeggero.`
- realtime_refine `Il lettore multimediale per i passeggeri.`
- whisper_v3     `Il lettore multimediale per i passeggeri.`

### it-IT_DT5/1l_it-IT_male-DT5/Apri Easter Egg.wav [▶](audio/it-IT_DT5/1l_it-IT_male-DT5/Apri%20Easter%20Egg.wav.wav)  Δwer=0.333  (fast_default=0.000, realtime=0.333)  speech=[1.52s, 2.48s] fix=none
- ref:           `Apri Easter Egg`
- fast_default   `Apri Easter Egg.`
- fast_llm       `Apri Easter egg.`
- fast_mai       `Apri Easter Egg.`
- realtime       `Apri easter hacker.`
- realtime_refine `Apri Easter Egg.`
- whisper_v3     `Apri Easter Egg.`

### it-IT_DT4/1l_it-IT_female-DT4/Termina la navigazione.wav [▶](audio/it-IT_DT4/1l_it-IT_female-DT4/Termina%20la%20navigazione.wav.wav)  Δwer=0.333  (fast_default=0.333, realtime=0.000)  speech=[1.39s, 3.19s] fix=none
- ref:           `Termina la navigazione`
- fast_default   `Termina la navigation.`
- fast_llm       `Termina la navigazione.`
- fast_mai       `Termina la navigazione.`
- realtime       `Termina la navigazione.`
- realtime_refine `Termina la navigation.`
- whisper_v3     `Termina la navigation.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.