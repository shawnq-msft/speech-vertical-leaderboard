# Error analysis — mazda_nb-NO_20260509_162046.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **nb-NO_DT1** — Mazda nb-NO DT1 voice commands (male + female pooled)
- **nb-NO_DT2** — Mazda nb-NO DT2 voice commands (male + female pooled)
- **nb-NO_DT3** — Mazda nb-NO DT3 voice commands (male + female pooled)
- **nb-NO_DT4** — Mazda nb-NO DT4 voice commands (male + female pooled)
- **nb-NO_DT5** — Mazda nb-NO DT5 voice commands (male + female pooled)
- **nb-NO_JT1** — Mazda nb-NO JT1 voice commands (male + female pooled)
- **nb-NO_JT2** — Mazda nb-NO JT2 voice commands (male + female pooled)
- **nb-NO_JT3** — Mazda nb-NO JT3 voice commands (male + female pooled)
- **nb-NO_JT4** — Mazda nb-NO JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_nb-NO_20260509_162046_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=50, `trim_both`=9, `trim_first`=20, `trim_last`=19

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| nb-NO_DT1 | fast_default | 30 | 0.464 | 0.700 | 12.5 | 10.2 | 26.6 | 614 / 762 | 1212 / 1517 |
| nb-NO_DT1 | fast_mai | 30 | 0.415 | 0.667 | 9.4 | 16.4 | 15.6 | 484 / 622 | 923 / 1122 |
| nb-NO_DT1 | realtime | 30 | 0.444 | 0.667 | 6.2 | 14.1 | 21.1 | 126 / 330 | 1055 / 1516 |
| nb-NO_DT1 | whisper_v3 | 30 | 0.464 | 0.700 | 12.5 | 10.2 | 26.6 | 595 / 682 | 1196 / 1421 |
| nb-NO_DT2 | fast_default | 30 | 0.504 | 0.867 | 10.9 | 11.7 | 27.3 | 607 / 719 | 1191 / 1248 |
| nb-NO_DT2 | fast_mai | 30 | 0.417 | 0.600 | 7.8 | 20.3 | 13.3 | 458 / 504 | 953 / 1074 |
| nb-NO_DT2 | realtime | 30 | 0.436 | 0.767 | 4.7 | 14.8 | 22.7 | 157 / 384 | 1118 / 1244 |
| nb-NO_DT2 | whisper_v3 | 30 | 0.504 | 0.867 | 10.9 | 11.7 | 27.3 | 614 / 712 | 1198 / 1303 |
| nb-NO_DT3 | fast_default | 30 | 0.526 | 0.733 | 5.5 | 18.8 | 29.7 | 607 / 679 | 1339 / 2047 |
| nb-NO_DT3 | fast_mai | 30 | 0.462 | 0.733 | 6.2 | 25.8 | 14.1 | 473 / 602 | 923 / 1153 |
| nb-NO_DT3 | realtime | 30 | 0.489 | 0.700 | 3.1 | 20.3 | 23.4 | 89 / 267 | 990 / 1059 |
| nb-NO_DT3 | whisper_v3 | 30 | 0.526 | 0.733 | 5.5 | 18.8 | 29.7 | 606 / 682 | 1338 / 2086 |
| nb-NO_DT4 | fast_default | 30 | 0.471 | 0.767 | 8.6 | 7.0 | 32.8 | 606 / 672 | 1243 / 1262 |
| nb-NO_DT4 | fast_mai | 30 | 0.416 | 0.667 | 11.7 | 7.0 | 25.0 | 473 / 575 | 962 / 1097 |
| nb-NO_DT4 | realtime | 30 | 0.413 | 0.733 | 5.5 | 10.2 | 24.2 | 85 / 496 | 1026 / 1345 |
| nb-NO_DT4 | whisper_v3 | 30 | 0.471 | 0.767 | 8.6 | 7.0 | 32.8 | 604 / 673 | 1240 / 1307 |
| nb-NO_DT5 | fast_default | 30 | 0.513 | 0.700 | 3.9 | 33.6 | 19.5 | 577 / 651 | 1370 / 2237 |
| nb-NO_DT5 | fast_mai | 30 | 0.562 | 0.700 | 7.8 | 39.1 | 17.2 | 454 / 564 | 884 / 1144 |
| nb-NO_DT5 | realtime | 30 | 0.491 | 0.733 | 3.1 | 31.2 | 19.5 | -20 / 300 | 1021 / 1263 |
| nb-NO_DT5 | whisper_v3 | 30 | 0.513 | 0.700 | 3.9 | 33.6 | 19.5 | 588 / 652 | 1339 / 1978 |
| nb-NO_JT1 | fast_default | 30 | 0.479 | 0.767 | 3.9 | 21.1 | 23.4 | 612 / 711 | 1350 / 2541 |
| nb-NO_JT1 | fast_mai | 30 | 0.404 | 0.533 | 7.0 | 27.3 | 9.4 | 472 / 566 | 938 / 1137 |
| nb-NO_JT1 | realtime | 30 | 0.459 | 0.700 | 3.9 | 21.9 | 17.2 | -39 / 166 | 941 / 1113 |
| nb-NO_JT1 | whisper_v3 | 30 | 0.479 | 0.767 | 3.9 | 21.1 | 23.4 | 609 / 679 | 1354 / 2799 |
| nb-NO_JT2 | fast_default | 30 | 0.672 | 0.833 | 1.6 | 45.3 | 23.4 | 580 / 668 | 1351 / 2322 |
| nb-NO_JT2 | fast_mai | 30 | 0.708 | 0.867 | 7.0 | 46.9 | 20.3 | 463 / 568 | 873 / 1084 |
| nb-NO_JT2 | realtime | 30 | 0.574 | 0.767 | 3.9 | 40.6 | 18.8 | -149 / 151 | 1084 / 1690 |
| nb-NO_JT2 | whisper_v3 | 30 | 0.672 | 0.833 | 1.6 | 45.3 | 23.4 | 556 / 658 | 1283 / 2079 |
| nb-NO_JT3 | fast_default | 30 | 0.439 | 0.633 | 3.9 | 19.5 | 21.9 | 606 / 716 | 1349 / 2198 |
| nb-NO_JT3 | fast_mai | 30 | 0.423 | 0.633 | 3.9 | 26.6 | 11.7 | 481 / 566 | 922 / 1101 |
| nb-NO_JT3 | realtime | 30 | 0.434 | 0.667 | 3.1 | 22.7 | 18.8 | -111 / 151 | 922 / 1053 |
| nb-NO_JT3 | whisper_v3 | 30 | 0.439 | 0.633 | 3.9 | 19.5 | 21.9 | 598 / 662 | 1339 / 2159 |
| nb-NO_JT4 | fast_default | 30 | 0.443 | 0.733 | 3.9 | 25.8 | 20.3 | 596 / 679 | 1278 / 1487 |
| nb-NO_JT4 | fast_mai | 30 | 0.431 | 0.600 | 5.5 | 33.6 | 9.4 | 458 / 506 | 902 / 1057 |
| nb-NO_JT4 | realtime | 30 | 0.432 | 0.733 | 0.8 | 28.1 | 17.2 | -92 / 181 | 996 / 1205 |
| nb-NO_JT4 | whisper_v3 | 30 | 0.443 | 0.733 | 3.9 | 25.8 | 20.3 | 596 / 686 | 1252 / 1511 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/nb-NO_DT1/1l_nb-NO_male-DT1/029.%C3%85pne%20seteinntillingssiden.wav.wav) | nb-NO_DT1 | 1l_nb-NO_male-DT1/029.Åpne seteinntillingssiden.wav | fast_mai | 3.000 | `Åpne seteinntillingssiden` | `Og når ser du til innsiden?` |
| [▶](audio/nb-NO_DT5/1l_nb-NO_male-DT5/029.%C3%85pne%20seteinntillingssiden.wav.wav) | nb-NO_DT5 | 1l_nb-NO_male-DT5/029.Åpne seteinntillingssiden.wav | fast_mai | 3.000 | `Åpne seteinntillingssiden` | `Og når vi ser til innstillingssiden,` |
| [▶](audio/nb-NO_DT1/1r_nb-NO_male-DT1/008.Synkroniser%20temperaturer.wav.wav) | nb-NO_DT1 | 1r_nb-NO_male-DT1/008.Synkroniser temperaturer.wav | whisper_v3 | 2.500 | `Synkroniser temperaturer` | `Så kan vi se at.` |
| [▶](audio/nb-NO_DT1/1r_nb-NO_male-DT1/008.Synkroniser%20temperaturer.wav.wav) | nb-NO_DT1 | 1r_nb-NO_male-DT1/008.Synkroniser temperaturer.wav | fast_default | 2.500 | `Synkroniser temperaturer` | `Så kan vi se at.` |
| [▶](audio/nb-NO_DT2/1l_nb-NO_male-DT2/029.%C3%85pne%20seteinntillingssiden.wav.wav) | nb-NO_DT2 | 1l_nb-NO_male-DT2/029.Åpne seteinntillingssiden.wav | whisper_v3 | 2.500 | `Åpne seteinntillingssiden` | `Åtene se til til siden.` |
| [▶](audio/nb-NO_DT2/1l_nb-NO_male-DT2/029.%C3%85pne%20seteinntillingssiden.wav.wav) | nb-NO_DT2 | 1l_nb-NO_male-DT2/029.Åpne seteinntillingssiden.wav | fast_default | 2.500 | `Åpne seteinntillingssiden` | `Åtene se til til siden.` |
| [▶](audio/nb-NO_DT4/1l_nb-NO_male-DT4/029.%C3%85pne%20seteinntillingssiden.wav.wav) | nb-NO_DT4 | 1l_nb-NO_male-DT4/029.Åpne seteinntillingssiden.wav | fast_mai | 2.500 | `Åpne seteinntillingssiden` | `Og med seertall til innsiden.` |
| [▶](audio/nb-NO_DT5/1r_nb-NO_male-DT5/008.Synkroniser%20temperaturer.wav.wav) | nb-NO_DT5 | 1r_nb-NO_male-DT5/008.Synkroniser temperaturer.wav | fast_mai | 2.500 | `Synkroniser temperaturer` | `Selv om det ser temperatur.` |
| [▶](audio/nb-NO_JT1/1l_nb-NO_male-JT1/029.%C3%85pne%20seteinntillingssiden.wav.wav) | nb-NO_JT1 | 1l_nb-NO_male-JT1/029.Åpne seteinntillingssiden.wav | fast_mai | 2.500 | `Åpne seteinntillingssiden` | `Åpne setet i din Teams-siden.` |
| [▶](audio/nb-NO_JT4/1l_nb-NO_male-JT4/029.%C3%85pne%20seteinntillingssiden.wav.wav) | nb-NO_JT4 | 1l_nb-NO_male-JT4/029.Åpne seteinntillingssiden.wav | fast_mai | 2.500 | `Åpne seteinntillingssiden` | `Åpne setet i din Teams-siden.` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 35 | `fire` | `4` |
| 20 | `bytt` | `litt` |
| 12 | `100` | `107` |
| 12 | `7` | `f` |
| 11 | `førersetets` | `førersetet` |
| 10 | `opplåsing` | `oppblåsing` |
| 10 | `ta` | `og` |
| 7 | `ignorer` | `eller` |
| 7 | `kollisjon` | `kollisjonen` |
| 6 | `bytt` | `vitt` |
| 6 | `fm` | `m` |
| 6 | `slå` | `lå` |
| 6 | `systeminnstillingene` | `systeminnstillingen` |
| 5 | `5` | `fem` |
| 5 | `setevarme` | `seteverme` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

