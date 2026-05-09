# Mazda ASR Benchmark — mazda_fr-FR_20260509_162042.csv

Total rows: **1620**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **251.6 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["fr-FR"]}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/fast-transcription-create>

### `fast_llm` — Azure Fast Transcription — LLM enhanced (preview)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2025-10-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"enhancedMode": {"enabled": true, "task": "transcribe"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/llm-speech>
- Note: Requires Speech resource with LLM-Speech preview enabled.

### `fast_mai` — Azure Fast Transcription — MAI model (preview)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2025-10-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["fr"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="fr-FR", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

### `realtime_refine` — Azure Speech SDK — continuous + Post-Stream Refinement (MRS preview)
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK (>=1.49.0)
- Config: `PushAudioInputStream, language="fr-FR", continuous, PostProcessingOption="PostRefinement"`
- Partial results: yes (recognizing/recognized events; final replaced after refinement)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>
- Note: Requires Speech SDK >= 1.49.0 and a Speech resource in a region where Multi-Recognizer / Post-Stream Refinement public preview is enabled (East US / North Europe rollout). Falls back to non-MRS behavior if PostProcessingOption is not set.

## Datasets under test

- **fr-FR_DT1** — Mazda fr-FR DT1 voice commands (male + female pooled, 30 random samples)
- **fr-FR_DT2** — Mazda fr-FR DT2 voice commands (male + female pooled, 30 random samples)
- **fr-FR_DT3** — Mazda fr-FR DT3 voice commands (male + female pooled, 30 random samples)
- **fr-FR_DT4** — Mazda fr-FR DT4 voice commands (male + female pooled, 30 random samples)
- **fr-FR_DT5** — Mazda fr-FR DT5 voice commands (male + female pooled, 30 random samples)
- **fr-FR_JT1** — Mazda fr-FR JT1 voice commands (male + female pooled, 30 random samples)
- **fr-FR_JT2** — Mazda fr-FR JT2 voice commands (male + female pooled, 30 random samples)
- **fr-FR_JT3** — Mazda fr-FR JT3 voice commands (male + female pooled, 30 random samples)
- **fr-FR_JT4** — Mazda fr-FR JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| fr-FR_DT1 | fast_default | 30 | 0 | 0.167 | 0.500 | 0.0 | 6.5 | 8.1 | - | 659 / 742 | 1298 / 1302 |
| fr-FR_DT1 | fast_llm | 30 | 0 | 0.138 | 0.367 | 3.2 | 2.7 | 9.2 | - | 517 / 575 | 1144 / 1153 |
| fr-FR_DT1 | fast_mai | 30 | 0 | 0.103 | 0.400 | 0.0 | 5.9 | 4.3 | - | 484 / 540 | 1028 / 1100 |
| fr-FR_DT1 | realtime | 30 | 0 | 0.160 | 0.467 | 0.0 | 7.0 | 7.6 | 1309 / 1592 | -1822 / -1313 | 765 / 956 |
| fr-FR_DT1 | realtime_refine | 30 | 0 | 0.138 | 0.400 | 0.0 | 6.5 | 5.9 | 1345 / 1695 | -1369 / -771 | 1205 / 1333 |
| fr-FR_DT1 | whisper_v3 | 30 | 0 | 0.167 | 0.500 | 0.0 | 6.5 | 8.1 | - | 640 / 704 | 1280 / 1294 |
| fr-FR_DT2 | fast_default | 30 | 0 | 0.188 | 0.467 | 0.0 | 11.9 | 5.4 | - | 659 / 720 | 1350 / 1295 |
| fr-FR_DT2 | fast_llm | 30 | 0 | 0.179 | 0.500 | 0.5 | 8.1 | 7.0 | - | 506 / 570 | 1255 / 3028 |
| fr-FR_DT2 | fast_mai | 30 | 0 | 0.123 | 0.367 | 0.0 | 4.3 | 6.5 | - | 484 / 582 | 975 / 1112 |
| fr-FR_DT2 | realtime | 30 | 0 | 0.215 | 0.567 | 1.1 | 10.3 | 9.2 | 1295 / 1592 | -1897 / -1388 | 775 / 937 |
| fr-FR_DT2 | realtime_refine | 30 | 0 | 0.176 | 0.467 | 0.0 | 8.1 | 7.0 | 1373 / 1806 | -1431 / -984 | 1199 / 1386 |
| fr-FR_DT2 | whisper_v3 | 30 | 0 | 0.188 | 0.467 | 0.0 | 11.9 | 5.4 | - | 652 / 718 | 1335 / 1323 |
| fr-FR_DT3 | fast_default | 30 | 0 | 0.112 | 0.367 | 0.0 | 4.9 | 5.4 | - | 646 / 728 | 1341 / 1398 |
| fr-FR_DT3 | fast_llm | 30 | 0 | 0.125 | 0.433 | 0.0 | 5.4 | 5.4 | - | 504 / 561 | 1186 / 1152 |
| fr-FR_DT3 | fast_mai | 30 | 0 | 0.106 | 0.367 | 0.0 | 3.2 | 5.9 | - | 483 / 589 | 995 / 1100 |
| fr-FR_DT3 | realtime | 30 | 0 | 0.158 | 0.433 | 2.2 | 5.9 | 5.9 | 1263 / 1588 | -1820 / -1411 | 731 / 953 |
| fr-FR_DT3 | realtime_refine | 30 | 0 | 0.131 | 0.467 | 0.0 | 4.3 | 7.0 | 1345 / 1609 | -1401 / -923 | 1149 / 1291 |
| fr-FR_DT3 | whisper_v3 | 30 | 0 | 0.112 | 0.367 | 0.0 | 4.9 | 5.4 | - | 665 / 744 | 1360 / 1337 |
| fr-FR_DT4 | fast_default | 30 | 0 | 0.202 | 0.533 | 0.0 | 11.4 | 5.4 | - | 673 / 833 | 1356 / 1416 |
| fr-FR_DT4 | fast_llm | 30 | 0 | 0.187 | 0.533 | 1.1 | 8.6 | 6.5 | - | 504 / 571 | 1179 / 1139 |
| fr-FR_DT4 | fast_mai | 30 | 0 | 0.137 | 0.433 | 0.5 | 4.3 | 7.0 | - | 481 / 544 | 986 / 1086 |
| fr-FR_DT4 | realtime | 30 | 0 | 0.197 | 0.567 | 2.7 | 7.0 | 10.3 | 1308 / 1569 | -1848 / -1385 | 773 / 972 |
| fr-FR_DT4 | realtime_refine | 30 | 0 | 0.156 | 0.467 | 0.0 | 4.9 | 8.1 | 1368 / 1618 | -1393 / -752 | 1165 / 1311 |
| fr-FR_DT4 | whisper_v3 | 30 | 0 | 0.202 | 0.533 | 0.0 | 11.4 | 5.4 | - | 661 / 800 | 1344 / 1564 |
| fr-FR_DT5 | fast_default | 30 | 0 | 0.180 | 0.400 | 0.0 | 9.2 | 5.4 | - | 711 / 1008 | 1395 / 1893 |
| fr-FR_DT5 | fast_llm | 30 | 0 | 0.163 | 0.400 | 0.0 | 8.6 | 4.9 | - | 511 / 597 | 1261 / 3001 |
| fr-FR_DT5 | fast_mai | 30 | 0 | 0.143 | 0.433 | 0.0 | 5.9 | 6.5 | - | 498 / 627 | 991 / 1127 |
| fr-FR_DT5 | realtime | 30 | 0 | 0.168 | 0.467 | 0.0 | 9.7 | 4.9 | 1296 / 1572 | -1895 / -1328 | 702 / 917 |
| fr-FR_DT5 | realtime_refine | 30 | 0 | 0.180 | 0.400 | 0.0 | 7.6 | 7.0 | 1377 / 1716 | -1353 / -785 | 1241 / 1731 |
| fr-FR_DT5 | whisper_v3 | 30 | 0 | 0.180 | 0.400 | 0.0 | 9.2 | 5.4 | - | 710 / 1019 | 1394 / 1687 |
| fr-FR_JT1 | fast_default | 30 | 0 | 0.130 | 0.367 | 0.0 | 5.4 | 5.9 | - | 627 / 685 | 1374 / 3086 |
| fr-FR_JT1 | fast_llm | 30 | 0 | 0.110 | 0.300 | 0.0 | 3.8 | 5.9 | - | 505 / 552 | 1252 / 3000 |
| fr-FR_JT1 | fast_mai | 30 | 0 | 0.103 | 0.400 | 0.0 | 2.7 | 7.0 | - | 482 / 525 | 978 / 1085 |
| fr-FR_JT1 | realtime | 30 | 0 | 0.166 | 0.467 | 0.0 | 9.7 | 4.9 | 1241 / 1586 | -1840 / -1411 | 705 / 826 |
| fr-FR_JT1 | realtime_refine | 30 | 0 | 0.092 | 0.300 | 0.0 | 2.2 | 5.9 | 1387 / 1732 | -1409 / -818 | 1137 / 1265 |
| fr-FR_JT1 | whisper_v3 | 30 | 0 | 0.130 | 0.367 | 0.0 | 5.4 | 5.9 | - | 634 / 698 | 1381 / 3119 |
| fr-FR_JT2 | fast_default | 30 | 0 | 0.169 | 0.467 | 0.0 | 7.6 | 7.0 | - | 637 / 735 | 1249 / 1362 |
| fr-FR_JT2 | fast_llm | 30 | 0 | 0.169 | 0.500 | 0.0 | 8.1 | 6.5 | - | 498 / 538 | 1184 / 1132 |
| fr-FR_JT2 | fast_mai | 30 | 0 | 0.134 | 0.400 | 0.0 | 4.9 | 6.5 | - | 535 / 682 | 1047 / 1233 |
| fr-FR_JT2 | realtime | 30 | 0 | 0.190 | 0.533 | 0.0 | 8.1 | 8.6 | 1286 / 1578 | -1822 / -1330 | 777 / 949 |
| fr-FR_JT2 | realtime_refine | 30 | 0 | 0.158 | 0.433 | 0.0 | 5.4 | 8.1 | 1455 / 1761 | -1256 / -815 | 1345 / 1326 |
| fr-FR_JT2 | whisper_v3 | 30 | 0 | 0.169 | 0.467 | 0.0 | 7.6 | 7.0 | - | 641 / 706 | 1253 / 1360 |
| fr-FR_JT3 | fast_default | 30 | 0 | 0.124 | 0.333 | 0.0 | 9.2 | 2.7 | - | 647 / 766 | 1284 / 1355 |
| fr-FR_JT3 | fast_llm | 30 | 0 | 0.154 | 0.400 | 7.0 | 4.9 | 8.6 | - | 514 / 600 | 1135 / 1273 |
| fr-FR_JT3 | fast_mai | 30 | 0 | 0.156 | 0.433 | 0.0 | 8.1 | 6.5 | - | 518 / 624 | 1027 / 1195 |
| fr-FR_JT3 | realtime | 30 | 0 | 0.141 | 0.433 | 0.0 | 9.2 | 4.3 | 1281 / 1601 | -1903 / -1404 | 699 / 865 |
| fr-FR_JT3 | realtime_refine | 30 | 0 | 0.116 | 0.333 | 0.0 | 7.6 | 3.2 | 1311 / 1622 | -1375 / -960 | 1139 / 1364 |
| fr-FR_JT3 | whisper_v3 | 30 | 0 | 0.124 | 0.333 | 0.0 | 9.2 | 2.7 | - | 624 / 677 | 1256 / 1256 |
| fr-FR_JT4 | fast_default | 30 | 0 | 0.142 | 0.333 | 0.0 | 9.2 | 3.8 | - | 664 / 719 | 1351 / 1328 |
| fr-FR_JT4 | fast_llm | 30 | 0 | 0.154 | 0.400 | 3.2 | 7.0 | 7.6 | - | 502 / 552 | 1218 / 1138 |
| fr-FR_JT4 | fast_mai | 30 | 0 | 0.143 | 0.367 | 0.0 | 7.0 | 6.5 | - | 532 / 667 | 1034 / 1219 |
| fr-FR_JT4 | realtime | 30 | 0 | 0.162 | 0.400 | 0.0 | 10.8 | 4.3 | 1279 / 1608 | -1875 / -1320 | 726 / 907 |
| fr-FR_JT4 | realtime_refine | 30 | 0 | 0.126 | 0.333 | 0.0 | 7.6 | 3.8 | 1313 / 1616 | -1367 / -963 | 1172 / 1335 |
| fr-FR_JT4 | whisper_v3 | 30 | 0 | 0.142 | 0.333 | 0.0 | 9.2 | 3.8 | - | 667 / 790 | 1352 / 1402 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_fr-FR_20260509_162042_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 22
- `trim_both`: 1
- `trim_first`: 7
- `trim_last`: 2

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| fr-FR_DT1 | 1r_fr-FR_female-DT1/Définir l'emplacement actuel comme entreprise.wav | skip | - | - |
| fr-FR_DT1 | 1r_fr-FR_female-DT1/Coupe le son des médias.wav | trim_first | 2.92 | 3.56 |
| fr-FR_DT1 | 1r_fr-FR_female-DT1/Ferme les vitres arrière.wav | trim_first | 3.22 | 4.46 |
| fr-FR_DT2 | 2r_fr-FR_male-DT2/Ouvre l'affichage du trajet.wav | skip | - | - |
| fr-FR_DT2 | 1l_fr-FR_male-DT2/Désactive la ventilation du siège arrière gauche.wav | trim_first | 2.91 | 5.75 |
| fr-FR_DT2 | 1r_fr-FR_female-DT2/Coupe le son des médias.wav | skip | - | - |
| fr-FR_DT2 | 1r_fr-FR_female-DT2/Ferme les vitres arrière.wav | skip | - | - |
| fr-FR_DT3 | 1r_fr-FR_female-DT3/Coupe le son des médias.wav | skip | - | - |
| fr-FR_DT3 | 1r_fr-FR_female-DT3/Ferme les vitres arrière.wav | skip | - | - |
| fr-FR_DT3 | 2l_fr-FR_male-DT3/Refroidis légèrement l’avant.wav | trim_first | 3.43 | 5.03 |
| fr-FR_DT4 | 2r_fr-FR_male-DT4/Ouvre l'affichage du trajet.wav | trim_last | 2.96 | 3.24 |
| fr-FR_DT4 | 1r_fr-FR_female-DT4/Coupe le son des médias.wav | skip | - | - |
| fr-FR_DT4 | 1r_fr-FR_female-DT4/Ferme les vitres arrière.wav | skip | - | - |
| fr-FR_DT4 | 2l_fr-FR_male-DT4/Refroidis légèrement l’avant.wav | trim_both | 3.44 | 4.6 |
| fr-FR_DT5 | 1r_fr-FR_female-DT5/Définir l'emplacement actuel comme entreprise.wav | skip | - | - |
| fr-FR_DT5 | 1r_fr-FR_female-DT5/Coupe le son des médias.wav | skip | - | - |
| fr-FR_DT5 | 1r_fr-FR_female-DT5/Ferme les vitres arrière.wav | skip | - | - |
| fr-FR_JT1 | 1r_fr-FR_female-JT1/Définir l'emplacement actuel comme entreprise.wav | skip | - | - |
| fr-FR_JT1 | 1r_fr-FR_female-JT1/Coupe le son des médias.wav | skip | - | - |
| fr-FR_JT1 | 1r_fr-FR_female-JT1/Ferme les vitres arrière.wav | skip | - | - |

