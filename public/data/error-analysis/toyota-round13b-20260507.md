# Error analysis — round13_20260507_180417.csv

Filters out samples that look like *data* problems rather than recognition errors:
1. **Empty hypothesis** — at least one service returned no text.
2. **Reference much shorter than audio** — `len(ref_chars) / duration_s < 0.8` (with `duration ≥ 1 s`). At normal Japanese speech rates this means the label is missing content.
3. **All services agree, ref disagrees** — mean pairwise CER between the four hypotheses < 0.15 AND mean CER vs ref > 0.5. The four ASR systems converging on the same answer that differs from the reference is a strong signal of a mislabeled ground truth, not a shared error.

Audio links (▶) point to `results/audio/<dataset>/<sample_id>.wav` so a reviewer can play the clip directly.

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

Total complete samples: **350**  
Kept after filtering: **335**  
Excluded as data issues: **15**  

- Empty hypothesis: 10
- Reference too short for audio: 0
- All services agree, ref disagrees: 5

## Speech boundaries

`speech_start_s` / `speech_end_s` come from the realtime SDK's word-level timestamps and anchor UPL for all four services. Per-word detail lives in the sidecar `round13_20260507_180417_words.jsonl`.

Boundary-fix actions across 350 realtime samples: `skip`=18, `trim_both`=15, `trim_first`=26, `trim_last`=3

## Filtered results (excludes data issues)

INS/DEL/SUB are *rates per 100 reference characters*. Their sum ≈ CER × 100.

| Dataset | Service | N | CER | SER | INS/100 | DEL/100 | SUB/100 | LBL ms (mean / p90) | UPL ms (mean / p90) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| anime | fast_default | 45 | 0.234 | 0.822 | 2.1 | 7.2 | 9.5 | 817 / 1083 | 1267 / 1497 |
| anime | fast_llm | 45 | 0.281 | 0.800 | 4.0 | 7.0 | 11.7 | 592 / 909 | 1039 / 1314 |
| anime | fast_mai | 45 | 0.226 | 0.778 | 1.3 | 8.0 | 8.1 | 544 / 701 | 976 / 1187 |
| anime | realtime | 45 | 0.314 | 0.889 | 3.2 | 11.4 | 12.1 | 246 / 547 | 893 / 1235 |
| anime | realtime_refine | 45 | 0.250 | 0.822 | 2.8 | 7.0 | 10.9 | 681 / 1092 | 1160 / 1559 |
| anime | embedded | 45 | 0.287 | 0.911 | 0.8 | 10.7 | 12.5 | 86 / 202 | 736 / 1020 |
| car_tts_clean | fast_default | 50 | 0.115 | 0.280 | 2.3 | 1.6 | 3.7 | 692 / 782 | 814 / 1070 |
| car_tts_clean | fast_llm | 50 | 0.184 | 0.360 | 1.1 | 1.9 | 4.6 | 470 / 540 | 592 / 756 |
| car_tts_clean | fast_mai | 50 | 0.090 | 0.220 | 1.7 | 0.9 | 5.3 | 466 / 564 | 587 / 770 |
| car_tts_clean | realtime | 50 | 0.224 | 0.480 | 2.4 | 7.2 | 8.0 | 380 / 522 | 504 / 768 |
| car_tts_clean | realtime_refine | 50 | 0.105 | 0.220 | 2.3 | 1.0 | 3.6 | 773 / 935 | 851 / 998 |
| car_tts_clean | embedded | 50 | 0.186 | 0.340 | 3.2 | 1.4 | 6.6 | 164 / 220 | 333 / 446 |
| car_tts_denoise_human | fast_default | 50 | 0.179 | 0.500 | 0.9 | 2.6 | 6.6 | 639 / 743 | 793 / 984 |
| car_tts_denoise_human | fast_llm | 50 | 0.247 | 0.600 | 1.3 | 2.6 | 10.6 | 483 / 578 | 648 / 849 |
| car_tts_denoise_human | fast_mai | 50 | 0.174 | 0.380 | 1.4 | 2.4 | 7.0 | 459 / 543 | 612 / 784 |
| car_tts_denoise_human | realtime | 50 | 0.291 | 0.600 | 2.7 | 6.2 | 12.4 | 377 / 507 | 548 / 694 |
| car_tts_denoise_human | realtime_refine | 50 | 0.173 | 0.480 | 0.9 | 1.4 | 6.6 | 753 / 861 | 827 / 979 |
| car_tts_denoise_human | embedded | 50 | 0.314 | 0.700 | 3.7 | 6.0 | 10.1 | 171 / 257 | 314 / 453 |
| car_tts_denoise_nonhuman | fast_default | 50 | 0.123 | 0.260 | 1.7 | 0.9 | 4.0 | 671 / 762 | 794 / 957 |
| car_tts_denoise_nonhuman | fast_llm | 50 | 0.193 | 0.420 | 1.6 | 1.1 | 6.5 | 480 / 546 | 603 / 740 |
| car_tts_denoise_nonhuman | fast_mai | 50 | 0.102 | 0.240 | 1.6 | 0.7 | 5.0 | 475 / 601 | 598 / 817 |
| car_tts_denoise_nonhuman | realtime | 50 | 0.211 | 0.500 | 2.4 | 5.3 | 9.2 | 369 / 491 | 491 / 681 |
| car_tts_denoise_nonhuman | realtime_refine | 50 | 0.123 | 0.260 | 1.7 | 0.9 | 4.0 | 771 / 882 | 850 / 984 |
| car_tts_denoise_nonhuman | embedded | 50 | 0.213 | 0.440 | 2.9 | 2.3 | 8.8 | 147 / 190 | 282 / 386 |
| car_tts_noise_human | fast_default | 50 | 0.161 | 0.440 | 1.1 | 2.3 | 5.7 | 650 / 733 | 819 / 1104 |
| car_tts_noise_human | fast_llm | 50 | 0.205 | 0.420 | 4.0 | 1.4 | 9.2 | 470 / 544 | 639 / 909 |
| car_tts_noise_human | fast_mai | 50 | 0.166 | 0.280 | 1.9 | 1.1 | 5.0 | 467 / 522 | 636 / 924 |
| car_tts_noise_human | realtime | 50 | 0.242 | 0.600 | 1.9 | 7.5 | 7.8 | 372 / 493 | 549 / 726 |
| car_tts_noise_human | realtime_refine | 50 | 0.154 | 0.400 | 1.1 | 1.9 | 5.7 | 762 / 909 | 841 / 1016 |
| car_tts_noise_human | embedded | 50 | 0.274 | 0.560 | 1.7 | 4.7 | 9.3 | 163 / 216 | 339 / 473 |
| car_tts_noise_nonhuman | fast_default | 50 | 0.106 | 0.240 | 1.0 | 0.7 | 4.2 | 648 / 734 | 790 / 903 |
| car_tts_noise_nonhuman | fast_llm | 50 | 0.168 | 0.320 | 1.0 | 1.0 | 4.2 | 486 / 547 | 628 / 754 |
| car_tts_noise_nonhuman | fast_mai | 50 | 0.106 | 0.240 | 1.6 | 0.7 | 5.0 | 465 / 523 | 606 / 778 |
| car_tts_noise_nonhuman | realtime | 50 | 0.204 | 0.440 | 2.2 | 5.7 | 7.9 | 370 / 519 | 511 / 731 |
| car_tts_noise_nonhuman | realtime_refine | 50 | 0.106 | 0.240 | 1.0 | 0.7 | 4.2 | 766 / 889 | 840 / 997 |
| car_tts_noise_nonhuman | embedded | 50 | 0.195 | 0.500 | 1.7 | 2.6 | 9.5 | 168 / 233 | 323 / 424 |
| kiritan | fast_default | 40 | 0.080 | 0.425 | 6.1 | 0.9 | 1.6 | 886 / 1134 | 1165 / 1529 |
| kiritan | fast_llm | 40 | 0.083 | 0.400 | 7.5 | 0.7 | 2.0 | 620 / 952 | 1038 / 1291 |
| kiritan | fast_mai | 40 | 0.078 | 0.325 | 5.2 | 0.7 | 1.2 | 535 / 626 | 809 / 1141 |
| kiritan | realtime | 40 | 0.107 | 0.550 | 6.8 | 1.8 | 3.1 | 225 / 792 | 806 / 1225 |
| kiritan | realtime_refine | 40 | 0.146 | 0.550 | 10.0 | 1.5 | 2.8 | 608 / 1054 | 1053 / 1424 |
| kiritan | embedded | 40 | 0.147 | 0.625 | 10.1 | 2.3 | 3.9 | -19 / 269 | 590 / 1033 |