_(none detected)_

## Top fast_default vs realtime disagreements

### nb-NO_JT2/2r_nb-NO_male-JT2/100.Vis kart.wav [▶](audio/nb-NO_JT2/2r_nb-NO_male-JT2/100.Vis%20kart.wav.wav)  Δwer=1.000  (fast_default=1.000, realtime=0.000)  speech=[1.32s, 1.91s] fix=none
- ref:           `Vis kart`
- fast_default   `It's cut.`
- fast_mai       `Vi skal`
- realtime       `Vis kart.`
- whisper_v3     `It's cut.`

### nb-NO_DT3/2r_nb-NO_male-DT3/100.Vis kart.wav [▶](audio/nb-NO_DT3/2r_nb-NO_male-DT3/100.Vis%20kart.wav.wav)  Δwer=1.000  (fast_default=1.000, realtime=0.000)  speech=[1.19s, 1.92s] fix=none
- ref:           `Vis kart`
- fast_default   `S.`
- fast_mai       `Vis karting.`
- realtime       `Vis kart.`
- whisper_v3     `S.`

### nb-NO_DT3/1r_nb-NO_male-DT3/008.Synkroniser temperaturer.wav [▶](audio/nb-NO_DT3/1r_nb-NO_male-DT3/008.Synkroniser%20temperaturer.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[1.77s, 2.89s] fix=trim_first
- ref:           `Synkroniser temperaturer`
- fast_default   `Synkroniser temperaturer.`
- fast_mai       `Synkroniser temperaturer.`
- realtime       `Vi ser temperaturer.`
- whisper_v3     `Synkroniser temperaturer.`

