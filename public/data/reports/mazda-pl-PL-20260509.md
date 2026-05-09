# Mazda ASR Benchmark — mazda_pl-PL_20260509_165619.csv

Total rows: **1080**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **258.5 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["pl-PL"]}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/fast-transcription-create>

### `fast_mai` — Azure Fast Transcription — MAI model (preview)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2025-10-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["pl"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="pl-PL", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

## Datasets under test

- **pl-PL_DT1** — Mazda pl-PL DT1 voice commands (male + female pooled, 30 random samples)
- **pl-PL_DT2** — Mazda pl-PL DT2 voice commands (male + female pooled, 30 random samples)
- **pl-PL_DT3** — Mazda pl-PL DT3 voice commands (male + female pooled, 30 random samples)
- **pl-PL_DT4** — Mazda pl-PL DT4 voice commands (male + female pooled, 30 random samples)
- **pl-PL_DT5** — Mazda pl-PL DT5 voice commands (male + female pooled, 30 random samples)
- **pl-PL_JT1** — Mazda pl-PL JT1 voice commands (male + female pooled, 30 random samples)
- **pl-PL_JT2** — Mazda pl-PL JT2 voice commands (male + female pooled, 30 random samples)
- **pl-PL_JT3** — Mazda pl-PL JT3 voice commands (male + female pooled, 30 random samples)
- **pl-PL_JT4** — Mazda pl-PL JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| pl-PL_DT1 | fast_default | 30 | 0 | 0.110 | 0.333 | 0.0 | 2.9 | 8.8 | - | 903 / 954 | 1479 / 1526 |
| pl-PL_DT1 | fast_mai | 30 | 0 | 0.056 | 0.200 | 0.0 | 0.0 | 5.8 | - | 496 / 560 | 1014 / 1120 |
| pl-PL_DT1 | realtime | 30 | 0 | 0.134 | 0.367 | 0.0 | 4.4 | 9.5 | 1300 / 1468 | -599 / -410 | 909 / 1047 |
| pl-PL_DT1 | whisper_v3 | 30 | 0 | 0.110 | 0.333 | 0.0 | 2.9 | 8.8 | - | 933 / 1023 | 1509 / 1666 |
| pl-PL_DT2 | fast_default | 30 | 0 | 0.178 | 0.400 | 0.0 | 2.2 | 14.6 | - | 875 / 1012 | 1446 / 1622 |
| pl-PL_DT2 | fast_mai | 30 | 0 | 0.092 | 0.267 | 0.0 | 0.7 | 8.0 | - | 468 / 549 | 989 / 1070 |
| pl-PL_DT2 | realtime | 30 | 0 | 0.175 | 0.467 | 0.7 | 3.6 | 12.4 | 1329 / 1456 | -594 / -364 | 924 / 1032 |
| pl-PL_DT2 | whisper_v3 | 30 | 0 | 0.178 | 0.400 | 0.0 | 2.2 | 14.6 | - | 890 / 1049 | 1461 / 1610 |
| pl-PL_DT3 | fast_default | 30 | 0 | 0.117 | 0.367 | 0.0 | 2.2 | 8.8 | - | 871 / 992 | 1416 / 1521 |
| pl-PL_DT3 | fast_mai | 30 | 0 | 0.067 | 0.200 | 0.7 | 0.0 | 6.6 | - | 486 / 544 | 1032 / 1104 |
| pl-PL_DT3 | realtime | 30 | 0 | 0.164 | 0.433 | 0.0 | 2.9 | 12.4 | 1253 / 1455 | -614 / -387 | 865 / 970 |
| pl-PL_DT3 | whisper_v3 | 30 | 0 | 0.117 | 0.367 | 0.0 | 2.2 | 8.8 | - | 871 / 933 | 1416 / 1494 |
| pl-PL_DT4 | fast_default | 30 | 0 | 0.131 | 0.400 | 0.7 | 0.7 | 10.9 | - | 874 / 960 | 1455 / 1550 |
| pl-PL_DT4 | fast_mai | 30 | 0 | 0.047 | 0.167 | 0.0 | 0.0 | 4.4 | - | 479 / 578 | 1004 / 1139 |
| pl-PL_DT4 | realtime | 30 | 0 | 0.158 | 0.400 | 0.7 | 0.0 | 11.7 | 1281 / 1446 | -610 / -418 | 908 / 1016 |
| pl-PL_DT4 | whisper_v3 | 30 | 0 | 0.131 | 0.400 | 0.7 | 0.7 | 10.9 | - | 885 / 971 | 1466 / 1548 |
| pl-PL_DT5 | fast_default | 30 | 0 | 0.106 | 0.300 | 0.7 | 1.5 | 10.2 | - | 874 / 964 | 1413 / 1519 |
| pl-PL_DT5 | fast_mai | 30 | 0 | 0.047 | 0.167 | 0.0 | 0.0 | 5.1 | - | 489 / 592 | 1029 / 1103 |
| pl-PL_DT5 | realtime | 30 | 0 | 0.120 | 0.400 | 0.7 | 0.7 | 12.4 | 1287 / 1430 | -564 / -302 | 919 / 1025 |
| pl-PL_DT5 | whisper_v3 | 30 | 0 | 0.106 | 0.300 | 0.7 | 1.5 | 10.2 | - | 878 / 975 | 1418 / 1521 |
| pl-PL_JT1 | fast_default | 30 | 0 | 0.102 | 0.333 | 1.5 | 0.7 | 8.8 | - | 869 / 965 | 1410 / 1525 |
| pl-PL_JT1 | fast_mai | 30 | 0 | 0.041 | 0.167 | 0.0 | 0.0 | 4.4 | - | 485 / 548 | 1026 / 1088 |
| pl-PL_JT1 | realtime | 30 | 0 | 0.093 | 0.333 | 0.7 | 0.7 | 8.8 | 1277 / 1435 | -595 / -315 | 884 / 1013 |
| pl-PL_JT1 | whisper_v3 | 30 | 0 | 0.102 | 0.333 | 1.5 | 0.7 | 8.8 | - | 871 / 995 | 1413 / 1536 |
| pl-PL_JT2 | fast_default | 30 | 0 | 0.121 | 0.367 | 0.0 | 1.5 | 10.9 | - | 869 / 993 | 1412 / 1539 |
| pl-PL_JT2 | fast_mai | 30 | 0 | 0.069 | 0.200 | 0.0 | 0.7 | 5.8 | - | 479 / 540 | 1022 / 1104 |
| pl-PL_JT2 | realtime | 30 | 0 | 0.128 | 0.400 | 0.0 | 1.5 | 11.7 | 1284 / 1443 | -597 / -397 | 904 / 1023 |
| pl-PL_JT2 | whisper_v3 | 30 | 0 | 0.121 | 0.367 | 0.0 | 1.5 | 10.9 | - | 870 / 1010 | 1414 / 1516 |
| pl-PL_JT3 | fast_default | 30 | 0 | 0.066 | 0.233 | 0.0 | 0.7 | 6.6 | - | 864 / 931 | 1433 / 1502 |
| pl-PL_JT3 | fast_mai | 30 | 0 | 0.053 | 0.200 | 0.0 | 0.7 | 5.1 | - | 502 / 599 | 1028 / 1159 |
| pl-PL_JT3 | realtime | 30 | 0 | 0.082 | 0.300 | 0.7 | 0.7 | 7.3 | 1285 / 1427 | -593 / -325 | 877 / 1010 |
| pl-PL_JT3 | whisper_v3 | 30 | 0 | 0.066 | 0.233 | 0.0 | 0.7 | 6.6 | - | 868 / 949 | 1436 / 1539 |
| pl-PL_JT4 | fast_default | 30 | 0 | 0.101 | 0.300 | 0.0 | 2.2 | 8.8 | - | 867 / 966 | 1413 / 1537 |
| pl-PL_JT4 | fast_mai | 30 | 0 | 0.060 | 0.200 | 0.0 | 0.0 | 6.6 | - | 497 / 646 | 1043 / 1177 |
| pl-PL_JT4 | realtime | 30 | 0 | 0.081 | 0.300 | 0.0 | 0.7 | 8.0 | 1296 / 1468 | -577 / -340 | 901 / 1018 |
| pl-PL_JT4 | whisper_v3 | 30 | 0 | 0.101 | 0.300 | 0.0 | 2.2 | 8.8 | - | 899 / 1000 | 1445 / 1586 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_pl-PL_20260509_165619_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 4
- `trim_both`: 5
- `trim_first`: 5
- `trim_last`: 2

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| pl-PL_DT1 | 1r_pl-PL_female-DT1/Dostosuj głośność do 5 poziomów.wav | trim_both | 3.08 | 3.68 |
| pl-PL_DT1 | 1r_pl-PL_female-DT1/jaka jest nasza aktualna lokalizacja.wav | skip | - | - |
| pl-PL_DT2 | 1r_pl-PL_female-DT2/Otwórz tylną klapę.wav | trim_last | 1.68 | 2.56 |
| pl-PL_DT2 | 2r_pl-PL_female-DT2/Włącz cyrkulację zewnętrzną.wav | trim_both | 2.43 | 3.11 |
| pl-PL_DT2 | 1l_pl-PL_female-DT2/Niebieskie światło otoczenia.wav | trim_first | 2.3 | 3.98 |
| pl-PL_DT2 | 1r_pl-PL_female-DT2/Dostosuj głośność do 5 poziomów.wav | trim_both | 2.57 | 3.69 |
| pl-PL_DT2 | 1r_pl-PL_female-DT2/Dostosuj głośność dzwonka do 5 poziomu.wav | skip | - | - |
| pl-PL_DT3 | 1r_pl-PL_female-DT3/Otwórz tylną klapę.wav | trim_first | 2.55 | 3.23 |
| pl-PL_DT3 | 1r_pl-PL_female-DT3/Dostosuj głośność do 5 poziomów.wav | trim_first | 3.67 | 4.23 |
| pl-PL_DT3 | 1r_pl-PL_female-DT3/Aktywuj kierowcę Aktywuj wentylację siedzenia.wav | trim_first | 2.58 | 4.94 |
| pl-PL_DT4 | 2r_pl-PL_female-DT4/Ostatni.wav | skip | - | - |
| pl-PL_DT4 | 2r_pl-PL_female-DT4/Włącz cyrkulację zewnętrzną.wav | trim_both | 2.43 | 3.27 |
| pl-PL_DT5 | 1r_pl-PL_female-DT5/Dostosuj głośność do 5 poziomów.wav | trim_last | 2.03 | 3.67 |
| pl-PL_JT2 | 1r_pl-PL_female-JT2/Otwórz tylną klapę.wav | trim_first | 2.56 | 3.08 |
| pl-PL_JT3 | 2r_pl-PL_female-JT3/Włącz cyrkulację zewnętrzną.wav | skip | - | - |
| pl-PL_JT4 | 1r_pl-PL_female-JT4/Dostosuj głośność do 5 poziomów.wav | trim_both | 2.55 | 3.67 |

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