## Unfiltered results (all complete samples, for reference)

| Dataset | Service | N | CER | SER | INS/100 | DEL/100 | SUB/100 |
|---|---|---:|---:|---:|---:|---:|---:|
| anime | fast_default | 50 | 0.247 | 0.820 | 2.0 | 7.4 | 9.9 |
| anime | fast_llm | 50 | 0.301 | 0.800 | 3.8 | 7.6 | 12.6 |
| anime | fast_mai | 50 | 0.241 | 0.780 | 1.4 | 8.2 | 8.4 |
| anime | realtime | 50 | 0.371 | 0.900 | 3.0 | 14.5 | 11.7 |
| anime | realtime_refine | 50 | 0.294 | 0.840 | 2.6 | 10.5 | 10.6 |
| anime | embedded | 50 | 0.330 | 0.920 | 0.8 | 12.6 | 12.7 |
| car_tts_clean | fast_default | 50 | 0.115 | 0.280 | 2.3 | 1.6 | 3.7 |
| car_tts_clean | fast_llm | 50 | 0.184 | 0.360 | 1.1 | 1.9 | 4.6 |
| car_tts_clean | fast_mai | 50 | 0.090 | 0.220 | 1.7 | 0.9 | 5.3 |
| car_tts_clean | realtime | 50 | 0.224 | 0.480 | 2.4 | 7.2 | 8.0 |
| car_tts_clean | realtime_refine | 50 | 0.105 | 0.220 | 2.3 | 1.0 | 3.6 |
| car_tts_clean | embedded | 50 | 0.186 | 0.340 | 3.2 | 1.4 | 6.6 |
| car_tts_denoise_human | fast_default | 50 | 0.179 | 0.500 | 0.9 | 2.6 | 6.6 |
| car_tts_denoise_human | fast_llm | 50 | 0.247 | 0.600 | 1.3 | 2.6 | 10.6 |
| car_tts_denoise_human | fast_mai | 50 | 0.174 | 0.380 | 1.4 | 2.4 | 7.0 |
| car_tts_denoise_human | realtime | 50 | 0.291 | 0.600 | 2.7 | 6.2 | 12.4 |
| car_tts_denoise_human | realtime_refine | 50 | 0.173 | 0.480 | 0.9 | 1.4 | 6.6 |
| car_tts_denoise_human | embedded | 50 | 0.314 | 0.700 | 3.7 | 6.0 | 10.1 |
| car_tts_denoise_nonhuman | fast_default | 50 | 0.123 | 0.260 | 1.7 | 0.9 | 4.0 |
| car_tts_denoise_nonhuman | fast_llm | 50 | 0.193 | 0.420 | 1.6 | 1.1 | 6.5 |
| car_tts_denoise_nonhuman | fast_mai | 50 | 0.102 | 0.240 | 1.6 | 0.7 | 5.0 |
| car_tts_denoise_nonhuman | realtime | 50 | 0.211 | 0.500 | 2.4 | 5.3 | 9.2 |
| car_tts_denoise_nonhuman | realtime_refine | 50 | 0.123 | 0.260 | 1.7 | 0.9 | 4.0 |
| car_tts_denoise_nonhuman | embedded | 50 | 0.213 | 0.440 | 2.9 | 2.3 | 8.8 |
| car_tts_noise_human | fast_default | 50 | 0.161 | 0.440 | 1.1 | 2.3 | 5.7 |
| car_tts_noise_human | fast_llm | 50 | 0.205 | 0.420 | 4.0 | 1.4 | 9.2 |
| car_tts_noise_human | fast_mai | 50 | 0.166 | 0.280 | 1.9 | 1.1 | 5.0 |
| car_tts_noise_human | realtime | 50 | 0.242 | 0.600 | 1.9 | 7.5 | 7.8 |
| car_tts_noise_human | realtime_refine | 50 | 0.154 | 0.400 | 1.1 | 1.9 | 5.7 |
| car_tts_noise_human | embedded | 50 | 0.274 | 0.560 | 1.7 | 4.7 | 9.3 |
| car_tts_noise_nonhuman | fast_default | 50 | 0.106 | 0.240 | 1.0 | 0.7 | 4.2 |
| car_tts_noise_nonhuman | fast_llm | 50 | 0.168 | 0.320 | 1.0 | 1.0 | 4.2 |
| car_tts_noise_nonhuman | fast_mai | 50 | 0.106 | 0.240 | 1.6 | 0.7 | 5.0 |
| car_tts_noise_nonhuman | realtime | 50 | 0.204 | 0.440 | 2.2 | 5.7 | 7.9 |
| car_tts_noise_nonhuman | realtime_refine | 50 | 0.106 | 0.240 | 1.0 | 0.7 | 4.2 |
| car_tts_noise_nonhuman | embedded | 50 | 0.195 | 0.500 | 1.7 | 2.6 | 9.5 |
| kiritan | fast_default | 50 | 0.188 | 0.480 | 12.9 | 1.3 | 1.4 |
| kiritan | fast_llm | 50 | 0.199 | 0.480 | 14.3 | 1.9 | 2.0 |
| kiritan | fast_mai | 50 | 0.205 | 0.420 | 12.0 | 1.3 | 1.1 |
| kiritan | realtime | 50 | 0.250 | 0.640 | 13.5 | 2.6 | 2.8 |
| kiritan | realtime_refine | 50 | 0.210 | 0.560 | 16.3 | 1.4 | 2.5 |
| kiritan | embedded | 50 | 0.263 | 0.700 | 17.0 | 3.0 | 3.6 |

