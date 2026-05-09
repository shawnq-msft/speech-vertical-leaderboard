# Error analysis — mazda_fr-FR_20260509_162042.csv

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

## Datasets under test

- **fr-FR_DT1** — Mazda fr-FR DT1 voice commands (male + female pooled)
- **fr-FR_DT2** — Mazda fr-FR DT2 voice commands (male + female pooled)
- **fr-FR_DT3** — Mazda fr-FR DT3 voice commands (male + female pooled)
- **fr-FR_DT4** — Mazda fr-FR DT4 voice commands (male + female pooled)
- **fr-FR_DT5** — Mazda fr-FR DT5 voice commands (male + female pooled)
- **fr-FR_JT1** — Mazda fr-FR JT1 voice commands (male + female pooled)
- **fr-FR_JT2** — Mazda fr-FR JT2 voice commands (male + female pooled)
- **fr-FR_JT3** — Mazda fr-FR JT3 voice commands (male + female pooled)
- **fr-FR_JT4** — Mazda fr-FR JT4 voice commands (male + female pooled)

Total samples: **270**  

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all services. Per-word detail lives in the sidecar `mazda_fr-FR_20260509_162042_words.jsonl`.

Boundary-fix actions across 270 realtime samples: `skip`=22, `trim_both`=1, `trim_first`=7, `trim_last`=2

## Results

INS/DEL/SUB are *rates per 100 reference words*. Their sum ≈ WER × 100.