## Latency definitions (all values in ms)

Wall-clock timeline for one realtime sample. The clip has leading and
trailing silence; the user only speaks during the middle. Word offsets
come from the SDK's word-level timestamps.

```
  audio_start         speech_start                  speech_end       end_of_audio
       │                   │                              │                │
       ├───────────────────┼──────────────────────────────┼────────────────┤
       │  leading silence  │        user speaking         │trailing silence│
       │                   │                              │                │
       │                   │   first_recognizing event    │                │   last_recognized event
       │                   │             ▼                │                │           ▼
       │                   ├────────────→│ First Latency  │                │           │
       │                   │                              │                │           │
       │                   │                              ├────────────────┼──────────→│ UPL
       │                   │                              │                │           │
       │                   │                              │                ├──────────→│ LBL  (can be negative)
```

Reference points on the timeline:
- `audio_start` — wall time of the first PCM chunk we push.
- `speech_start` = `audio_start + first_word_start_in_audio` — first word's `Offset` from the first `recognized` event.
- `speech_end` = `audio_start + last_word_end_in_audio` — last word's `Offset + Duration` from the last `recognized` event.
- `end_of_audio` — wall time when the last PCM chunk has been pushed.

**realtime** (Speech SDK, partials available):
- **First Latency** = `first_recognizing_event_wall − speech_start`. Subtracts leading silence so the metric reflects how fast the first partial appears *after the user starts speaking*, not after we start streaming bytes.
- **LBL** (last-final beyond last-chunk) = `last_recognized_event_wall − end_of_audio`. Pure server flush time relative to the last byte we pushed. **May be negative** when the SDK emits the final result before the last chunk goes out — that's the streaming pipeline running ahead of audio I/O.
- **UPL** (user-perceived latency) = `last_recognized_event_wall − speech_end`. How late the final result arrives after the user actually stopped speaking. `speech_end` comes from the last word's `Offset + Duration` in the recognized event JSON.