## Excluded samples — examples

### Empty hypothesis

| Audio | Dataset | Sample | Empty in | Reference |
|---|---|---|---|---|
| [▶](audio/kiritan/kiritan-1.wav) | kiritan | kiritan-1 | fast_mai,realtime,embedded | `はい。` |
| [▶](audio/kiritan/kiritan-22.wav) | kiritan | kiritan-22 | fast_mai,realtime,embedded | `はい。` |
| [▶](audio/kiritan/kiritan-37.wav) | kiritan | kiritan-37 | fast_default,fast_mai,realtime | `えっ？` |
| [▶](audio/kiritan/kiritan-36.wav) | kiritan | kiritan-36 | fast_llm | `早速入ってみましょう。` |
| [▶](audio/kiritan/kiritan-47.wav) | kiritan | kiritan-47 | fast_default,realtime | `ドキリ。` |
| [▶](audio/anime/anime-0.wav) | anime | anime-0 | realtime | `ひこうき？` |
| [▶](audio/anime/anime-8.wav) | anime | anime-8 | realtime | `関係？名前？` |
| [▶](audio/anime/anime-20.wav) | anime | anime-20 | realtime_refine | `わー、メイドさんだ。凄い` |
| [▶](audio/anime/anime-24.wav) | anime | anime-24 | realtime_refine | `わあ、かわいい。生きてるんだね、それ` |
| [▶](audio/anime/anime-32.wav) | anime | anime-32 | realtime,embedded | `あ、戻って来たー` |

### Reference too short for audio duration

_(none)_

### All services agree, reference disagrees (likely mislabeled)

#### kiritan/kiritan-27 [▶](audio/kiritan/kiritan-27.wav) — pairwise CER between services = 0.047
- ref:           `いや２時間の旅ですから寄り道は我慢です。`
- fast_default   `お土産屋さんね。ちょっと覗いてきましょうよ。いや、 2時間の旅ですから、寄り道は我慢です。`
- fast_llm       `お土産屋さんね。ちょっと覗いていきましょうよ。いや、 2時間の旅ですから、寄り道は我慢です。`
- fast_mai       `お土産屋さんねちょっと覗いていきましょうよいやー 2時間の旅ですから寄り道は我慢です`
- realtime       `お土産屋さんね。ちょっと覗いていきましょうよ。いや、 2時間の旅ですから、寄り道は我慢です。`
- realtime_refine `お土産屋さんね。ちょっと覗いてきましょうよ。いや、 2時間の旅ですから、寄り道は我慢です。`
- embedded       `お土産屋さんね。ちょっと覗いていきましょうよ。いや、2時間の旅ですから、より道は我慢`

#### kiritan/kiritan-18 [▶](audio/kiritan/kiritan-18.wav) — pairwise CER between services = 0.048
- ref:           `動機は真っ黒です。`
- fast_default   `殺したのか動機は真っ黒です。`
- fast_llm       `これしたのか。動機は真っ黒です。`
- fast_mai       `殺したのか動機は真っ黒です`
- realtime       `殺したのか？動機は真っ黒です。`
- realtime_refine `殺したのか動機は真っ黒です。`
- embedded       `殺したのか動機は真っ黒です`

#### kiritan/kiritan-38 [▶](audio/kiritan/kiritan-38.wav) — pairwise CER between services = 0.063
- ref:           `無言なので結構気まずいっていうのが本音ですね。`
- fast_default   `に入った入った瞬間に歌うのをやめてしまう。無言なので、結構あの気まずいっていうのが本音ですね。`
- fast_llm       `に入った。入った瞬間に歌うのをやめてしまう。無言なので、結構あの気まずいっていうのが本音ですね。`
- fast_mai       `目に入った瞬間に歌うのをやめてしまうと。 無言なので、結構気まずいっていうのが本音ですね。`
- realtime       `に入った。入った瞬間に歌うのをやめてしまう。無言なので。結構あの。気まずいっていうのが本音ですね。`
- realtime_refine `に入った入った瞬間に歌うのをやめてしまう。無言なので、結構あの気まずいっていうのが本音ですね。`
- embedded       `に入った。入った瞬間に歌うのをやめてしまう。無言なので、結構あの気まずいっていうのが本音です。`

#### kiritan/kiritan-39 [▶](audio/kiritan/kiritan-39.wav) — pairwise CER between services = 0.127
- ref:           `試合は３対３の団体戦です。`
- fast_default   `大体、筑波大の決勝戦。試合は3対3の団体戦です。`
- fast_llm       `大体、筑波大の決勝戦。試合は3対3の団体戦です。`
- fast_mai       `仙台対筑波大の決勝戦。 試合は3対3の団体戦です。`
- realtime       `だいたい筑波大の決勝戦。試合は3対3の団体戦です。`
- realtime_refine `大体、筑波大の決勝戦。試合は3対3の団体戦です。`
- embedded       `だいたい筑波大の決勝戦。試合は3対3の団体戦です。`

