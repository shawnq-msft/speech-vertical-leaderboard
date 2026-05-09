# Mazda ASR Benchmark — mazda_sv-SE_20260509_165620.csv

Total rows: **1080**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **245.7 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["sv-SE"]}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/fast-transcription-create>

### `fast_mai` — Azure Fast Transcription — MAI model (preview)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2025-10-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["sv"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="sv-SE", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

## Datasets under test

- **sv-SE_DT1** — Mazda sv-SE DT1 voice commands (male + female pooled, 30 random samples)
- **sv-SE_DT2** — Mazda sv-SE DT2 voice commands (male + female pooled, 30 random samples)
- **sv-SE_DT3** — Mazda sv-SE DT3 voice commands (male + female pooled, 30 random samples)
- **sv-SE_DT4** — Mazda sv-SE DT4 voice commands (male + female pooled, 30 random samples)
- **sv-SE_DT5** — Mazda sv-SE DT5 voice commands (male + female pooled, 30 random samples)
- **sv-SE_JT1** — Mazda sv-SE JT1 voice commands (male + female pooled, 30 random samples)
- **sv-SE_JT2** — Mazda sv-SE JT2 voice commands (male + female pooled, 30 random samples)
- **sv-SE_JT3** — Mazda sv-SE JT3 voice commands (male + female pooled, 30 random samples)
- **sv-SE_JT4** — Mazda sv-SE JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| sv-SE_DT1 | fast_default | 30 | 0 | 0.500 | 0.867 | 8.5 | 5.4 | 38.0 | - | 926 / 1010 | 1596 / 2439 |
| sv-SE_DT1 | fast_mai | 30 | 0 | 0.298 | 0.600 | 10.1 | 3.9 | 17.8 | - | 487 / 648 | 957 / 1164 |
| sv-SE_DT1 | realtime | 30 | 0 | 0.518 | 0.900 | 8.5 | 5.4 | 38.0 | 1386 / 1572 | -622 / -320 | 931 / 1021 |
| sv-SE_DT1 | whisper_v3 | 30 | 0 | 0.500 | 0.867 | 8.5 | 5.4 | 38.0 | - | 921 / 1004 | 1591 / 2606 |
| sv-SE_DT2 | fast_default | 30 | 0 | 0.539 | 0.867 | 10.9 | 7.0 | 36.4 | - | 881 / 979 | 1520 / 2005 |
| sv-SE_DT2 | fast_mai | 30 | 0 | 0.434 | 0.667 | 13.2 | 7.0 | 24.0 | - | 499 / 663 | 988 / 1214 |
| sv-SE_DT2 | realtime | 30 | 0 | 0.585 | 0.900 | 13.2 | 7.0 | 43.4 | 1375 / 1484 | -572 / -287 | 1014 / 1336 |
| sv-SE_DT2 | whisper_v3 | 30 | 0 | 0.539 | 0.867 | 10.9 | 7.0 | 36.4 | - | 941 / 985 | 1580 / 2601 |
| sv-SE_DT3 | fast_default | 30 | 0 | 0.477 | 0.867 | 7.0 | 6.2 | 30.2 | - | 899 / 968 | 1539 / 2055 |
| sv-SE_DT3 | fast_mai | 30 | 0 | 0.226 | 0.500 | 3.1 | 1.6 | 17.1 | - | 470 / 543 | 967 / 1081 |
| sv-SE_DT3 | realtime | 30 | 0 | 0.463 | 0.900 | 6.2 | 6.2 | 31.0 | 1361 / 1722 | -509 / -172 | 981 / 1130 |
| sv-SE_DT3 | whisper_v3 | 30 | 0 | 0.477 | 0.867 | 7.0 | 6.2 | 30.2 | - | 903 / 1009 | 1542 / 2067 |
| sv-SE_DT4 | fast_default | 30 | 0 | 0.485 | 0.833 | 7.0 | 8.5 | 32.6 | - | 874 / 989 | 1456 / 1564 |
| sv-SE_DT4 | fast_mai | 30 | 0 | 0.418 | 0.767 | 10.1 | 2.3 | 29.5 | - | 478 / 587 | 1006 / 1090 |
| sv-SE_DT4 | realtime | 30 | 0 | 0.514 | 0.833 | 7.0 | 9.3 | 37.2 | 1402 / 1606 | -578 / -189 | 961 / 1100 |
| sv-SE_DT4 | whisper_v3 | 30 | 0 | 0.485 | 0.833 | 7.0 | 8.5 | 32.6 | - | 872 / 953 | 1454 / 1498 |
| sv-SE_DT5 | fast_default | 30 | 0 | 0.399 | 0.767 | 3.1 | 4.7 | 30.2 | - | 883 / 1008 | 1451 / 1525 |
| sv-SE_DT5 | fast_mai | 30 | 0 | 0.339 | 0.733 | 4.7 | 3.1 | 23.3 | - | 475 / 531 | 988 / 1070 |
| sv-SE_DT5 | realtime | 30 | 0 | 0.465 | 0.833 | 7.8 | 4.7 | 34.1 | 1368 / 1514 | -527 / -219 | 981 / 1052 |
| sv-SE_DT5 | whisper_v3 | 30 | 0 | 0.399 | 0.767 | 3.1 | 4.7 | 30.2 | - | 882 / 981 | 1450 / 1525 |
| sv-SE_JT1 | fast_default | 30 | 0 | 0.376 | 0.800 | 6.2 | 4.7 | 24.8 | - | 891 / 1010 | 1491 / 1613 |
| sv-SE_JT1 | fast_mai | 30 | 0 | 0.186 | 0.533 | 2.3 | 0.8 | 12.4 | - | 464 / 541 | 981 / 1121 |
| sv-SE_JT1 | realtime | 30 | 0 | 0.390 | 0.867 | 6.2 | 3.9 | 27.9 | 1336 / 1433 | -537 / -198 | 925 / 1002 |
| sv-SE_JT1 | whisper_v3 | 30 | 0 | 0.376 | 0.800 | 6.2 | 4.7 | 24.8 | - | 891 / 968 | 1492 / 1536 |
| sv-SE_JT2 | fast_default | 30 | 0 | 0.495 | 0.900 | 7.8 | 8.5 | 32.6 | - | 932 / 1025 | 1579 / 2412 |
| sv-SE_JT2 | fast_mai | 30 | 0 | 0.278 | 0.567 | 3.1 | 3.1 | 19.4 | - | 479 / 572 | 944 / 1085 |
| sv-SE_JT2 | realtime | 30 | 0 | 0.479 | 0.867 | 7.8 | 7.0 | 32.6 | 1364 / 1470 | -601 / -335 | 928 / 1082 |
| sv-SE_JT2 | whisper_v3 | 30 | 0 | 0.495 | 0.900 | 7.8 | 8.5 | 32.6 | - | 893 / 1009 | 1540 / 2282 |
| sv-SE_JT3 | fast_default | 30 | 0 | 0.328 | 0.667 | 6.2 | 3.9 | 21.7 | - | 883 / 950 | 1517 / 1983 |
| sv-SE_JT3 | fast_mai | 30 | 0 | 0.152 | 0.400 | 3.9 | 0.8 | 10.1 | - | 472 / 566 | 962 / 1140 |
| sv-SE_JT3 | realtime | 30 | 0 | 0.350 | 0.667 | 7.0 | 2.3 | 25.6 | 1358 / 1476 | -532 / -195 | 945 / 996 |
| sv-SE_JT3 | whisper_v3 | 30 | 0 | 0.328 | 0.667 | 6.2 | 3.9 | 21.7 | - | 880 / 980 | 1514 / 1984 |
| sv-SE_JT4 | fast_default | 30 | 0 | 0.332 | 0.700 | 5.4 | 4.7 | 22.5 | - | 875 / 935 | 1418 / 1498 |
| sv-SE_JT4 | fast_mai | 30 | 0 | 0.142 | 0.367 | 3.1 | 0.8 | 8.5 | - | 478 / 584 | 1021 / 1145 |
| sv-SE_JT4 | realtime | 30 | 0 | 0.364 | 0.800 | 5.4 | 3.1 | 27.9 | 1382 / 1667 | -532 / -196 | 938 / 1051 |
| sv-SE_JT4 | whisper_v3 | 30 | 0 | 0.332 | 0.700 | 5.4 | 4.7 | 22.5 | - | 890 / 929 | 1433 / 1520 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_sv-SE_20260509_165620_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 21
- `trim_both`: 30
- `trim_first`: 30
- `trim_last`: 22

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| sv-SE_DT1 | 2r_sv-SE_male-DT1/Sätesventilation till nivå 5.wav | trim_both | 2.22 | 4.18 |
| sv-SE_DT1 | 2r_sv-SE_male-DT1/Minimera ljusstyrkan på mittdisplayen.wav | skip | - | - |
| sv-SE_DT1 | 1r_sv-SE_male-DT1/Kan du dra förarsätet bakåt.wav | trim_last | 1.91 | 3.27 |
| sv-SE_DT1 | 2r_sv-SE_male-DT1/Sänk ventilationen för förarsätet.wav | trim_both | 2.31 | 3.39 |
| sv-SE_DT1 | 1l_sv-SE_male-DT1/högre volym tack.wav | trim_first | 2.28 | 3.08 |
| sv-SE_DT1 | 2r_sv-SE_male-DT1/Aktivera höger bak Aktivera sätesventilation.wav | skip | - | - |
| sv-SE_DT1 | 1l_sv-SE_male-DT1/Skjut sätet framåt.wav | trim_first | 2.37 | 2.97 |
| sv-SE_DT1 | 2r_sv-SE_male-DT1/Bakruteavfrostning.wav | trim_first | 2.4 | 3.08 |
| sv-SE_DT1 | 1l_sv-SE_male-DT1/Flytta dynan till nedersta läget.wav | trim_first | 2.23 | 3.87 |
| sv-SE_DT1 | 2r_sv-SE_male-DT1/Stäng av Apple Carplay för passageraren.wav | trim_first | 2.04 | 4.16 |
| sv-SE_DT1 | 1r_sv-SE_male-DT1/Fäll in backspeglar.wav | skip | - | - |
| sv-SE_DT1 | 2l_sv-SE_male-DT1/Höj förarens dyna lite.wav | skip | - | - |
| sv-SE_DT2 | 2r_sv-SE_male-DT2/Minimera ljusstyrkan på mittdisplayen.wav | trim_both | 2.38 | 4.06 |
| sv-SE_DT2 | 1l_sv-SE_male-DT2/Byt visningsläge till mörkt.wav | trim_first | 2.58 | 3.5 |
| sv-SE_DT2 | 2r_sv-SE_male-DT2/Sätesventilation till nivå 5.wav | trim_both | 2.16 | 4.2 |
| sv-SE_DT2 | 1l_sv-SE_male-DT2/Stäng av luftrening.wav | trim_first | 2.07 | 3.19 |
| sv-SE_DT2 | 2r_sv-SE_male-DT2/Sänk ventilationen för förarsätet.wav | skip | - | - |
| sv-SE_DT2 | 2l_sv-SE_male-DT2/Ta ett foto.wav | trim_both | 1.79 | 1.95 |
| sv-SE_DT2 | 1l_sv-SE_male-DT2/Minska värmen i vänster baksäte något.wav | trim_last | 1.78 | 3.02 |
| sv-SE_DT2 | 2r_sv-SE_male-DT2/Aktivera höger bak Aktivera sätesventilation.wav | trim_last | 1.69 | 4.29 |

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