# Error analysis — mazda_es-ES_20260509_155256.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **es-ES_DT1** — Mazda es-ES DT1 voice commands (male + female pooled)
- **es-ES_DT2** — Mazda es-ES DT2 voice commands (male + female pooled)
- **es-ES_DT3** — Mazda es-ES DT3 voice commands (male + female pooled)
- **es-ES_DT4** — Mazda es-ES DT4 voice commands (male + female pooled)
- **es-ES_DT5** — Mazda es-ES DT5 voice commands (male + female pooled)
- **es-ES_JT1** — Mazda es-ES JT1 voice commands (male + female pooled)
- **es-ES_JT2** — Mazda es-ES JT2 voice commands (male + female pooled)
- **es-ES_JT3** — Mazda es-ES JT3 voice commands (male + female pooled)
- **es-ES_JT4** — Mazda es-ES JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_es-ES_20260509_155256_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=23, `trim_first`=5, `trim_last`=2

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| es-ES_DT1 | fast_default | 30 | 0.116 | 0.367 | 1.0 | 2.6 | 6.3 | 665 / 735 | 1230 / 1691 |
| es-ES_DT1 | fast_llm | 30 | 0.131 | 0.333 | 2.1 | 2.6 | 6.3 | 494 / 544 | 1060 / 1140 |
| es-ES_DT1 | fast_mai | 30 | 0.094 | 0.267 | 1.0 | 1.0 | 5.2 | 481 / 609 | 988 / 1115 |
| es-ES_DT1 | realtime | 30 | 0.200 | 0.433 | 0.5 | 8.9 | 6.8 | -143 / 15 | 708 / 911 |
| es-ES_DT1 | realtime_refine | 30 | 0.141 | 0.433 | 2.1 | 2.1 | 7.9 | 322 / 565 | 1099 / 1236 |
| es-ES_DT1 | whisper_v3 | 30 | 0.116 | 0.367 | 1.0 | 2.6 | 6.3 | 665 / 667 | 1229 / 1677 |
| es-ES_DT2 | fast_default | 30 | 0.126 | 0.300 | 0.5 | 6.3 | 3.1 | 632 / 691 | 1258 / 1524 |
| es-ES_DT2 | fast_llm | 30 | 0.124 | 0.267 | 0.0 | 4.7 | 4.2 | 482 / 528 | 1124 / 1393 |
| es-ES_DT2 | fast_mai | 30 | 0.142 | 0.300 | 0.0 | 3.7 | 5.8 | 486 / 587 | 935 / 1103 |
| es-ES_DT2 | realtime | 30 | 0.261 | 0.367 | 0.5 | 19.4 | 2.6 | -113 / 16 | 722 / 836 |
| es-ES_DT2 | realtime_refine | 30 | 0.125 | 0.333 | 0.5 | 4.7 | 5.2 | 275 / 446 | 1047 / 1206 |
| es-ES_DT2 | whisper_v3 | 30 | 0.126 | 0.300 | 0.5 | 6.3 | 3.1 | 627 / 697 | 1253 / 1456 |
| es-ES_DT3 | fast_default | 30 | 0.036 | 0.167 | 0.0 | 2.6 | 1.0 | 601 / 648 | 1150 / 1206 |
| es-ES_DT3 | fast_llm | 30 | 0.070 | 0.200 | 0.0 | 4.2 | 1.6 | 493 / 592 | 1042 / 1147 |
| es-ES_DT3 | fast_mai | 30 | 0.041 | 0.167 | 1.0 | 0.0 | 2.6 | 489 / 661 | 1038 / 1162 |
| es-ES_DT3 | realtime | 30 | 0.087 | 0.333 | 0.0 | 3.7 | 4.2 | -124 / -14 | 655 / 752 |
| es-ES_DT3 | realtime_refine | 30 | 0.073 | 0.300 | 0.5 | 2.1 | 3.1 | 315 / 464 | 1000 / 1166 |
| es-ES_DT3 | whisper_v3 | 30 | 0.036 | 0.167 | 0.0 | 2.6 | 1.0 | 611 / 680 | 1160 / 1240 |
| es-ES_DT4 | fast_default | 30 | 0.129 | 0.300 | 1.0 | 2.1 | 5.8 | 601 / 708 | 1164 / 1325 |
| es-ES_DT4 | fast_llm | 30 | 0.122 | 0.233 | 0.0 | 2.6 | 5.2 | 494 / 541 | 1098 / 1337 |
| es-ES_DT4 | fast_mai | 30 | 0.102 | 0.267 | 0.0 | 2.1 | 4.2 | 471 / 600 | 952 / 1101 |
| es-ES_DT4 | realtime | 30 | 0.227 | 0.433 | 1.0 | 14.1 | 3.7 | -160 / 20 | 691 / 882 |
| es-ES_DT4 | realtime_refine | 30 | 0.127 | 0.333 | 1.0 | 1.6 | 6.3 | 312 / 463 | 1052 / 1190 |
| es-ES_DT4 | whisper_v3 | 30 | 0.129 | 0.300 | 1.0 | 2.1 | 5.8 | 594 / 664 | 1157 / 1224 |
| es-ES_DT5 | fast_default | 30 | 0.089 | 0.367 | 0.5 | 1.6 | 5.8 | 613 / 643 | 1161 / 1207 |
| es-ES_DT5 | fast_llm | 30 | 0.098 | 0.267 | 0.0 | 4.7 | 3.7 | 484 / 553 | 1032 / 1093 |
| es-ES_DT5 | fast_mai | 30 | 0.048 | 0.200 | 0.0 | 1.6 | 2.1 | 477 / 545 | 1025 / 1097 |
| es-ES_DT5 | realtime | 30 | 0.106 | 0.333 | 0.5 | 4.2 | 4.7 | -131 / -16 | 677 / 842 |
| es-ES_DT5 | realtime_refine | 30 | 0.089 | 0.433 | 0.0 | 2.1 | 6.3 | 284 / 432 | 993 / 1143 |
| es-ES_DT5 | whisper_v3 | 30 | 0.089 | 0.367 | 0.5 | 1.6 | 5.8 | 615 / 642 | 1163 / 1205 |
| es-ES_JT1 | fast_default | 30 | 0.069 | 0.233 | 0.0 | 4.7 | 2.1 | 596 / 650 | 1173 / 1249 |
| es-ES_JT1 | fast_llm | 30 | 0.060 | 0.167 | 0.0 | 3.1 | 1.6 | 489 / 532 | 1070 / 1128 |
| es-ES_JT1 | fast_mai | 30 | 0.078 | 0.300 | 0.0 | 2.6 | 3.7 | 455 / 533 | 973 / 1057 |
| es-ES_JT1 | realtime | 30 | 0.167 | 0.367 | 0.5 | 9.4 | 4.2 | -16 / 70 | 796 / 899 |
| es-ES_JT1 | realtime_refine | 30 | 0.081 | 0.267 | 0.0 | 5.2 | 2.6 | 306 / 466 | 1024 / 1137 |
| es-ES_JT1 | whisper_v3 | 30 | 0.069 | 0.233 | 0.0 | 4.7 | 2.1 | 591 / 639 | 1169 / 1231 |
| es-ES_JT2 | fast_default | 30 | 0.195 | 0.467 | 0.0 | 7.3 | 11.0 | 589 / 670 | 1242 / 1467 |
| es-ES_JT2 | fast_llm | 30 | 0.223 | 0.433 | 8.4 | 5.8 | 11.0 | 487 / 526 | 1131 / 1562 |
| es-ES_JT2 | fast_mai | 30 | 0.208 | 0.333 | 1.0 | 11.5 | 3.7 | 482 / 546 | 941 / 1075 |
| es-ES_JT2 | realtime | 30 | 0.306 | 0.600 | 0.5 | 19.4 | 7.3 | -187 / -55 | 665 / 781 |
| es-ES_JT2 | realtime_refine | 30 | 0.221 | 0.500 | 0.5 | 11.5 | 6.8 | 229 / 505 | 1117 / 1436 |
| es-ES_JT2 | whisper_v3 | 30 | 0.195 | 0.467 | 0.0 | 7.3 | 11.0 | 615 / 672 | 1267 / 1449 |
| es-ES_JT3 | fast_default | 30 | 0.090 | 0.267 | 0.0 | 4.7 | 3.1 | 696 / 663 | 1260 / 1384 |
| es-ES_JT3 | fast_llm | 30 | 0.113 | 0.200 | 1.6 | 1.6 | 6.8 | 501 / 565 | 1076 / 1249 |
| es-ES_JT3 | fast_mai | 30 | 0.083 | 0.167 | 1.6 | 0.5 | 5.8 | 477 / 513 | 969 / 1080 |
| es-ES_JT3 | realtime | 30 | 0.171 | 0.267 | 0.5 | 9.9 | 3.1 | -134 / -31 | 646 / 756 |
| es-ES_JT3 | realtime_refine | 30 | 0.080 | 0.233 | 0.0 | 2.6 | 4.2 | 315 / 489 | 1014 / 1119 |
| es-ES_JT3 | whisper_v3 | 30 | 0.090 | 0.267 | 0.0 | 4.7 | 3.1 | 702 / 698 | 1266 / 1391 |
| es-ES_JT4 | fast_default | 30 | 0.032 | 0.167 | 0.0 | 1.0 | 1.6 | 617 / 677 | 1165 / 1212 |
| es-ES_JT4 | fast_llm | 30 | 0.028 | 0.133 | 0.0 | 2.1 | 1.0 | 490 / 564 | 1034 / 1105 |
| es-ES_JT4 | fast_mai | 30 | 0.022 | 0.133 | 0.5 | 0.5 | 1.0 | 478 / 545 | 998 / 1095 |
| es-ES_JT4 | realtime | 30 | 0.110 | 0.367 | 0.0 | 5.2 | 4.2 | -126 / -11 | 658 / 784 |
| es-ES_JT4 | realtime_refine | 30 | 0.037 | 0.200 | 0.0 | 0.5 | 2.6 | 405 / 508 | 1105 / 1360 |
| es-ES_JT4 | whisper_v3 | 30 | 0.032 | 0.167 | 0.0 | 1.0 | 1.6 | 622 / 718 | 1170 / 1238 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/es-ES_JT2/1r_es-ES_female-JT2/141.Apaga%20la%20m%C3%BAsica%20por%20Bluetooth.wav.wav) | es-ES_JT2 | 1r_es-ES_female-JT2/141.Apaga la música por Bluetooth.wav | fast_llm | 3.400 | `Apaga la música por Bluetooth` | `The 2nd century BC was a period of great change in the history of the Han dynasty.` |
| [▶](audio/es-ES_DT4/2r_es-ES_male-DT4/101.A%20casa.wav.wav) | es-ES_DT4 | 2r_es-ES_male-DT4/101.A casa.wav | whisper_v3 | 1.500 | `A casa` | `That's sound.` |
| [▶](audio/es-ES_DT4/2r_es-ES_male-DT4/101.A%20casa.wav.wav) | es-ES_DT4 | 2r_es-ES_male-DT4/101.A casa.wav | fast_default | 1.500 | `A casa` | `That's sound.` |
| [▶](audio/es-ES_DT1/1l_es-ES_male-DT1/060.Enciende%20el%20aparcamiento%20autom%C3%A1tico.wav.wav) | es-ES_DT1 | 1l_es-ES_male-DT1/060.Enciende el aparcamiento automático.wav | fast_llm | 1.250 | `Enciende el aparcamiento automático` | `El Titanic es un aparato automático.` |
| [▶](audio/es-ES_JT2/1r_es-ES_male-JT2/114.Cambia%20la%20preferencia%20de%20ruta%20a%20recomendaci%C3%B3n%20inteligente.wav.wav) | es-ES_JT2 | 1r_es-ES_male-JT2/114.Cambia la preferencia de ruta a recomendación inteligente.wav | fast_llm | 1.125 | `Cambia la preferencia de ruta a recomendación inteligente` | `La empresa se dedica a la fabricación de productos químicos.` |
| [▶](audio/es-ES_DT1/1l_es-ES_male-DT1/060.Enciende%20el%20aparcamiento%20autom%C3%A1tico.wav.wav) | es-ES_DT1 | 1l_es-ES_male-DT1/060.Enciende el aparcamiento automático.wav | fast_mai | 1.000 | `Enciende el aparcamiento automático` | `En fin, un apartamento automático.` |
| [▶](audio/es-ES_DT1/1l_es-ES_female-DT1/062.Enciende%20la%20advertencia%20de%20colisi%C3%B3n%20trasera.wav.wav) | es-ES_DT1 | 1l_es-ES_female-DT1/062.Enciende la advertencia de colisión trasera.wav | fast_llm | 1.000 | `Enciende la advertencia de colisión trasera` | `En cuanto a la urgencia de conducción, sí.` |
| [▶](audio/es-ES_DT1/1l_es-ES_female-DT1/062.Enciende%20la%20advertencia%20de%20colisi%C3%B3n%20trasera.wav.wav) | es-ES_DT1 | 1l_es-ES_female-DT1/062.Enciende la advertencia de colisión trasera.wav | fast_default | 1.000 | `Enciende la advertencia de colisión trasera` | `En cuanto a la obegencia de colisiones así.` |
| [▶](audio/es-ES_DT1/1l_es-ES_female-DT1/062.Enciende%20la%20advertencia%20de%20colisi%C3%B3n%20trasera.wav.wav) | es-ES_DT1 | 1l_es-ES_female-DT1/062.Enciende la advertencia de colisión trasera.wav | whisper_v3 | 1.000 | `Enciende la advertencia de colisión trasera` | `En cuanto a la obegencia de colisiones así.` |
| [▶](audio/es-ES_DT1/2r_es-ES_female-DT1/136.Pon%20100.7%20FM.wav.wav) | es-ES_DT1 | 2r_es-ES_female-DT1/136.Pon 100.7 FM.wav | realtime | 1.000 | `Pon 100.7 FM` | `` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 41 | `pon` | `con` |
| 19 | `toma` | `a` |
| 7 | `apaga` | `aparta` |
| 6 | `inclina` | `incline` |
| 5 | `activa` | `toda` |
| 5 | `el` | `en` |
| 5 | `ajusta` | `busca` |
| 5 | `fila` | `cita` |
| 4 | `ajusta` | `está` |
| 4 | `ajusta` | `ajuste` |
| 4 | `toma` | `pa` |
| 4 | `a` | `al` |
| 3 | `curva` | `funda` |
| 3 | `activa` | `ajusta` |
| 3 | `activa` | `aplica` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

