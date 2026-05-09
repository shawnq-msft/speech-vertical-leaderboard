# Error analysis — mazda_nl-NL_20260509_165618.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **nl-NL_DT1** — Mazda nl-NL DT1 voice commands (male + female pooled)
- **nl-NL_DT2** — Mazda nl-NL DT2 voice commands (male + female pooled)
- **nl-NL_DT3** — Mazda nl-NL DT3 voice commands (male + female pooled)
- **nl-NL_DT4** — Mazda nl-NL DT4 voice commands (male + female pooled)
- **nl-NL_DT5** — Mazda nl-NL DT5 voice commands (male + female pooled)
- **nl-NL_JT1** — Mazda nl-NL JT1 voice commands (male + female pooled)
- **nl-NL_JT2** — Mazda nl-NL JT2 voice commands (male + female pooled)
- **nl-NL_JT3** — Mazda nl-NL JT3 voice commands (male + female pooled)
- **nl-NL_JT4** — Mazda nl-NL JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_nl-NL_20260509_165618_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=27, `trim_both`=2, `trim_first`=7, `trim_last`=3

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| nl-NL_DT1 | fast_default | 30 | 0.220 | 0.467 | 1.5 | 9.1 | 9.8 | 1332 / 1420 | 1894 / 2070 |
| nl-NL_DT1 | fast_mai | 30 | 0.213 | 0.400 | 3.0 | 6.8 | 8.3 | 488 / 598 | 1001 / 1131 |
| nl-NL_DT1 | realtime | 30 | 0.215 | 0.533 | 0.8 | 9.8 | 9.8 | -23 / 103 | 684 / 853 |
| nl-NL_DT1 | whisper_v3 | 30 | 0.220 | 0.467 | 1.5 | 9.1 | 9.8 | 1389 / 2563 | 1952 / 3133 |
| nl-NL_DT2 | fast_default | 30 | 0.234 | 0.533 | 3.8 | 6.8 | 11.4 | 1182 / 1306 | 1731 / 1909 |
| nl-NL_DT2 | fast_mai | 30 | 0.170 | 0.267 | 3.8 | 3.8 | 7.6 | 469 / 563 | 997 / 1117 |
| nl-NL_DT2 | realtime | 30 | 0.192 | 0.433 | 3.0 | 6.8 | 9.1 | -22 / 92 | 687 / 941 |
| nl-NL_DT2 | whisper_v3 | 30 | 0.234 | 0.533 | 3.8 | 6.8 | 11.4 | 1174 / 1294 | 1723 / 1855 |
| nl-NL_DT3 | fast_default | 30 | 0.148 | 0.367 | 0.8 | 7.6 | 7.6 | 1167 / 1318 | 1808 / 1910 |
| nl-NL_DT3 | fast_mai | 30 | 0.175 | 0.367 | 2.3 | 6.1 | 9.1 | 463 / 542 | 966 / 1094 |
| nl-NL_DT3 | realtime | 30 | 0.161 | 0.367 | 1.5 | 9.1 | 5.3 | -16 / 98 | 649 / 741 |
| nl-NL_DT3 | whisper_v3 | 30 | 0.148 | 0.367 | 0.8 | 7.6 | 7.6 | 1178 / 1333 | 1819 / 1923 |
| nl-NL_DT4 | fast_default | 30 | 0.134 | 0.367 | 1.5 | 6.8 | 6.8 | 1175 / 1302 | 1729 / 1862 |
| nl-NL_DT4 | fast_mai | 30 | 0.142 | 0.333 | 0.8 | 6.1 | 6.8 | 487 / 599 | 999 / 1159 |
| nl-NL_DT4 | realtime | 30 | 0.191 | 0.467 | 0.8 | 10.6 | 7.6 | -36 / 90 | 657 / 735 |
| nl-NL_DT4 | whisper_v3 | 30 | 0.134 | 0.367 | 1.5 | 6.8 | 6.8 | 1171 / 1314 | 1725 / 1865 |
| nl-NL_DT5 | fast_default | 30 | 0.143 | 0.333 | 1.5 | 5.3 | 10.6 | 1151 / 1272 | 1697 / 1852 |
| nl-NL_DT5 | fast_mai | 30 | 0.170 | 0.367 | 1.5 | 5.3 | 7.6 | 459 / 515 | 965 / 1079 |
| nl-NL_DT5 | realtime | 30 | 0.143 | 0.333 | 0.8 | 6.8 | 8.3 | -4 / 97 | 664 / 747 |
| nl-NL_DT5 | whisper_v3 | 30 | 0.143 | 0.333 | 1.5 | 5.3 | 10.6 | 1157 / 1312 | 1702 / 1883 |
| nl-NL_JT1 | fast_default | 30 | 0.215 | 0.500 | 3.0 | 10.6 | 8.3 | 1157 / 1256 | 1822 / 1877 |
| nl-NL_JT1 | fast_mai | 30 | 0.280 | 0.533 | 9.1 | 6.8 | 12.9 | 469 / 577 | 923 / 1099 |
| nl-NL_JT1 | realtime | 30 | 0.219 | 0.500 | 2.3 | 12.1 | 8.3 | 5 / 126 | 707 / 819 |
| nl-NL_JT1 | whisper_v3 | 30 | 0.215 | 0.500 | 3.0 | 10.6 | 8.3 | 1161 / 1290 | 1826 / 2010 |
| nl-NL_JT2 | fast_default | 30 | 0.360 | 0.567 | 3.0 | 18.2 | 11.4 | 1187 / 1306 | 2175 / 4929 |
| nl-NL_JT2 | fast_mai | 30 | 0.310 | 0.533 | 4.5 | 9.8 | 12.9 | 518 / 596 | 948 / 1143 |
| nl-NL_JT2 | realtime | 30 | 0.328 | 0.533 | 0.0 | 18.2 | 10.6 | -12 / 104 | 690 / 823 |
| nl-NL_JT2 | whisper_v3 | 30 | 0.360 | 0.567 | 3.0 | 18.2 | 11.4 | 1184 / 1307 | 2172 / 4932 |
| nl-NL_JT3 | fast_default | 30 | 0.251 | 0.433 | 2.3 | 12.1 | 9.8 | 1149 / 1235 | 1703 / 1832 |
| nl-NL_JT3 | fast_mai | 30 | 0.242 | 0.400 | 3.8 | 4.5 | 13.6 | 511 / 600 | 998 / 1170 |
| nl-NL_JT3 | realtime | 30 | 0.255 | 0.467 | 2.3 | 12.9 | 9.8 | -10 / 76 | 659 / 746 |
| nl-NL_JT3 | whisper_v3 | 30 | 0.251 | 0.433 | 2.3 | 12.1 | 9.8 | 1151 / 1253 | 1705 / 1843 |
| nl-NL_JT4 | fast_default | 30 | 0.196 | 0.400 | 2.3 | 9.8 | 7.6 | 1129 / 1245 | 1687 / 1835 |
| nl-NL_JT4 | fast_mai | 30 | 0.216 | 0.367 | 9.1 | 2.3 | 12.1 | 468 / 591 | 981 / 1111 |
| nl-NL_JT4 | realtime | 30 | 0.191 | 0.367 | 2.3 | 9.8 | 7.6 | -11 / 104 | 700 / 844 |
| nl-NL_JT4 | whisper_v3 | 30 | 0.196 | 0.400 | 2.3 | 9.8 | 7.6 | 1134 / 1268 | 1692 / 1832 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/nl-NL_JT1/1r_nl-NL_male-JT1/008.Temperaturen%20synchroniseren.wav.wav) | nl-NL_JT1 | 1r_nl-NL_male-JT1/008.Temperaturen synchroniseren.wav | fast_mai | 3.000 | `Temperaturen synchroniseren` | `En laat u weer synchroon zien.` |
| [▶](audio/nl-NL_JT1/1r_nl-NL_female-JT1/019.Bestuurdersstoelverwarming%20inschakelen.wav.wav) | nl-NL_JT1 | 1r_nl-NL_female-JT1/019.Bestuurdersstoelverwarming inschakelen.wav | fast_mai | 2.500 | `Bestuurdersstoelverwarming inschakelen` | `Dit is verwarming en schakeling.` |
| [▶](audio/nl-NL_JT4/1r_nl-NL_male-JT4/008.Temperaturen%20synchroniseren.wav.wav) | nl-NL_JT4 | 1r_nl-NL_male-JT4/008.Temperaturen synchroniseren.wav | fast_mai | 2.500 | `Temperaturen synchroniseren` | `Temperatuur is een goede sier.` |
| [▶](audio/nl-NL_DT2/2r_nl-NL_male-DT2/100.Kaart%20weergeven.wav.wav) | nl-NL_DT2 | 2r_nl-NL_male-DT2/100.Kaart weergeven.wav | fast_mai | 2.000 | `Kaart weergeven` | `Kijk, die heb ik.` |
| [▶](audio/nl-NL_DT5/1r_nl-NL_female-DT5/019.Bestuurdersstoelverwarming%20inschakelen.wav.wav) | nl-NL_DT5 | 1r_nl-NL_female-DT5/019.Bestuurdersstoelverwarming inschakelen.wav | fast_default | 2.000 | `Bestuurdersstoelverwarming inschakelen` | `De 40e verwarming schakelen.` |
| [▶](audio/nl-NL_DT5/1r_nl-NL_female-DT5/019.Bestuurdersstoelverwarming%20inschakelen.wav.wav) | nl-NL_DT5 | 1r_nl-NL_female-DT5/019.Bestuurdersstoelverwarming inschakelen.wav | whisper_v3 | 2.000 | `Bestuurdersstoelverwarming inschakelen` | `De 40e verwarming schakelen.` |
| [▶](audio/nl-NL_JT3/1r_nl-NL_female-JT3/019.Bestuurdersstoelverwarming%20inschakelen.wav.wav) | nl-NL_JT3 | 1r_nl-NL_female-JT3/019.Bestuurdersstoelverwarming inschakelen.wav | realtime | 2.000 | `Bestuurdersstoelverwarming inschakelen` | `De sterke verwarming schakelen.` |
| [▶](audio/nl-NL_JT3/1r_nl-NL_female-JT3/019.Bestuurdersstoelverwarming%20inschakelen.wav.wav) | nl-NL_JT3 | 1r_nl-NL_female-JT3/019.Bestuurdersstoelverwarming inschakelen.wav | fast_default | 2.000 | `Bestuurdersstoelverwarming inschakelen` | `De sterke verwarming schakelen.` |
| [▶](audio/nl-NL_JT3/1r_nl-NL_female-JT3/019.Bestuurdersstoelverwarming%20inschakelen.wav.wav) | nl-NL_JT3 | 1r_nl-NL_female-JT3/019.Bestuurdersstoelverwarming inschakelen.wav | whisper_v3 | 2.000 | `Bestuurdersstoelverwarming inschakelen` | `De sterke verwarming schakelen.` |
| [▶](audio/nl-NL_JT4/1r_nl-NL_female-JT4/141.Bluetooth-muziek%20uitschakelen.wav.wav) | nl-NL_JT4 | 1r_nl-NL_female-JT4/141.Bluetooth-muziek uitschakelen.wav | fast_mai | 2.000 | `Bluetooth-muziek uitschakelen` | `Drup een stukje uit de hand.` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 35 | `vier` | `4` |
| 20 | `aanbeveling` | `aanbevelingen` |
| 10 | `bestuurdersstoelverwarming` | `bestuurderstoelverwarming` |
| 9 | `bestuurdersstoelverwarming` | `bestuurdersverwarming` |
| 8 | `stoelinstellingen` | `instellingen` |
| 7 | `voeg` | `op` |
| 6 | `open` | `op` |
| 5 | `inschakelen` | `schakelen` |
| 5 | `bluetooth` | `route` |
| 4 | `de` | `een` |
| 3 | `synchroniseren` | `synchroniseer` |
| 3 | `weergave` | `weershaven` |
| 3 | `kunt` | `je` |
| 3 | `pas` | `als` |
| 3 | `beltoonvolume` | `beltonvolume` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