#### kiritan/kiritan-17 [▶](audio/kiritan/kiritan-17.wav) — pairwise CER between services = 0.145
- ref:           `すごいもの見つけちゃったのよ。`
- fast_default   `すごいもの見つけちゃったのよ。ハンガに見せるジェニー。`
- fast_llm       `すごいもの見つけちゃったのよ。ハンナに見せるジェニー。`
- fast_mai       `すごいもの見つけちゃったのよハンナに見せるジェニー`
- realtime       `すごいもの見つけちゃったのよ。はんなに見せる。`
- realtime_refine `すごいもの見つけちゃったのよ。ハンガに見せるジェニー。`
- embedded       `すごいものを見つけちゃったのよ。ハンナに見せるジェ`

## Genuine recognition errors (filtered set)

Best / median / worst CER per (dataset, service) on the kept samples.

### anime / embedded  (n=45)
**BEST** — `anime-30` [▶](audio/anime/anime-30.wav)  cer=0.000  speech=[0.07s, 1.19s]  fix=none
- ref: `どういうこと？`
- hyp: `どういうこと`
**MEDIAN** — `anime-29` [▶](audio/anime/anime-29.wav)  cer=0.235  speech=[0.07s, 3.27s]  fix=none
- ref: `わあ、すごい。ホンモノのお嬢様なんだね`
- hyp: `わあ、すごい。本物のお嬢様なんだね。`
**WORST** — `anime-16` [▶](audio/anime/anime-16.wav)  cer=0.917  speech=[0.99s, 5.15s]  fix=trim_both
- ref: `えーと、多分、にねんえーぐみ？`
- hyp: `たぶん二年組。`

### anime / fast_default  (n=45)
**BEST** — `anime-1` [▶](audio/anime/anime-1.wav)  cer=0.000  speech=[0.07s, 1.79s]  fix=none
- ref: `あれ？あなた`
- hyp: `あれあなた`
**MEDIAN** — `anime-42` [▶](audio/anime/anime-42.wav)  cer=0.167  speech=[0.07s, 2.63s]  fix=none
- ref: `ごめーん、思い出せないかな？`
- hyp: `え、ごめん。思い出せないかな。`
**WORST** — `anime-16` [▶](audio/anime/anime-16.wav)  cer=0.833  speech=[0.99s, 5.15s]  fix=trim_both
- ref: `えーと、多分、にねんえーぐみ？`
- hyp: `あ、えっと、あ、多分。`

### anime / fast_llm  (n=45)
**BEST** — `anime-1` [▶](audio/anime/anime-1.wav)  cer=0.000  speech=[0.07s, 1.79s]  fix=none
- ref: `あれ？あなた`
- hyp: `あれ、あなた。`
**MEDIAN** — `anime-42` [▶](audio/anime/anime-42.wav)  cer=0.250  speech=[0.07s, 2.63s]  fix=none
- ref: `ごめーん、思い出せないかな？`
- hyp: `えごめー、思い出せないかなー`
**WORST** — `anime-11` [▶](audio/anime/anime-11.wav)  cer=1.250  speech=[3.51s, 3.75s]  fix=trim_first
- ref: `多分、アイ`
- hyp: `たぶん、あい。`

### anime / fast_mai  (n=45)
**BEST** — `anime-1` [▶](audio/anime/anime-1.wav)  cer=0.000  speech=[0.07s, 1.79s]  fix=none
- ref: `あれ？あなた`
- hyp: `あれ？ あなた…`
**MEDIAN** — `anime-42` [▶](audio/anime/anime-42.wav)  cer=0.167  speech=[0.07s, 2.63s]  fix=none
- ref: `ごめーん、思い出せないかな？`
- hyp: `えごめん、思い出せないかな？`
**WORST** — `anime-11` [▶](audio/anime/anime-11.wav)  cer=1.250  speech=[3.51s, 3.75s]  fix=trim_first
- ref: `多分、アイ`
- hyp: `たぶん… あい！`

### anime / realtime  (n=45)
**BEST** — `anime-1` [▶](audio/anime/anime-1.wav)  cer=0.000  speech=[0.07s, 1.79s]  fix=none
- ref: `あれ？あなた`
- hyp: `あれ？あなた？`
**MEDIAN** — `anime-9` [▶](audio/anime/anime-9.wav)  cer=0.231  speech=[-s, -s]  fix=skip
- ref: `ごめんなさい。名前と顔は何となく覚えてるんだけど、それ以外はよく思い出せないみたい`
- hyp: `なんかごめんなさい。名前とかはなんと。なんとなく覚えてるんだけど、それ以外はよく思い出せないみたい。`
**WORST** — `anime-16` [▶](audio/anime/anime-16.wav)  cer=1.000  speech=[0.99s, 5.15s]  fix=trim_both
- ref: `えーと、多分、にねんえーぐみ？`
- hyp: `二年A組。`

### anime / realtime_refine  (n=45)
**BEST** — `anime-1` [▶](audio/anime/anime-1.wav)  cer=0.000  speech=[0.07s, 1.79s]  fix=none
- ref: `あれ？あなた`
- hyp: `あれあなた。`
**MEDIAN** — `anime-46` [▶](audio/anime/anime-46.wav)  cer=0.210  speech=[1.01s, 3.69s]  fix=none
- ref: `はーい。わたしはとりあえず、何でもいいです！`
- hyp: `はい。私はとりあえず何でもいいです。`
**WORST** — `anime-7` [▶](audio/anime/anime-7.wav)  cer=0.750  speech=[0.39s, 1.63s]  fix=trim_first
- ref: `ああ、キンセーさん`
- hyp: `ほう、ピースさん。`

### car_tts_clean / embedded  (n=50)
**BEST** — `Toyota-NanamiDragon-0030` [▶](audio/car_tts_clean/Toyota-NanamiDragon-0030.wav)  cer=0.000  speech=[0.07s, 1.43s]  fix=none
- ref: `交通情報を調べる`
- hyp: `交通情報を調べる`
**MEDIAN** — `Toyota-MasaruDragon-0228` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0228.wav)  cer=0.000  speech=[0.31s, 1.03s]  fix=trim_first
- ref: `棚からつぶ貝`
- hyp: `棚からつぶ貝`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0227.wav)  cer=5.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `スティー、七`

