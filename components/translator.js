const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(text, locale) {
        if (locale === 'american-to-british') return this.translateToBritish(text)
        if (locale === 'british-to-american') return this.translateToAmerican(text)
    }

    translateToBritish(text) {
        let translation = text;
        Object.keys(americanOnly).forEach((el) => {
            if (text.includes(el)) translation = translation.replaceAll(el,'<span class="highlight">'+americanOnly[el]+'</span>')
        })
        Object.keys(americanToBritishSpelling).forEach((el) => {
            if (text.includes(el)) translation = translation.replaceAll(el,'<span class="highlight">'+americanToBritishSpelling[el]+'</span>')
        })
        Object.keys(americanToBritishTitles).forEach((el) => {
            if (text.includes(el)) translation = translation.replaceAll(el,'<span class="highlight">'+americanToBritishTitles[el]+'</span>')
        })
        Object.entries(britishOnly).forEach((entry) => {
            if (text.includes(entry[1])) translation = translation.replaceAll(entry[1], '<span class="highlight">'+entry[0]+'</span>')
        })
        translation = translation.replaceAll(/\b(\d\d?):(\d\d)/g, '<span class="highlight">'+'$1.$2'+'</span>');
        return translation;
    }
    translateToAmerican(text) {
        let translation = text;
        Object.entries(americanOnly).forEach((entry) => {
            if (text.includes(entry[1])) translation = translation.replaceAll(entry[1], '<span class="highlight">'+americanOnly[entry[0]]+'</span>')
        })
        Object.entries(americanToBritishSpelling).forEach((entry) => {
            if (text.includes(entry[1])) translation = translation.replaceAll(entry[1], '<span class="highlight">'+americanToBritishSpelling[entry[0]]+'</span>')
        })
        Object.entries(americanToBritishTitles).forEach((entry) => {
            if (text.includes(entry[1])) translation = translation.replaceAll(entry[1], '<span class="highlight">'+americanToBritishTitles[entry[0]]+'</span>')
        })
        Object.entries(britishOnly).forEach((entry) => {
            if (text.includes(entry[0])) translation = translation.replaceAll(entry[0], '<span class="highlight">'+entry[1]+'</span>')
        })
        translation = translation.replaceAll(/\b(\d\d?).(\d\d)/g, '<span class="highlight">'+'$1:$2'+'</span>');
        return translation;
    }

}

module.exports = Translator;