Found **8** likely hallucinations (WER ≥ 0.8 and ≤ 1 word overlap with reference):

| Audio | Dataset | Sample | WER | Boundary | Reference | Hypothesis |
|---|---|---|---:|---|---|---|
| [▶](audio/es-ES_DT2/2r_es-ES_male-DT2/101.A%20casa.wav.wav) | es-ES_DT2 | 2r_es-ES_male-DT2/101.A casa.wav | 1.000 | skip | `A casa` | `拜拜！` |
| [▶](audio/es-ES_DT4/1l_es-ES_female-DT4/014.Activa%20la%20circulaci%C3%B3n%20externa.wav.wav) | es-ES_DT4 | 1l_es-ES_female-DT4/014.Activa la circulación externa.wav | 1.000 | skip | `Activa la circulación externa` | `Todas las curaciones.` |
| [▶](audio/es-ES_DT4/2r_es-ES_male-DT4/101.A%20casa.wav.wav) | es-ES_DT4 | 2r_es-ES_male-DT4/101.A casa.wav | 1.000 | skip | `A casa` | `At 7.` |
| [▶](audio/es-ES_DT5/1l_es-ES_female-DT5/055.Toma%20una%20foto.wav.wav) | es-ES_DT5 | 1l_es-ES_female-DT5/055.Toma una foto.wav | 1.000 | none | `Toma una foto` | `Paul Lafont.` |
| [▶](audio/es-ES_JT1/1l_es-ES_female-JT1/055.Toma%20una%20foto.wav.wav) | es-ES_JT1 | 1l_es-ES_female-JT1/055.Toma una foto.wav | 1.000 | skip | `Toma una foto` | `Calculatrice.` |
| [▶](audio/es-ES_JT2/1l_es-ES_female-JT2/055.Toma%20una%20foto.wav.wav) | es-ES_JT2 | 1l_es-ES_female-JT2/055.Toma una foto.wav | 1.000 | skip | `Toma una foto` | `Paula.` |
| [▶](audio/es-ES_JT2/1l_es-ES_male-JT2/136.Pon%20100.7%20FM.wav.wav) | es-ES_JT2 | 1l_es-ES_male-JT2/136.Pon 100.7 FM.wav | 1.000 | skip | `Pon 100.7 FM` | `Con ciento.` |
| [▶](audio/es-ES_JT2/1r_es-ES_female-JT2/141.Apaga%20la%20m%C3%BAsica%20por%20Bluetooth.wav.wav) | es-ES_JT2 | 1r_es-ES_female-JT2/141.Apaga la música por Bluetooth.wav | 3.400 | skip | `Apaga la música por Bluetooth` | `The 2nd century BC was a period of great change in the history of the Han dynasty.` |