### car_tts_clean / fast_default  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_clean/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0179` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0179.wav)  cer=0.000  speech=[0.07s, 1.31s]  fix=none
- ref: `富士急ハイランド`
- hyp: `富士急ハイランド`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_clean / fast_llm  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_clean/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `入間アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0038` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0038.wav)  cer=0.000  speech=[0.07s, 2.71s]  fix=none
- ref: `横浜グランドインターコンチネンタルホテル`
- hyp: `横浜グランドインターコンチネンタルホテル。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_clean / fast_mai  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_clean/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `入間アウトレット`
**MEDIAN** — `Toyota-NanamiDragon-0178` [▶](audio/car_tts_clean/Toyota-NanamiDragon-0178.wav)  cer=0.000  speech=[0.07s, 1.83s]  fix=none
- ref: `トヨタ自動車本社`
- hyp: `トヨタ自動車本社`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_clean / realtime  (n=50)
**BEST** — `Toyota-NanamiDragon-0134` [▶](audio/car_tts_clean/Toyota-NanamiDragon-0134.wav)  cer=0.000  speech=[0.07s, 1.51s]  fix=none
- ref: `近くのラーメン屋さん`
- hyp: `近くのラーメン屋さん。`
**MEDIAN** — `Toyota-MasaruDragon-0176` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0176.wav)  cer=0.091  speech=[0.07s, 2.27s]  fix=none
- ref: `羽田空港第2ターミナル`
- hyp: `羽田空港第二ターミナル。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_clean / realtime_refine  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_clean/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0128` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0128.wav)  cer=0.000  speech=[0.07s, 2.15s]  fix=none
- ref: `スパジアムジャポンに行きたい`
- hyp: `「スパジアムジャポン」に行きたい。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_clean/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_denoise_human / embedded  (n=50)
**BEST** — `Toyota-NanamiDragon-0030` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0030.wav)  cer=0.000  speech=[0.07s, 2.19s]  fix=none
- ref: `交通情報を調べる`
- hyp: `交通情報を調べる`
**MEDIAN** — `Toyota-MasaruDragon-0130` [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0130.wav)  cer=0.250  speech=[0.07s, 0.87s]  fix=none
- ref: `案内中止`
- hyp: `案内中`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0227.wav)  cer=3.000  speech=[-s, -s]  fix=skip
- ref: `7`
- hyp: `きつい`

### car_tts_denoise_human / fast_default  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.23s]  fix=none
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-NanamiDragon-0149` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0149.wav)  cer=0.100  speech=[0.07s, 1.39s]  fix=none
- ref: `越谷レイクタウン`
- hyp: `越谷レイチタウン。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[-s, -s]  fix=skip
- ref: `7`
- hyp: `CT 。`

### car_tts_denoise_human / fast_llm  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.23s]  fix=none
- ref: `入間アウトレット`
- hyp: `いるまアウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0154` [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0154.wav)  cer=0.125  speech=[0.23s, 0.87s]  fix=trim_both
- ref: `佐野アウトレット`
- hyp: `あのアウトレット。`
**WORST** — `Toyota-NanamiDragon-0215` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0215.wav)  cer=2.000  speech=[0.19s, 1.71s]  fix=none
- ref: `源頼朝`
- hyp: `身元、最寄とも。`

### car_tts_denoise_human / fast_mai  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.23s]  fix=none
- ref: `入間アウトレット`
- hyp: `入間アウトレット`
**MEDIAN** — `Toyota-MasaruDragon-0003` [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0003.wav)  cer=0.000  speech=[0.11s, 1.03s]  fix=none
- ref: `三重県津市`
- hyp: `三重県津市`
**WORST** — `Toyota-MasaruDragon-0130` [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0130.wav)  cer=2.000  speech=[0.07s, 0.87s]  fix=none
- ref: `案内中止`
- hyp: `あんまいちゅーす。`

### car_tts_denoise_human / realtime  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.23s]  fix=none
- ref: `入間アウトレット`
- hyp: `入間アウトレット。`
**MEDIAN** — `Toyota-NanamiDragon-0061` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0061.wav)  cer=0.200  speech=[0.07s, 4.03s]  fix=none
- ref: `トランスコスモススタジアム長崎に行きたい`
- hyp: `トランスコスモススタジアム長崎に。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[-s, -s]  fix=skip
- ref: `7`
- hyp: `CT。`

### car_tts_denoise_human / realtime_refine  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.23s]  fix=none
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-NanamiDragon-0149` [▶](audio/car_tts_denoise_human/Toyota-NanamiDragon-0149.wav)  cer=0.100  speech=[0.07s, 1.39s]  fix=none
- ref: `越谷レイクタウン`
- hyp: `越谷レイチタウン。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[-s, -s]  fix=skip
- ref: `7`
- hyp: `CT 。`

### car_tts_denoise_nonhuman / embedded  (n=50)
**BEST** — `Toyota-NanamiDragon-0030` [▶](audio/car_tts_denoise_nonhuman/Toyota-NanamiDragon-0030.wav)  cer=0.000  speech=[0.07s, 1.71s]  fix=none
- ref: `交通情報を調べる`
- hyp: `交通情報を調べる`
**MEDIAN** — `Toyota-MasaruDragon-0159` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0159.wav)  cer=0.100  speech=[0.27s, 1.47s]  fix=none
- ref: `ナガシマスパーランド`
- hyp: `長島市パーランド。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `父、七`

### car_tts_denoise_nonhuman / fast_default  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.27s]  fix=none
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0130` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0130.wav)  cer=0.000  speech=[0.07s, 0.91s]  fix=none
- ref: `案内中止`
- hyp: `案内中止。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_denoise_nonhuman / fast_llm  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.27s]  fix=none
- ref: `入間アウトレット`
- hyp: `イルマ、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0214` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0214.wav)  cer=0.000  speech=[0.07s, 0.95s]  fix=none
- ref: `清少納言`
- hyp: `清少納言。`
**WORST** — `Toyota-NanamiDragon-0215` [▶](audio/car_tts_denoise_nonhuman/Toyota-NanamiDragon-0215.wav)  cer=2.000  speech=[0.19s, 1.71s]  fix=none
- ref: `源頼朝`
- hyp: `身元のより友。`