| Dataset | Service | N | WER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| fr-FR_DT1 | fast_default | 30 | 0.167 | 0.500 | 0.0 | 6.5 | 8.1 | 659 / 742 | 1298 / 1302 |
| fr-FR_DT1 | fast_llm | 30 | 0.138 | 0.367 | 3.2 | 2.7 | 9.2 | 517 / 575 | 1144 / 1153 |
| fr-FR_DT1 | fast_mai | 30 | 0.103 | 0.400 | 0.0 | 5.9 | 4.3 | 484 / 540 | 1028 / 1100 |
| fr-FR_DT1 | realtime | 30 | 0.160 | 0.467 | 0.0 | 7.0 | 7.6 | -1822 / -1313 | 765 / 956 |
| fr-FR_DT1 | realtime_refine | 30 | 0.138 | 0.400 | 0.0 | 6.5 | 5.9 | -1369 / -771 | 1205 / 1333 |
| fr-FR_DT1 | whisper_v3 | 30 | 0.167 | 0.500 | 0.0 | 6.5 | 8.1 | 640 / 704 | 1280 / 1294 |
| fr-FR_DT2 | fast_default | 30 | 0.188 | 0.467 | 0.0 | 11.9 | 5.4 | 659 / 720 | 1350 / 1295 |
| fr-FR_DT2 | fast_llm | 30 | 0.179 | 0.500 | 0.5 | 8.1 | 7.0 | 506 / 570 | 1255 / 3028 |
| fr-FR_DT2 | fast_mai | 30 | 0.123 | 0.367 | 0.0 | 4.3 | 6.5 | 484 / 582 | 975 / 1112 |
| fr-FR_DT2 | realtime | 30 | 0.215 | 0.567 | 1.1 | 10.3 | 9.2 | -1897 / -1388 | 775 / 937 |
| fr-FR_DT2 | realtime_refine | 30 | 0.176 | 0.467 | 0.0 | 8.1 | 7.0 | -1431 / -984 | 1199 / 1386 |
| fr-FR_DT2 | whisper_v3 | 30 | 0.188 | 0.467 | 0.0 | 11.9 | 5.4 | 652 / 718 | 1335 / 1323 |
| fr-FR_DT3 | fast_default | 30 | 0.112 | 0.367 | 0.0 | 4.9 | 5.4 | 646 / 728 | 1341 / 1398 |
| fr-FR_DT3 | fast_llm | 30 | 0.125 | 0.433 | 0.0 | 5.4 | 5.4 | 504 / 561 | 1186 / 1152 |
| fr-FR_DT3 | fast_mai | 30 | 0.106 | 0.367 | 0.0 | 3.2 | 5.9 | 483 / 589 | 995 / 1100 |
| fr-FR_DT3 | realtime | 30 | 0.158 | 0.433 | 2.2 | 5.9 | 5.9 | -1820 / -1411 | 731 / 953 |
| fr-FR_DT3 | realtime_refine | 30 | 0.131 | 0.467 | 0.0 | 4.3 | 7.0 | -1401 / -923 | 1149 / 1291 |
| fr-FR_DT3 | whisper_v3 | 30 | 0.112 | 0.367 | 0.0 | 4.9 | 5.4 | 665 / 744 | 1360 / 1337 |
| fr-FR_DT4 | fast_default | 30 | 0.202 | 0.533 | 0.0 | 11.4 | 5.4 | 673 / 833 | 1356 / 1416 |
| fr-FR_DT4 | fast_llm | 30 | 0.187 | 0.533 | 1.1 | 8.6 | 6.5 | 504 / 571 | 1179 / 1139 |
| fr-FR_DT4 | fast_mai | 30 | 0.137 | 0.433 | 0.5 | 4.3 | 7.0 | 481 / 544 | 986 / 1086 |
| fr-FR_DT4 | realtime | 30 | 0.197 | 0.567 | 2.7 | 7.0 | 10.3 | -1848 / -1385 | 773 / 972 |
| fr-FR_DT4 | realtime_refine | 30 | 0.156 | 0.467 | 0.0 | 4.9 | 8.1 | -1393 / -752 | 1165 / 1311 |
| fr-FR_DT4 | whisper_v3 | 30 | 0.202 | 0.533 | 0.0 | 11.4 | 5.4 | 661 / 800 | 1344 / 1564 |
| fr-FR_DT5 | fast_default | 30 | 0.180 | 0.400 | 0.0 | 9.2 | 5.4 | 711 / 1008 | 1395 / 1893 |
| fr-FR_DT5 | fast_llm | 30 | 0.163 | 0.400 | 0.0 | 8.6 | 4.9 | 511 / 597 | 1261 / 3001 |
| fr-FR_DT5 | fast_mai | 30 | 0.143 | 0.433 | 0.0 | 5.9 | 6.5 | 498 / 627 | 991 / 1127 |
| fr-FR_DT5 | realtime | 30 | 0.168 | 0.467 | 0.0 | 9.7 | 4.9 | -1895 / -1328 | 702 / 917 |
| fr-FR_DT5 | realtime_refine | 30 | 0.180 | 0.400 | 0.0 | 7.6 | 7.0 | -1353 / -785 | 1241 / 1731 |
| fr-FR_DT5 | whisper_v3 | 30 | 0.180 | 0.400 | 0.0 | 9.2 | 5.4 | 710 / 1019 | 1394 / 1687 |
| fr-FR_JT1 | fast_default | 30 | 0.130 | 0.367 | 0.0 | 5.4 | 5.9 | 627 / 685 | 1374 / 3086 |
| fr-FR_JT1 | fast_llm | 30 | 0.110 | 0.300 | 0.0 | 3.8 | 5.9 | 505 / 552 | 1252 / 3000 |
| fr-FR_JT1 | fast_mai | 30 | 0.103 | 0.400 | 0.0 | 2.7 | 7.0 | 482 / 525 | 978 / 1085 |
| fr-FR_JT1 | realtime | 30 | 0.166 | 0.467 | 0.0 | 9.7 | 4.9 | -1840 / -1411 | 705 / 826 |
| fr-FR_JT1 | realtime_refine | 30 | 0.092 | 0.300 | 0.0 | 2.2 | 5.9 | -1409 / -818 | 1137 / 1265 |
| fr-FR_JT1 | whisper_v3 | 30 | 0.130 | 0.367 | 0.0 | 5.4 | 5.9 | 634 / 698 | 1381 / 3119 |
| fr-FR_JT2 | fast_default | 30 | 0.169 | 0.467 | 0.0 | 7.6 | 7.0 | 637 / 735 | 1249 / 1362 |
| fr-FR_JT2 | fast_llm | 30 | 0.169 | 0.500 | 0.0 | 8.1 | 6.5 | 498 / 538 | 1184 / 1132 |
| fr-FR_JT2 | fast_mai | 30 | 0.134 | 0.400 | 0.0 | 4.9 | 6.5 | 535 / 682 | 1047 / 1233 |
| fr-FR_JT2 | realtime | 30 | 0.190 | 0.533 | 0.0 | 8.1 | 8.6 | -1822 / -1330 | 777 / 949 |
| fr-FR_JT2 | realtime_refine | 30 | 0.158 | 0.433 | 0.0 | 5.4 | 8.1 | -1256 / -815 | 1345 / 1326 |
| fr-FR_JT2 | whisper_v3 | 30 | 0.169 | 0.467 | 0.0 | 7.6 | 7.0 | 641 / 706 | 1253 / 1360 |
| fr-FR_JT3 | fast_default | 30 | 0.124 | 0.333 | 0.0 | 9.2 | 2.7 | 647 / 766 | 1284 / 1355 |
| fr-FR_JT3 | fast_llm | 30 | 0.154 | 0.400 | 7.0 | 4.9 | 8.6 | 514 / 600 | 1135 / 1273 |
| fr-FR_JT3 | fast_mai | 30 | 0.156 | 0.433 | 0.0 | 8.1 | 6.5 | 518 / 624 | 1027 / 1195 |
| fr-FR_JT3 | realtime | 30 | 0.141 | 0.433 | 0.0 | 9.2 | 4.3 | -1903 / -1404 | 699 / 865 |
| fr-FR_JT3 | realtime_refine | 30 | 0.116 | 0.333 | 0.0 | 7.6 | 3.2 | -1375 / -960 | 1139 / 1364 |
| fr-FR_JT3 | whisper_v3 | 30 | 0.124 | 0.333 | 0.0 | 9.2 | 2.7 | 624 / 677 | 1256 / 1256 |
| fr-FR_JT4 | fast_default | 30 | 0.142 | 0.333 | 0.0 | 9.2 | 3.8 | 664 / 719 | 1351 / 1328 |
| fr-FR_JT4 | fast_llm | 30 | 0.154 | 0.400 | 3.2 | 7.0 | 7.6 | 502 / 552 | 1218 / 1138 |
| fr-FR_JT4 | fast_mai | 30 | 0.143 | 0.367 | 0.0 | 7.0 | 6.5 | 532 / 667 | 1034 / 1219 |
| fr-FR_JT4 | realtime | 30 | 0.162 | 0.400 | 0.0 | 10.8 | 4.3 | -1875 / -1320 | 726 / 907 |
| fr-FR_JT4 | realtime_refine | 30 | 0.126 | 0.333 | 0.0 | 7.6 | 3.8 | -1367 / -963 | 1172 / 1335 |
| fr-FR_JT4 | whisper_v3 | 30 | 0.142 | 0.333 | 0.0 | 9.2 | 3.8 | 667 / 790 | 1352 / 1402 |