_(none detected)_

## Top fast_default vs realtime disagreements

### nl-NL_DT2/2l_nl-NL_female-DT2/097.Beëindig scenariomodus aan passagierszijde.wav [▶](audio/nl-NL_DT2/2l_nl-NL_female-DT2/097.Be%C3%ABindig%20scenariomodus%20aan%20passagierszijde.wav.wav)  Δwer=1.000  (fast_default=1.000, realtime=0.000)  speech=[1.67s, 3.83s] fix=none
- ref:           `Beëindig scenariomodus aan passagierszijde`
- fast_default   `De enige scenariomodus aan passagiers zijn.`
- fast_mai       `Beëindig scenario-modus aan passagierszijde.`
- realtime       `Beëindig scenariomodus aan passagierszijde.`
- whisper_v3     `De enige scenariomodus aan passagiers zijn.`

### nl-NL_DT4/2l_nl-NL_female-DT4/097.Beëindig scenariomodus aan passagierszijde.wav [▶](audio/nl-NL_DT4/2l_nl-NL_female-DT4/097.Be%C3%ABindig%20scenariomodus%20aan%20passagierszijde.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[1.82s, 4.14s] fix=trim_first
- ref:           `Beëindig scenariomodus aan passagierszijde`
- fast_default   `Beëindig scenariomodus aan passagierszijde.`
- fast_mai       `Beëindig scenario-modus aan passagierszijde.`
- realtime       `Beëindigd scenario modus aan passagierszijde.`
- whisper_v3     `Beëindig scenariomodus aan passagierszijde.`

