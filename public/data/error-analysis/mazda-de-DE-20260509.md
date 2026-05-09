# Error analysis — mazda_de-DE_20260509_155253.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **de-DE_DT1** — Mazda de-DE DT1 voice commands (male + female pooled)
- **de-DE_DT2** — Mazda de-DE DT2 voice commands (male + female pooled)
- **de-DE_DT3** — Mazda de-DE DT3 voice commands (male + female pooled)
- **de-DE_DT4** — Mazda de-DE DT4 voice commands (male + female pooled)
- **de-DE_DT5** — Mazda de-DE DT5 voice commands (male + female pooled)
- **de-DE_JT1** — Mazda de-DE JT1 voice commands (male + female pooled)
- **de-DE_JT2** — Mazda de-DE JT2 voice commands (male + female pooled)
- **de-DE_JT3** — Mazda de-DE JT3 voice commands (male + female pooled)
- **de-DE_JT4** — Mazda de-DE JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_de-DE_20260509_155253_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=87, `trim_both`=14, `trim_first`=24, `trim_last`=17

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| de-DE_DT1 | fast_default | 30 | 0.597 | 0.867 | 7.1 | 26.8 | 26.8 | 614 / 755 | 1554 / 2550 |
| de-DE_DT1 | fast_llm | 30 | 0.614 | 0.867 | 17.3 | 22.8 | 39.4 | 483 / 548 | 1438 / 2272 |
| de-DE_DT1 | fast_mai | 30 | 0.543 | 0.800 | 9.4 | 23.6 | 25.2 | 463 / 500 | 810 / 1050 |
| de-DE_DT1 | realtime | 30 | 0.629 | 0.867 | 5.5 | 41.7 | 15.7 | -1185 / -581 | 707 / 897 |
| de-DE_DT1 | realtime_refine | 30 | 0.553 | 0.800 | 5.5 | 26.0 | 26.0 | -783 / -148 | 1220 / 1489 |
| de-DE_DT1 | whisper_v3 | 30 | 0.597 | 0.867 | 7.1 | 26.8 | 26.8 | 603 / 681 | 1545 / 2551 |
| de-DE_DT2 | fast_default | 30 | 0.667 | 0.867 | 11.8 | 25.2 | 37.0 | 605 / 679 | 1818 / 2983 |
| de-DE_DT2 | fast_llm | 30 | 0.703 | 0.833 | 22.0 | 20.5 | 43.3 | 491 / 543 | 1728 / 3613 |
| de-DE_DT2 | fast_mai | 30 | 0.589 | 0.800 | 25.2 | 15.7 | 38.6 | 484 / 606 | 764 / 1064 |
| de-DE_DT2 | realtime | 30 | 0.720 | 0.933 | 0.0 | 56.7 | 12.6 | -1070 / -522 | 839 / 1024 |
| de-DE_DT2 | realtime_refine | 30 | 0.629 | 0.900 | 14.2 | 26.8 | 29.9 | -911 / -177 | 1244 / 1495 |
| de-DE_DT2 | whisper_v3 | 30 | 0.667 | 0.867 | 11.8 | 25.2 | 37.0 | 615 / 669 | 1821 / 3048 |
| de-DE_DT3 | fast_default | 30 | 0.494 | 0.700 | 7.9 | 18.1 | 24.4 | 617 / 757 | 1411 / 2670 |
| de-DE_DT3 | fast_llm | 30 | 0.450 | 0.667 | 12.6 | 17.3 | 22.8 | 498 / 593 | 1337 / 2636 |
| de-DE_DT3 | fast_mai | 30 | 0.390 | 0.600 | 7.1 | 15.7 | 22.8 | 475 / 528 | 911 / 1068 |
| de-DE_DT3 | realtime | 30 | 0.521 | 0.767 | 5.5 | 30.7 | 12.6 | -1182 / -511 | 706 / 882 |
| de-DE_DT3 | realtime_refine | 30 | 0.385 | 0.667 | 3.1 | 20.5 | 14.2 | -803 / -117 | 1221 / 1379 |
| de-DE_DT3 | whisper_v3 | 30 | 0.494 | 0.700 | 7.9 | 18.1 | 24.4 | 629 / 752 | 1425 / 2714 |
| de-DE_DT4 | fast_default | 30 | 0.733 | 0.833 | 7.1 | 40.2 | 34.6 | 598 / 751 | 1678 / 3024 |
| de-DE_DT4 | fast_llm | 30 | 0.774 | 0.900 | 25.2 | 22.8 | 51.2 | 486 / 570 | 1794 / 2970 |
| de-DE_DT4 | fast_mai | 30 | 0.631 | 0.900 | 5.5 | 30.7 | 29.9 | 468 / 559 | 742 / 1027 |
| de-DE_DT4 | realtime | 30 | 0.778 | 0.900 | 3.1 | 64.6 | 13.4 | -1082 / -570 | 777 / 915 |
| de-DE_DT4 | realtime_refine | 30 | 0.679 | 0.767 | 19.7 | 29.1 | 40.2 | -671 / -24 | 1261 / 1512 |
| de-DE_DT4 | whisper_v3 | 30 | 0.733 | 0.833 | 7.1 | 40.2 | 34.6 | 592 / 710 | 1663 / 3016 |
| de-DE_DT5 | fast_default | 30 | 0.468 | 0.667 | 3.1 | 22.0 | 19.7 | 591 / 648 | 1362 / 2473 |
| de-DE_DT5 | fast_llm | 30 | 0.485 | 0.733 | 9.4 | 20.5 | 26.8 | 484 / 558 | 1366 / 2694 |
| de-DE_DT5 | fast_mai | 30 | 0.399 | 0.700 | 5.5 | 16.5 | 22.0 | 476 / 541 | 928 / 1094 |
| de-DE_DT5 | realtime | 30 | 0.497 | 0.700 | 4.7 | 27.6 | 16.5 | -1170 / -487 | 791 / 1044 |
| de-DE_DT5 | realtime_refine | 30 | 0.423 | 0.667 | 3.1 | 23.6 | 13.4 | -702 / -23 | 1216 / 1472 |
| de-DE_DT5 | whisper_v3 | 30 | 0.468 | 0.667 | 3.1 | 22.0 | 19.7 | 570 / 631 | 1338 / 2491 |
| de-DE_JT1 | fast_default | 30 | 0.414 | 0.600 | 3.9 | 22.0 | 14.2 | 620 / 732 | 1205 / 1233 |
| de-DE_JT1 | fast_llm | 30 | 0.387 | 0.600 | 3.1 | 15.7 | 16.5 | 494 / 541 | 1279 / 1734 |
| de-DE_JT1 | fast_mai | 30 | 0.329 | 0.533 | 4.7 | 17.3 | 11.8 | 492 / 607 | 955 / 1135 |
| de-DE_JT1 | realtime | 30 | 0.391 | 0.600 | 5.5 | 24.4 | 9.4 | -1126 / -488 | 737 / 990 |
| de-DE_JT1 | realtime_refine | 30 | 0.402 | 0.600 | 2.4 | 22.0 | 15.0 | -822 / -40 | 1173 / 1246 |
| de-DE_JT1 | whisper_v3 | 30 | 0.414 | 0.600 | 3.9 | 22.0 | 14.2 | 607 / 683 | 1190 / 1223 |
| de-DE_JT2 | fast_default | 30 | 0.682 | 0.767 | 11.8 | 26.0 | 37.0 | 602 / 674 | 1591 / 2600 |
| de-DE_JT2 | fast_llm | 30 | 0.658 | 0.867 | 16.5 | 16.5 | 48.8 | 484 / 538 | 1710 / 3834 |
| de-DE_JT2 | fast_mai | 30 | 0.600 | 0.800 | 6.3 | 31.5 | 26.0 | 498 / 604 | 818 / 1134 |
| de-DE_JT2 | realtime | 30 | 0.733 | 0.833 | 7.9 | 52.0 | 15.7 | -1083 / -510 | 736 / 944 |
| de-DE_JT2 | realtime_refine | 30 | 0.550 | 0.733 | 5.5 | 28.3 | 24.4 | -702 / -150 | 1226 / 1314 |
| de-DE_JT2 | whisper_v3 | 30 | 0.682 | 0.767 | 11.8 | 26.0 | 37.0 | 612 / 721 | 1605 / 2603 |
| de-DE_JT3 | fast_default | 30 | 0.342 | 0.567 | 1.6 | 21.3 | 7.9 | 566 / 650 | 1193 / 1216 |
| de-DE_JT3 | fast_llm | 30 | 0.335 | 0.500 | 13.4 | 19.7 | 9.4 | 487 / 596 | 1070 / 1126 |
| de-DE_JT3 | fast_mai | 30 | 0.274 | 0.433 | 0.8 | 20.5 | 5.5 | 499 / 602 | 954 / 1099 |
| de-DE_JT3 | realtime | 30 | 0.340 | 0.533 | 2.4 | 25.2 | 7.1 | -1124 / -478 | 758 / 933 |
| de-DE_JT3 | realtime_refine | 30 | 0.308 | 0.533 | 0.8 | 20.5 | 7.9 | -726 / -243 | 1155 / 1344 |
| de-DE_JT3 | whisper_v3 | 30 | 0.342 | 0.567 | 1.6 | 21.3 | 7.9 | 569 / 670 | 1203 / 1256 |
| de-DE_JT4 | fast_default | 30 | 0.371 | 0.533 | 1.6 | 26.8 | 5.5 | 606 / 719 | 1226 / 1300 |
| de-DE_JT4 | fast_llm | 30 | 0.394 | 0.533 | 6.3 | 19.7 | 14.2 | 470 / 543 | 1264 / 1806 |
| de-DE_JT4 | fast_mai | 30 | 0.310 | 0.467 | 3.1 | 17.3 | 12.6 | 547 / 660 | 979 / 1242 |
| de-DE_JT4 | realtime | 30 | 0.409 | 0.633 | 4.7 | 26.8 | 7.9 | -1095 / -460 | 712 / 891 |
| de-DE_JT4 | realtime_refine | 30 | 0.346 | 0.533 | 1.6 | 26.8 | 5.5 | -562 / 139 | 1249 / 1469 |
| de-DE_JT4 | whisper_v3 | 30 | 0.371 | 0.533 | 1.6 | 26.8 | 5.5 | 616 / 778 | 1237 / 1509 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/de-DE_JT3/1r_de-DE_female-JT3/Spiegel%20einklappen.wav.wav) | de-DE_JT3 | 1r_de-DE_female-JT3/Spiegel einklappen.wav | fast_llm | 7.000 | `Spiegel einklappen` | `The 2nd and 3rd editions of the book were published in 2000 and 2004.` |
| [▶](audio/de-DE_DT1/1r_de-DE_female-DT1/Spiegel%20einklappen.wav.wav) | de-DE_DT1 | 1r_de-DE_female-DT1/Spiegel einklappen.wav | fast_llm | 6.000 | `Spiegel einklappen` | `The 2nd and 3rd editions were published in 2000 and 2002, respectively.` |
| [▶](audio/de-DE_DT2/2r_de-DE_female-DT2/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_DT2 | 2r_de-DE_female-DT2/Beifahrersitzbelüftung aktivieren.wav | fast_mai | 4.500 | `Beifahrersitzbelüftung aktivieren` | `Ich war aber sehr lieb und sie sehr lieb.` |
| [▶](audio/de-DE_DT4/2r_de-DE_female-DT4/Leistungsmodus%20auf%20schwach%20umschalten.wav.wav) | de-DE_DT4 | 2r_de-DE_female-DT4/Leistungsmodus auf schwach umschalten.wav | fast_llm | 3.750 | `Leistungsmodus auf schwach umschalten` | `The 2nd and last day of the festival is the day of the grand procession.` |
| [▶](audio/de-DE_DT2/1l_de-DE_male-DT2/Anruf%20ignorieren.wav.wav) | de-DE_DT2 | 1l_de-DE_male-DT2/Anruf ignorieren.wav | fast_llm | 3.500 | `Anruf ignorieren` | `¿A no que no se te moviera?` |
| [▶](audio/de-DE_DT5/2r_de-DE_female-DT5/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_DT5 | 2r_de-DE_female-DT5/Beifahrersitzbelüftung aktivieren.wav | fast_llm | 3.500 | `Beifahrersitzbelüftung aktivieren` | `I thought I could live to graduate.` |
| [▶](audio/de-DE_DT2/1r_de-DE_female-DT2/Fahrersitz%20nach%20vorne%20schieben.wav.wav) | de-DE_DT2 | 1r_de-DE_female-DT2/Fahrersitz nach vorne schieben.wav | fast_llm | 3.250 | `Fahrersitz nach vorne schieben` | `The 2018-19 season was the 10th season of the Indian Premier League.` |
| [▶](audio/de-DE_DT1/2r_de-DE_female-DT1/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_DT1 | 2r_de-DE_female-DT1/Beifahrersitzbelüftung aktivieren.wav | fast_mai | 3.000 | `Beifahrersitzbelüftung aktivieren` | `Sei feierlich und lebe zum Reichtum!` |
| [▶](audio/de-DE_DT2/1l_de-DE_male-DT2/Anruf%20ignorieren.wav.wav) | de-DE_DT2 | 1l_de-DE_male-DT2/Anruf ignorieren.wav | realtime_refine | 3.000 | `Anruf ignorieren` | `I'm going to ignore video.` |
| [▶](audio/de-DE_DT2/1l_de-DE_male-DT2/Anruf%20ignorieren.wav.wav) | de-DE_DT2 | 1l_de-DE_male-DT2/Anruf ignorieren.wav | fast_mai | 3.000 | `Anruf ignorieren` | `Angefangen habe ich nur wegen ihrer` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 18 | `vorn` | `vorne` |
| 15 | `3` | `drei` |
| 11 | `fahrersitzlehne` | `fahrradpläne` |
| 10 | `um` | `in` |
| 10 | `außenluftzirkulation` | `aussenluftzirkulation` |
| 7 | `ausrichten` | `aufrichten` |
| 6 | `wechsel` | `wechsele` |
| 5 | `telefonlautstärke` | `lautstärke` |
| 5 | `weiter` | `etwas` |
| 5 | `öffnen` | `weiter` |
| 5 | `stellen` | `die` |
| 5 | `öffnen` | `prozent` |
| 5 | `schließen` | `schließt` |
| 4 | `schließen` | `schieben` |
| 4 | `sie` | `h` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

Found **89** likely hallucinations (WER ≥ 0.8 and ≤ 1 word overlap with reference):

| Audio | Dataset | Sample | WER | Boundary | Reference | Hypothesis |
|---|---|---|---:|---|---|---|
| [▶](audio/de-DE_DT1/1l_de-DE_female-DT1/Drehen%20Sie%20die%20Lautst%C3%A4rke%20des%20Telefons%20herunter.wav.wav) | de-DE_DT1 | 1l_de-DE_female-DT1/Drehen Sie die Lautstärke des Telefons herunter.wav | 1.143 | skip | `Drehen Sie die Lautstärke des Telefons herunter` | `Launch track and field from Saavn's app.` |
| [▶](audio/de-DE_DT1/1l_de-DE_female-DT1/Fahrersitzbel%C3%BCftung%20um%203%20Stufen%20erh%C3%B6hen.wav.wav) | de-DE_DT1 | 1l_de-DE_female-DT1/Fahrersitzbelüftung um 3 Stufen erhöhen.wav | 0.800 | skip | `Fahrersitzbelüftung um 3 Stufen erhöhen` | `3 Stunden` |
| [▶](audio/de-DE_DT1/1l_de-DE_female-DT1/Wechsel%20in%20den%20kompakten%20Berichtsmodus.wav.wav) | de-DE_DT1 | 1l_de-DE_female-DT1/Wechsel in den kompakten Berichtsmodus.wav | 1.000 | skip | `Wechsel in den kompakten Berichtsmodus` | `Merci.` |
| [▶](audio/de-DE_DT1/1r_de-DE_female-DT1/Alle%20Fenster%20etwas%20weiter%20schlie%C3%9Fen.wav.wav) | de-DE_DT1 | 1r_de-DE_female-DT1/Alle Fenster etwas weiter schließen.wav | 1.000 | skip | `Alle Fenster etwas weiter schließen` | `Weiter schneit es.` |
| [▶](audio/de-DE_DT1/1r_de-DE_female-DT1/Die%20Telefonlautst%C3%A4rke%20um%205%20Stufen%20verringern.wav.wav) | de-DE_DT1 | 1r_de-DE_female-DT1/Die Telefonlautstärke um 5 Stufen verringern.wav | 1.000 | none | `Die Telefonlautstärke um 5 Stufen verringern` | `Lautstärke runter, bitte.` |
| [▶](audio/de-DE_DT1/1r_de-DE_female-DT1/Linke%20R%C3%BCcksitzbel%C3%BCftung%20senken.wav.wav) | de-DE_DT1 | 1r_de-DE_female-DT1/Linke Rücksitzbelüftung senken.wav | 2.333 | skip | `Linke Rücksitzbelüftung senken` | `I think it's a good idea.` |
| [▶](audio/de-DE_DT1/1r_de-DE_female-DT1/Spiegel%20einklappen.wav.wav) | de-DE_DT1 | 1r_de-DE_female-DT1/Spiegel einklappen.wav | 6.000 | skip | `Spiegel einklappen` | `The 2nd and 3rd editions were published in 2000 and 2002, respectively.` |
| [▶](audio/de-DE_DT1/2l_de-DE_male-DT1/Rechtes%20Hinterfenster%20etwas%20weiter%20%C3%B6ffnen.wav.wav) | de-DE_DT1 | 2l_de-DE_male-DT1/Rechtes Hinterfenster etwas weiter öffnen.wav | 1.600 | skip | `Rechtes Hinterfenster etwas weiter öffnen` | `Install it was the right thing to do.` |
| [▶](audio/de-DE_DT1/2r_de-DE_female-DT1/Anruf%20ignorieren.wav.wav) | de-DE_DT1 | 2r_de-DE_female-DT1/Anruf ignorieren.wav | 1.000 | trim_both | `Anruf ignorieren` | `Eingehender Anruf annehmen.` |
| [▶](audio/de-DE_DT1/2r_de-DE_female-DT1/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_DT1 | 2r_de-DE_female-DT1/Beifahrersitzbelüftung aktivieren.wav | 1.000 | none | `Beifahrersitzbelüftung aktivieren` | `Five 1000.` |
| [▶](audio/de-DE_DT1/2r_de-DE_female-DT1/Leistungsmodus%20auf%20schwach%20umschalten.wav.wav) | de-DE_DT1 | 2r_de-DE_female-DT1/Leistungsmodus auf schwach umschalten.wav | 1.500 | trim_first | `Leistungsmodus auf schwach umschalten` | `Ich muss mich auch spacht entscheiden.` |
| [▶](audio/de-DE_DT1/2r_de-DE_female-DT1/Luftstrom%20nach%20vorn%20ausrichten.wav.wav) | de-DE_DT1 | 2r_de-DE_female-DT1/Luftstrom nach vorn ausrichten.wav | 1.000 | skip | `Luftstrom nach vorn ausrichten` | `请不吝点赞订阅转发打赏支持明镜与点点栏目` |
| [▶](audio/de-DE_DT2/1l_de-DE_female-DT2/Fahrersitzbel%C3%BCftung%20um%203%20Stufen%20erh%C3%B6hen.wav.wav) | de-DE_DT2 | 1l_de-DE_female-DT2/Fahrersitzbelüftung um 3 Stufen erhöhen.wav | 1.000 | skip | `Fahrersitzbelüftung um 3 Stufen erhöhen` | `I.` |
| [▶](audio/de-DE_DT2/1l_de-DE_female-DT2/Stellen%20Sie%20die%20HUD-Helligkeit%20auf%20Maximum.wav.wav) | de-DE_DT2 | 1l_de-DE_female-DT2/Stellen Sie die HUD-Helligkeit auf Maximum.wav | 1.000 | skip | `Stellen Sie die HUD-Helligkeit auf Maximum` | `I don't have any.` |
| [▶](audio/de-DE_DT2/1l_de-DE_female-DT2/Wechsel%20in%20den%20kompakten%20Berichtsmodus.wav.wav) | de-DE_DT2 | 1l_de-DE_female-DT2/Wechsel in den kompakten Berichtsmodus.wav | 2.000 | skip | `Wechsel in den kompakten Berichtsmodus` | `L'accès est uniquement par le biais de l'Internet.` |
| [▶](audio/de-DE_DT2/1l_de-DE_male-DT2/Anruf%20ignorieren.wav.wav) | de-DE_DT2 | 1l_de-DE_male-DT2/Anruf ignorieren.wav | 3.500 | skip | `Anruf ignorieren` | `¿A no que no se te moviera?` |
| [▶](audio/de-DE_DT2/1l_de-DE_male-DT2/Klimamen%C3%BC%20%C3%B6ffnen.wav.wav) | de-DE_DT2 | 1l_de-DE_male-DT2/Klimamenü öffnen.wav | 1.000 | none | `Klimamenü öffnen` | `Lima Menü öffnen.` |
| [▶](audio/de-DE_DT2/1r_de-DE_female-DT2/Alle%20Fenster%20etwas%20weiter%20schlie%C3%9Fen.wav.wav) | de-DE_DT2 | 1r_de-DE_female-DT2/Alle Fenster etwas weiter schließen.wav | 1.200 | skip | `Alle Fenster etwas weiter schließen` | `I have to find a solution.` |
| [▶](audio/de-DE_DT2/1r_de-DE_female-DT2/Die%20Telefonlautst%C3%A4rke%20um%205%20Stufen%20verringern.wav.wav) | de-DE_DT2 | 1r_de-DE_female-DT2/Die Telefonlautstärke um 5 Stufen verringern.wav | 1.000 | skip | `Die Telefonlautstärke um 5 Stufen verringern` | `I think it was not.` |
| [▶](audio/de-DE_DT2/1r_de-DE_female-DT2/Fahrersitz%20nach%20vorne%20schieben.wav.wav) | de-DE_DT2 | 1r_de-DE_female-DT2/Fahrersitz nach vorne schieben.wav | 3.250 | skip | `Fahrersitz nach vorne schieben` | `The 2018-19 season was the 10th season of the Indian Premier League.` |
| [▶](audio/de-DE_DT2/1r_de-DE_female-DT2/Linke%20R%C3%BCcksitzbel%C3%BCftung%20senken.wav.wav) | de-DE_DT2 | 1r_de-DE_female-DT2/Linke Rücksitzbelüftung senken.wav | 1.333 | skip | `Linke Rücksitzbelüftung senken` | `I have a question.` |
| [▶](audio/de-DE_DT2/1r_de-DE_female-DT2/Spiegel%20einklappen.wav.wav) | de-DE_DT2 | 1r_de-DE_female-DT2/Spiegel einklappen.wav | 1.000 | skip | `Spiegel einklappen` | `The.` |
| [▶](audio/de-DE_DT2/2l_de-DE_male-DT2/Beifahrersitzbel%C3%BCftung%20auf%20Maximum.wav.wav) | de-DE_DT2 | 2l_de-DE_male-DT2/Beifahrersitzbelüftung auf Maximum.wav | 1.000 | skip | `Beifahrersitzbelüftung auf Maximum` | `Parasit, eine Filmaufmachung.` |
| [▶](audio/de-DE_DT2/2r_de-DE_female-DT2/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_DT2 | 2r_de-DE_female-DT2/Beifahrersitzbelüftung aktivieren.wav | 1.000 | skip | `Beifahrersitzbelüftung aktivieren` | `2.` |
| [▶](audio/de-DE_DT2/2r_de-DE_female-DT2/Luftstrom%20nach%20vorn%20ausrichten.wav.wav) | de-DE_DT2 | 2r_de-DE_female-DT2/Luftstrom nach vorn ausrichten.wav | 1.000 | skip | `Luftstrom nach vorn ausrichten` | `谢谢观看，下次见！` |
| [▶](audio/de-DE_DT2/2r_de-DE_female-DT2/Telefonlautst%C3%A4rke%20auf%205%20Stufen%20einstellen.wav.wav) | de-DE_DT2 | 2r_de-DE_female-DT2/Telefonlautstärke auf 5 Stufen einstellen.wav | 1.000 | skip | `Telefonlautstärke auf 5 Stufen einstellen` | `Launch the "Off" option.` |
| [▶](audio/de-DE_DT2/2r_de-DE_male-DT2/Linke%20R%C3%BCcksitzheizung%20um%203%20Stufen%20verringern.wav.wav) | de-DE_DT2 | 2r_de-DE_male-DT2/Linke Rücksitzheizung um 3 Stufen verringern.wav | 1.167 | skip | `Linke Rücksitzheizung um 3 Stufen verringern` | `Sind erwünscht, wenn es reicht, um einzuleben.` |
| [▶](audio/de-DE_DT3/1l_de-DE_female-DT3/Stellen%20Sie%20die%20HUD-Helligkeit%20auf%20Maximum.wav.wav) | de-DE_DT3 | 1l_de-DE_female-DT3/Stellen Sie die HUD-Helligkeit auf Maximum.wav | 1.000 | none | `Stellen Sie die HUD-Helligkeit auf Maximum` | `How do you have a type of maximum?` |
| [▶](audio/de-DE_DT3/1r_de-DE_female-DT3/Alle%20Fenster%20etwas%20weiter%20schlie%C3%9Fen.wav.wav) | de-DE_DT3 | 1r_de-DE_female-DT3/Alle Fenster etwas weiter schließen.wav | 2.200 | skip | `Alle Fenster etwas weiter schließen` | `The 2015-16 season was the first season of the league.` |
| [▶](audio/de-DE_DT3/1r_de-DE_female-DT3/Die%20Telefonlautst%C3%A4rke%20um%205%20Stufen%20verringern.wav.wav) | de-DE_DT3 | 1r_de-DE_female-DT3/Die Telefonlautstärke um 5 Stufen verringern.wav | 1.000 | skip | `Die Telefonlautstärke um 5 Stufen verringern` | `Launch Diablo!` |
| [▶](audio/de-DE_DT3/1r_de-DE_female-DT3/Linke%20R%C3%BCcksitzbel%C3%BCftung%20senken.wav.wav) | de-DE_DT3 | 1r_de-DE_female-DT3/Linke Rücksitzbelüftung senken.wav | 1.667 | skip | `Linke Rücksitzbelüftung senken` | `Xbox, go to the beginning.` |
| [▶](audio/de-DE_DT3/1r_de-DE_female-DT3/Spiegel%20einklappen.wav.wav) | de-DE_DT3 | 1r_de-DE_female-DT3/Spiegel einklappen.wav | 1.000 | trim_first | `Spiegel einklappen` | `Spiele anzeigen.` |
| [▶](audio/de-DE_DT3/2r_de-DE_female-DT3/Anruf%20ignorieren.wav.wav) | de-DE_DT3 | 2r_de-DE_female-DT3/Anruf ignorieren.wav | 1.000 | trim_both | `Anruf ignorieren` | `Eingehender Anruf annehmen.` |
| [▶](audio/de-DE_DT3/2r_de-DE_female-DT3/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_DT3 | 2r_de-DE_female-DT3/Beifahrersitzbelüftung aktivieren.wav | 2.000 | skip | `Beifahrersitzbelüftung aktivieren` | `Bei Fahrer wird Belüftung aktivieren.` |
| [▶](audio/de-DE_DT3/2r_de-DE_female-DT3/Luftstrom%20nach%20vorn%20ausrichten.wav.wav) | de-DE_DT3 | 2r_de-DE_female-DT3/Luftstrom nach vorn ausrichten.wav | 1.000 | skip | `Luftstrom nach vorn ausrichten` | `中文字幕志愿者李宗盛` |
| [▶](audio/de-DE_DT4/1l_de-DE_female-DT4/Drehen%20Sie%20die%20Lautst%C3%A4rke%20des%20Telefons%20herunter.wav.wav) | de-DE_DT4 | 1l_de-DE_female-DT4/Drehen Sie die Lautstärke des Telefons herunter.wav | 1.000 | trim_first | `Drehen Sie die Lautstärke des Telefons herunter` | `Play the "Lustwala Property" movie.` |
| [▶](audio/de-DE_DT4/1l_de-DE_female-DT4/Erh%C3%B6he%20die%20Helligkeit%20des%20HUD%20leicht.wav.wav) | de-DE_DT4 | 1l_de-DE_female-DT4/Erhöhe die Helligkeit des HUD leicht.wav | 1.167 | skip | `Erhöhe die Helligkeit des HUD leicht` | `Ich werde jetzt V. U. G. lang.` |
| [▶](audio/de-DE_DT4/1l_de-DE_female-DT4/Fahrersitz%20ganz%20nach%20vorne%20schieben.wav.wav) | de-DE_DT4 | 1l_de-DE_female-DT4/Fahrersitz ganz nach vorne schieben.wav | 1.000 | skip | `Fahrersitz ganz nach vorne schieben` | `I can't believe it.` |
| [▶](audio/de-DE_DT4/1l_de-DE_female-DT4/Fahrersitzbel%C3%BCftung%20um%203%20Stufen%20erh%C3%B6hen.wav.wav) | de-DE_DT4 | 1l_de-DE_female-DT4/Fahrersitzbelüftung um 3 Stufen erhöhen.wav | 1.400 | skip | `Fahrersitzbelüftung um 3 Stufen erhöhen` | `I have to go to the bathroom.` |
| [▶](audio/de-DE_DT4/1l_de-DE_female-DT4/Stellen%20Sie%20die%20HUD-Helligkeit%20auf%20Maximum.wav.wav) | de-DE_DT4 | 1l_de-DE_female-DT4/Stellen Sie die HUD-Helligkeit auf Maximum.wav | 1.000 | skip | `Stellen Sie die HUD-Helligkeit auf Maximum` | `你好，我叫李大宝，麻烦你帮我。` |
| [▶](audio/de-DE_DT4/1l_de-DE_female-DT4/Wechsel%20in%20den%20kompakten%20Berichtsmodus.wav.wav) | de-DE_DT4 | 1l_de-DE_female-DT4/Wechsel in den kompakten Berichtsmodus.wav | 1.200 | skip | `Wechsel in den kompakten Berichtsmodus` | `So, we can talk in public.` |
| [▶](audio/de-DE_DT4/1l_de-DE_male-DT4/Klimamen%C3%BC%20%C3%B6ffnen.wav.wav) | de-DE_DT4 | 1l_de-DE_male-DT4/Klimamenü öffnen.wav | 1.000 | trim_last | `Klimamenü öffnen` | `Lima, Melun.` |
| [▶](audio/de-DE_DT4/1r_de-DE_female-DT4/Hinteres%20Fenster%20auf%2060%20%25%20%C3%B6ffnen.wav.wav) | de-DE_DT4 | 1r_de-DE_female-DT4/Hinteres Fenster auf 60 % öffnen.wav | 1.000 | skip | `Hinteres Fenster auf 60 % öffnen` | `Open the phone.` |
| [▶](audio/de-DE_DT4/1r_de-DE_female-DT4/Linke%20R%C3%BCcksitzbel%C3%BCftung%20senken.wav.wav) | de-DE_DT4 | 1r_de-DE_female-DT4/Linke Rücksitzbelüftung senken.wav | 1.000 | skip | `Linke Rücksitzbelüftung senken` | `Thank you.` |
| [▶](audio/de-DE_DT4/2l_de-DE_male-DT4/Beifahrersitzbel%C3%BCftung%20auf%20Maximum.wav.wav) | de-DE_DT4 | 2l_de-DE_male-DT4/Beifahrersitzbelüftung auf Maximum.wav | 1.000 | trim_last | `Beifahrersitzbelüftung auf Maximum` | `Greifbare Selbstbelüftung automatisieren.` |
| [▶](audio/de-DE_DT4/2r_de-DE_female-DT4/Anruf%20ignorieren.wav.wav) | de-DE_DT4 | 2r_de-DE_female-DT4/Anruf ignorieren.wav | 1.000 | trim_both | `Anruf ignorieren` | `Eingehender Anruf annehmen.` |
| [▶](audio/de-DE_DT4/2r_de-DE_female-DT4/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_DT4 | 2r_de-DE_female-DT4/Beifahrersitzbelüftung aktivieren.wav | 1.000 | none | `Beifahrersitzbelüftung aktivieren` | `Bei Fahrradbelüftung aktivieren.` |
| [▶](audio/de-DE_DT4/2r_de-DE_female-DT4/Leistungsmodus%20auf%20schwach%20umschalten.wav.wav) | de-DE_DT4 | 2r_de-DE_female-DT4/Leistungsmodus auf schwach umschalten.wav | 3.750 | skip | `Leistungsmodus auf schwach umschalten` | `The 2nd and last day of the festival is the day of the grand procession.` |
| [▶](audio/de-DE_DT4/2r_de-DE_female-DT4/Luftstrom%20nach%20vorn%20ausrichten.wav.wav) | de-DE_DT4 | 2r_de-DE_female-DT4/Luftstrom nach vorn ausrichten.wav | 2.750 | skip | `Luftstrom nach vorn ausrichten` | `The 2nd and 3rd editions were published in 2000 and 2002.` |
| [▶](audio/de-DE_DT4/2r_de-DE_female-DT4/Telefonlautst%C3%A4rke%20auf%205%20Stufen%20einstellen.wav.wav) | de-DE_DT4 | 2r_de-DE_female-DT4/Telefonlautstärke auf 5 Stufen einstellen.wav | 1.400 | skip | `Telefonlautstärke auf 5 Stufen einstellen` | `Now, check a few things to understand.` |
| [▶](audio/de-DE_DT4/2r_de-DE_male-DT4/Beifahrersitzheizung%20leicht%20senken.wav.wav) | de-DE_DT4 | 2r_de-DE_male-DT4/Beifahrersitzheizung leicht senken.wav | 1.667 | trim_last | `Beifahrersitzheizung leicht senken` | `Play song "Light's End".` |
| [▶](audio/de-DE_DT4/2r_de-DE_male-DT4/Linke%20R%C3%BCcksitzheizung%20um%203%20Stufen%20verringern.wav.wav) | de-DE_DT4 | 2r_de-DE_male-DT4/Linke Rücksitzheizung um 3 Stufen verringern.wav | 0.833 | trim_last | `Linke Rücksitzheizung um 3 Stufen verringern` | `Linke Rücktrittszeitung Freischwung.` |
| [▶](audio/de-DE_DT5/1l_de-DE_female-DT5/Fahrersitzbel%C3%BCftung%20um%203%20Stufen%20erh%C3%B6hen.wav.wav) | de-DE_DT5 | 1l_de-DE_female-DT5/Fahrersitzbelüftung um 3 Stufen erhöhen.wav | 1.600 | trim_first | `Fahrersitzbelüftung um 3 Stufen erhöhen` | `Fahrrad ist Belüftung und Reichtum in der Höhe.` |
| [▶](audio/de-DE_DT5/1r_de-DE_female-DT5/Alle%20Fenster%20etwas%20weiter%20schlie%C3%9Fen.wav.wav) | de-DE_DT5 | 1r_de-DE_female-DT5/Alle Fenster etwas weiter schließen.wav | 0.800 | trim_last | `Alle Fenster etwas weiter schließen` | `Etwas weiterschieben.` |
| [▶](audio/de-DE_DT5/1r_de-DE_female-DT5/Die%20Telefonlautst%C3%A4rke%20um%205%20Stufen%20verringern.wav.wav) | de-DE_DT5 | 1r_de-DE_female-DT5/Die Telefonlautstärke um 5 Stufen verringern.wav | 1.000 | skip | `Die Telefonlautstärke um 5 Stufen verringern` | `Xbox, launch Netflix.` |
| [▶](audio/de-DE_DT5/1r_de-DE_female-DT5/Fahrersitz%20nach%20vorne%20schieben.wav.wav) | de-DE_DT5 | 1r_de-DE_female-DT5/Fahrersitz nach vorne schieben.wav | 1.000 | skip | `Fahrersitz nach vorne schieben` | `The.` |
| [▶](audio/de-DE_DT5/1r_de-DE_female-DT5/Spiegel%20einklappen.wav.wav) | de-DE_DT5 | 1r_de-DE_female-DT5/Spiegel einklappen.wav | 1.000 | skip | `Spiegel einklappen` | `Speaker.` |
| [▶](audio/de-DE_DT5/2r_de-DE_female-DT5/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_DT5 | 2r_de-DE_female-DT5/Beifahrersitzbelüftung aktivieren.wav | 3.500 | none | `Beifahrersitzbelüftung aktivieren` | `I thought I could live to graduate.` |
| [▶](audio/de-DE_DT5/2r_de-DE_female-DT5/Luftstrom%20nach%20vorn%20ausrichten.wav.wav) | de-DE_DT5 | 2r_de-DE_female-DT5/Luftstrom nach vorn ausrichten.wav | 1.250 | none | `Luftstrom nach vorn ausrichten` | `Book from Naqshbandi Awqaf Trust.` |
| [▶](audio/de-DE_DT5/2r_de-DE_male-DT5/Beifahrersitzheizung%20leicht%20senken.wav.wav) | de-DE_DT5 | 2r_de-DE_male-DT5/Beifahrersitzheizung leicht senken.wav | 1.333 | trim_both | `Beifahrersitzheizung leicht senken` | `Bei Parasitbezug gleich sinken.` |
| [▶](audio/de-DE_JT1/1l_de-DE_male-JT1/Klimamen%C3%BC%20%C3%B6ffnen.wav.wav) | de-DE_JT1 | 1l_de-DE_male-JT1/Klimamenü öffnen.wav | 1.000 | skip | `Klimamenü öffnen` | `Lima Menü öffnen.` |
| [▶](audio/de-DE_JT1/1r_de-DE_female-JT1/Die%20Telefonlautst%C3%A4rke%20um%205%20Stufen%20verringern.wav.wav) | de-DE_JT1 | 1r_de-DE_female-JT1/Die Telefonlautstärke um 5 Stufen verringern.wav | 1.000 | skip | `Die Telefonlautstärke um 5 Stufen verringern` | `The team was formed in 2000.` |
| [▶](audio/de-DE_JT1/1r_de-DE_female-JT1/Spiegel%20einklappen.wav.wav) | de-DE_JT1 | 1r_de-DE_female-JT1/Spiegel einklappen.wav | 1.000 | skip | `Spiegel einklappen` | `The.` |
| [▶](audio/de-DE_JT1/2r_de-DE_female-JT1/Anruf%20ignorieren.wav.wav) | de-DE_JT1 | 2r_de-DE_female-JT1/Anruf ignorieren.wav | 1.000 | trim_both | `Anruf ignorieren` | `Eingehender Anruf annehmen.` |
| [▶](audio/de-DE_JT1/2r_de-DE_female-JT1/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_JT1 | 2r_de-DE_female-JT1/Beifahrersitzbelüftung aktivieren.wav | 1.000 | none | `Beifahrersitzbelüftung aktivieren` | `Bei Fahrradbelüftung aktivieren.` |
| [▶](audio/de-DE_JT2/1l_de-DE_female-JT2/Drehen%20Sie%20die%20Lautst%C3%A4rke%20des%20Telefons%20herunter.wav.wav) | de-DE_JT2 | 1l_de-DE_female-JT2/Drehen Sie die Lautstärke des Telefons herunter.wav | 1.143 | skip | `Drehen Sie die Lautstärke des Telefons herunter` | `Launch target the state of police highway code.` |
| [▶](audio/de-DE_JT2/1l_de-DE_female-JT2/Erh%C3%B6he%20die%20Helligkeit%20des%20HUD%20leicht.wav.wav) | de-DE_JT2 | 1l_de-DE_female-JT2/Erhöhe die Helligkeit des HUD leicht.wav | 1.000 | skip | `Erhöhe die Helligkeit des HUD leicht` | `That is how we live.` |
| [▶](audio/de-DE_JT2/1l_de-DE_female-JT2/Fahrersitz%20ganz%20nach%20vorne%20schieben.wav.wav) | de-DE_JT2 | 1l_de-DE_female-JT2/Fahrersitz ganz nach vorne schieben.wav | 1.000 | trim_last | `Fahrersitz ganz nach vorne schieben` | `Upon beginning.` |
| [▶](audio/de-DE_JT2/1l_de-DE_female-JT2/Fahrersitzbel%C3%BCftung%20um%203%20Stufen%20erh%C3%B6hen.wav.wav) | de-DE_JT2 | 1l_de-DE_female-JT2/Fahrersitzbelüftung um 3 Stufen erhöhen.wav | 1.000 | skip | `Fahrersitzbelüftung um 3 Stufen erhöhen` | `I spoke nothing.` |
| [▶](audio/de-DE_JT2/1l_de-DE_female-JT2/Stellen%20Sie%20die%20HUD-Helligkeit%20auf%20Maximum.wav.wav) | de-DE_JT2 | 1l_de-DE_female-JT2/Stellen Sie die HUD-Helligkeit auf Maximum.wav | 1.286 | skip | `Stellen Sie die HUD-Helligkeit auf Maximum` | `How do you have a set of max/min?` |
| [▶](audio/de-DE_JT2/1l_de-DE_female-JT2/Wechsel%20in%20den%20kompakten%20Berichtsmodus.wav.wav) | de-DE_JT2 | 1l_de-DE_female-JT2/Wechsel in den kompakten Berichtsmodus.wav | 1.000 | skip | `Wechsel in den kompakten Berichtsmodus` | `The.` |
| [▶](audio/de-DE_JT2/1l_de-DE_male-JT2/Klimamen%C3%BC%20%C3%B6ffnen.wav.wav) | de-DE_JT2 | 1l_de-DE_male-JT2/Klimamenü öffnen.wav | 2.000 | skip | `Klimamenü öffnen` | `Wie man Menü öffnet.` |
| [▶](audio/de-DE_JT2/1r_de-DE_female-JT2/Alle%20Fenster%20etwas%20weiter%20schlie%C3%9Fen.wav.wav) | de-DE_JT2 | 1r_de-DE_female-JT2/Alle Fenster etwas weiter schließen.wav | 1.000 | skip | `Alle Fenster etwas weiter schließen` | `I have a question.` |
| [▶](audio/de-DE_JT2/1r_de-DE_female-JT2/Die%20Telefonlautst%C3%A4rke%20um%205%20Stufen%20verringern.wav.wav) | de-DE_JT2 | 1r_de-DE_female-JT2/Die Telefonlautstärke um 5 Stufen verringern.wav | 1.500 | skip | `Die Telefonlautstärke um 5 Stufen verringern` | `The 10 best places to visit in the world.` |
| [▶](audio/de-DE_JT2/1r_de-DE_female-JT2/Hinteres%20Fenster%20auf%2060%20%25%20%C3%B6ffnen.wav.wav) | de-DE_JT2 | 1r_de-DE_female-JT2/Hinteres Fenster auf 60 % öffnen.wav | 2.400 | skip | `Hinteres Fenster auf 60 % öffnen` | `The first two were the 1st and 2nd editions of the magazine.` |
| [▶](audio/de-DE_JT2/1r_de-DE_female-JT2/Linke%20R%C3%BCcksitzbel%C3%BCftung%20senken.wav.wav) | de-DE_JT2 | 1r_de-DE_female-JT2/Linke Rücksitzbelüftung senken.wav | 1.333 | skip | `Linke Rücksitzbelüftung senken` | `6, 2, 3, 0.` |
| [▶](audio/de-DE_JT2/2l_de-DE_male-JT2/Beifahrersitzbel%C3%BCftung%20auf%20Maximum.wav.wav) | de-DE_JT2 | 2l_de-DE_male-JT2/Beifahrersitzbelüftung auf Maximum.wav | 1.000 | trim_first | `Beifahrersitzbelüftung auf Maximum` | `Haltbarer Sitzbelüftung auf Maxi.` |
| [▶](audio/de-DE_JT2/2r_de-DE_female-JT2/Anruf%20ignorieren.wav.wav) | de-DE_JT2 | 2r_de-DE_female-JT2/Anruf ignorieren.wav | 1.000 | trim_both | `Anruf ignorieren` | `Eingehender Anruf annehmen.` |
| [▶](audio/de-DE_JT2/2r_de-DE_female-JT2/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_JT2 | 2r_de-DE_female-JT2/Beifahrersitzbelüftung aktivieren.wav | 1.000 | trim_first | `Beifahrersitzbelüftung aktivieren` | `Bei Fahrradbeleuchtung aktivieren.` |
| [▶](audio/de-DE_JT2/2r_de-DE_female-JT2/Luftstrom%20nach%20vorn%20ausrichten.wav.wav) | de-DE_JT2 | 2r_de-DE_female-JT2/Luftstrom nach vorn ausrichten.wav | 1.500 | trim_last | `Luftstrom nach vorn ausrichten` | `Move up front on the screen.` |
| [▶](audio/de-DE_JT3/1l_de-DE_female-JT3/Fahrersitz%20ganz%20nach%20vorne%20schieben.wav.wav) | de-DE_JT3 | 1l_de-DE_female-JT3/Fahrersitz ganz nach vorne schieben.wav | 0.800 | trim_last | `Fahrersitz ganz nach vorne schieben` | `Vorne bewegen.` |
| [▶](audio/de-DE_JT3/1r_de-DE_female-JT3/Spiegel%20einklappen.wav.wav) | de-DE_JT3 | 1r_de-DE_female-JT3/Spiegel einklappen.wav | 7.000 | skip | `Spiegel einklappen` | `The 2nd and 3rd editions of the book were published in 2000 and 2004.` |
| [▶](audio/de-DE_JT3/2r_de-DE_female-JT3/Anruf%20ignorieren.wav.wav) | de-DE_JT3 | 2r_de-DE_female-JT3/Anruf ignorieren.wav | 1.000 | trim_both | `Anruf ignorieren` | `Eingehender Anruf annehmen.` |
| [▶](audio/de-DE_JT3/2r_de-DE_female-JT3/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_JT3 | 2r_de-DE_female-JT3/Beifahrersitzbelüftung aktivieren.wav | 2.000 | none | `Beifahrersitzbelüftung aktivieren` | `Bei Fahrer wird Belüftung aktivieren.` |
| [▶](audio/de-DE_JT4/1l_de-DE_male-JT4/Klimamen%C3%BC%20%C3%B6ffnen.wav.wav) | de-DE_JT4 | 1l_de-DE_male-JT4/Klimamenü öffnen.wav | 1.000 | skip | `Klimamenü öffnen` | `Lima Menü öffnen.` |
| [▶](audio/de-DE_JT4/1r_de-DE_female-JT4/Die%20Telefonlautst%C3%A4rke%20um%205%20Stufen%20verringern.wav.wav) | de-DE_JT4 | 1r_de-DE_female-JT4/Die Telefonlautstärke um 5 Stufen verringern.wav | 1.333 | skip | `Die Telefonlautstärke um 5 Stufen verringern` | `He is the son of the late Dr.` |
| [▶](audio/de-DE_JT4/1r_de-DE_female-JT4/Hinteres%20Fenster%20auf%2060%20%25%20%C3%B6ffnen.wav.wav) | de-DE_JT4 | 1r_de-DE_female-JT4/Hinteres Fenster auf 60 % öffnen.wav | 1.000 | skip | `Hinteres Fenster auf 60 % öffnen` | `On 16.` |
| [▶](audio/de-DE_JT4/2r_de-DE_female-JT4/Anruf%20ignorieren.wav.wav) | de-DE_JT4 | 2r_de-DE_female-JT4/Anruf ignorieren.wav | 1.000 | trim_both | `Anruf ignorieren` | `Eingehender Anruf annehmen.` |
| [▶](audio/de-DE_JT4/2r_de-DE_female-JT4/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav) | de-DE_JT4 | 2r_de-DE_female-JT4/Beifahrersitzbelüftung aktivieren.wav | 2.000 | none | `Beifahrersitzbelüftung aktivieren` | `Bei Fahrer wird Belüftung aktivieren.` |

## Top fast_default vs realtime disagreements

### de-DE_JT3/1l_de-DE_male-JT3/Klimamenü öffnen.wav [▶](audio/de-DE_JT3/1l_de-DE_male-JT3/Klimamen%C3%BC%20%C3%B6ffnen.wav.wav)  Δwer=1.000  (fast_default=1.000, realtime=0.000)  speech=[1.45s, 3.63s] fix=none
- ref:           `Klimamenü öffnen`
- fast_default   `Lima-Menü öffnen`
- fast_llm       `Klimamenü öffnen.`
- fast_mai       `Klimamenü öffnen.`
- realtime       `Klimamenü.Öffnen.`
- realtime_refine `Klimamenü öffnen`
- whisper_v3     `Lima-Menü öffnen`

### de-DE_DT5/2l_de-DE_male-DT5/Beifahrersitzbelüftung auf Maximum.wav [▶](audio/de-DE_DT5/2l_de-DE_male-DT5/Beifahrersitzbel%C3%BCftung%20auf%20Maximum.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[1.25s, 3.33s] fix=trim_last
- ref:           `Beifahrersitzbelüftung auf Maximum`
- fast_default   `Beifahrersitzbelüftung auf Maximum.`
- fast_llm       `Beifahrersitzbelüftung auf Maximum.`
- fast_mai       `Beifahrersitzbelüftung auf Maximum.`
- realtime       `Beifahrer Sitzbelüftung auf maximal.`
- realtime_refine `Beifahrersitzbelüftung auf Maximum`
- whisper_v3     `Beifahrersitzbelüftung auf Maximum.`

### de-DE_DT4/1l_de-DE_male-DT4/Außenluftzirkulation einschalten.wav [▶](audio/de-DE_DT4/1l_de-DE_male-DT4/Au%C3%9Fenluftzirkulation%20einschalten.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[1.83s, 3.35s] fix=trim_both
- ref:           `Außenluftzirkulation einschalten`
- fast_default   `Außenluftzirkulation einschalten.`
- fast_llm       `Außenluftzirkulation einschalten`
- fast_mai       `Außenluftzirkulation einschalten.`
- realtime       `Großen Luftzirkulation einstellen.`
- realtime_refine `Außenluftzirkulation einschalten.`
- whisper_v3     `Außenluftzirkulation einschalten.`

### de-DE_DT3/2r_de-DE_female-DT3/Beifahrersitzbelüftung aktivieren.wav [▶](audio/de-DE_DT3/2r_de-DE_female-DT3/Beifahrersitzbel%C3%BCftung%20aktivieren.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[-s, -s] fix=skip
- ref:           `Beifahrersitzbelüftung aktivieren`
- fast_default   `Beifahrersitzbelüftung aktivieren.`
- fast_llm       `Bei Fahrer wird Belüftung aktivieren.`
- fast_mai       `Beifahrersitzbelüftung aktivieren.`
- realtime       `Beifahrer wird Belüftung aktivieren.`
- realtime_refine `Beifahrerblitzbelüftung aktivieren`
- whisper_v3     `Beifahrersitzbelüftung aktivieren.`

### de-DE_JT4/2l_de-DE_female-JT4/Farbe der Ambientebeleuchtung ändern.wav [▶](audio/de-DE_JT4/2l_de-DE_female-JT4/Farbe%20der%20Ambientebeleuchtung%20%C3%A4ndern.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[2.61s, 4.33s] fix=trim_first
- ref:           `Farbe der Ambientebeleuchtung ändern`
- fast_default   `Farbe der Ambientebeleuchtung ändern.`
- fast_llm       `Farbe der Ambiente-Beleuchtung ändern.`
- fast_mai       `Farbe der Ambientebeleuchtung ändern.`
- realtime       `Aber der Ambiente Beleuchtung ändern.`
- realtime_refine `Farbe der Ambientebeleuchtung ändern`
- whisper_v3     `Farbe der Ambientebeleuchtung ändern.`

### de-DE_JT3/2l_de-DE_female-JT3/Farbe der Ambientebeleuchtung ändern.wav [▶](audio/de-DE_JT3/2l_de-DE_female-JT3/Farbe%20der%20Ambientebeleuchtung%20%C3%A4ndern.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[2.61s, 4.33s] fix=trim_first
- ref:           `Farbe der Ambientebeleuchtung ändern`
- fast_default   `Farbe der Ambientebeleuchtung ändern.`
- fast_llm       `Farbe der Ambiente-Beleuchtung ändern.`
- fast_mai       `Farbe der Ambientebeleuchtung ändern.`
- realtime       `Aber der Ambiente beleuchtet ändern.`
- realtime_refine `Farbe der Ambientebeleuchtung ändern`
- whisper_v3     `Farbe der Ambientebeleuchtung ändern.`

### de-DE_JT2/2l_de-DE_female-JT2/Farbe der Ambientebeleuchtung ändern.wav [▶](audio/de-DE_JT2/2l_de-DE_female-JT2/Farbe%20der%20Ambientebeleuchtung%20%C3%A4ndern.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[2.61s, 4.33s] fix=trim_first
- ref:           `Farbe der Ambientebeleuchtung ändern`
- fast_default   `Farbe der Ambientebeleuchtung ändern.`
- fast_llm       `Farbe der Ambiente-Beleuchtung ändern.`
- fast_mai       `Farbe der Ambiente soll ein verändern.`
- realtime       `Aber der Ambiente Beleuchtung ändern.`
- realtime_refine `Farbe der Ambientebeleuchtung ändern.`
- whisper_v3     `Farbe der Ambientebeleuchtung ändern.`

### de-DE_JT1/1r_de-DE_female-JT1/Fahrersitz nach vorne schieben.wav [▶](audio/de-DE_JT1/1r_de-DE_female-JT1/Fahrersitz%20nach%20vorne%20schieben.wav.wav)  Δwer=0.750  (fast_default=1.000, realtime=0.250)  speech=[3.59s, 4.63s] fix=none
- ref:           `Fahrersitz nach vorne schieben`
- fast_default   `The father she no.`
- fast_llm       `Frage schieben.`
- fast_mai       `nach vorne schieben.`
- realtime       `Nach vorne schieben.`
- realtime_refine `vorgeschrieben`
- whisper_v3     `The father she no.`

### de-DE_DT5/2l_de-DE_female-DT5/Farbe der Ambientebeleuchtung ändern.wav [▶](audio/de-DE_DT5/2l_de-DE_female-DT5/Farbe%20der%20Ambientebeleuchtung%20%C3%A4ndern.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[2.64s, 4.36s] fix=trim_first
- ref:           `Farbe der Ambientebeleuchtung ändern`
- fast_default   `Farbe der Ambiente Beleuchtung ändern.`
- fast_llm       `Farbe der Ambiente-Beleuchtung ändern.`
- fast_mai       `Farbe der Ambientebeleuchtung ändern.`
- realtime       `Aber der Ambiente beleuchtet ändern.`
- realtime_refine `Farbe der Ambientebeleuchtung ändern`
- whisper_v3     `Farbe der Ambiente Beleuchtung ändern.`

### de-DE_DT4/2l_de-DE_female-DT4/Farbe der Ambientebeleuchtung ändern.wav [▶](audio/de-DE_DT4/2l_de-DE_female-DT4/Farbe%20der%20Ambientebeleuchtung%20%C3%A4ndern.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[2.64s, 4.36s] fix=trim_first
- ref:           `Farbe der Ambientebeleuchtung ändern`
- fast_default   `Farbe der Ambientebeleuchtung ändern.`
- fast_llm       `Farbe der Ambiente-Beleuchtung ändern.`
- fast_mai       `Die Farbe der Ambientebeleuchtung ändern.`
- realtime       `Habe der Ambiente Beleuchtung ändern.`
- realtime_refine `Farbe der Ambientebeleuchtung ändern`
- whisper_v3     `Farbe der Ambientebeleuchtung ändern.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.