## Worst errors

Top 10 highest-WER rows across all services:

| Audio | Dataset | Sample | Service | WER | Reference | Hypothesis |
|---|---|---|---|---:|---|---|
| [▶](audio/fr-FR_JT3/1r_fr-FR_female-JT3/D%C3%A9finir%20l%27emplacement%20actuel%20comme%20entreprise.wav.wav) | fr-FR_JT3 | 1r_fr-FR_female-JT3/Définir l'emplacement actuel comme entreprise.wav | fast_llm | 2.500 | `Définir l'emplacement actuel comme entreprise` | `The first of these is the "S" series, which is a 4x4 off-road vehicle.` |
| [▶](audio/fr-FR_DT1/1r_fr-FR_female-DT1/D%C3%A9finir%20l%27emplacement%20actuel%20comme%20entreprise.wav.wav) | fr-FR_DT1 | 1r_fr-FR_female-DT1/Définir l'emplacement actuel comme entreprise.wav | fast_llm | 2.000 | `Définir l'emplacement actuel comme entreprise` | `This is a lot of money to run a lot of people.` |
| [▶](audio/fr-FR_DT4/2l_fr-FR_male-DT4/Refroidis%20l%C3%A9g%C3%A8rement%20l%E2%80%99avant.wav.wav) | fr-FR_DT4 | 2l_fr-FR_male-DT4/Refroidis légèrement l’avant.wav | realtime | 2.000 | `Refroidis légèrement l’avant` | `J'ai pas dit les ferments d'enfants.` |
| [▶](audio/fr-FR_JT3/1r_fr-FR_female-JT3/Ferme%20les%20vitres%20arri%C3%A8re.wav.wav) | fr-FR_JT3 | 1r_fr-FR_female-JT3/Ferme les vitres arrière.wav | fast_llm | 2.000 | `Ferme les vitres arrière` | `The first is the "sacred" or "sacred" site.` |
| [▶](audio/fr-FR_JT4/1r_fr-FR_female-JT4/D%C3%A9finir%20l%27emplacement%20actuel%20comme%20entreprise.wav.wav) | fr-FR_JT4 | 1r_fr-FR_female-JT4/Définir l'emplacement actuel comme entreprise.wav | fast_llm | 2.000 | `Définir l'emplacement actuel comme entreprise` | `The company is a member of the American Association of Retired Persons.` |
| [▶](audio/fr-FR_DT3/2l_fr-FR_male-DT3/Refroidis%20l%C3%A9g%C3%A8rement%20l%E2%80%99avant.wav.wav) | fr-FR_DT3 | 2l_fr-FR_male-DT3/Refroidis légèrement l’avant.wav | realtime | 1.250 | `Refroidis légèrement l’avant` | `Que faut-il les chercher l'avant ?` |
| [▶](audio/fr-FR_DT4/1l_fr-FR_male-DT4/Ajoute%20Starbucks%20comme%20%C3%A9tape.wav.wav) | fr-FR_DT4 | 1l_fr-FR_male-DT4/Ajoute Starbucks comme étape.wav | fast_llm | 1.250 | `Ajoute Starbucks comme étape` | `Je voudrais un Starbucks complet.` |
| [▶](audio/fr-FR_DT1/1l_fr-FR_male-DT1/Ajoute%20Starbucks%20comme%20%C3%A9tape.wav.wav) | fr-FR_DT1 | 1l_fr-FR_male-DT1/Ajoute Starbucks comme étape.wav | fast_llm | 1.000 | `Ajoute Starbucks comme étape` | `I would start mix.` |
| [▶](audio/fr-FR_DT1/1r_fr-FR_female-DT1/D%C3%A9finir%20l%27emplacement%20actuel%20comme%20entreprise.wav.wav) | fr-FR_DT1 | 1r_fr-FR_female-DT1/Définir l'emplacement actuel comme entreprise.wav | realtime | 1.000 | `Définir l'emplacement actuel comme entreprise` | `` |
| [▶](audio/fr-FR_DT1/1r_fr-FR_female-DT1/D%C3%A9finir%20l%27emplacement%20actuel%20comme%20entreprise.wav.wav) | fr-FR_DT1 | 1r_fr-FR_female-DT1/Définir l'emplacement actuel comme entreprise.wav | realtime_refine | 1.000 | `Définir l'emplacement actuel comme entreprise` | `` |