### nl-NL_JT2/1l_nl-NL_male-JT2/042.Slimme grootlichten inschakelen.wav [▶](audio/nl-NL_JT2/1l_nl-NL_male-JT2/042.Slimme%20grootlichten%20inschakelen.wav.wav)  Δwer=0.667  (fast_default=0.667, realtime=0.000)  speech=[-s, -s] fix=skip
- ref:           `Slimme grootlichten inschakelen`
- fast_default   `Vind me grootlichten inschakelen.`
- fast_mai       `Slimme grootlichten inschakelen.`
- realtime       `Slimme groot lichten inschakelen.`
- whisper_v3     `Vind me grootlichten inschakelen.`

### nl-NL_DT4/2r_nl-NL_male-DT4/100.Kaart weergeven.wav [▶](audio/nl-NL_DT4/2r_nl-NL_male-DT4/100.Kaart%20weergeven.wav.wav)  Δwer=0.500  (fast_default=0.000, realtime=0.500)  speech=[1.27s, 2.35s] fix=none
- ref:           `Kaart weergeven`
- fast_default   `Kaart weergeven.`
- fast_mai       `Kaart weergeven.`
- realtime       `Taart weergeven.`
- whisper_v3     `Kaart weergeven.`

### nl-NL_DT3/1r_nl-NL_female-DT3/019.Bestuurdersstoelverwarming inschakelen.wav [▶](audio/nl-NL_DT3/1r_nl-NL_female-DT3/019.Bestuurdersstoelverwarming%20inschakelen.wav.wav)  Δwer=0.500  (fast_default=0.500, realtime=1.000)  speech=[2.24s, 3.68s] fix=trim_first
- ref:           `Bestuurdersstoelverwarming inschakelen`
- fast_default   `Bestuurdersverwarming inschakelen.`
- fast_mai       `Bestuurderstofverwarming inschakelen.`
- realtime       `Natuurlijk verwarming inschakelen.`
- whisper_v3     `Bestuurdersverwarming inschakelen.`

