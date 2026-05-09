# Mazda ASR Benchmark — mazda_de-DE_20260509_155253.csv

Total rows: **1620**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **266.1 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["de-DE"]}`
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
- Config: `definition = {"locales": ["de"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="de-DE", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

### `realtime_refine` — Azure Speech SDK — continuous + Post-Stream Refinement (MRS preview)
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK (>=1.49.0)
- Config: `PushAudioInputStream, language="de-DE", continuous, PostProcessingOption="PostRefinement"`
- Partial results: yes (recognizing/recognized events; final replaced after refinement)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>
- Note: Requires Speech SDK >= 1.49.0 and a Speech resource in a region where Multi-Recognizer / Post-Stream Refinement public preview is enabled (East US / North Europe rollout). Falls back to non-MRS behavior if PostProcessingOption is not set.

## Datasets under test

- **de-DE_DT1** — Mazda de-DE DT1 voice commands (male + female pooled, 30 random samples)
- **de-DE_DT2** — Mazda de-DE DT2 voice commands (male + female pooled, 30 random samples)
- **de-DE_DT3** — Mazda de-DE DT3 voice commands (male + female pooled, 30 random samples)
- **de-DE_DT4** — Mazda de-DE DT4 voice commands (male + female pooled, 30 random samples)
- **de-DE_DT5** — Mazda de-DE DT5 voice commands (male + female pooled, 30 random samples)
- **de-DE_JT1** — Mazda de-DE JT1 voice commands (male + female pooled, 30 random samples)
- **de-DE_JT2** — Mazda de-DE JT2 voice commands (male + female pooled, 30 random samples)
- **de-DE_JT3** — Mazda de-DE JT3 voice commands (male + female pooled, 30 random samples)
- **de-DE_JT4** — Mazda de-DE JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| de-DE_DT1 | fast_default | 30 | 0 | 0.597 | 0.867 | 7.1 | 26.8 | 26.8 | - | 614 / 755 | 1554 / 2550 |
| de-DE_DT1 | fast_llm | 30 | 0 | 0.614 | 0.867 | 17.3 | 22.8 | 39.4 | - | 483 / 548 | 1438 / 2272 |
| de-DE_DT1 | fast_mai | 30 | 0 | 0.543 | 0.800 | 9.4 | 23.6 | 25.2 | - | 463 / 500 | 810 / 1050 |
| de-DE_DT1 | realtime | 30 | 0 | 0.629 | 0.867 | 5.5 | 41.7 | 15.7 | 1620 / 1923 | -1185 / -581 | 707 / 897 |
| de-DE_DT1 | realtime_refine | 30 | 0 | 0.553 | 0.800 | 5.5 | 26.0 | 26.0 | 1582 / 1923 | -783 / -148 | 1220 / 1489 |
| de-DE_DT1 | whisper_v3 | 30 | 0 | 0.597 | 0.867 | 7.1 | 26.8 | 26.8 | - | 603 / 681 | 1545 / 2551 |
| de-DE_DT2 | fast_default | 30 | 0 | 0.667 | 0.867 | 11.8 | 25.2 | 37.0 | - | 605 / 679 | 1818 / 2983 |
| de-DE_DT2 | fast_llm | 30 | 0 | 0.703 | 0.833 | 22.0 | 20.5 | 43.3 | - | 491 / 543 | 1728 / 3613 |
| de-DE_DT2 | fast_mai | 30 | 0 | 0.589 | 0.800 | 25.2 | 15.7 | 38.6 | - | 484 / 606 | 764 / 1064 |
| de-DE_DT2 | realtime | 30 | 0 | 0.720 | 0.933 | 0.0 | 56.7 | 12.6 | 1597 / 1927 | -1070 / -522 | 839 / 1024 |
| de-DE_DT2 | realtime_refine | 30 | 0 | 0.629 | 0.900 | 14.2 | 26.8 | 29.9 | 1775 / 2907 | -911 / -177 | 1244 / 1495 |
| de-DE_DT2 | whisper_v3 | 30 | 0 | 0.667 | 0.867 | 11.8 | 25.2 | 37.0 | - | 615 / 669 | 1821 / 3048 |
| de-DE_DT3 | fast_default | 30 | 0 | 0.494 | 0.700 | 7.9 | 18.1 | 24.4 | - | 617 / 757 | 1411 / 2670 |
| de-DE_DT3 | fast_llm | 30 | 0 | 0.450 | 0.667 | 12.6 | 17.3 | 22.8 | - | 498 / 593 | 1337 / 2636 |
| de-DE_DT3 | fast_mai | 30 | 0 | 0.390 | 0.600 | 7.1 | 15.7 | 22.8 | - | 475 / 528 | 911 / 1068 |
| de-DE_DT3 | realtime | 30 | 0 | 0.521 | 0.767 | 5.5 | 30.7 | 12.6 | 1566 / 1682 | -1182 / -511 | 706 / 882 |
| de-DE_DT3 | realtime_refine | 30 | 0 | 0.385 | 0.667 | 3.1 | 20.5 | 14.2 | 1575 / 1740 | -803 / -117 | 1221 / 1379 |
| de-DE_DT3 | whisper_v3 | 30 | 0 | 0.494 | 0.700 | 7.9 | 18.1 | 24.4 | - | 629 / 752 | 1425 / 2714 |
| de-DE_DT4 | fast_default | 30 | 0 | 0.733 | 0.833 | 7.1 | 40.2 | 34.6 | - | 598 / 751 | 1678 / 3024 |
| de-DE_DT4 | fast_llm | 30 | 0 | 0.774 | 0.900 | 25.2 | 22.8 | 51.2 | - | 486 / 570 | 1794 / 2970 |
| de-DE_DT4 | fast_mai | 30 | 0 | 0.631 | 0.900 | 5.5 | 30.7 | 29.9 | - | 468 / 559 | 742 / 1027 |
| de-DE_DT4 | realtime | 30 | 0 | 0.778 | 0.900 | 3.1 | 64.6 | 13.4 | 1623 / 1980 | -1082 / -570 | 777 / 915 |
| de-DE_DT4 | realtime_refine | 30 | 0 | 0.679 | 0.767 | 19.7 | 29.1 | 40.2 | 1644 / 1920 | -671 / -24 | 1261 / 1512 |
| de-DE_DT4 | whisper_v3 | 30 | 0 | 0.733 | 0.833 | 7.1 | 40.2 | 34.6 | - | 592 / 710 | 1663 / 3016 |
| de-DE_DT5 | fast_default | 30 | 0 | 0.468 | 0.667 | 3.1 | 22.0 | 19.7 | - | 591 / 648 | 1362 / 2473 |
| de-DE_DT5 | fast_llm | 30 | 0 | 0.485 | 0.733 | 9.4 | 20.5 | 26.8 | - | 484 / 558 | 1366 / 2694 |
| de-DE_DT5 | fast_mai | 30 | 0 | 0.399 | 0.700 | 5.5 | 16.5 | 22.0 | - | 476 / 541 | 928 / 1094 |
| de-DE_DT5 | realtime | 30 | 0 | 0.497 | 0.700 | 4.7 | 27.6 | 16.5 | 1593 / 1658 | -1170 / -487 | 791 / 1044 |
| de-DE_DT5 | realtime_refine | 30 | 0 | 0.423 | 0.667 | 3.1 | 23.6 | 13.4 | 1495 / 1633 | -702 / -23 | 1216 / 1472 |
| de-DE_DT5 | whisper_v3 | 30 | 0 | 0.468 | 0.667 | 3.1 | 22.0 | 19.7 | - | 570 / 631 | 1338 / 2491 |
| de-DE_JT1 | fast_default | 30 | 0 | 0.414 | 0.600 | 3.9 | 22.0 | 14.2 | - | 620 / 732 | 1205 / 1233 |
| de-DE_JT1 | fast_llm | 30 | 0 | 0.387 | 0.600 | 3.1 | 15.7 | 16.5 | - | 494 / 541 | 1279 / 1734 |
| de-DE_JT1 | fast_mai | 30 | 0 | 0.329 | 0.533 | 4.7 | 17.3 | 11.8 | - | 492 / 607 | 955 / 1135 |
| de-DE_JT1 | realtime | 30 | 0 | 0.391 | 0.600 | 5.5 | 24.4 | 9.4 | 1472 / 1688 | -1126 / -488 | 737 / 990 |
| de-DE_JT1 | realtime_refine | 30 | 0 | 0.402 | 0.600 | 2.4 | 22.0 | 15.0 | 1454 / 1637 | -822 / -40 | 1173 / 1246 |
| de-DE_JT1 | whisper_v3 | 30 | 0 | 0.414 | 0.600 | 3.9 | 22.0 | 14.2 | - | 607 / 683 | 1190 / 1223 |
| de-DE_JT2 | fast_default | 30 | 0 | 0.682 | 0.767 | 11.8 | 26.0 | 37.0 | - | 602 / 674 | 1591 / 2600 |
| de-DE_JT2 | fast_llm | 30 | 0 | 0.658 | 0.867 | 16.5 | 16.5 | 48.8 | - | 484 / 538 | 1710 / 3834 |
| de-DE_JT2 | fast_mai | 30 | 0 | 0.600 | 0.800 | 6.3 | 31.5 | 26.0 | - | 498 / 604 | 818 / 1134 |
| de-DE_JT2 | realtime | 30 | 0 | 0.733 | 0.833 | 7.9 | 52.0 | 15.7 | 1542 / 1650 | -1083 / -510 | 736 / 944 |
| de-DE_JT2 | realtime_refine | 30 | 0 | 0.550 | 0.733 | 5.5 | 28.3 | 24.4 | 1566 / 1733 | -702 / -150 | 1226 / 1314 |
| de-DE_JT2 | whisper_v3 | 30 | 0 | 0.682 | 0.767 | 11.8 | 26.0 | 37.0 | - | 612 / 721 | 1605 / 2603 |
| de-DE_JT3 | fast_default | 30 | 0 | 0.342 | 0.567 | 1.6 | 21.3 | 7.9 | - | 566 / 650 | 1193 / 1216 |
| de-DE_JT3 | fast_llm | 30 | 0 | 0.335 | 0.500 | 13.4 | 19.7 | 9.4 | - | 487 / 596 | 1070 / 1126 |
| de-DE_JT3 | fast_mai | 30 | 0 | 0.274 | 0.433 | 0.8 | 20.5 | 5.5 | - | 499 / 602 | 954 / 1099 |
| de-DE_JT3 | realtime | 30 | 0 | 0.340 | 0.533 | 2.4 | 25.2 | 7.1 | 1427 / 1633 | -1124 / -478 | 758 / 933 |
| de-DE_JT3 | realtime_refine | 30 | 0 | 0.308 | 0.533 | 0.8 | 20.5 | 7.9 | 1519 / 1646 | -726 / -243 | 1155 / 1344 |
| de-DE_JT3 | whisper_v3 | 30 | 0 | 0.342 | 0.567 | 1.6 | 21.3 | 7.9 | - | 569 / 670 | 1203 / 1256 |
| de-DE_JT4 | fast_default | 30 | 0 | 0.371 | 0.533 | 1.6 | 26.8 | 5.5 | - | 606 / 719 | 1226 / 1300 |
| de-DE_JT4 | fast_llm | 30 | 0 | 0.394 | 0.533 | 6.3 | 19.7 | 14.2 | - | 470 / 543 | 1264 / 1806 |
| de-DE_JT4 | fast_mai | 30 | 0 | 0.310 | 0.467 | 3.1 | 17.3 | 12.6 | - | 547 / 660 | 979 / 1242 |
| de-DE_JT4 | realtime | 30 | 0 | 0.409 | 0.633 | 4.7 | 26.8 | 7.9 | 1505 / 1666 | -1095 / -460 | 712 / 891 |
| de-DE_JT4 | realtime_refine | 30 | 0 | 0.346 | 0.533 | 1.6 | 26.8 | 5.5 | 1516 / 1720 | -562 / 139 | 1249 / 1469 |
| de-DE_JT4 | whisper_v3 | 30 | 0 | 0.371 | 0.533 | 1.6 | 26.8 | 5.5 | - | 616 / 778 | 1237 / 1509 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_de-DE_20260509_155253_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 87
- `trim_both`: 14
- `trim_first`: 24
- `trim_last`: 17

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| de-DE_DT1 | 2r_de-DE_female-DT1/Leistungsmodus auf schwach umschalten.wav | trim_first | 1.91 | 3.71 |
| de-DE_DT1 | 1l_de-DE_female-DT1/Drehen Sie die Lautstärke des Telefons herunter.wav | skip | - | - |
| de-DE_DT1 | 1r_de-DE_female-DT1/Linke Rücksitzbelüftung senken.wav | skip | - | - |
| de-DE_DT1 | 1l_de-DE_male-DT1/Klimamenü öffnen.wav | skip | - | - |
| de-DE_DT1 | 1r_de-DE_female-DT1/Spiegel einklappen.wav | skip | - | - |
| de-DE_DT1 | 1r_de-DE_female-DT1/Fahrersitz nach vorne schieben.wav | skip | - | - |
| de-DE_DT1 | 2l_de-DE_male-DT1/Linkes Hinterfenster etwas weiter öffnen.wav | skip | - | - |
| de-DE_DT1 | 2r_de-DE_female-DT1/Anruf ignorieren.wav | trim_both | 3.04 | 3.48 |
| de-DE_DT1 | 2l_de-DE_female-DT1/Farbe der Ambientebeleuchtung ändern.wav | trim_both | 2.62 | 3.34 |
| de-DE_DT1 | 1l_de-DE_female-DT1/Fahrersitzbelüftung um 3 Stufen erhöhen.wav | skip | - | - |
| de-DE_DT1 | 1l_de-DE_female-DT1/Fahrersitz ganz nach vorne schieben.wav | trim_last | 3.82 | 4.22 |
| de-DE_DT1 | 1l_de-DE_female-DT1/Wechsel in den kompakten Berichtsmodus.wav | skip | - | - |
| de-DE_DT1 | 2l_de-DE_male-DT1/Beifahrersitzbelüftung auf Maximum.wav | trim_first | 2.05 | 3.85 |
| de-DE_DT1 | 1r_de-DE_female-DT1/Hinteres Fenster auf 60 % öffnen.wav | skip | - | - |
| de-DE_DT1 | 2l_de-DE_male-DT1/Rechtes Hinterfenster etwas weiter öffnen.wav | skip | - | - |
| de-DE_DT1 | 1r_de-DE_female-DT1/Alle Fenster etwas weiter schließen.wav | skip | - | - |
| de-DE_DT1 | 2r_de-DE_female-DT1/Luftstrom nach vorn ausrichten.wav | skip | - | - |
| de-DE_DT2 | 2r_de-DE_female-DT2/Leistungsmodus auf schwach umschalten.wav | trim_both | 2.31 | 3.11 |
| de-DE_DT2 | 1r_de-DE_female-DT2/Spiegel einklappen.wav | skip | - | - |
| de-DE_DT2 | 1r_de-DE_female-DT2/Linke Rücksitzbelüftung senken.wav | skip | - | - |

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