## Most common substitution patterns

Equal-length ref/hyp word-level substitutions (across all services):

| Count | Reference word | Hypothesis word |
|---:|---|---|
| 191 | `régle` | `règle` |
| 21 | `3` | `trois` |
| 11 | `active` | `couper` |
| 11 | `refroidis` | `refroidir` |
| 9 | `mets` | `mais` |
| 9 | `refroidis` | `refroidit` |
| 6 | `l` | `la` |
| 6 | `diminue` | `diminuez` |
| 5 | `de` | `des` |
| 4 | `active` | `pire` |
| 4 | `l` | `d` |
| 4 | `étape` | `état` |
| 4 | `trajet` | `profil` |
| 4 | `refroidis` | `réfroidir` |
| 3 | `affichage` | `puissance` |

## fast_llm hallucinations

`fast_llm` does not set a locale — it relies on auto-detection. When the acoustic signal is weak or ambiguous, it may produce text in the wrong language or fabricate content from its training data.

Found **21** likely hallucinations (WER ≥ 0.8 and ≤ 1 word overlap with reference):

| Audio | Dataset | Sample | WER | Boundary | Reference | Hypothesis |
|---|---|---|---:|---|---|---|
| [▶](audio/fr-FR_DT1/1l_fr-FR_male-DT1/Ajoute%20Starbucks%20comme%20%C3%A9tape.wav.wav) | fr-FR_DT1 | 1l_fr-FR_male-DT1/Ajoute Starbucks comme étape.wav | 1.000 | none | `Ajoute Starbucks comme étape` | `I would start mix.` |
| [▶](audio/fr-FR_DT1/1r_fr-FR_female-DT1/D%C3%A9finir%20l%27emplacement%20actuel%20comme%20entreprise.wav.wav) | fr-FR_DT1 | 1r_fr-FR_female-DT1/Définir l'emplacement actuel comme entreprise.wav | 2.000 | skip | `Définir l'emplacement actuel comme entreprise` | `This is a lot of money to run a lot of people.` |
| [▶](audio/fr-FR_DT2/1l_fr-FR_male-DT2/Ajoute%20Starbucks%20comme%20%C3%A9tape.wav.wav) | fr-FR_DT2 | 1l_fr-FR_male-DT2/Ajoute Starbucks comme étape.wav | 1.000 | none | `Ajoute Starbucks comme étape` | `I just Starbucks.` |
| [▶](audio/fr-FR_DT2/1r_fr-FR_female-DT2/Coupe%20le%20son%20des%20m%C3%A9dias.wav.wav) | fr-FR_DT2 | 1r_fr-FR_female-DT2/Coupe le son des médias.wav | 0.800 | skip | `Coupe le son des médias` | `Les médias.` |
| [▶](audio/fr-FR_DT2/2r_fr-FR_male-DT2/Ouvre%20l%27affichage%20du%20trajet.wav.wav) | fr-FR_DT2 | 2r_fr-FR_male-DT2/Ouvre l'affichage du trajet.wav | 1.000 | skip | `Ouvre l'affichage du trajet` | `¿Quién es el actor?` |
| [▶](audio/fr-FR_DT3/1r_fr-FR_female-DT3/Coupe%20le%20son%20des%20m%C3%A9dias.wav.wav) | fr-FR_DT3 | 1r_fr-FR_female-DT3/Coupe le son des médias.wav | 1.000 | skip | `Coupe le son des médias` | `Ouvrir les paramètres.` |
| [▶](audio/fr-FR_DT3/1r_fr-FR_female-DT3/Ferme%20les%20vitres%20arri%C3%A8re.wav.wav) | fr-FR_DT3 | 1r_fr-FR_female-DT3/Ferme les vitres arrière.wav | 1.000 | skip | `Ferme les vitres arrière` | `Yeah.` |
| [▶](audio/fr-FR_DT4/1l_fr-FR_male-DT4/Ajoute%20Starbucks%20comme%20%C3%A9tape.wav.wav) | fr-FR_DT4 | 1l_fr-FR_male-DT4/Ajoute Starbucks comme étape.wav | 1.250 | none | `Ajoute Starbucks comme étape` | `Je voudrais un Starbucks complet.` |
| [▶](audio/fr-FR_DT4/1r_fr-FR_female-DT4/Coupe%20le%20son%20des%20m%C3%A9dias.wav.wav) | fr-FR_DT4 | 1r_fr-FR_female-DT4/Coupe le son des médias.wav | 0.800 | skip | `Coupe le son des médias` | `Médias.` |
| [▶](audio/fr-FR_DT4/2r_fr-FR_male-DT4/Ouvre%20l%27affichage%20du%20trajet.wav.wav) | fr-FR_DT4 | 2r_fr-FR_male-DT4/Ouvre l'affichage du trajet.wav | 0.800 | trim_last | `Ouvre l'affichage du trajet` | `Ouvre la fiche.` |
| [▶](audio/fr-FR_DT5/1r_fr-FR_female-DT5/Coupe%20le%20son%20des%20m%C3%A9dias.wav.wav) | fr-FR_DT5 | 1r_fr-FR_female-DT5/Coupe le son des médias.wav | 0.800 | skip | `Coupe le son des médias` | `Médias.` |
| [▶](audio/fr-FR_DT5/1r_fr-FR_female-DT5/Ferme%20les%20vitres%20arri%C3%A8re.wav.wav) | fr-FR_DT5 | 1r_fr-FR_female-DT5/Ferme les vitres arrière.wav | 1.000 | skip | `Ferme les vitres arrière` | `Yes.` |
| [▶](audio/fr-FR_DT5/2r_fr-FR_male-DT5/Ouvre%20l%27affichage%20du%20trajet.wav.wav) | fr-FR_DT5 | 2r_fr-FR_male-DT5/Ouvre l'affichage du trajet.wav | 0.800 | none | `Ouvre l'affichage du trajet` | `Ouvre la pizzeria.` |
| [▶](audio/fr-FR_JT1/1r_fr-FR_female-JT1/Coupe%20le%20son%20des%20m%C3%A9dias.wav.wav) | fr-FR_JT1 | 1r_fr-FR_female-JT1/Coupe le son des médias.wav | 1.000 | skip | `Coupe le son des médias` | `Populiste et média.` |
| [▶](audio/fr-FR_JT2/1r_fr-FR_female-JT2/Coupe%20le%20son%20des%20m%C3%A9dias.wav.wav) | fr-FR_JT2 | 1r_fr-FR_female-JT2/Coupe le son des médias.wav | 1.000 | skip | `Coupe le son des médias` | `Copie de média.` |
| [▶](audio/fr-FR_JT2/1r_fr-FR_female-JT2/Ferme%20les%20vitres%20arri%C3%A8re.wav.wav) | fr-FR_JT2 | 1r_fr-FR_female-JT2/Ferme les vitres arrière.wav | 1.000 | skip | `Ferme les vitres arrière` | `Yes.` |
| [▶](audio/fr-FR_JT3/1r_fr-FR_female-JT3/D%C3%A9finir%20l%27emplacement%20actuel%20comme%20entreprise.wav.wav) | fr-FR_JT3 | 1r_fr-FR_female-JT3/Définir l'emplacement actuel comme entreprise.wav | 2.500 | skip | `Définir l'emplacement actuel comme entreprise` | `The first of these is the "S" series, which is a 4x4 off-road vehicle.` |
| [▶](audio/fr-FR_JT3/1r_fr-FR_female-JT3/Ferme%20les%20vitres%20arri%C3%A8re.wav.wav) | fr-FR_JT3 | 1r_fr-FR_female-JT3/Ferme les vitres arrière.wav | 2.000 | skip | `Ferme les vitres arrière` | `The first is the "sacred" or "sacred" site.` |
| [▶](audio/fr-FR_JT4/1r_fr-FR_female-JT4/Coupe%20le%20son%20des%20m%C3%A9dias.wav.wav) | fr-FR_JT4 | 1r_fr-FR_female-JT4/Coupe le son des médias.wav | 0.800 | skip | `Coupe le son des médias` | `Médias.` |
| [▶](audio/fr-FR_JT4/1r_fr-FR_female-JT4/D%C3%A9finir%20l%27emplacement%20actuel%20comme%20entreprise.wav.wav) | fr-FR_JT4 | 1r_fr-FR_female-JT4/Définir l'emplacement actuel comme entreprise.wav | 2.000 | skip | `Définir l'emplacement actuel comme entreprise` | `The company is a member of the American Association of Retired Persons.` |
| [▶](audio/fr-FR_JT4/1r_fr-FR_female-JT4/Ferme%20les%20vitres%20arri%C3%A8re.wav.wav) | fr-FR_JT4 | 1r_fr-FR_female-JT4/Ferme les vitres arrière.wav | 1.000 | skip | `Ferme les vitres arrière` | `8.` |