### nl-NL_DT1/2r_nl-NL_male-DT1/100.Kaart weergeven.wav [▶](audio/nl-NL_DT1/2r_nl-NL_male-DT1/100.Kaart%20weergeven.wav.wav)  Δwer=0.500  (fast_default=0.000, realtime=0.500)  speech=[1.27s, 2.43s] fix=none
- ref:           `Kaart weergeven`
- fast_default   `Kaart weergeven.`
- fast_mai       `De kaart weergeven.`
- realtime       `Taart weergeven.`
- whisper_v3     `Kaart weergeven.`

### nl-NL_DT1/1r_nl-NL_female-DT1/019.Bestuurdersstoelverwarming inschakelen.wav [▶](audio/nl-NL_DT1/1r_nl-NL_female-DT1/019.Bestuurdersstoelverwarming%20inschakelen.wav.wav)  Δwer=0.500  (fast_default=1.000, realtime=0.500)  speech=[1.39s, 3.67s] fix=none
- ref:           `Bestuurdersstoelverwarming inschakelen`
- fast_default   `Bestuurders verwarming inschakelen.`
- fast_mai       `De stuurdersstoelverwarming inschakelen.`
- realtime       `Bestuurdersverwarming inschakelen.`
- whisper_v3     `Bestuurders verwarming inschakelen.`