### nb-NO_DT1/2l_nb-NO_female-DT1/097.Avslutt scenariomodus på passasjersiden.wav [▶](audio/nb-NO_DT1/2l_nb-NO_female-DT1/097.Avslutt%20scenariomodus%20p%C3%A5%20passasjersiden.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[1.0s, 2.94s] fix=trim_last
- ref:           `Avslutt scenariomodus på passasjersiden`
- fast_default   `Avslutt scenariomodus på passasjersiden.`
- fast_mai       `Avslutt scenariomodus på passasjersiden.`
- realtime       `Avslutt scenario modus kaster skjeden.`
- whisper_v3     `Avslutt scenariomodus på passasjersiden.`

### nb-NO_DT1/2r_nb-NO_female-DT1/020.Øk temperaturen på førersetets setevarme litt.wav [▶](audio/nb-NO_DT1/2r_nb-NO_female-DT1/020.%C3%98k%20temperaturen%20p%C3%A5%20f%C3%B8rersetets%20setevarme%20litt.wav.wav)  Δwer=0.833  (fast_default=1.000, realtime=0.167)  speech=[0.99s, 3.77s] fix=none
- ref:           `Øk temperaturen på førersetets setevarme litt`
- fast_default   `Øk temperaturen på å føre seg til et stedevarende hit.`
- fast_mai       `Øk temperaturen på førersetets setevarme litt.`
- realtime       `Øk temperaturen på førersetet. Setevarme litt.`
- whisper_v3     `Øk temperaturen på å føre seg til et stedevarende hit.`