## Top fast_default vs realtime disagreements

### fr-FR_DT4/1l_fr-FR_male-DT4/Ajoute Starbucks comme étape.wav [▶](audio/fr-FR_DT4/1l_fr-FR_male-DT4/Ajoute%20Starbucks%20comme%20%C3%A9tape.wav.wav)  Δwer=1.000  (fast_default=1.000, realtime=0.000)  speech=[3.43s, 5.47s] fix=none
- ref:           `Ajoute Starbucks comme étape`
- fast_default   ``
- fast_llm       `Je voudrais un Starbucks complet.`
- fast_mai       `Ajoute Starbucks comme étape.`
- realtime       `Ajoute Starbucks comme étape.`
- realtime_refine `Region Starbucks comme Beta.`
- whisper_v3     ``

### fr-FR_DT3/2l_fr-FR_male-DT3/Refroidis légèrement l’avant.wav [▶](audio/fr-FR_DT3/2l_fr-FR_male-DT3/Refroidis%20l%C3%A9g%C3%A8rement%20l%E2%80%99avant.wav.wav)  Δwer=1.000  (fast_default=0.000, realtime=1.000)  speech=[3.43s, 5.03s] fix=trim_first
- ref:           `Refroidis légèrement l’avant`
- fast_default   `Refroidis légèrement l'avant.`
- fast_llm       `Refroidit légèrement l'avant.`
- fast_mai       `Préchauffez légèrement l’avant.`
- realtime       `Que faut-il les chercher l'avant ?`
- realtime_refine `Refroidit légèrement l'avant.`
- whisper_v3     `Refroidis légèrement l'avant.`