### car_tts_denoise_nonhuman / fast_mai  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.27s]  fix=none
- ref: `入間アウトレット`
- hyp: `入間アウトレット`
**MEDIAN** — `Toyota-NanamiDragon-0095` [▶](audio/car_tts_denoise_nonhuman/Toyota-NanamiDragon-0095.wav)  cer=0.000  speech=[0.07s, 2.35s]  fix=none
- ref: `さいたま市中央区役所`
- hyp: `さいたま市中央区役所`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=3.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `7位 7位。`

### car_tts_denoise_nonhuman / realtime  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.27s]  fix=none
- ref: `入間アウトレット`
- hyp: `イルマ、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0042` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0042.wav)  cer=0.100  speech=[0.07s, 5.03s]  fix=none
- ref: `124号線沿いの駐車場つきのパスタ屋さん`
- hyp: `124号線沿いの駐車場。月のパスタ屋さん。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_denoise_nonhuman / realtime_refine  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_denoise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.07s, 1.27s]  fix=none
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0130` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0130.wav)  cer=0.000  speech=[0.07s, 0.91s]  fix=none
- ref: `案内中止`
- hyp: `案内中止。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_noise_human / embedded  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.79s, 0.91s]  fix=trim_first
- ref: `入間アウトレット`
- hyp: `入間アウトレット`
**MEDIAN** — `Toyota-MasaruDragon-0093` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0093.wav)  cer=0.154  speech=[0.19s, 4.71s]  fix=none
- ref: `大阪市東成区中道3-15-16`
- hyp: `大阪市東成区中道3の15の16`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.31s, 0.47s]  fix=trim_first
- ref: `7`
- hyp: `父、七。`

### car_tts_noise_human / fast_default  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.79s, 0.91s]  fix=trim_first
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-NanamiDragon-0156` [▶](audio/car_tts_noise_human/Toyota-NanamiDragon-0156.wav)  cer=0.077  speech=[0.11s, 2.07s]  fix=none
- ref: `土岐プレミアムアウトレット`
- hyp: `敵。プレミアムアウトレット。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.31s, 0.47s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_noise_human / fast_llm  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.79s, 0.91s]  fix=trim_first
- ref: `入間アウトレット`
- hyp: `入間アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0176` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0176.wav)  cer=0.000  speech=[0.07s, 2.27s]  fix=none
- ref: `羽田空港第2ターミナル`
- hyp: `羽田空港第2ターミナル。`
**WORST** — `Toyota-MasaruDragon-0154` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0154.wav)  cer=2.875  speech=[0.11s, 1.03s]  fix=none
- ref: `佐野アウトレット`
- hyp: `I know what I'm talking about.`

### car_tts_noise_human / fast_mai  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.79s, 0.91s]  fix=trim_first
- ref: `入間アウトレット`
- hyp: `入間アウトレット`
**MEDIAN** — `Toyota-MasaruDragon-0003` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0003.wav)  cer=0.000  speech=[0.07s, 0.95s]  fix=none
- ref: `三重県津市`
- hyp: `三重県津市。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.31s, 0.47s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_noise_human / realtime  (n=50)
**BEST** — `Toyota-NanamiDragon-0134` [▶](audio/car_tts_noise_human/Toyota-NanamiDragon-0134.wav)  cer=0.000  speech=[0.07s, 1.43s]  fix=none
- ref: `近くのラーメン屋さん`
- hyp: `近くのラーメン屋さん。`
**MEDIAN** — `Toyota-NanamiDragon-0171` [▶](audio/car_tts_noise_human/Toyota-NanamiDragon-0171.wav)  cer=0.125  speech=[0.07s, 2.03s]  fix=none
- ref: `一番近くの吉野屋`
- hyp: `一番近くの吉野家。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.31s, 0.47s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_noise_human / realtime_refine  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_human/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[0.79s, 0.91s]  fix=trim_first
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0005` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0005.wav)  cer=0.000  speech=[0.03s, 1.56s]  fix=none
- ref: `箱根駅伝ミュージアム`
- hyp: `箱根駅伝ミュージアム。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.31s, 0.47s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_noise_nonhuman / embedded  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `入間アウトレット`
**MEDIAN** — `Toyota-NanamiDragon-0149` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0149.wav)  cer=0.100  speech=[0.07s, 1.35s]  fix=none
- ref: `越谷レイクタウン`
- hyp: `越谷レイクパウン`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_noise_nonhuman / fast_default  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0128` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0128.wav)  cer=0.000  speech=[0.07s, 2.15s]  fix=none
- ref: `スパジアムジャポンに行きたい`
- hyp: `スパジアム・ジャポン』に行きたい。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_noise_nonhuman / fast_llm  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `イルマ、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0130` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0130.wav)  cer=0.000  speech=[0.07s, 0.91s]  fix=none
- ref: `案内中止`
- hyp: `案内中止。`
**WORST** — `Toyota-NanamiDragon-0215` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0215.wav)  cer=2.333  speech=[0.19s, 1.71s]  fix=none
- ref: `源頼朝`
- hyp: `南本、最寄りとも。`

### car_tts_noise_nonhuman / fast_mai  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `入間アウトレット`
**MEDIAN** — `Toyota-NanamiDragon-0095` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0095.wav)  cer=0.000  speech=[0.07s, 2.35s]  fix=none
- ref: `さいたま市中央区役所`
- hyp: `さいたま市中央区役所`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=3.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `7位 7位。`

