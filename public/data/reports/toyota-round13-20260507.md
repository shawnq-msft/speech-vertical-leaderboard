# ASR Benchmark — round13_20260507_180417.csv

Total rows: **2100**  
Tester public IP: **167.220.233.51**  
Tester location: **Tokyo, Tokyo, Japan** (AS3598 Microsoft Corporation)  
Azure region: **eastus**  
Azure endpoint host: **eastus.api.cognitive.microsoft.com**  
TCP ping to `eastus.api.cognitive.microsoft.com:443` (avg of 5): **239.8 ms**  
VAD set to **500 ms** (realtime `Speech_SegmentationSilenceTimeoutMs`; fast_* audio truncated at `speech_end + 500 ms`)

## Endpoints under test

### `fast_default` — Azure Fast Transcription (default)
- URL: `https://eastus.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15`
- Transport: HTTPS POST (multipart/form-data, chunked)
- Config: `definition = {"locales": ["ja-JP"]}`
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
- Config: `definition = {"locales": ["ja"], "enhancedMode": {"enabled": true, "model": "mai-transcribe-1"}}`
- Partial results: no
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe>
- Note: Requires Speech resource with mai-transcribe-1 preview enabled.

### `realtime` — Azure Speech SDK — continuous recognition
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK
- Config: `PushAudioInputStream, language="ja-JP", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>

### `realtime_refine` — Azure Speech SDK — continuous + Post-Stream Refinement (MRS preview)
- URL: `https://eastus.api.cognitive.microsoft.com`
- Transport: WebSocket via azure-cognitiveservices-speech SDK (>=1.49.0)
- Config: `PushAudioInputStream, language="ja-JP", continuous, PostProcessingOption="PostRefinement"`
- Partial results: yes (recognizing/recognized events; final replaced after refinement)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech>
- Note: Requires Speech SDK >= 1.49.0 and a Speech resource in a region where Multi-Recognizer / Post-Stream Refinement public preview is enabled (East US / North Europe rollout). Falls back to non-MRS behavior if PostProcessingOption is not set.

### `embedded` — Embedded Speech — offline ONNX model (local CPU inference)
- URL: `(local — no network)`
- Transport: PushAudioInputStream via azure-cognitiveservices-speech SDK (embedded mode)
- Config: `EmbeddedSpeechConfig, model="Microsoft Speech Recognizer ja-JP FP Model V3", continuous`
- Partial results: yes (recognizing/recognized events)
- Docs: <https://learn.microsoft.com/en-us/azure/ai-services/speech-service/embedded-speech>
- Note: Runs entirely on-device. Latency depends on CPU. Machine: Intel Core i9-10900X @ 3.70GHz, 20 threads, Windows 11, Speech SDK 1.49.1, ONNX Runtime (embedded SR extension).

## Datasets under test

- **anime** — joujiboi/japanese-anime-speech — <https://huggingface.co/datasets/joujiboi/japanese-anime-speech>  
  split `train`, streamed.
- **car_tts_clean** — car-tts-clean — (no URL)  
  Clean TTS audio (NanamiDragon + MasaruDragon) from platform TTS testset tar.
- **car_tts_denoise_human** — car-tts-denoise-human — (no URL)  
  Denoised from inference (human voice) noise SNR=10.
- **car_tts_denoise_nonhuman** — car-tts-denoise-nonhuman — (no URL)  
  Denoised from non-inference noise SNR=10.
- **car_tts_noise_human** — car-tts-noise-human — (no URL)  
  TTS + inference (human voice) noise, SNR=10.
- **car_tts_noise_nonhuman** — car-tts-noise-nonhuman — (no URL)  
  TTS + non-inference noise, SNR=10.
- **kiritan** — kiritan/whisper-ja.wer_10.0 — <https://huggingface.co/datasets/kiritan/whisper-ja.wer_10.0>  
  config `tiny`, split `train`. Japanese speech with reference text.

## Results

CER breakdown columns are *rates per 100 reference characters*. Per-row CER ≈ (INS + DEL + SUB) / 100 (capped at 1.0 per sample in aggregation).

