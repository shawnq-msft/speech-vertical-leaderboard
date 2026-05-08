import type { LanguageTier, Region } from "../types";

// Azure Speech service locale list (trimmed to the most commonly used
// neural TTS / ASR codes). Each locale is mapped to a commercial sales
// region and a language tier so the UI can drill down:
//   Tier + Region → list of locales present in the data.
//
// Source: Microsoft Learn — "Language and voice support for the Speech service".
// Not exhaustive; extend as test sets require.
export interface LocaleInfo {
  code: string;           // BCP-47
  name: string;           // display name
  tier: LanguageTier;
  region: Region;
}

export const LOCALES: LocaleInfo[] = [
  // ── Tier 1 ────────────────────────────────────────────────────────────
  { code: "en-US", name: "English (United States)",   tier: "tier-1", region: "Americas" },
  { code: "en-GB", name: "English (United Kingdom)",  tier: "tier-1", region: "EMEA" },
  { code: "en-AU", name: "English (Australia)",       tier: "tier-1", region: "Southeast-Asia" },
  { code: "en-CA", name: "English (Canada)",          tier: "tier-1", region: "Americas" },
  { code: "es-ES", name: "Spanish (Spain)",           tier: "tier-1", region: "EMEA" },
  { code: "es-MX", name: "Spanish (Mexico)",          tier: "tier-1", region: "LATAM" },
  { code: "es-AR", name: "Spanish (Argentina)",       tier: "tier-2", region: "LATAM" },
  { code: "es-CO", name: "Spanish (Colombia)",        tier: "tier-2", region: "LATAM" },
  { code: "es-CL", name: "Spanish (Chile)",           tier: "tier-3", region: "LATAM" },
  { code: "de-DE", name: "German (Germany)",          tier: "tier-1", region: "EMEA" },
  { code: "fr-FR", name: "French (France)",           tier: "tier-1", region: "EMEA" },
  { code: "fr-CA", name: "French (Canada)",           tier: "tier-1", region: "Americas" },
  { code: "pt-BR", name: "Portuguese (Brazil)",       tier: "tier-1", region: "LATAM" },
  { code: "pt-PT", name: "Portuguese (Portugal)",     tier: "tier-2", region: "EMEA" },
  { code: "zh-CN", name: "Chinese (Mandarin, PRC)",   tier: "tier-1", region: "Greater-China" },
  { code: "ja-JP", name: "Japanese (Japan)",          tier: "tier-1", region: "Japan-Korea" },

  // ── Tier 2 ────────────────────────────────────────────────────────────
  { code: "ko-KR", name: "Korean (Korea)",            tier: "tier-2", region: "Japan-Korea" },
  { code: "it-IT", name: "Italian (Italy)",           tier: "tier-2", region: "EMEA" },
  { code: "ru-RU", name: "Russian (Russia)",          tier: "tier-2", region: "EMEA" },
  { code: "ar-SA", name: "Arabic (Saudi Arabia)",     tier: "tier-2", region: "EMEA" },
  { code: "ar-EG", name: "Arabic (Egypt)",            tier: "tier-2", region: "EMEA" },
  { code: "hi-IN", name: "Hindi (India)",             tier: "tier-2", region: "India-South-Asia" },
  { code: "id-ID", name: "Indonesian (Indonesia)",    tier: "tier-2", region: "Southeast-Asia" },
  { code: "tr-TR", name: "Turkish (Türkiye)",         tier: "tier-2", region: "EMEA" },
  { code: "nl-NL", name: "Dutch (Netherlands)",       tier: "tier-2", region: "EMEA" },
  { code: "pl-PL", name: "Polish (Poland)",           tier: "tier-2", region: "EMEA" },
  { code: "zh-HK", name: "Chinese (Cantonese, HK)",   tier: "tier-2", region: "Greater-China" },
  { code: "zh-TW", name: "Chinese (Mandarin, Taiwan)",tier: "tier-2", region: "Greater-China" },
  { code: "th-TH", name: "Thai (Thailand)",           tier: "tier-2", region: "Southeast-Asia" },
  { code: "vi-VN", name: "Vietnamese (Vietnam)",      tier: "tier-2", region: "Southeast-Asia" },

  // ── Tier 3 ────────────────────────────────────────────────────────────
  { code: "sv-SE", name: "Swedish (Sweden)",          tier: "tier-3", region: "EMEA" },
  { code: "nb-NO", name: "Norwegian (Bokmål)",        tier: "tier-3", region: "EMEA" },
  { code: "da-DK", name: "Danish (Denmark)",          tier: "tier-3", region: "EMEA" },
  { code: "fi-FI", name: "Finnish (Finland)",         tier: "tier-3", region: "EMEA" },
  { code: "he-IL", name: "Hebrew (Israel)",           tier: "tier-3", region: "EMEA" },
  { code: "cs-CZ", name: "Czech (Czech Republic)",    tier: "tier-3", region: "EMEA" },
  { code: "el-GR", name: "Greek (Greece)",            tier: "tier-3", region: "EMEA" },
  { code: "hu-HU", name: "Hungarian (Hungary)",       tier: "tier-3", region: "EMEA" },
  { code: "ro-RO", name: "Romanian (Romania)",        tier: "tier-3", region: "EMEA" },
  { code: "uk-UA", name: "Ukrainian (Ukraine)",       tier: "tier-3", region: "EMEA" },
  { code: "bn-IN", name: "Bengali (India)",           tier: "tier-3", region: "India-South-Asia" },
  { code: "ta-IN", name: "Tamil (India)",             tier: "tier-3", region: "India-South-Asia" },
  { code: "te-IN", name: "Telugu (India)",            tier: "tier-3", region: "India-South-Asia" },
  { code: "mr-IN", name: "Marathi (India)",           tier: "tier-3", region: "India-South-Asia" },
  { code: "ur-PK", name: "Urdu (Pakistan)",           tier: "tier-3", region: "India-South-Asia" },
  { code: "ms-MY", name: "Malay (Malaysia)",          tier: "tier-3", region: "Southeast-Asia" },
  { code: "fil-PH", name: "Filipino (Philippines)",   tier: "tier-3", region: "Southeast-Asia" },
  { code: "sw-KE", name: "Swahili (Kenya)",           tier: "tier-3", region: "Africa" },
  { code: "af-ZA", name: "Afrikaans (South Africa)",  tier: "tier-3", region: "Africa" },
  { code: "am-ET", name: "Amharic (Ethiopia)",        tier: "tier-3", region: "Africa" },
  { code: "zu-ZA", name: "Zulu (South Africa)",       tier: "tier-3", region: "Africa" },
];

export const LOCALE_BY_CODE = new Map(LOCALES.map((l) => [l.code, l]));