## Top fast_default vs realtime disagreements

### es-ES_JT2/1r_es-ES_female-JT2/108.Ve a la página anterior.wav [▶](audio/es-ES_JT2/1r_es-ES_female-JT2/108.Ve%20a%20la%20p%C3%A1gina%20anterior.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Ve a la página anterior`
- fast_default   `Ve a la página anterior.`
- fast_llm       `Ve a la página anterior.`
- fast_mai       `Ve a la página anterior.`
- realtime       ``
- realtime_refine `Ve a la página anterior.`
- whisper_v3     `Ve a la página anterior.`

### es-ES_DT4/1r_es-ES_female-DT4/108.Ve a la página anterior.wav [▶](audio/es-ES_DT4/1r_es-ES_female-DT4/108.Ve%20a%20la%20p%C3%A1gina%20anterior.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Ve a la página anterior`
- fast_default   `Ve a la página anterior.`
- fast_llm       `Ve a la página anterior.`
- fast_mai       `Ve a la página anterior`
- realtime       ``
- realtime_refine `Ve a la página anterior.`
- whisper_v3     `Ve a la página anterior.`

### es-ES_DT2/2l_es-ES_male-DT2/111.Ve a la última página.wav [▶](audio/es-ES_DT2/2l_es-ES_male-DT2/111.Ve%20a%20la%20%C3%BAltima%20p%C3%A1gina.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Ve a la última página`
- fast_default   `Ve a la última página.`
- fast_llm       `Ve a la última página.`
- fast_mai       `Ve a la última página.`
- realtime       ``
- realtime_refine `Ve a la última página.`
- whisper_v3     `Ve a la última página.`