| Dataset | Service | N | Errors | CER | SER | INS/100 | DEL/100 | SUB/100 | First Latency ms (mean / p90) | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| anime | embedded | 50 | 0 | 0.330 | 0.920 | 0.8 | 12.6 | 12.7 | 819 / 1168 | 27 / 202 | 709 / 1020 |
| anime | fast_default | 50 | 0 | 0.247 | 0.820 | 2.0 | 7.4 | 9.9 | - | 803 / 1083 | 1271 / 1533 |
| anime | fast_llm | 50 | 0 | 0.301 | 0.800 | 3.8 | 7.6 | 12.6 | - | 581 / 909 | 1038 / 1377 |
| anime | fast_mai | 50 | 0 | 0.241 | 0.780 | 1.4 | 8.2 | 8.4 | - | 537 / 701 | 951 / 1187 |
| anime | realtime | 50 | 0 | 0.371 | 0.900 | 3.0 | 14.5 | 11.7 | 1908 / 2154 | 200 / 547 | 880 / 1235 |
| anime | realtime_refine | 50 | 0 | 0.294 | 0.840 | 2.6 | 10.5 | 10.6 | 2139 / 2945 | 555 / 1092 | 1145 / 1559 |
| car_tts_clean | embedded | 50 | 0 | 0.186 | 0.340 | 3.2 | 1.4 | 6.6 | 541 / 605 | 164 / 220 | 333 / 446 |
| car_tts_clean | fast_default | 50 | 0 | 0.115 | 0.280 | 2.3 | 1.6 | 3.7 | - | 692 / 782 | 814 / 1070 |
| car_tts_clean | fast_llm | 50 | 0 | 0.184 | 0.360 | 1.1 | 1.9 | 4.6 | - | 470 / 540 | 592 / 756 |
| car_tts_clean | fast_mai | 50 | 0 | 0.090 | 0.220 | 1.7 | 0.9 | 5.3 | - | 466 / 564 | 587 / 770 |
| car_tts_clean | realtime | 50 | 0 | 0.224 | 0.480 | 2.4 | 7.2 | 8.0 | 1599 / 1676 | 380 / 522 | 504 / 768 |
| car_tts_clean | realtime_refine | 50 | 0 | 0.105 | 0.220 | 2.3 | 1.0 | 3.6 | 1670 / 1743 | 773 / 935 | 851 / 998 |
| car_tts_denoise_human | embedded | 50 | 0 | 0.314 | 0.700 | 3.7 | 6.0 | 10.1 | 597 / 775 | 171 / 257 | 314 / 453 |
| car_tts_denoise_human | fast_default | 50 | 0 | 0.179 | 0.500 | 0.9 | 2.6 | 6.6 | - | 639 / 743 | 793 / 984 |
| car_tts_denoise_human | fast_llm | 50 | 0 | 0.247 | 0.600 | 1.3 | 2.6 | 10.6 | - | 483 / 578 | 648 / 849 |
| car_tts_denoise_human | fast_mai | 50 | 0 | 0.174 | 0.380 | 1.4 | 2.4 | 7.0 | - | 459 / 543 | 612 / 784 |
| car_tts_denoise_human | realtime | 50 | 0 | 0.291 | 0.600 | 2.7 | 6.2 | 12.4 | 1609 / 1719 | 377 / 507 | 548 / 694 |
| car_tts_denoise_human | realtime_refine | 50 | 0 | 0.173 | 0.480 | 0.9 | 1.4 | 6.6 | 1659 / 1778 | 753 / 861 | 827 / 979 |
| car_tts_denoise_nonhuman | embedded | 50 | 0 | 0.213 | 0.440 | 2.9 | 2.3 | 8.8 | 575 / 732 | 147 / 190 | 282 / 386 |
| car_tts_denoise_nonhuman | fast_default | 50 | 0 | 0.123 | 0.260 | 1.7 | 0.9 | 4.0 | - | 671 / 762 | 794 / 957 |
| car_tts_denoise_nonhuman | fast_llm | 50 | 0 | 0.193 | 0.420 | 1.6 | 1.1 | 6.5 | - | 480 / 546 | 603 / 740 |
| car_tts_denoise_nonhuman | fast_mai | 50 | 0 | 0.102 | 0.240 | 1.6 | 0.7 | 5.0 | - | 475 / 601 | 598 / 817 |
| car_tts_denoise_nonhuman | realtime | 50 | 0 | 0.211 | 0.500 | 2.4 | 5.3 | 9.2 | 1591 / 1703 | 369 / 491 | 491 / 681 |
| car_tts_denoise_nonhuman | realtime_refine | 50 | 0 | 0.123 | 0.260 | 1.7 | 0.9 | 4.0 | 1660 / 1761 | 771 / 882 | 850 / 984 |
| car_tts_noise_human | embedded | 50 | 0 | 0.274 | 0.560 | 1.7 | 4.7 | 9.3 | 583 / 649 | 163 / 216 | 339 / 473 |
| car_tts_noise_human | fast_default | 50 | 0 | 0.161 | 0.440 | 1.1 | 2.3 | 5.7 | - | 650 / 733 | 819 / 1104 |
| car_tts_noise_human | fast_llm | 50 | 0 | 0.205 | 0.420 | 4.0 | 1.4 | 9.2 | - | 470 / 544 | 639 / 909 |
| car_tts_noise_human | fast_mai | 50 | 0 | 0.166 | 0.280 | 1.9 | 1.1 | 5.0 | - | 467 / 522 | 636 / 924 |
| car_tts_noise_human | realtime | 50 | 0 | 0.242 | 0.600 | 1.9 | 7.5 | 7.8 | 1590 / 1692 | 372 / 493 | 549 / 726 |
| car_tts_noise_human | realtime_refine | 50 | 0 | 0.154 | 0.400 | 1.1 | 1.9 | 5.7 | 1649 / 1738 | 762 / 909 | 841 / 1016 |
| car_tts_noise_nonhuman | embedded | 50 | 0 | 0.195 | 0.500 | 1.7 | 2.6 | 9.5 | 568 / 623 | 168 / 233 | 323 / 424 |
| car_tts_noise_nonhuman | fast_default | 50 | 0 | 0.106 | 0.240 | 1.0 | 0.7 | 4.2 | - | 648 / 734 | 790 / 903 |
| car_tts_noise_nonhuman | fast_llm | 50 | 0 | 0.168 | 0.320 | 1.0 | 1.0 | 4.2 | - | 486 / 547 | 628 / 754 |
| car_tts_noise_nonhuman | fast_mai | 50 | 0 | 0.106 | 0.240 | 1.6 | 0.7 | 5.0 | - | 465 / 523 | 606 / 778 |
| car_tts_noise_nonhuman | realtime | 50 | 0 | 0.204 | 0.440 | 2.2 | 5.7 | 7.9 | 1603 / 1704 | 370 / 519 | 511 / 731 |
| car_tts_noise_nonhuman | realtime_refine | 50 | 0 | 0.106 | 0.240 | 1.0 | 0.7 | 4.2 | 1649 / 1734 | 766 / 889 | 840 / 997 |
| kiritan | embedded | 50 | 0 | 0.263 | 0.700 | 17.0 | 3.0 | 3.6 | 663 / 1011 | -33 / 269 | 638 / 1285 |
| kiritan | fast_default | 50 | 0 | 0.188 | 0.480 | 12.9 | 1.3 | 1.4 | - | 863 / 1080 | 1229 / 1653 |
| kiritan | fast_llm | 50 | 0 | 0.199 | 0.480 | 14.3 | 1.9 | 2.0 | - | 605 / 897 | 1018 / 1405 |
| kiritan | fast_mai | 50 | 0 | 0.205 | 0.420 | 12.0 | 1.3 | 1.1 | - | 535 / 641 | 777 / 1137 |
| kiritan | realtime | 50 | 0 | 0.250 | 0.640 | 13.5 | 2.6 | 2.8 | 1442 / 1868 | 165 / 702 | 802 / 1225 |
| kiritan | realtime_refine | 50 | 0 | 0.210 | 0.560 | 16.3 | 1.4 | 2.5 | 1564 / 1794 | 581 / 1054 | 1058 / 1424 |

