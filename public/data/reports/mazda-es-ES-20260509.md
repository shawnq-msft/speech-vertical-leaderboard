# Mazda ASR Benchmark — mazda_es-ES_20260509_155256.csv

Total rows: **1620**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **253.2 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["es-ES"]}`
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
- Config: `definition = {"locales": ["es"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="es-ES", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

### `realtime_refine` — Azure Speech SDK — continuous + Post-Stream Refinement (MRS preview)
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK (>=1.49.0)
- Config: `PushAudioInputStream, language="es-ES", continuous, PostProcessingOption="PostRefinement"`
- Partial results: yes (recognizing/recognized events; final replaced after refinement)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>
- Note: Requires Speech SDK >= 1.49.0 and a Speech resource in a region where Multi-Recognizer / Post-Stream Refinement public preview is enabled (East US / North Europe rollout). Falls back to non-MRS behavior if PostProcessingOption is not set.

## Datasets under test

- **es-ES_DT1** — Mazda es-ES DT1 voice commands (male + female pooled, 30 random samples)
- **es-ES_DT2** — Mazda es-ES DT2 voice commands (male + female pooled, 30 random samples)
- **es-ES_DT3** — Mazda es-ES DT3 voice commands (male + female pooled, 30 random samples)
- **es-ES_DT4** — Mazda es-ES DT4 voice commands (male + female pooled, 30 random samples)
- **es-ES_DT5** — Mazda es-ES DT5 voice commands (male + female pooled, 30 random samples)
- **es-ES_JT1** — Mazda es-ES JT1 voice commands (male + female pooled, 30 random samples)
- **es-ES_JT2** — Mazda es-ES JT2 voice commands (male + female pooled, 30 random samples)
- **es-ES_JT3** — Mazda es-ES JT3 voice commands (male + female pooled, 30 random samples)
- **es-ES_JT4** — Mazda es-ES JT4 voice commands (male + female pooled, 30 random samples)

## Results

WER breakdown columns are *rates per 100 reference words*. Per-row WER ≈ (INS + DEL + SUB) / ref_len (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | WER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| es-ES_DT1 | fast_default | 30 | 0 | 0.116 | 0.367 | 1.0 | 2.6 | 6.3 | - | 665 / 735 | 1230 / 1691 |
| es-ES_DT1 | fast_llm | 30 | 0 | 0.131 | 0.333 | 2.1 | 2.6 | 6.3 | - | 494 / 544 | 1060 / 1140 |
| es-ES_DT1 | fast_mai | 30 | 0 | 0.094 | 0.267 | 1.0 | 1.0 | 5.2 | - | 481 / 609 | 988 / 1115 |
| es-ES_DT1 | realtime | 30 | 0 | 0.200 | 0.433 | 0.5 | 8.9 | 6.8 | 1391 / 1703 | -143 / 15 | 708 / 911 |
| es-ES_DT1 | realtime_refine | 30 | 0 | 0.141 | 0.433 | 2.1 | 2.1 | 7.9 | 1447 / 1873 | 322 / 565 | 1099 / 1236 |
| es-ES_DT1 | whisper_v3 | 30 | 0 | 0.116 | 0.367 | 1.0 | 2.6 | 6.3 | - | 665 / 667 | 1229 / 1677 |
| es-ES_DT2 | fast_default | 30 | 0 | 0.126 | 0.300 | 0.5 | 6.3 | 3.1 | - | 632 / 691 | 1258 / 1524 |
| es-ES_DT2 | fast_llm | 30 | 0 | 0.124 | 0.267 | 0.0 | 4.7 | 4.2 | - | 482 / 528 | 1124 / 1393 |
| es-ES_DT2 | fast_mai | 30 | 0 | 0.142 | 0.300 | 0.0 | 3.7 | 5.8 | - | 486 / 587 | 935 / 1103 |
| es-ES_DT2 | realtime | 30 | 0 | 0.261 | 0.367 | 0.5 | 19.4 | 2.6 | 1359 / 1555 | -113 / 16 | 722 / 836 |
| es-ES_DT2 | realtime_refine | 30 | 0 | 0.125 | 0.333 | 0.5 | 4.7 | 5.2 | 1423 / 1708 | 275 / 446 | 1047 / 1206 |
| es-ES_DT2 | whisper_v3 | 30 | 0 | 0.126 | 0.300 | 0.5 | 6.3 | 3.1 | - | 627 / 697 | 1253 / 1456 |
| es-ES_DT3 | fast_default | 30 | 0 | 0.036 | 0.167 | 0.0 | 2.6 | 1.0 | - | 601 / 648 | 1150 / 1206 |
| es-ES_DT3 | fast_llm | 30 | 0 | 0.070 | 0.200 | 0.0 | 4.2 | 1.6 | - | 493 / 592 | 1042 / 1147 |
| es-ES_DT3 | fast_mai | 30 | 0 | 0.041 | 0.167 | 1.0 | 0.0 | 2.6 | - | 489 / 661 | 1038 / 1162 |
| es-ES_DT3 | realtime | 30 | 0 | 0.087 | 0.333 | 0.0 | 3.7 | 4.2 | 1299 / 1423 | -124 / -14 | 655 / 752 |
| es-ES_DT3 | realtime_refine | 30 | 0 | 0.073 | 0.300 | 0.5 | 2.1 | 3.1 | 1368 / 1585 | 315 / 464 | 1000 / 1166 |
| es-ES_DT3 | whisper_v3 | 30 | 0 | 0.036 | 0.167 | 0.0 | 2.6 | 1.0 | - | 611 / 680 | 1160 / 1240 |
| es-ES_DT4 | fast_default | 30 | 0 | 0.129 | 0.300 | 1.0 | 2.1 | 5.8 | - | 601 / 708 | 1164 / 1325 |
| es-ES_DT4 | fast_llm | 30 | 0 | 0.122 | 0.233 | 0.0 | 2.6 | 5.2 | - | 494 / 541 | 1098 / 1337 |
| es-ES_DT4 | fast_mai | 30 | 0 | 0.102 | 0.267 | 0.0 | 2.1 | 4.2 | - | 471 / 600 | 952 / 1101 |
| es-ES_DT4 | realtime | 30 | 0 | 0.227 | 0.433 | 1.0 | 14.1 | 3.7 | 1384 / 1601 | -160 / 20 | 691 / 882 |
| es-ES_DT4 | realtime_refine | 30 | 0 | 0.127 | 0.333 | 1.0 | 1.6 | 6.3 | 1408 / 1623 | 312 / 463 | 1052 / 1190 |
| es-ES_DT4 | whisper_v3 | 30 | 0 | 0.129 | 0.300 | 1.0 | 2.1 | 5.8 | - | 594 / 664 | 1157 / 1224 |
| es-ES_DT5 | fast_default | 30 | 0 | 0.089 | 0.367 | 0.5 | 1.6 | 5.8 | - | 613 / 643 | 1161 / 1207 |
| es-ES_DT5 | fast_llm | 30 | 0 | 0.098 | 0.267 | 0.0 | 4.7 | 3.7 | - | 484 / 553 | 1032 / 1093 |
| es-ES_DT5 | fast_mai | 30 | 0 | 0.048 | 0.200 | 0.0 | 1.6 | 2.1 | - | 477 / 545 | 1025 / 1097 |
| es-ES_DT5 | realtime | 30 | 0 | 0.106 | 0.333 | 0.5 | 4.2 | 4.7 | 1342 / 1558 | -131 / -16 | 677 / 842 |
| es-ES_DT5 | realtime_refine | 30 | 0 | 0.089 | 0.433 | 0.0 | 2.1 | 6.3 | 1376 / 1584 | 284 / 432 | 993 / 1143 |
| es-ES_DT5 | whisper_v3 | 30 | 0 | 0.089 | 0.367 | 0.5 | 1.6 | 5.8 | - | 615 / 642 | 1163 / 1205 |
| es-ES_JT1 | fast_default | 30 | 0 | 0.069 | 0.233 | 0.0 | 4.7 | 2.1 | - | 596 / 650 | 1173 / 1249 |
| es-ES_JT1 | fast_llm | 30 | 0 | 0.060 | 0.167 | 0.0 | 3.1 | 1.6 | - | 489 / 532 | 1070 / 1128 |
| es-ES_JT1 | fast_mai | 30 | 0 | 0.078 | 0.300 | 0.0 | 2.6 | 3.7 | - | 455 / 533 | 973 / 1057 |
| es-ES_JT1 | realtime | 30 | 0 | 0.167 | 0.367 | 0.5 | 9.4 | 4.2 | 1558 / 1615 | -16 / 70 | 796 / 899 |
| es-ES_JT1 | realtime_refine | 30 | 0 | 0.081 | 0.267 | 0.0 | 5.2 | 2.6 | 1428 / 1651 | 306 / 466 | 1024 / 1137 |
| es-ES_JT1 | whisper_v3 | 30 | 0 | 0.069 | 0.233 | 0.0 | 4.7 | 2.1 | - | 591 / 639 | 1169 / 1231 |
| es-ES_JT2 | fast_default | 30 | 0 | 0.195 | 0.467 | 0.0 | 7.3 | 11.0 | - | 589 / 670 | 1242 / 1467 |
| es-ES_JT2 | fast_llm | 30 | 0 | 0.223 | 0.433 | 8.4 | 5.8 | 11.0 | - | 487 / 526 | 1131 / 1562 |
| es-ES_JT2 | fast_mai | 30 | 0 | 0.208 | 0.333 | 1.0 | 11.5 | 3.7 | - | 482 / 546 | 941 / 1075 |
| es-ES_JT2 | realtime | 30 | 0 | 0.306 | 0.600 | 0.5 | 19.4 | 7.3 | 1318 / 1556 | -187 / -55 | 665 / 781 |
| es-ES_JT2 | realtime_refine | 30 | 0 | 0.221 | 0.500 | 0.5 | 11.5 | 6.8 | 1462 / 2019 | 229 / 505 | 1117 / 1436 |
| es-ES_JT2 | whisper_v3 | 30 | 0 | 0.195 | 0.467 | 0.0 | 7.3 | 11.0 | - | 615 / 672 | 1267 / 1449 |
| es-ES_JT3 | fast_default | 30 | 0 | 0.090 | 0.267 | 0.0 | 4.7 | 3.1 | - | 696 / 663 | 1260 / 1384 |
| es-ES_JT3 | fast_llm | 30 | 0 | 0.113 | 0.200 | 1.6 | 1.6 | 6.8 | - | 501 / 565 | 1076 / 1249 |
| es-ES_JT3 | fast_mai | 30 | 0 | 0.083 | 0.167 | 1.6 | 0.5 | 5.8 | - | 477 / 513 | 969 / 1080 |
| es-ES_JT3 | realtime | 30 | 0 | 0.171 | 0.267 | 0.5 | 9.9 | 3.1 | 1357 / 1616 | -134 / -31 | 646 / 756 |
| es-ES_JT3 | realtime_refine | 30 | 0 | 0.080 | 0.233 | 0.0 | 2.6 | 4.2 | 1396 / 1647 | 315 / 489 | 1014 / 1119 |
| es-ES_JT3 | whisper_v3 | 30 | 0 | 0.090 | 0.267 | 0.0 | 4.7 | 3.1 | - | 702 / 698 | 1266 / 1391 |
| es-ES_JT4 | fast_default | 30 | 0 | 0.032 | 0.167 | 0.0 | 1.0 | 1.6 | - | 617 / 677 | 1165 / 1212 |
| es-ES_JT4 | fast_llm | 30 | 0 | 0.028 | 0.133 | 0.0 | 2.1 | 1.0 | - | 490 / 564 | 1034 / 1105 |
| es-ES_JT4 | fast_mai | 30 | 0 | 0.022 | 0.133 | 0.5 | 0.5 | 1.0 | - | 478 / 545 | 998 / 1095 |
| es-ES_JT4 | realtime | 30 | 0 | 0.110 | 0.367 | 0.0 | 5.2 | 4.2 | 1273 / 1458 | -126 / -11 | 658 / 784 |
| es-ES_JT4 | realtime_refine | 30 | 0 | 0.037 | 0.200 | 0.0 | 0.5 | 2.6 | 1383 / 1650 | 405 / 508 | 1105 / 1360 |
| es-ES_JT4 | whisper_v3 | 30 | 0 | 0.032 | 0.167 | 0.0 | 1.0 | 1.6 | - | 622 / 718 | 1170 / 1238 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all services. The full per-word log lives in the sidecar `mazda_es-ES_20260509_155256_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 270 realtime samples:

- `skip`: 23
- `trim_first`: 5
- `trim_last`: 2

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| es-ES_DT1 | 1l_es-ES_male-DT1/060.Enciende el aparcamiento automático.wav | trim_first | 1.79 | 3.03 |
| es-ES_DT1 | 1l_es-ES_female-DT1/062.Enciende la advertencia de colisión trasera.wav | trim_last | 1.22 | 3.14 |
| es-ES_DT1 | 2r_es-ES_female-DT1/136.Pon 100.7 FM.wav | skip | - | - |
| es-ES_DT1 | 1r_es-ES_female-DT1/108.Ve a la página anterior.wav | skip | - | - |
| es-ES_DT2 | 1l_es-ES_male-DT2/136.Pon 100.7 FM.wav | trim_first | 1.35 | 3.23 |
| es-ES_DT2 | 2r_es-ES_male-DT2/101.A casa.wav | skip | - | - |
| es-ES_DT2 | 1l_es-ES_female-DT2/055.Toma una foto.wav | skip | - | - |
| es-ES_DT2 | 2l_es-ES_male-DT2/111.Ve a la última página.wav | skip | - | - |
| es-ES_DT2 | 2l_es-ES_female-DT2/098.Cierra el Centro de Juegos en la pantalla del copiloto.wav | skip | - | - |
| es-ES_DT2 | 1r_es-ES_female-DT2/141.Apaga la música por Bluetooth.wav | skip | - | - |
| es-ES_DT2 | 2l_es-ES_female-DT2/091.Cierra el Centro de Juegos en la pantalla central.wav | skip | - | - |
| es-ES_DT4 | 1l_es-ES_male-DT4/136.Pon 100.7 FM.wav | trim_first | 2.03 | 3.27 |
| es-ES_DT4 | 2r_es-ES_male-DT4/101.A casa.wav | skip | - | - |
| es-ES_DT4 | 1r_es-ES_female-DT4/108.Ve a la página anterior.wav | skip | - | - |
| es-ES_DT4 | 1l_es-ES_female-DT4/014.Activa la circulación externa.wav | skip | - | - |
| es-ES_DT4 | 2l_es-ES_female-DT4/091.Cierra el Centro de Juegos en la pantalla central.wav | skip | - | - |
| es-ES_JT1 | 1r_es-ES_male-JT1/114.Cambia la preferencia de ruta a recomendación inteligente.wav | trim_first | 2.95 | 4.43 |
| es-ES_JT1 | 1l_es-ES_female-JT1/055.Toma una foto.wav | skip | - | - |
| es-ES_JT1 | 1r_es-ES_female-JT1/141.Apaga la música por Bluetooth.wav | skip | - | - |
| es-ES_JT2 | 1l_es-ES_male-JT2/079.Ajusta el volumen del tono de llamada al nivel 5.wav | trim_last | 2.76 | 3.68 |

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