### es-ES_DT2/1r_es-ES_female-DT2/141.Apaga la música por Bluetooth.wav [▶](audio/es-ES_DT2/1r_es-ES_female-DT2/141.Apaga%20la%20m%C3%BAsica%20por%20Bluetooth.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Apaga la música por Bluetooth`
- fast_default   `Apaga la música por Bluetooth.`
- fast_llm       `Apaga la música por Bluetooth.`
- fast_mai       `Apaga la música por Bluetooth.`
- realtime       ``
- realtime_refine `Apaga la música por Bluetooth.`
- whisper_v3     `Apaga la música por Bluetooth.`

### es-ES_DT1/1r_es-ES_female-DT1/108.Ve a la página anterior.wav [▶](audio/es-ES_DT1/1r_es-ES_female-DT1/108.Ve%20a%20la%20p%C3%A1gina%20anterior.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Ve a la página anterior`
- fast_default   `Ve a la página anterior.`
- fast_llm       `Ir a la página anterior.`
- fast_mai       `Ve a la página anterior.`
- realtime       ``
- realtime_refine `Ve a la página anterior.`
- whisper_v3     `Ve a la página anterior.`

### es-ES_DT4/2l_es-ES_female-DT4/091.Cierra el Centro de Juegos en la pantalla central.wav [▶](audio/es-ES_DT4/2l_es-ES_female-DT4/091.Cierra%20el%20Centro%20de%20Juegos%20en%20la%20pantalla%20central.wav.wav)  Δwer=0.778  (fast_default=0.222, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Cierra el Centro de Juegos en la pantalla central`
- fast_default   `¿Qué es el centro de juegos en la pantalla central?`
- fast_llm       `El centro de juegos en la pantalla.`
- fast_mai       `Cierre el centro de juegos en la pantalla central.`
- realtime       ``
- realtime_refine `¿Quién es el centro de juegos en la pantalla central?`
- whisper_v3     `¿Qué es el centro de juegos en la pantalla central?`