### nb-NO_JT4/1l_nb-NO_female-JT4/066.Åpne visningen for energiforbrukskurven.wav [▶](audio/nb-NO_JT4/1l_nb-NO_female-JT4/066.%C3%85pne%20visningen%20for%20energiforbrukskurven.wav.wav)  Δwer=0.750  (fast_default=0.250, realtime=1.000)  speech=[2.16s, 3.59s] fix=trim_first
- ref:           `Åpne visningen for energiforbrukskurven`
- fast_default   `Åpner visningen for energiforbrukskurven.`
- fast_mai       `åpne visningen for energiforbrukskurven.`
- realtime       `Oppvisningen for energiforbruk skurven.`
- whisper_v3     `Åpner visningen for energiforbrukskurven.`

### nb-NO_JT2/1l_nb-NO_female-JT2/014.Slå på ekstern sirkulasjon.wav [▶](audio/nb-NO_JT2/1l_nb-NO_female-JT2/014.Sl%C3%A5%20p%C3%A5%20ekstern%20sirkulasjon.wav.wav)  Δwer=0.750  (fast_default=1.000, realtime=0.250)  speech=[1.28s, 2.42s] fix=none
- ref:           `Slå på ekstern sirkulasjon`
- fast_default   `Ja.`
- fast_mai       ``
- realtime       `Slå på ekstern.`
- whisper_v3     `Ja.`

### nb-NO_JT1/1l_nb-NO_female-JT1/066.Åpne visningen for energiforbrukskurven.wav [▶](audio/nb-NO_JT1/1l_nb-NO_female-JT1/066.%C3%85pne%20visningen%20for%20energiforbrukskurven.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[1.57s, 3.05s] fix=trim_both
- ref:           `Åpne visningen for energiforbrukskurven`
- fast_default   `Åpne visningen for energi forbrukskurven.`
- fast_mai       `Åpne visningen for energiforbrukskurven.`
- realtime       `Det visningen for energiforbruk skarven.`
- whisper_v3     `Åpne visningen for energi forbrukskurven.`

### nb-NO_DT4/1r_nb-NO_female-DT4/019.Aktiver setevarme for førersetet.wav [▶](audio/nb-NO_DT4/1r_nb-NO_female-DT4/019.Aktiver%20setevarme%20for%20f%C3%B8rersetet.wav.wav)  Δwer=0.750  (fast_default=1.000, realtime=0.250)  speech=[1.07s, 3.51s] fix=none
- ref:           `Aktiver setevarme for førersetet`
- fast_default   `Aktivt støttebørene får førersøte.`
- fast_mai       `Aktiver støpedørene for førersøket.`
- realtime       `Aktivt setevarme for førersetet.`
- whisper_v3     `Aktivt støttebørene får førersøte.`

### nb-NO_DT4/1r_nb-NO_male-DT4/114.Endre ruteinnstilling til intelligent anbefaling.wav [▶](audio/nb-NO_DT4/1r_nb-NO_male-DT4/114.Endre%20ruteinnstilling%20til%20intelligent%20anbefaling.wav.wav)  Δwer=0.600  (fast_default=0.000, realtime=0.600)  speech=[1.48s, 3.3s] fix=trim_both
- ref:           `Endre ruteinnstilling til intelligent anbefaling`
- fast_default   `Endre ruteinnstilling til intelligent anbefaling.`
- fast_mai       `Endre ruteinnstilling til intelligent anbefaling.`
- realtime       `Enten med ruteinnstilling til intelligent anbefaler.`
- whisper_v3     `Endre ruteinnstilling til intelligent anbefaling.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.