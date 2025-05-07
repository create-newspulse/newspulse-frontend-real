export function detectLanguage(text) {
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi
    return 'en'; // Default to English
  }
  