### fr-FR_JT2/2l_fr-FR_male-JT2/Refroidis légèrement l’avant.wav [▶](audio/fr-FR_JT2/2l_fr-FR_male-JT2/Refroidis%20l%C3%A9g%C3%A8rement%20l%E2%80%99avant.wav.wav)  Δwer=0.750  (fast_default=1.000, realtime=0.250)  speech=[3.26s, 5.1s] fix=none
- ref:           `Refroidis légèrement l’avant`
- fast_default   `Tre fratelli Germandavan.`
- fast_llm       `Refroidit légèrement l'avant.`
- fast_mai       `Réfroidir légèrement l'avant.`
- realtime       `Refroidir légèrement l'avant.`
- realtime_refine `Tre fratelli Germandavan.`
- whisper_v3     `Tre fratelli Germandavan.`

### fr-FR_JT2/1r_fr-FR_female-JT2/Active le mode refroidissement.wav [▶](audio/fr-FR_JT2/1r_fr-FR_female-JT2/Active%20le%20mode%20refroidissement.wav.wav)  Δwer=0.750  (fast_default=0.000, realtime=0.750)  speech=[3.39s, 4.31s] fix=trim_first
- ref:           `Active le mode refroidissement`
- fast_default   `Active le mode refroidissement.`
- fast_llm       `Mode refroidissement.`
- fast_mai       `Acte de mode refroidissement.`
- realtime       `Actuellement, refroidissement.`
- realtime_refine `Active le mode refroidissement.`
- whisper_v3     `Active le mode refroidissement.`