**fast_default / fast_llm / fast_mai** (REST, no partials):
- **LBL** = `response_fully_read_wall − end_of_audio_wall`. Time from last uploaded byte to fully-received response.
- **UPL** = `response_fully_read_wall − speech_end_wall`. `speech_end_wall` is taken from the realtime SDK's last-word offset for that sample (when realtime ran successfully on it), so all services compare against the same reference. The CSV column `upl_self_ms` keeps each service's own phrase-derived value, and `upl_anchor` is `realtime` when anchored or `self` when the realtime anchor was unavailable.
- Note: `fast_mai`'s own phrase boundaries often span the entire audio; using the realtime anchor here makes its UPL directly comparable to the others.
- **First Latency** is omitted because the REST response is delivered in one shot — there is no first-token signal to measure against.
- **VAD truncation**: when realtime ran first and produced word timestamps, fast_* audio is truncated at `speech_end + 500 ms` to simulate a VAD cutting the stream after end-of-speech. This reduces upload time and makes LBL/UPL realistic for a VAD-equipped pipeline. The CSV column `vad_truncated_s` records the truncated duration (blank when no truncation was applied).

**Other:**
- WER/SER use NFKC + lowercase + punctuation stripping normalization.
- Per-sample WER is capped at 1.0 in aggregation (a hypothesis far longer than the reference is still 100% wrong, not more).