### car_tts_noise_nonhuman / realtime  (n=50)
**BEST** — `Toyota-NanamiDragon-0134` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0134.wav)  cer=0.000  speech=[0.07s, 1.43s]  fix=none
- ref: `近くのラーメン屋さん`
- hyp: `近くのラーメン屋さん。`
**MEDIAN** — `Toyota-MasaruDragon-0054` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0054.wav)  cer=0.091  speech=[0.07s, 3.63s]  fix=none
- ref: `ANAクラウンプラザホテルグランコート名古屋`
- hyp: `Anaクラウンプラザホテルブランコートあごや。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### car_tts_noise_nonhuman / realtime_refine  (n=50)
**BEST** — `Toyota-NanamiDragon-0165` [▶](audio/car_tts_noise_nonhuman/Toyota-NanamiDragon-0165.wav)  cer=0.000  speech=[-s, -s]  fix=skip
- ref: `入間アウトレット`
- hyp: `入間、アウトレット。`
**MEDIAN** — `Toyota-MasaruDragon-0128` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0128.wav)  cer=0.000  speech=[0.07s, 2.15s]  fix=none
- ref: `スパジアムジャポンに行きたい`
- hyp: `スパジアム・ジャポン』に行きたい。`
**WORST** — `Toyota-MasaruDragon-0227` [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0227.wav)  cer=2.000  speech=[0.75s, 0.91s]  fix=trim_first
- ref: `7`
- hyp: `七、七。`

### kiritan / embedded  (n=40)
**BEST** — `kiritan-2` [▶](audio/kiritan/kiritan-2.wav)  cer=0.000  speech=[0.39s, 2.39s]  fix=none
- ref: `今すぐチェックしてみてくださいね。`
- hyp: `今すぐチェックしてみてくださいね。`
**MEDIAN** — `kiritan-43` [▶](audio/kiritan/kiritan-43.wav)  cer=0.100  speech=[0.39s, 5.15s]  fix=none
- ref: `やっぱり衣装でこんなに変わるんだというぐらい重厚感も出ますし`
- hyp: `で、やっぱり衣装でこんなに変わるんだ。というぐらい、まあ重厚感も出ますし`
**WORST** — `kiritan-49` [▶](audio/kiritan/kiritan-49.wav)  cer=0.583  speech=[3.2s, 4.96s]  fix=none
- ref: `買うのは魚じゃないのかな？`
- hyp: `なんか出身です。買うのは魚じゃないのかな`

### kiritan / fast_default  (n=40)
**BEST** — `kiritan-2` [▶](audio/kiritan/kiritan-2.wav)  cer=0.000  speech=[0.39s, 2.39s]  fix=none
- ref: `今すぐチェックしてみてくださいね。`
- hyp: `今すぐチェックしてみてくださいね。`
**MEDIAN** — `kiritan-45` [▶](audio/kiritan/kiritan-45.wav)  cer=0.000  speech=[0.07s, 2.67s]  fix=none
- ref: `どんな戦いを見せるんでしょうか。`
- hyp: `どんな戦いを見せるんでしょうか`
**WORST** — `kiritan-12` [▶](audio/kiritan/kiritan-12.wav)  cer=0.429  speech=[-s, -s]  fix=skip
- ref: `そこにいるのよ。`
- hyp: `そこに、そこにいるのよ。`

### kiritan / fast_llm  (n=40)
**BEST** — `kiritan-2` [▶](audio/kiritan/kiritan-2.wav)  cer=0.000  speech=[0.39s, 2.39s]  fix=none
- ref: `今すぐチェックしてみてくださいね。`
- hyp: `今すぐチェックしてみてくださいね。`
**MEDIAN** — `kiritan-33` [▶](audio/kiritan/kiritan-33.wav)  cer=0.000  speech=[0.43s, 1.95s]  fix=none
- ref: `そして東側`
- hyp: `そして、東側。`
**WORST** — `kiritan-44` [▶](audio/kiritan/kiritan-44.wav)  cer=0.520  speech=[3.34s, 6.86s]  fix=none
- ref: `［野間口さんは１カ所だけチェンジすることができますが］`
- hyp: `たまに笑いながら、まぐちさんは一箇所だけチェンジすることができますが。`

### kiritan / fast_mai  (n=40)
**BEST** — `kiritan-6` [▶](audio/kiritan/kiritan-6.wav)  cer=0.000  speech=[0.07s, 1.31s]  fix=none
- ref: `よろしくお願いします。`
- hyp: `よろしくお願いします。`
**MEDIAN** — `kiritan-31` [▶](audio/kiritan/kiritan-31.wav)  cer=0.000  speech=[1.09s, 2.89s]  fix=none
- ref: `気持ちがちっとも入っていません。`
- hyp: `気持ちがちっとも入っていません。`
**WORST** — `kiritan-49` [▶](audio/kiritan/kiritan-49.wav)  cer=0.917  speech=[3.2s, 4.96s]  fix=none
- ref: `買うのは魚じゃないのかな？`
- hyp: `なんか水槽みたいですね。 買うのは魚じゃないのかな？`

### kiritan / realtime  (n=40)
**BEST** — `kiritan-6` [▶](audio/kiritan/kiritan-6.wav)  cer=0.000  speech=[0.07s, 1.31s]  fix=none
- ref: `よろしくお願いします。`
- hyp: `よろしくお願いします。`
**MEDIAN** — `kiritan-34` [▶](audio/kiritan/kiritan-34.wav)  cer=0.079  speech=[0.67s, 8.27s]  fix=none
- ref: `タコの口から墨を吐くように飛行機を飛び出させているが前ギリギリまで詰めていく。`
- hyp: `タコの口から炭を吐くように飛行機を飛び出させているが。パイギリギリまで詰めていく。`
**WORST** — `kiritan-12` [▶](audio/kiritan/kiritan-12.wav)  cer=0.429  speech=[-s, -s]  fix=skip
- ref: `そこにいるのよ。`
- hyp: `ここに。そこにいるのよ。`

### kiritan / realtime_refine  (n=40)
**BEST** — `kiritan-2` [▶](audio/kiritan/kiritan-2.wav)  cer=0.000  speech=[0.39s, 2.39s]  fix=none
- ref: `今すぐチェックしてみてくださいね。`
- hyp: `今すぐチェックしてみてくださいね。`
**MEDIAN** — `kiritan-13` [▶](audio/kiritan/kiritan-13.wav)  cer=0.115  speech=[0.51s, 4.27s]  fix=none
- ref: `東京都心では朝からぐんぐん気温が上がっていきそうです。`
- hyp: `東京都心ではですね、朝からぐんぐん気温が上がっていきそうです。`
**WORST** — `kiritan-3` [▶](audio/kiritan/kiritan-3.wav)  cer=0.769  speech=[0.71s, 2.55s]  fix=none
- ref: `あの男と通じていたのですね？`
- hyp: `あの男と、通じていたのですね。あの男と通じていたの。`

## Top fast_default vs realtime disagreements (filtered)

### car_tts_noise_nonhuman/Toyota-MasaruDragon-0180 [▶](audio/car_tts_noise_nonhuman/Toyota-MasaruDragon-0180.wav)  Δcer=1.000  (fast_default=0.000, realtime=1.000)  speech=[0.75s, 1.27s] fix=trim_first
- ref:           `アドベンチャーワールド`
- fast_default   `アドベンチャーワールド。`
- fast_llm       `アドベンチャーワールド。`
- fast_mai       `アドベンチャーワールド`
- realtime       `Adventure world。`
- realtime_refine `アドベンチャーワールド。`
- embedded       `Adventure world。`

### car_tts_noise_human/Toyota-MasaruDragon-0180 [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0180.wav)  Δcer=1.000  (fast_default=0.000, realtime=1.000)  speech=[0.71s, 1.15s] fix=trim_first
- ref:           `アドベンチャーワールド`
- fast_default   `アドベンチャーワールド。`
- fast_llm       `アドベンチャーワールド。`
- fast_mai       `アドベンチャーワールド`
- realtime       `Adventure world。`
- realtime_refine `アドベンチャーワールド。`
- embedded       `Adventure world`

### car_tts_denoise_nonhuman/Toyota-MasaruDragon-0180 [▶](audio/car_tts_denoise_nonhuman/Toyota-MasaruDragon-0180.wav)  Δcer=1.000  (fast_default=0.000, realtime=1.000)  speech=[0.71s, 1.31s] fix=trim_first
- ref:           `アドベンチャーワールド`
- fast_default   `アドベンチャーワールド。`
- fast_llm       `アドベンチャーワールド。`
- fast_mai       `アドベンチャーワールド`
- realtime       `Adventure world。`
- realtime_refine `アドベンチャーワールド。`
- embedded       `Adventure world。`

### car_tts_denoise_human/Toyota-MasaruDragon-0180 [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0180.wav)  Δcer=1.000  (fast_default=0.000, realtime=1.000)  speech=[0.79s, 1.19s] fix=trim_first
- ref:           `アドベンチャーワールド`
- fast_default   `アドベンチャーワールド。`
- fast_llm       `アドベンチャーワールド。`
- fast_mai       `アドベンチャーワールド`
- realtime       `Adventure world。`
- realtime_refine `アドベンチャーワールド。`
- embedded       `Adventure world。`

### car_tts_denoise_human/Toyota-MasaruDragon-0095 [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0095.wav)  Δcer=1.000  (fast_default=0.000, realtime=1.000)  speech=[0.07s, 1.55s] fix=trim_last
- ref:           `さいたま市中央区役所`
- fast_default   `さいたま市中央区役所。`
- fast_llm       `さいたま市中央区役所。`
- fast_mai       `さいたま市中央区役所`
- realtime       `タイタマスチルオープ。`
- realtime_refine `さいたま市中央区役所。`
- embedded       `埼玉市中央区役所`

### car_tts_clean/Toyota-MasaruDragon-0180 [▶](audio/car_tts_clean/Toyota-MasaruDragon-0180.wav)  Δcer=1.000  (fast_default=0.000, realtime=1.000)  speech=[0.75s, 1.31s] fix=trim_first
- ref:           `アドベンチャーワールド`
- fast_default   `アドベンチャーワールド。`
- fast_llm       `アドベンチャーワールド。`
- fast_mai       `アドベンチャーワールド`
- realtime       `Adventure world。`
- realtime_refine `アドベンチャーワールド。`
- embedded       `Adventure world。`

### car_tts_denoise_human/Toyota-MasaruDragon-0155 [▶](audio/car_tts_denoise_human/Toyota-MasaruDragon-0155.wav)  Δcer=0.875  (fast_default=0.000, realtime=0.875)  speech=[0.19s, 0.79s] fix=trim_both
- ref:           `近くのバーミヤン`
- fast_default   `近くのバーミヤン。`
- fast_llm       `近くのバーミヤン。`
- fast_mai       `近くのバーミヤン`
- realtime       `死角の。`
- realtime_refine `近くのバーミヤン。`
- embedded       `視覚のバーミヤ`

### car_tts_clean/Toyota-MasaruDragon-0228 [▶](audio/car_tts_clean/Toyota-MasaruDragon-0228.wav)  Δcer=0.833  (fast_default=0.000, realtime=0.833)  speech=[0.31s, 1.03s] fix=trim_first
- ref:           `棚からつぶ貝`
- fast_default   `棚からつぶ貝。`
- fast_llm       `田中らつぶがい。`
- fast_mai       `棚からつぶ貝`
- realtime       `棚、唐。`
- realtime_refine `棚からつぶ貝。`
- embedded       `棚からつぶ貝`

### car_tts_noise_human/Toyota-MasaruDragon-0095 [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0095.wav)  Δcer=0.700  (fast_default=0.000, realtime=0.700)  speech=[0.11s, 1.71s] fix=none
- ref:           `さいたま市中央区役所`
- fast_default   `さいたま市中央区役所。`
- fast_llm       `埼玉市中央区役所。`
- fast_mai       `さいたま市中央区役所`
- realtime       `タイタマス、中央区。`
- realtime_refine `さいたま市中央区役所。`
- embedded       `埼玉市中央区役所`

### car_tts_noise_human/Toyota-MasaruDragon-0228 [▶](audio/car_tts_noise_human/Toyota-MasaruDragon-0228.wav)  Δcer=0.667  (fast_default=0.833, realtime=0.167)  speech=[0.07s, 1.15s] fix=none
- ref:           `棚からつぶ貝`
- fast_default   `穴からくぐらい。`
- fast_llm       `穴から、くぐがり。`
- fast_mai       `鼻からくぶがい。`
- realtime       `鼻から、つぶ貝。`
- realtime_refine `穴からくぐらい。`
- embedded       `あなたの鍵が`

## Caveats

- **UPL is anchored on the realtime SDK's word-end timestamp** for each sample, so all four services use the same `speech_end`. The CSV's `upl_self_ms` column has each service's own phrase-derived value if you want to see how its boundary detection differs.
- **kiritan reference style** uses some stylized text that all services miss similarly; absolute CER on kiritan is not directly comparable to anime.
- The 'all-agree-vs-ref' filter is conservative (pairwise CER < 0.15 AND mean ref CER > 0.5). True mislabels with partial agreement still survive and inflate per-service CER equally.