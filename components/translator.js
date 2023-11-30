const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  constructor() {
    this.A2B = 'american-to-british';
    this.B2A = 'british-to-american';

    this.americanToBritishDict = {
      ...americanOnly,
      ...americanToBritishSpelling
    };

    this.britishToAmericanDict = {
      ...britishOnly,
      ...this.reverseDictionary(americanToBritishSpelling)
    };

    this.britishToAmericanTitles = this.reverseDictionary(americanToBritishTitles);
  }

  translate(text, locale) {
    if (!text) {
      return { error: "No text to translate" };
    }

    let translatedText;
    let translation;

    if (locale === this.A2B) {
      translation = this.translateA2B(text);
    } else if (locale === this.B2A) {
      translation = this.translateB2A(text);
    } else {
      return { error: "Invalid value for locale field" };
    }

    if (translation === text) {
      translatedText = "Everything looks good to me!";
    } else {
      translatedText = translation;
    }

    return { text, translation: translatedText };
  }

  translateA2B(text) {
    let translatedText = this.translateTextHelper(text, this.americanToBritishDict);
    translatedText = this.replaceTitles(translatedText, americanToBritishTitles, /\b([A-Z][a-z]*\.)\s(\w+)\b/g);
    translatedText = translatedText.replace(/\b(\d{1,2}):(\d{2})\b/g, '<span class="highlight">$1.$2</span>');

    return translatedText;
  }

  translateB2A(text) {
    let translatedText = this.translateTextHelper(text, this.britishToAmericanDict);
    translatedText = this.replaceTitles(translatedText, this.britishToAmericanTitles, /\b([A-Z][a-z]*)\s(\w+)\b/g);
    translatedText = translatedText.replace(/\b(\d{1,2})\.(\d{2})\b/g, '<span class="highlight">$1:$2</span>');

    return translatedText;
  }

  translateTextHelper(text, dict) {
    const regex = new RegExp(`\\b(${Object.keys(dict).join('|')})\\b`, 'gi');
    return text.replace(regex, matched => `<span class="highlight">${dict[matched.toLowerCase()]}</span>`);
  }

  replaceTitles(text, dict, regex) {
    return text.replace(regex, (match, title, name) => {
      const lowercaseTitle = title.toLowerCase();
      if (dict[lowercaseTitle]) {
        return `<span class="highlight">${this.capitalizeFirstLetter(dict[lowercaseTitle])}</span> ${name}`;
      }
      return match;
    });
  }

  reverseDictionary(dict) {
    return Object.fromEntries(Object.entries(dict).map(([key, value]) => [value, key]));
  }

  capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

module.exports = Translator;