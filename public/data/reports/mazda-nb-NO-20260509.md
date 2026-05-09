# Mazda ASR Benchmark — mazda_nb-NO_20260509_162046.csv

Total rows: **1080**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **244.4 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["nb-NO"]}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/fast-transcription-create>

### `fast_mai` — Azure Fast Transcription — MAI model (preview)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2025-10-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["nb"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="nb-NO", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

## Datasets under test

- **nb-NO_DT1** — Mazda nb-NO DT1 voice commands (male + female pooled, 30 random samples)
- **nb-NO_DT2** — Mazda nb-NO DT2 voice commands (male + female pooled, 30 random samples)
- **nb-NO_DT3** — Mazda nb-NO DT3 voice commands (male + female pooled, 30 random samples)
- **nb-NO_DT4** — Mazda nb-NO DT4 voice commands (male + female pooled, 30 random samples)
- **nb-NO_DT5** — Mazda nb-NO DT5 voice commands (male + female pooled, 30 random samples)
- **nb-NO_JT1** — Mazda nb-NO JT1 voice commands (male + female pooled, 30 random samples)
- **nb-NO_JT2** — Mazda nb-NO JT2 voice commands (male + female pooled, 30 random samples)
- **nb-NO_JT3** — Mazda nb-NO JT3 voice commands (male + female pooled, 30 random samples)
- **nb-NO_JT4** — Mazda nb-NO JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| nb-NO_DT1 | fast_default | 30 | 0 | 0.464 | 0.700 | 12.5 | 10.2 | 26.6 | - | 614 / 762 | 1212 / 1517 |
| nb-NO_DT1 | fast_mai | 30 | 0 | 0.415 | 0.667 | 9.4 | 16.4 | 15.6 | - | 484 / 622 | 923 / 1122 |
| nb-NO_DT1 | realtime | 30 | 0 | 0.444 | 0.667 | 6.2 | 14.1 | 21.1 | 1140 / 1717 | 126 / 330 | 1055 / 1516 |
| nb-NO_DT1 | whisper_v3 | 30 | 0 | 0.464 | 0.700 | 12.5 | 10.2 | 26.6 | - | 595 / 682 | 1196 / 1421 |
| nb-NO_DT2 | fast_default | 30 | 0 | 0.504 | 0.867 | 10.9 | 11.7 | 27.3 | - | 607 / 719 | 1191 / 1248 |
| nb-NO_DT2 | fast_mai | 30 | 0 | 0.417 | 0.600 | 7.8 | 20.3 | 13.3 | - | 458 / 504 | 953 / 1074 |
| nb-NO_DT2 | realtime | 30 | 0 | 0.436 | 0.767 | 4.7 | 14.8 | 22.7 | 1267 / 1536 | 157 / 384 | 1118 / 1244 |
| nb-NO_DT2 | whisper_v3 | 30 | 0 | 0.504 | 0.867 | 10.9 | 11.7 | 27.3 | - | 614 / 712 | 1198 / 1303 |
| nb-NO_DT3 | fast_default | 30 | 0 | 0.526 | 0.733 | 5.5 | 18.8 | 29.7 | - | 607 / 679 | 1339 / 2047 |
| nb-NO_DT3 | fast_mai | 30 | 0 | 0.462 | 0.733 | 6.2 | 25.8 | 14.1 | - | 473 / 602 | 923 / 1153 |
| nb-NO_DT3 | realtime | 30 | 0 | 0.489 | 0.700 | 3.1 | 20.3 | 23.4 | 1149 / 1531 | 89 / 267 | 990 / 1059 |
| nb-NO_DT3 | whisper_v3 | 30 | 0 | 0.526 | 0.733 | 5.5 | 18.8 | 29.7 | - | 606 / 682 | 1338 / 2086 |
| nb-NO_DT4 | fast_default | 30 | 0 | 0.471 | 0.767 | 8.6 | 7.0 | 32.8 | - | 606 / 672 | 1243 / 1262 |
| nb-NO_DT4 | fast_mai | 30 | 0 | 0.416 | 0.667 | 11.7 | 7.0 | 25.0 | - | 473 / 575 | 962 / 1097 |
| nb-NO_DT4 | realtime | 30 | 0 | 0.413 | 0.733 | 5.5 | 10.2 | 24.2 | 1128 / 1522 | 85 / 496 | 1026 / 1345 |
| nb-NO_DT4 | whisper_v3 | 30 | 0 | 0.471 | 0.767 | 8.6 | 7.0 | 32.8 | - | 604 / 673 | 1240 / 1307 |
| nb-NO_DT5 | fast_default | 30 | 0 | 0.513 | 0.700 | 3.9 | 33.6 | 19.5 | - | 577 / 651 | 1370 / 2237 |
| nb-NO_DT5 | fast_mai | 30 | 0 | 0.562 | 0.700 | 7.8 | 39.1 | 17.2 | - | 454 / 564 | 884 / 1144 |
| nb-NO_DT5 | realtime | 30 | 0 | 0.491 | 0.733 | 3.1 | 31.2 | 19.5 | 1077 / 1248 | -20 / 300 | 1021 / 1263 |
| nb-NO_DT5 | whisper_v3 | 30 | 0 | 0.513 | 0.700 | 3.9 | 33.6 | 19.5 | - | 588 / 652 | 1339 / 1978 |
| nb-NO_JT1 | fast_default | 30 | 0 | 0.479 | 0.767 | 3.9 | 21.1 | 23.4 | - | 612 / 711 | 1350 / 2541 |
| nb-NO_JT1 | fast_mai | 30 | 0 | 0.404 | 0.533 | 7.0 | 27.3 | 9.4 | - | 472 / 566 | 938 / 1137 |
| nb-NO_JT1 | realtime | 30 | 0 | 0.459 | 0.700 | 3.9 | 21.9 | 17.2 | 1043 / 1465 | -39 / 166 | 941 / 1113 |
| nb-NO_JT1 | whisper_v3 | 30 | 0 | 0.479 | 0.767 | 3.9 | 21.1 | 23.4 | - | 609 / 679 | 1354 / 2799 |
| nb-NO_JT2 | fast_default | 30 | 0 | 0.672 | 0.833 | 1.6 | 45.3 | 23.4 | - | 580 / 668 | 1351 / 2322 |
| nb-NO_JT2 | fast_mai | 30 | 0 | 0.708 | 0.867 | 7.0 | 46.9 | 20.3 | - | 463 / 568 | 873 / 1084 |
| nb-NO_JT2 | realtime | 30 | 0 | 0.574 | 0.767 | 3.9 | 40.6 | 18.8 | 1053 / 1446 | -149 / 151 | 1084 / 1690 |
| nb-NO_JT2 | whisper_v3 | 30 | 0 | 0.672 | 0.833 | 1.6 | 45.3 | 23.4 | - | 556 / 658 | 1283 / 2079 |
| nb-NO_JT3 | fast_default | 30 | 0 | 0.439 | 0.633 | 3.9 | 19.5 | 21.9 | - | 606 / 716 | 1349 / 2198 |
| nb-NO_JT3 | fast_mai | 30 | 0 | 0.423 | 0.633 | 3.9 | 26.6 | 11.7 | - | 481 / 566 | 922 / 1101 |
| nb-NO_JT3 | realtime | 30 | 0 | 0.434 | 0.667 | 3.1 | 22.7 | 18.8 | 1097 / 1463 | -111 / 151 | 922 / 1053 |
| nb-NO_JT3 | whisper_v3 | 30 | 0 | 0.439 | 0.633 | 3.9 | 19.5 | 21.9 | - | 598 / 662 | 1339 / 2159 |
| nb-NO_JT4 | fast_default | 30 | 0 | 0.443 | 0.733 | 3.9 | 25.8 | 20.3 | - | 596 / 679 | 1278 / 1487 |
| nb-NO_JT4 | fast_mai | 30 | 0 | 0.431 | 0.600 | 5.5 | 33.6 | 9.4 | - | 458 / 506 | 902 / 1057 |
| nb-NO_JT4 | realtime | 30 | 0 | 0.432 | 0.733 | 0.8 | 28.1 | 17.2 | 1102 / 1558 | -92 / 181 | 996 / 1205 |
| nb-NO_JT4 | whisper_v3 | 30 | 0 | 0.443 | 0.733 | 3.9 | 25.8 | 20.3 | - | 596 / 686 | 1252 / 1511 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_nb-NO_20260509_162046_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 50
- `trim_both`: 9
- `trim_first`: 20
- `trim_last`: 19

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| nb-NO_DT1 | 1r_nb-NO_male-DT1/114.Endre ruteinnstilling til intelligent anbefaling.wav | trim_last | 1.97 | 2.94 |
| nb-NO_DT1 | 1r_nb-NO_male-DT1/008.Synkroniser temperaturer.wav | trim_first | 1.76 | 2.15 |
| nb-NO_DT1 | 1l_nb-NO_male-DT1/136.Spill av 100 7 FM.wav | skip | - | - |
| nb-NO_DT1 | 2r_nb-NO_male-DT1/067.Jeg vil åpne systeminnstillingene.wav | skip | - | - |
| nb-NO_DT1 | 1l_nb-NO_male-DT1/029.Åpne seteinntillingssiden.wav | trim_last | 1.11 | 2.26 |
| nb-NO_DT1 | 1l_nb-NO_female-DT1/066.Åpne visningen for energiforbrukskurven.wav | trim_last | 1.13 | 3.06 |
| nb-NO_DT1 | 1r_nb-NO_male-DT1/027.Kan du flytte seteryggen helt fremover.wav | skip | - | - |
| nb-NO_DT1 | 2r_nb-NO_male-DT1/100.Vis kart.wav | skip | - | - |
| nb-NO_DT1 | 1r_nb-NO_female-DT1/027.Kan du flytte seteryggen helt fremover.wav | skip | - | - |
| nb-NO_DT1 | 2l_nb-NO_female-DT1/097.Avslutt scenariomodus på passasjersiden.wav | trim_last | 1.0 | 2.94 |
| nb-NO_DT1 | 1r_nb-NO_female-DT1/019.Aktiver setevarme for førersetet.wav | skip | - | - |
| nb-NO_DT1 | 1r_nb-NO_female-DT1/141.Slå av bluetooth-musikk.wav | trim_first | 1.66 | 2.05 |
| nb-NO_DT2 | 1l_nb-NO_male-DT2/079.Juster ringetonevolum til 5 nivåer.wav | trim_first | 1.77 | 3.73 |
| nb-NO_DT2 | 1l_nb-NO_male-DT2/029.Åpne seteinntillingssiden.wav | trim_first | 1.7 | 2.91 |
| nb-NO_DT2 | 2r_nb-NO_female-DT2/135.Spill radio.wav | trim_last | 1.2 | 1.79 |
| nb-NO_DT2 | 2r_nb-NO_male-DT2/100.Vis kart.wav | skip | - | - |
| nb-NO_DT2 | 1r_nb-NO_male-DT2/120.Legg til Starbucks som et veipunkt.wav | trim_last | 2.25 | 2.7 |
| nb-NO_DT2 | 1r_nb-NO_female-DT2/027.Kan du flytte seteryggen helt fremover.wav | skip | - | - |
| nb-NO_DT2 | 2l_nb-NO_male-DT2/116.Bytt til raskeste rute.wav | trim_first | 1.61 | 2.57 |
| nb-NO_DT2 | 2l_nb-NO_female-DT2/097.Avslutt scenariomodus på passasjersiden.wav | skip | - | - |

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