### es-ES_JT4/1l_es-ES_male-JT4/136.Pon 100.7 FM.wav [▶](audio/es-ES_JT4/1l_es-ES_male-JT4/136.Pon%20100.7%20FM.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[-s, -s] fix=skip
- ref:           `Pon 100.7 FM`
- fast_default   `Pon 100.7 FM.`
- fast_llm       `Pon 100.7 FM.`
- fast_mai       `Pon 100.7 FM.`
- realtime       `FM.`
- realtime_refine `Pon 100.7 FM.`
- whisper_v3     `Pon 100.7 FM.`

### es-ES_DT1/2r_es-ES_female-DT1/136.Pon 100.7 FM.wav [▶](audio/es-ES_DT1/2r_es-ES_female-DT1/136.Pon%20100.7%20FM.wav.wav)  Δwer=0.750  (fast_default=0.250, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Pon 100.7 FM`
- fast_default   `Con 100.7 FM.`
- fast_llm       `100.7 FM.`
- fast_mai       `100.7 FM.`
- realtime       ``
- realtime_refine `Con 100.7 FM.`
- whisper_v3     `Con 100.7 FM.`

### es-ES_DT2/2l_es-ES_female-DT2/098.Cierra el Centro de Juegos en la pantalla del copiloto.wav [▶](audio/es-ES_DT2/2l_es-ES_female-DT2/098.Cierra%20el%20Centro%20de%20Juegos%20en%20la%20pantalla%20del%20copiloto.wav.wav)  Δwer=0.700  (fast_default=0.300, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Cierra el Centro de Juegos en la pantalla del copiloto`
- fast_default   `El centro de juegos en la pantalla.`
- fast_llm       `El centro de juegos en la pantalla de Xbox.`
- fast_mai       `el centro de juegos en la pantalla de fondo.`
- realtime       ``
- realtime_refine `El centro de juegos en la pantalla de.`
- whisper_v3     `El centro de juegos en la pantalla.`

### es-ES_JT3/1l_es-ES_female-JT3/055.Toma una foto.wav [▶](audio/es-ES_JT3/1l_es-ES_female-JT3/055.Toma%20una%20foto.wav.wav)  Δwer=0.667  (fast_default=0.333, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Toma una foto`
- fast_default   `A una foto.`
- fast_llm       `Haz una foto.`
- fast_mai       `Toma una foto.`
- realtime       ``
- realtime_refine `Toca una foto.`
- whisper_v3     `A una foto.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.