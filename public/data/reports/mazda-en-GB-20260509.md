# Mazda ASR Benchmark — mazda_en-GB_20260509_155254.csv

Total rows: **1620**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **254.2 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["en-GB"]}`
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
- Config: `definition = {"locales": ["en"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="en-GB", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

### `realtime_refine` — Azure Speech SDK — continuous + Post-Stream Refinement (MRS preview)
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK (>=1.49.0)
- Config: `PushAudioInputStream, language="en-GB", continuous, PostProcessingOption="PostRefinement"`
- Partial results: yes (recognizing/recognized events; final replaced after refinement)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>
- Note: Requires Speech SDK >= 1.49.0 and a Speech resource in a region where Multi-Recognizer / Post-Stream Refinement public preview is enabled (East US / North Europe rollout). Falls back to non-MRS behavior if PostProcessingOption is not set.

## Datasets under test

- **en-GB_DT1** — Mazda en-GB DT1 voice commands (male + female pooled, 30 random samples)
- **en-GB_DT2** — Mazda en-GB DT2 voice commands (male + female pooled, 30 random samples)
- **en-GB_DT3** — Mazda en-GB DT3 voice commands (male + female pooled, 30 random samples)
- **en-GB_DT4** — Mazda en-GB DT4 voice commands (male + female pooled, 30 random samples)
- **en-GB_DT5** — Mazda en-GB DT5 voice commands (male + female pooled, 30 random samples)
- **en-GB_JT1** — Mazda en-GB JT1 voice commands (male + female pooled, 30 random samples)
- **en-GB_JT2** — Mazda en-GB JT2 voice commands (male + female pooled, 30 random samples)
- **en-GB_JT3** — Mazda en-GB JT3 voice commands (male + female pooled, 30 random samples)
- **en-GB_JT4** — Mazda en-GB JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| en-GB_DT1 | fast_default | 30 | 0 | 0.268 | 0.500 | 1.2 | 9.9 | 13.7 | - | 608 / 663 | 1184 / 1297 |
| en-GB_DT1 | fast_llm | 30 | 0 | 0.276 | 0.500 | 3.7 | 3.7 | 19.3 | - | 483 / 554 | 982 / 1151 |
| en-GB_DT1 | fast_mai | 30 | 0 | 0.249 | 0.433 | 3.1 | 8.1 | 11.2 | - | 471 / 568 | 922 / 1059 |
| en-GB_DT1 | realtime | 30 | 0 | 0.282 | 0.600 | 3.1 | 8.1 | 16.1 | 1489 / 1902 | -200 / 356 | 673 / 853 |
| en-GB_DT1 | realtime_refine | 30 | 0 | 0.292 | 0.500 | 5.6 | 6.8 | 18.6 | 1513 / 1954 | 286 / 708 | 1271 / 1464 |
| en-GB_DT1 | whisper_v3 | 30 | 0 | 0.268 | 0.500 | 1.2 | 9.9 | 13.7 | - | 607 / 673 | 1183 / 1402 |
| en-GB_DT2 | fast_default | 30 | 0 | 0.346 | 0.667 | 4.3 | 9.3 | 22.4 | - | 609 / 670 | 1166 / 1256 |
| en-GB_DT2 | fast_llm | 30 | 0 | 0.304 | 0.600 | 5.0 | 11.2 | 14.9 | - | 468 / 503 | 1007 / 1093 |
| en-GB_DT2 | fast_mai | 30 | 0 | 0.299 | 0.533 | 8.1 | 4.3 | 23.0 | - | 459 / 540 | 921 / 1092 |
| en-GB_DT2 | realtime | 30 | 0 | 0.375 | 0.767 | 5.6 | 10.6 | 21.7 | 1538 / 1953 | -201 / 314 | 731 / 1183 |
| en-GB_DT2 | realtime_refine | 30 | 0 | 0.377 | 0.667 | 6.8 | 4.3 | 27.3 | 1564 / 1959 | 234 / 668 | 1328 / 1848 |
| en-GB_DT2 | whisper_v3 | 30 | 0 | 0.346 | 0.667 | 4.3 | 9.3 | 22.4 | - | 626 / 678 | 1182 / 1272 |
| en-GB_DT3 | fast_default | 30 | 0 | 0.070 | 0.300 | 2.5 | 0.6 | 5.0 | - | 615 / 666 | 1097 / 1218 |
| en-GB_DT3 | fast_llm | 30 | 0 | 0.054 | 0.233 | 1.9 | 0.6 | 3.7 | - | 485 / 564 | 966 / 1154 |
| en-GB_DT3 | fast_mai | 30 | 0 | 0.038 | 0.167 | 1.2 | 0.6 | 2.5 | - | 459 / 524 | 931 / 1101 |
| en-GB_DT3 | realtime | 30 | 0 | 0.116 | 0.400 | 3.7 | 0.6 | 8.1 | 1370 / 1911 | -174 / 301 | 628 / 778 |
| en-GB_DT3 | realtime_refine | 30 | 0 | 0.083 | 0.300 | 2.5 | 0.6 | 5.6 | 1392 / 1853 | 206 / 660 | 1132 / 1276 |
| en-GB_DT3 | whisper_v3 | 30 | 0 | 0.070 | 0.300 | 2.5 | 0.6 | 5.0 | - | 619 / 675 | 1102 / 1228 |
| en-GB_DT4 | fast_default | 30 | 0 | 0.287 | 0.667 | 6.8 | 6.8 | 16.1 | - | 635 / 734 | 1123 / 1279 |
| en-GB_DT4 | fast_llm | 30 | 0 | 0.176 | 0.467 | 3.7 | 5.0 | 8.7 | - | 471 / 514 | 959 / 1082 |
| en-GB_DT4 | fast_mai | 30 | 0 | 0.222 | 0.567 | 3.7 | 3.1 | 13.0 | - | 471 / 560 | 959 / 1098 |
| en-GB_DT4 | realtime | 30 | 0 | 0.234 | 0.667 | 3.1 | 5.0 | 16.1 | 1489 / 1914 | -202 / 501 | 671 / 1011 |
| en-GB_DT4 | realtime_refine | 30 | 0 | 0.270 | 0.700 | 8.1 | 2.5 | 17.4 | 1507 / 1931 | 263 / 820 | 1254 / 1445 |
| en-GB_DT4 | whisper_v3 | 30 | 0 | 0.287 | 0.667 | 6.8 | 6.8 | 16.1 | - | 617 / 688 | 1105 / 1224 |
| en-GB_DT5 | fast_default | 30 | 0 | 0.049 | 0.233 | 1.9 | 0.6 | 3.7 | - | 610 / 656 | 1084 / 1198 |
| en-GB_DT5 | fast_llm | 30 | 0 | 0.049 | 0.167 | 1.9 | 0.6 | 3.1 | - | 476 / 524 | 950 / 1077 |
| en-GB_DT5 | fast_mai | 30 | 0 | 0.038 | 0.167 | 1.2 | 0.6 | 2.5 | - | 470 / 582 | 944 / 1084 |
| en-GB_DT5 | realtime | 30 | 0 | 0.060 | 0.267 | 1.2 | 0.6 | 5.0 | 1346 / 1656 | -172 / 335 | 622 / 790 |
| en-GB_DT5 | realtime_refine | 30 | 0 | 0.057 | 0.233 | 1.9 | 0.6 | 4.3 | 1392 / 1899 | 220 / 647 | 1157 / 1347 |
| en-GB_DT5 | whisper_v3 | 30 | 0 | 0.049 | 0.233 | 1.9 | 0.6 | 3.7 | - | 601 / 667 | 1075 / 1192 |
| en-GB_JT1 | fast_default | 30 | 0 | 0.031 | 0.133 | 1.9 | 0.6 | 1.2 | - | 595 / 680 | 1044 / 1212 |
| en-GB_JT1 | fast_llm | 30 | 0 | 0.071 | 0.233 | 1.9 | 0.6 | 5.0 | - | 468 / 508 | 917 / 1049 |
| en-GB_JT1 | fast_mai | 30 | 0 | 0.060 | 0.200 | 1.9 | 0.6 | 3.1 | - | 474 / 562 | 923 / 1058 |
| en-GB_JT1 | realtime | 30 | 0 | 0.063 | 0.267 | 1.9 | 0.6 | 5.0 | 1367 / 1879 | -148 / 311 | 591 / 803 |
| en-GB_JT1 | realtime_refine | 30 | 0 | 0.039 | 0.167 | 1.9 | 0.6 | 2.5 | 1385 / 1832 | 209 / 663 | 1115 / 1231 |
| en-GB_JT1 | whisper_v3 | 30 | 0 | 0.031 | 0.133 | 1.9 | 0.6 | 1.2 | - | 604 / 669 | 1053 / 1194 |
| en-GB_JT2 | fast_default | 30 | 0 | 0.136 | 0.433 | 3.7 | 1.9 | 10.6 | - | 592 / 673 | 1103 / 1252 |
| en-GB_JT2 | fast_llm | 30 | 0 | 0.147 | 0.500 | 1.9 | 3.7 | 8.7 | - | 476 / 542 | 986 / 1070 |
| en-GB_JT2 | fast_mai | 30 | 0 | 0.097 | 0.333 | 1.9 | 1.9 | 5.6 | - | 470 / 533 | 953 / 1070 |
| en-GB_JT2 | realtime | 30 | 0 | 0.217 | 0.600 | 5.6 | 1.9 | 14.3 | 1555 / 1896 | -204 / 330 | 664 / 857 |
| en-GB_JT2 | realtime_refine | 30 | 0 | 0.220 | 0.567 | 5.6 | 2.5 | 15.5 | 1597 / 1951 | 190 / 669 | 1144 / 1301 |
| en-GB_JT2 | whisper_v3 | 30 | 0 | 0.136 | 0.433 | 3.7 | 1.9 | 10.6 | - | 610 / 652 | 1121 / 1213 |
| en-GB_JT3 | fast_default | 30 | 0 | 0.036 | 0.133 | 1.9 | 0.6 | 1.9 | - | 610 / 682 | 1072 / 1210 |
| en-GB_JT3 | fast_llm | 30 | 0 | 0.042 | 0.167 | 1.9 | 0.6 | 2.5 | - | 486 / 537 | 948 / 1087 |
| en-GB_JT3 | fast_mai | 30 | 0 | 0.060 | 0.200 | 1.9 | 0.6 | 3.1 | - | 494 / 601 | 956 / 1142 |
| en-GB_JT3 | realtime | 30 | 0 | 0.040 | 0.200 | 1.2 | 0.6 | 3.1 | 1323 / 1607 | -164 / 312 | 582 / 768 |
| en-GB_JT3 | realtime_refine | 30 | 0 | 0.036 | 0.133 | 1.9 | 0.6 | 1.9 | 1341 / 1684 | 231 / 670 | 1137 / 1244 |
| en-GB_JT3 | whisper_v3 | 30 | 0 | 0.036 | 0.133 | 1.9 | 0.6 | 1.9 | - | 610 / 691 | 1072 / 1244 |
| en-GB_JT4 | fast_default | 30 | 0 | 0.046 | 0.200 | 1.9 | 0.6 | 3.1 | - | 579 / 645 | 1038 / 1207 |
| en-GB_JT4 | fast_llm | 30 | 0 | 0.046 | 0.200 | 1.9 | 0.6 | 3.1 | - | 468 / 502 | 927 / 1065 |
| en-GB_JT4 | fast_mai | 30 | 0 | 0.063 | 0.233 | 1.9 | 0.6 | 3.7 | - | 462 / 571 | 921 / 1045 |
| en-GB_JT4 | realtime | 30 | 0 | 0.055 | 0.233 | 1.9 | 0.6 | 4.3 | 1325 / 1898 | -165 / 307 | 584 / 778 |
| en-GB_JT4 | realtime_refine | 30 | 0 | 0.046 | 0.200 | 1.9 | 0.6 | 3.1 | 1350 / 1918 | 233 / 681 | 1138 / 1306 |
| en-GB_JT4 | whisper_v3 | 30 | 0 | 0.046 | 0.200 | 1.9 | 0.6 | 3.1 | - | 616 / 672 | 1075 / 1244 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_en-GB_20260509_155254_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 6
- `trim_both`: 5
- `trim_first`: 5
- `trim_last`: 6

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| en-GB_DT1 | 1r_en-GB_female-DT1/make the map smaller.wav | skip | - | - |
| en-GB_DT1 | 1l_en-GB_male-DT1/Lower driver seat ventilation by 3 levels.wav | trim_both | 1.35 | 3.31 |
| en-GB_DT1 | 2l_en-GB_male-DT1/Open front row window to 60%.wav | skip | - | - |
| en-GB_DT1 | 1r_en-GB_female-DT1/Add Starbucks as a waypoint.wav | trim_both | 2.0 | 2.08 |
| en-GB_DT1 | 2r_en-GB_male-DT1/higher volume please.wav | trim_last | 1.45 | 2.21 |
| en-GB_DT1 | 2r_en-GB_female-DT1/Open rear row window.wav | trim_last | 1.06 | 2.46 |
| en-GB_DT2 | 1l_en-GB_male-DT2/Close front row window to half.wav | trim_both | 1.45 | 2.41 |
| en-GB_DT2 | 1r_en-GB_female-DT2/Switch the braking mode to standard.wav | trim_both | 1.29 | 2.45 |
| en-GB_DT2 | 2r_en-GB_male-DT2/Please reduce the ambient lights' brightness by 20 percent.wav | trim_first | 1.75 | 4.87 |
| en-GB_DT2 | 1r_en-GB_female-DT2/Enable automatic window closing when locking the car.wav | trim_last | 1.11 | 2.95 |
| en-GB_DT2 | 2l_en-GB_female-DT2/Fold in rearview Mirrors.wav | trim_first | 1.96 | 3.48 |
| en-GB_DT2 | 1l_en-GB_female-DT2/Enable Android AUTO.wav | trim_last | 1.32 | 2.72 |
| en-GB_DT2 | 1l_en-GB_female-DT2/Disable automatic ventilation when unlocking the car.wav | trim_last | 1.62 | 4.9 |
| en-GB_DT2 | 2r_en-GB_male-DT2/higher volume please.wav | skip | - | - |
| en-GB_DT2 | 1r_en-GB_female-DT2/Add Starbucks as a waypoint.wav | skip | - | - |
| en-GB_DT3 | 2l_en-GB_female-DT3/Fold in rearview Mirrors.wav | skip | - | - |
| en-GB_DT4 | 1r_en-GB_female-DT4/Switch the braking mode to standard.wav | trim_both | 1.27 | 2.51 |
| en-GB_DT4 | 1l_en-GB_male-DT4/Add a waypoint to the route.wav | trim_last | 1.03 | 2.11 |
| en-GB_DT4 | 1l_en-GB_female-DT4/Unmute the media.wav | trim_first | 2.31 | 2.51 |
| en-GB_JT2 | 1r_en-GB_female-JT2/Switch the braking mode to standard.wav | trim_first | 1.02 | 3.42 |

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