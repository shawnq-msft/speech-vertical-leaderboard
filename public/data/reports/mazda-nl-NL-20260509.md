# Mazda ASR Benchmark — mazda_nl-NL_20260509_165618.csv

Total rows: **1080**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **262.0 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["nl-NL"]}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/fast-transcription-create>

### `fast_mai` — Azure Fast Transcription — MAI model (preview)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2025-10-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["nl"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="nl-NL", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

## Datasets under test

- **nl-NL_DT1** — Mazda nl-NL DT1 voice commands (male + female pooled, 30 random samples)
- **nl-NL_DT2** — Mazda nl-NL DT2 voice commands (male + female pooled, 30 random samples)
- **nl-NL_DT3** — Mazda nl-NL DT3 voice commands (male + female pooled, 30 random samples)
- **nl-NL_DT4** — Mazda nl-NL DT4 voice commands (male + female pooled, 30 random samples)
- **nl-NL_DT5** — Mazda nl-NL DT5 voice commands (male + female pooled, 30 random samples)
- **nl-NL_JT1** — Mazda nl-NL JT1 voice commands (male + female pooled, 30 random samples)
- **nl-NL_JT2** — Mazda nl-NL JT2 voice commands (male + female pooled, 30 random samples)
- **nl-NL_JT3** — Mazda nl-NL JT3 voice commands (male + female pooled, 30 random samples)
- **nl-NL_JT4** — Mazda nl-NL JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| nl-NL_DT1 | fast_default | 30 | 0 | 0.220 | 0.467 | 1.5 | 9.1 | 9.8 | - | 1332 / 1420 | 1894 / 2070 |
| nl-NL_DT1 | fast_mai | 30 | 0 | 0.213 | 0.400 | 3.0 | 6.8 | 8.3 | - | 488 / 598 | 1001 / 1131 |
| nl-NL_DT1 | realtime | 30 | 0 | 0.215 | 0.533 | 0.8 | 9.8 | 9.8 | 1204 / 1670 | -23 / 103 | 684 / 853 |
| nl-NL_DT1 | whisper_v3 | 30 | 0 | 0.220 | 0.467 | 1.5 | 9.1 | 9.8 | - | 1389 / 2563 | 1952 / 3133 |
| nl-NL_DT2 | fast_default | 30 | 0 | 0.234 | 0.533 | 3.8 | 6.8 | 11.4 | - | 1182 / 1306 | 1731 / 1909 |
| nl-NL_DT2 | fast_mai | 30 | 0 | 0.170 | 0.267 | 3.8 | 3.8 | 7.6 | - | 469 / 563 | 997 / 1117 |
| nl-NL_DT2 | realtime | 30 | 0 | 0.192 | 0.433 | 3.0 | 6.8 | 9.1 | 1138 / 1290 | -22 / 92 | 687 / 941 |
| nl-NL_DT2 | whisper_v3 | 30 | 0 | 0.234 | 0.533 | 3.8 | 6.8 | 11.4 | - | 1174 / 1294 | 1723 / 1855 |
| nl-NL_DT3 | fast_default | 30 | 0 | 0.148 | 0.367 | 0.8 | 7.6 | 7.6 | - | 1167 / 1318 | 1808 / 1910 |
| nl-NL_DT3 | fast_mai | 30 | 0 | 0.175 | 0.367 | 2.3 | 6.1 | 9.1 | - | 463 / 542 | 966 / 1094 |
| nl-NL_DT3 | realtime | 30 | 0 | 0.161 | 0.367 | 1.5 | 9.1 | 5.3 | 1163 / 1315 | -16 / 98 | 649 / 741 |
| nl-NL_DT3 | whisper_v3 | 30 | 0 | 0.148 | 0.367 | 0.8 | 7.6 | 7.6 | - | 1178 / 1333 | 1819 / 1923 |
| nl-NL_DT4 | fast_default | 30 | 0 | 0.134 | 0.367 | 1.5 | 6.8 | 6.8 | - | 1175 / 1302 | 1729 / 1862 |
| nl-NL_DT4 | fast_mai | 30 | 0 | 0.142 | 0.333 | 0.8 | 6.1 | 6.8 | - | 487 / 599 | 999 / 1159 |
| nl-NL_DT4 | realtime | 30 | 0 | 0.191 | 0.467 | 0.8 | 10.6 | 7.6 | 1191 / 1325 | -36 / 90 | 657 / 735 |
| nl-NL_DT4 | whisper_v3 | 30 | 0 | 0.134 | 0.367 | 1.5 | 6.8 | 6.8 | - | 1171 / 1314 | 1725 / 1865 |
| nl-NL_DT5 | fast_default | 30 | 0 | 0.143 | 0.333 | 1.5 | 5.3 | 10.6 | - | 1151 / 1272 | 1697 / 1852 |
| nl-NL_DT5 | fast_mai | 30 | 0 | 0.170 | 0.367 | 1.5 | 5.3 | 7.6 | - | 459 / 515 | 965 / 1079 |
| nl-NL_DT5 | realtime | 30 | 0 | 0.143 | 0.333 | 0.8 | 6.8 | 8.3 | 1176 / 1329 | -4 / 97 | 664 / 747 |
| nl-NL_DT5 | whisper_v3 | 30 | 0 | 0.143 | 0.333 | 1.5 | 5.3 | 10.6 | - | 1157 / 1312 | 1702 / 1883 |
| nl-NL_JT1 | fast_default | 30 | 0 | 0.215 | 0.500 | 3.0 | 10.6 | 8.3 | - | 1157 / 1256 | 1822 / 1877 |
| nl-NL_JT1 | fast_mai | 30 | 0 | 0.280 | 0.533 | 9.1 | 6.8 | 12.9 | - | 469 / 577 | 923 / 1099 |
| nl-NL_JT1 | realtime | 30 | 0 | 0.219 | 0.500 | 2.3 | 12.1 | 8.3 | 1190 / 1397 | 5 / 126 | 707 / 819 |
| nl-NL_JT1 | whisper_v3 | 30 | 0 | 0.215 | 0.500 | 3.0 | 10.6 | 8.3 | - | 1161 / 1290 | 1826 / 2010 |
| nl-NL_JT2 | fast_default | 30 | 0 | 0.360 | 0.567 | 3.0 | 18.2 | 11.4 | - | 1187 / 1306 | 2175 / 4929 |
| nl-NL_JT2 | fast_mai | 30 | 0 | 0.310 | 0.533 | 4.5 | 9.8 | 12.9 | - | 518 / 596 | 948 / 1143 |
| nl-NL_JT2 | realtime | 30 | 0 | 0.328 | 0.533 | 0.0 | 18.2 | 10.6 | 1187 / 1308 | -12 / 104 | 690 / 823 |
| nl-NL_JT2 | whisper_v3 | 30 | 0 | 0.360 | 0.567 | 3.0 | 18.2 | 11.4 | - | 1184 / 1307 | 2172 / 4932 |
| nl-NL_JT3 | fast_default | 30 | 0 | 0.251 | 0.433 | 2.3 | 12.1 | 9.8 | - | 1149 / 1235 | 1703 / 1832 |
| nl-NL_JT3 | fast_mai | 30 | 0 | 0.242 | 0.400 | 3.8 | 4.5 | 13.6 | - | 511 / 600 | 998 / 1170 |
| nl-NL_JT3 | realtime | 30 | 0 | 0.255 | 0.467 | 2.3 | 12.9 | 9.8 | 1140 / 1291 | -10 / 76 | 659 / 746 |
| nl-NL_JT3 | whisper_v3 | 30 | 0 | 0.251 | 0.433 | 2.3 | 12.1 | 9.8 | - | 1151 / 1253 | 1705 / 1843 |
| nl-NL_JT4 | fast_default | 30 | 0 | 0.196 | 0.400 | 2.3 | 9.8 | 7.6 | - | 1129 / 1245 | 1687 / 1835 |
| nl-NL_JT4 | fast_mai | 30 | 0 | 0.216 | 0.367 | 9.1 | 2.3 | 12.1 | - | 468 / 591 | 981 / 1111 |
| nl-NL_JT4 | realtime | 30 | 0 | 0.191 | 0.367 | 2.3 | 9.8 | 7.6 | 1171 / 1332 | -11 / 104 | 700 / 844 |
| nl-NL_JT4 | whisper_v3 | 30 | 0 | 0.196 | 0.400 | 2.3 | 9.8 | 7.6 | - | 1134 / 1268 | 1692 / 1832 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_nl-NL_20260509_165618_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 27
- `trim_both`: 2
- `trim_first`: 7
- `trim_last`: 3

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| nl-NL_DT1 | 1l_nl-NL_male-DT1/136.Speel 100.7 FM af.wav | skip | - | - |
| nl-NL_DT1 | 1l_nl-NL_male-DT1/042.Slimme grootlichten inschakelen.wav | skip | - | - |
| nl-NL_DT1 | 1r_nl-NL_female-DT1/108.ga naar vorige pagina.wav | trim_both | 2.56 | 2.8 |
| nl-NL_DT2 | 1l_nl-NL_male-DT2/060.Automatisch parkeren inschakelen.wav | trim_last | 1.25 | 2.69 |
| nl-NL_DT2 | 1l_nl-NL_male-DT2/042.Slimme grootlichten inschakelen.wav | skip | - | - |
| nl-NL_DT2 | 2r_nl-NL_female-DT2/135.Radio afspelen.wav | trim_first | 1.35 | 2.63 |
| nl-NL_DT2 | 2r_nl-NL_male-DT2/100.Kaart weergeven.wav | trim_first | 2.02 | 2.06 |
| nl-NL_DT3 | 1l_nl-NL_male-DT3/042.Slimme grootlichten inschakelen.wav | skip | - | - |
| nl-NL_DT3 | 1r_nl-NL_female-DT3/108.ga naar vorige pagina.wav | skip | - | - |
| nl-NL_DT3 | 1r_nl-NL_female-DT3/019.Bestuurdersstoelverwarming inschakelen.wav | trim_first | 2.24 | 3.68 |
| nl-NL_DT4 | 1l_nl-NL_male-DT4/042.Slimme grootlichten inschakelen.wav | skip | - | - |
| nl-NL_DT4 | 2l_nl-NL_female-DT4/097.Beëindig scenariomodus aan passagierszijde.wav | trim_first | 1.82 | 4.14 |
| nl-NL_DT4 | 1r_nl-NL_female-DT4/141.Bluetooth-muziek uitschakelen.wav | skip | - | - |
| nl-NL_DT5 | 1l_nl-NL_male-DT5/042.Slimme grootlichten inschakelen.wav | skip | - | - |
| nl-NL_DT5 | 1r_nl-NL_female-DT5/108.ga naar vorige pagina.wav | trim_last | 2.34 | 2.58 |
| nl-NL_DT5 | 1r_nl-NL_female-DT5/019.Bestuurdersstoelverwarming inschakelen.wav | skip | - | - |
| nl-NL_JT1 | 1l_nl-NL_male-JT1/060.Automatisch parkeren inschakelen.wav | skip | - | - |
| nl-NL_JT1 | 1l_nl-NL_male-JT1/029.Stoelinstellingen openen.wav | skip | - | - |
| nl-NL_JT1 | 1l_nl-NL_male-JT1/042.Slimme grootlichten inschakelen.wav | skip | - | - |
| nl-NL_JT1 | 1r_nl-NL_female-JT1/019.Bestuurdersstoelverwarming inschakelen.wav | skip | - | - |

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