### fr-FR_DT2/1l_fr-FR_male-DT2/Désactive la ventilation du siège arrière gauche.wav [▶](audio/fr-FR_DT2/1l_fr-FR_male-DT2/D%C3%A9sactive%20la%20ventilation%20du%20si%C3%A8ge%20arri%C3%A8re%20gauche.wav.wav)  Δwer=0.571  (fast_default=0.000, realtime=0.571)  speech=[2.91s, 5.75s] fix=trim_first
- ref:           `Désactive la ventilation du siège arrière gauche`
- fast_default   `Désactive la ventilation du siège arrière gauche.`
- fast_llm       `Réactive la ventilation du siège arrière gauche.`
- fast_mai       `Désactive la ventilation du siège arrière gauche.`
- realtime       `Elle active la ventilation qu'il siège arrière gauche.`
- realtime_refine `Redactive la ventilation du siège arrière gauche.`
- whisper_v3     `Désactive la ventilation du siège arrière gauche.`

### fr-FR_JT1/1r_fr-FR_female-JT1/Active le mode refroidissement.wav [▶](audio/fr-FR_JT1/1r_fr-FR_female-JT1/Active%20le%20mode%20refroidissement.wav.wav)  Δwer=0.500  (fast_default=0.000, realtime=0.500)  speech=[3.04s, 4.32s] fix=none
- ref:           `Active le mode refroidissement`
- fast_default   `Active le mode refroidissement.`
- fast_llm       `Active le mode refroidissement.`
- fast_mai       `Activez le mode refroidissement.`
- realtime       `Mode refroidissement.`
- realtime_refine `Active le mode refroidissement.`
- whisper_v3     `Active le mode refroidissement.`