## Speech boundaries

`speech_start_s` / `speech_end_s` (CSV columns) come from the realtime SDK's word-level timestamps and anchor UPL for all four services. The full per-word log lives in the sidecar `round13_20260507_180417_words.jsonl` (one JSON object per realtime sample).

Boundary-fix decisions across 350 realtime samples:

- `skip`: 18
- `trim_both`: 15
- `trim_first`: 26
- `trim_last`: 3

Trimmed/skipped samples (first 20):

| Dataset | Sample ID | Action | speech_start_s | speech_end_s |
|---|---|---|---:|---:|
| kiritan | kiritan-1 | skip | - | - |
| kiritan | kiritan-5 | trim_last | 1.95 | 11.04 |
| kiritan | kiritan-12 | skip | - | - |
| kiritan | kiritan-10 | skip | - | - |
| kiritan | kiritan-17 | trim_last | 0.43 | 3.99 |
| kiritan | kiritan-18 | trim_first | 0.23 | 1.95 |
| kiritan | kiritan-22 | skip | - | - |
| kiritan | kiritan-20 | skip | - | - |
| kiritan | kiritan-23 | trim_both | 0.15 | 6.75 |
| kiritan | kiritan-27 | trim_first | 0.27 | 7.51 |
| kiritan | kiritan-35 | trim_first | 0.57 | 1.25 |
| kiritan | kiritan-37 | skip | - | - |
| kiritan | kiritan-36 | skip | - | - |
| kiritan | kiritan-38 | trim_first | 0.15 | 7.59 |
| kiritan | kiritan-39 | trim_first | 0.15 | 6.8 |
| kiritan | kiritan-47 | skip | - | - |
| kiritan | kiritan-46 | skip | - | - |
| anime | anime-0 | skip | - | - |
| anime | anime-2 | skip | - | - |
| anime | anime-4 | skip | - | - |

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
- **UPL** = `response_fully_read_wall − speech_end_wall`. `speech_end_wall` is taken from the realtime SDK's last-word offset for that sample (when realtime ran successfully on it), so all four services compare against the same reference. The CSV column `upl_self_ms` keeps each service's own phrase-derived value, and `upl_anchor` is `realtime` when anchored or `self` when the realtime anchor was unavailable.
- Note: `fast_mai`'s own phrase boundaries often span the entire audio; using the realtime anchor here makes its UPL directly comparable to the others.
- **First Latency** is omitted because the REST response is delivered in one shot — there is no first-token signal to measure against.
- **VAD truncation**: when realtime ran first and produced word timestamps, fast_* audio is truncated at `speech_end + 500 ms` to simulate a VAD cutting the stream after end-of-speech. This reduces upload time and makes LBL/UPL realistic for a VAD-equipped pipeline. The CSV column `vad_truncated_s` records the truncated duration (blank when no truncation was applied).

**Other:**
- CER/SER use NFKC + punctuation stripping (no kana folding).
- Per-sample CER is capped at 1.0 in aggregation (a hypothesis far longer than the reference is still 100% wrong, not more).