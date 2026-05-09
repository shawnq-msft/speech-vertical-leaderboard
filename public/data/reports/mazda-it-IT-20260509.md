# Mazda ASR Benchmark — mazda_it-IT_20260509_162044.csv

Total rows: **1620**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **268.9 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["it-IT"]}`
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
- Config: `definition = {"locales": ["it"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="it-IT", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

### `realtime_refine` — Azure Speech SDK — continuous + Post-Stream Refinement (MRS preview)
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK (>=1.49.0)
- Config: `PushAudioInputStream, language="it-IT", continuous, PostProcessingOption="PostRefinement"`
- Partial results: yes (recognizing/recognized events; final replaced after refinement)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>
- Note: Requires Speech SDK >= 1.49.0 and a Speech resource in a region where Multi-Recognizer / Post-Stream Refinement public preview is enabled (East US / North Europe rollout). Falls back to non-MRS behavior if PostProcessingOption is not set.

## Datasets under test

- **it-IT_DT1** — Mazda it-IT DT1 voice commands (male + female pooled, 30 random samples)
- **it-IT_DT2** — Mazda it-IT DT2 voice commands (male + female pooled, 30 random samples)
- **it-IT_DT3** — Mazda it-IT DT3 voice commands (male + female pooled, 30 random samples)
- **it-IT_DT4** — Mazda it-IT DT4 voice commands (male + female pooled, 30 random samples)
- **it-IT_DT5** — Mazda it-IT DT5 voice commands (male + female pooled, 30 random samples)
- **it-IT_JT1** — Mazda it-IT JT1 voice commands (male + female pooled, 30 random samples)
- **it-IT_JT2** — Mazda it-IT JT2 voice commands (male + female pooled, 30 random samples)
- **it-IT_JT3** — Mazda it-IT JT3 voice commands (male + female pooled, 30 random samples)
- **it-IT_JT4** — Mazda it-IT JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| it-IT_DT1 | fast_default | 30 | 0 | 0.025 | 0.133 | 0.0 | 1.4 | 1.4 | - | 1077 / 3111 | 1467 / 3372 |
| it-IT_DT1 | fast_llm | 30 | 0 | 0.025 | 0.133 | 0.0 | 1.4 | 1.4 | - | 486 / 519 | 876 / 1077 |
| it-IT_DT1 | fast_mai | 30 | 0 | 0.028 | 0.133 | 0.7 | 0.0 | 2.1 | - | 482 / 572 | 872 / 1122 |
| it-IT_DT1 | realtime | 30 | 0 | 0.032 | 0.167 | 0.0 | 1.4 | 2.1 | 1119 / 1490 | -126 / 320 | 554 / 833 |
| it-IT_DT1 | realtime_refine | 30 | 0 | 0.020 | 0.100 | 0.0 | 0.7 | 1.4 | 1110 / 1335 | 467 / 831 | 1183 / 1582 |
| it-IT_DT1 | whisper_v3 | 30 | 0 | 0.025 | 0.133 | 0.0 | 1.4 | 1.4 | - | 1214 / 5022 | 1604 / 5302 |
| it-IT_DT2 | fast_default | 30 | 0 | 0.115 | 0.333 | 0.0 | 2.7 | 8.9 | - | 600 / 683 | 1003 / 1194 |
| it-IT_DT2 | fast_llm | 30 | 0 | 0.134 | 0.300 | 0.7 | 2.1 | 9.6 | - | 494 / 587 | 942 / 1074 |
| it-IT_DT2 | fast_mai | 30 | 0 | 0.158 | 0.367 | 0.7 | 1.4 | 11.6 | - | 521 / 519 | 923 / 1066 |
| it-IT_DT2 | realtime | 30 | 0 | 0.158 | 0.467 | 0.7 | 2.7 | 11.6 | 1199 / 1498 | -132 / 330 | 624 / 772 |
| it-IT_DT2 | realtime_refine | 30 | 0 | 0.138 | 0.367 | 0.0 | 1.4 | 11.6 | 1277 / 1951 | 277 / 700 | 1083 / 1509 |
| it-IT_DT2 | whisper_v3 | 30 | 0 | 0.115 | 0.333 | 0.0 | 2.7 | 8.9 | - | 635 / 706 | 1038 / 1204 |
| it-IT_DT3 | fast_default | 30 | 0 | 0.032 | 0.100 | 0.0 | 0.0 | 2.7 | - | 596 / 671 | 974 / 1191 |
| it-IT_DT3 | fast_llm | 30 | 0 | 0.015 | 0.067 | 0.0 | 0.0 | 1.4 | - | 489 / 528 | 868 / 1098 |
| it-IT_DT3 | fast_mai | 30 | 0 | 0.054 | 0.200 | 0.7 | 0.0 | 3.4 | - | 454 / 537 | 832 / 1045 |
| it-IT_DT3 | realtime | 30 | 0 | 0.051 | 0.133 | 0.7 | 0.0 | 4.1 | 1070 / 1295 | -104 / 313 | 548 / 794 |
| it-IT_DT3 | realtime_refine | 30 | 0 | 0.023 | 0.100 | 0.0 | 0.0 | 2.1 | 1102 / 1360 | 338 / 685 | 1034 / 1500 |
| it-IT_DT3 | whisper_v3 | 30 | 0 | 0.032 | 0.100 | 0.0 | 0.0 | 2.7 | - | 622 / 682 | 1001 / 1243 |
| it-IT_DT4 | fast_default | 30 | 0 | 0.028 | 0.133 | 0.0 | 0.0 | 2.7 | - | 604 / 690 | 1025 / 1220 |
| it-IT_DT4 | fast_llm | 30 | 0 | 0.021 | 0.100 | 0.0 | 0.7 | 2.1 | - | 492 / 534 | 930 / 1071 |
| it-IT_DT4 | fast_mai | 30 | 0 | 0.032 | 0.067 | 0.7 | 0.0 | 2.1 | - | 458 / 549 | 843 / 1042 |
| it-IT_DT4 | realtime | 30 | 0 | 0.077 | 0.200 | 0.0 | 3.4 | 4.1 | 1078 / 1276 | -84 / 309 | 594 / 816 |
| it-IT_DT4 | realtime_refine | 30 | 0 | 0.051 | 0.133 | 0.0 | 2.1 | 2.7 | 1120 / 1395 | 320 / 700 | 1052 / 1439 |
| it-IT_DT4 | whisper_v3 | 30 | 0 | 0.028 | 0.133 | 0.0 | 0.0 | 2.7 | - | 606 / 689 | 1027 / 1180 |
| it-IT_DT5 | fast_default | 30 | 0 | 0.052 | 0.200 | 0.7 | 0.0 | 4.1 | - | 698 / 1181 | 1067 / 1731 |
| it-IT_DT5 | fast_llm | 30 | 0 | 0.036 | 0.167 | 0.7 | 0.7 | 2.1 | - | 496 / 562 | 865 / 1113 |
| it-IT_DT5 | fast_mai | 30 | 0 | 0.032 | 0.133 | 0.7 | 0.0 | 2.1 | - | 459 / 542 | 827 / 1053 |
| it-IT_DT5 | realtime | 30 | 0 | 0.074 | 0.267 | 0.0 | 0.0 | 6.8 | 1121 / 1390 | -89 / 321 | 553 / 779 |
| it-IT_DT5 | realtime_refine | 30 | 0 | 0.036 | 0.167 | 0.0 | 0.0 | 3.4 | 1192 / 1636 | 433 / 838 | 1113 / 1633 |
| it-IT_DT5 | whisper_v3 | 30 | 0 | 0.052 | 0.200 | 0.7 | 0.0 | 4.1 | - | 680 / 987 | 1048 / 1537 |
| it-IT_JT1 | fast_default | 30 | 0 | 0.037 | 0.133 | 0.0 | 0.0 | 3.4 | - | 655 / 718 | 1032 / 1278 |
| it-IT_JT1 | fast_llm | 30 | 0 | 0.032 | 0.100 | 0.7 | 0.0 | 2.1 | - | 495 / 575 | 871 / 1056 |
| it-IT_JT1 | fast_mai | 30 | 0 | 0.032 | 0.100 | 0.7 | 0.0 | 2.1 | - | 453 / 486 | 829 / 1021 |
| it-IT_JT1 | realtime | 30 | 0 | 0.037 | 0.133 | 0.7 | 0.0 | 2.7 | 1075 / 1303 | -106 / 306 | 527 / 719 |
| it-IT_JT1 | realtime_refine | 30 | 0 | 0.023 | 0.100 | 0.0 | 0.0 | 2.1 | 1113 / 1370 | 325 / 679 | 990 / 1269 |
| it-IT_JT1 | whisper_v3 | 30 | 0 | 0.037 | 0.133 | 0.0 | 0.0 | 3.4 | - | 647 / 719 | 1023 / 1224 |
| it-IT_JT2 | fast_default | 30 | 0 | 0.040 | 0.167 | 0.0 | 0.7 | 3.4 | - | 657 / 848 | 1059 / 1246 |
| it-IT_JT2 | fast_llm | 30 | 0 | 0.058 | 0.167 | 1.4 | 1.4 | 2.1 | - | 543 / 754 | 945 / 1251 |
| it-IT_JT2 | fast_mai | 30 | 0 | 0.048 | 0.133 | 0.7 | 0.0 | 3.4 | - | 491 / 575 | 893 / 1133 |
| it-IT_JT2 | realtime | 30 | 0 | 0.041 | 0.200 | 0.0 | 1.4 | 2.7 | 1092 / 1420 | -112 / 300 | 567 / 765 |
| it-IT_JT2 | realtime_refine | 30 | 0 | 0.051 | 0.200 | 0.7 | 0.0 | 4.1 | 1179 / 2000 | 351 / 705 | 1066 / 1442 |
| it-IT_JT2 | whisper_v3 | 30 | 0 | 0.040 | 0.167 | 0.0 | 0.7 | 3.4 | - | 652 / 873 | 1054 / 1261 |
| it-IT_JT3 | fast_default | 30 | 0 | 0.023 | 0.100 | 0.0 | 0.0 | 2.1 | - | 659 / 840 | 1025 / 1365 |
| it-IT_JT3 | fast_llm | 30 | 0 | 0.015 | 0.067 | 0.0 | 0.0 | 1.4 | - | 495 / 552 | 861 / 1076 |
| it-IT_JT3 | fast_mai | 30 | 0 | 0.023 | 0.100 | 0.7 | 0.0 | 1.4 | - | 484 / 598 | 850 / 1059 |
| it-IT_JT3 | realtime | 30 | 0 | 0.045 | 0.100 | 0.7 | 0.7 | 2.7 | 1069 / 1279 | -117 / 303 | 509 / 708 |
| it-IT_JT3 | realtime_refine | 30 | 0 | 0.015 | 0.067 | 0.0 | 0.0 | 1.4 | 1123 / 1344 | 379 / 826 | 1034 / 1303 |
| it-IT_JT3 | whisper_v3 | 30 | 0 | 0.023 | 0.100 | 0.0 | 0.0 | 2.1 | - | 662 / 852 | 1028 / 1274 |
| it-IT_JT4 | fast_default | 30 | 0 | 0.037 | 0.100 | 0.0 | 0.0 | 3.4 | - | 617 / 676 | 992 / 1208 |
| it-IT_JT4 | fast_llm | 30 | 0 | 0.023 | 0.067 | 0.0 | 0.0 | 2.1 | - | 487 / 545 | 863 / 1054 |
| it-IT_JT4 | fast_mai | 30 | 0 | 0.023 | 0.100 | 0.7 | 0.0 | 1.4 | - | 482 / 588 | 857 / 1095 |
| it-IT_JT4 | realtime | 30 | 0 | 0.029 | 0.100 | 0.7 | 0.7 | 1.4 | 1048 / 1268 | -107 / 311 | 529 / 749 |
| it-IT_JT4 | realtime_refine | 30 | 0 | 0.023 | 0.067 | 0.0 | 0.0 | 2.1 | 1110 / 1287 | 411 / 757 | 1072 / 1444 |
| it-IT_JT4 | whisper_v3 | 30 | 0 | 0.037 | 0.100 | 0.0 | 0.0 | 3.4 | - | 622 / 683 | 998 / 1238 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_it-IT_20260509_162044_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 2
- `trim_first`: 4
- `trim_last`: 1

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| it-IT_DT2 | 1l_it-IT_female-DT2/Seleziona il percorso due.wav | skip | - | - |
| it-IT_DT2 | 1l_it-IT_female-DT2/Attiva il riscaldamento del volante.wav | trim_last | 2.27 | 2.51 |
| it-IT_DT3 | 2l_it-IT_female-DT3/Regola il volume a cinque.wav | trim_first | 1.86 | 3.5 |
| it-IT_DT4 | 1l_it-IT_female-DT4/Seleziona il percorso due.wav | skip | - | - |
| it-IT_DT4 | 2l_it-IT_female-DT4/Regola il volume a cinque.wav | trim_first | 1.87 | 3.47 |
| it-IT_DT5 | 2l_it-IT_female-DT5/Regola il volume a cinque.wav | trim_first | 1.85 | 3.53 |
| it-IT_JT3 | 2l_it-IT_female-JT3/Regola il volume a cinque.wav | trim_first | 1.88 | 3.64 |

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