### fr-FR_JT1/1l_fr-FR_male-JT1/Ajoute Starbucks comme étape.wav [▶](audio/fr-FR_JT1/1l_fr-FR_male-JT1/Ajoute%20Starbucks%20comme%20%C3%A9tape.wav.wav)  Δwer=0.500  (fast_default=0.500, realtime=0.000)  speech=[3.27s, 5.59s] fix=none
- ref:           `Ajoute Starbucks comme étape`
- fast_default   `Ajoute Starbucks Computer.`
- fast_llm       `Ajoute Starbucks comme étape.`
- fast_mai       `Ajoute Starbucks comme étape.`
- realtime       `Ajoute Starbucks comme étape.`
- realtime_refine `Ajoute Starbucks Computer.`
- whisper_v3     `Ajoute Starbucks Computer.`

### fr-FR_DT5/2l_fr-FR_male-DT5/Refroidis légèrement l’avant.wav [▶](audio/fr-FR_DT5/2l_fr-FR_male-DT5/Refroidis%20l%C3%A9g%C3%A8rement%20l%E2%80%99avant.wav.wav)  Δwer=0.500  (fast_default=1.000, realtime=0.500)  speech=[3.29s, 4.85s] fix=none
- ref:           `Refroidis légèrement l’avant`
- fast_default   `Mes fratelli Germandav.`
- fast_llm       `Refroidit légèrement l'eau.`
- fast_mai       `Préchauffez légèrement l'avant.`
- realtime       `Refroidir légèrement l ?`
- realtime_refine `Tre fratelli Germando.`
- whisper_v3     `Mes fratelli Germandav.`

### fr-FR_DT4/2r_fr-FR_male-DT4/Mets le coussin en position basse.wav [▶](audio/fr-FR_DT4/2r_fr-FR_male-DT4/Mets%20le%20coussin%20en%20position%20basse.wav.wav)  Δwer=0.500  (fast_default=0.000, realtime=0.500)  speech=[3.88s, 6.2s] fix=none
- ref:           `Mets le coussin en position basse`
- fast_default   `Mets le coussin en position basse.`
- fast_llm       `Mets le coussin en position basse.`
- fast_mai       `Mets le coussin en position basse.`
- realtime       `Mais le coussin en condition passe.`
- realtime_refine `Mets le coussin en position basse.`
- whisper_v3     `Mets le coussin en position basse.`

### fr-FR_DT2/2l_fr-FR_male-DT2/Refroidis légèrement l’avant.wav [▶](audio/fr-FR_DT2/2l_fr-FR_male-DT2/Refroidis%20l%C3%A9g%C3%A8rement%20l%E2%80%99avant.wav.wav)  Δwer=0.500  (fast_default=1.000, realtime=0.500)  speech=[3.3s, 4.98s] fix=none
- ref:           `Refroidis légèrement l’avant`
- fast_default   `Préfatilli Germandav.`
- fast_llm       `Préfatie légèrement l'avant.`
- fast_mai       `Préchauffez légèrement l'avant.`
- realtime       `Refroidir légèrement d'avant.`
- realtime_refine `Préfatilli et Germandavant.`
- whisper_v3     `Préfatilli Germandav.`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **Mazda voice commands** are short utterances (typically 2-8 words). WER on short references is noisier — a single word error on a 3-word command gives 33% WER.