### nl-NL_DT1/1l_nl-NL_male-DT1/060.Automatisch parkeren inschakelen.wav [▶](audio/nl-NL_DT1/1l_nl-NL_male-DT1/060.Automatisch%20parkeren%20inschakelen.wav.wav)  Δwer=0.333  (fast_default=0.667, realtime=0.333)  speech=[1.26s, 3.38s] fix=none
- ref:           `Automatisch parkeren inschakelen`
- fast_default   `Automatisch parkeerlichten schakelen.`
- fast_mai       `Automatisch parkeren inschakelen.`
- realtime       `Automatisch parkeerplicht inschakelen.`
- whisper_v3     `Automatisch parkeerlichten schakelen.`

### nl-NL_DT4/1r_nl-NL_female-DT4/141.Bluetooth-muziek uitschakelen.wav [▶](audio/nl-NL_DT4/1r_nl-NL_female-DT4/141.Bluetooth-muziek%20uitschakelen.wav.wav)  Δwer=0.333  (fast_default=0.667, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Bluetooth-muziek uitschakelen`
- fast_default   `Ziek uitschakelen.`
- fast_mai       `Route basic uitschakelen.`
- realtime       ``
- whisper_v3     `Ziek uitschakelen.`

### nl-NL_DT2/1r_nl-NL_male-DT2/114.Wijzig de routevoorkeur naar intelligente aanbeveling.wav [▶](audio/nl-NL_DT2/1r_nl-NL_male-DT2/114.Wijzig%20de%20routevoorkeur%20naar%20intelligente%20aanbeveling.wav.wav)  Δwer=0.333  (fast_default=0.167, realtime=0.500)  speech=[1.27s, 4.27s] fix=none
- ref:           `Wijzig de routevoorkeur naar intelligente aanbeveling`
- fast_default   `Wijzig de routevoorkeur naar intelligente aanbevelingen.`
- fast_mai       `Wijzig de routevoorkeur naar 'Intelligente aanbeveling'.`
- realtime       `Wijzig de boete voorkeur naar intelligente aanbevelingen.`
- whisper_v3     `Wijzig de routevoorkeur naar intelligente aanbevelingen.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.