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
        translation = this.getTranslatedText(translation, americanOnly, true);
        translation = this.getTranslatedText(translation, americanToBritishSpelling, true);
        translation = this.getTranslatedText(translation, americanToBritishTitles, true);
        translation = this.getTranslatedText(translation, britishOnly, false);
        translation = translation.replaceAll(/\b(\d\d?):(\d\d)/g, '<span class="highlight">'+'$1.$2'+'</span>');
        return translation;
    }

    translateToAmerican(text) {
        let translation = text;
        translation = this.getTranslatedText(translation, americanOnly, false);
        // Object.entries(americanOnly).forEach((entry) => {
        //     let re = new RegExp(String.raw`\b${entry[1]}\b`, "g", "i");
        //     if (re.test(text)) translation = translation.replaceAll(entry[1], '<span class="highlight">'+americanOnly[entry[0]]+'</span>')
        // })
        translation = this.getTranslatedText(translation, americanToBritishSpelling, false);
        // Object.entries(americanToBritishSpelling).forEach((entry) => {
        //     let re = new RegExp(String.raw`\b${entry[1]}\b`, "g", "i");
        //     if (re.test(text)) translation = translation.replaceAll(entry[1], '<span class="highlight">'+americanToBritishSpelling[entry[0]]+'</span>')
        // })
        translation = this.getTranslatedText(translation, americanToBritishTitles, false);
        // Object.entries(americanToBritishTitles).forEach((entry) => {
        //     let re = new RegExp(String.raw`\b${entry[1]}\b`, "g", "i");
        //     if (re.test(text)) translation = translation.replaceAll(entry[1], '<span class="highlight">'+americanToBritishTitles[entry[0]]+'</span>')
        // })
        translation = this.getTranslatedText(translation, britishOnly, true);
        // Object.entries(britishOnly).forEach((entry) => {
        //     let re = new RegExp(String.raw`\b${entry[0]}\b`, "g", "i");
        //     if (re.test(text)) translation = translation.replaceAll(entry[0], '<span class="highlight">'+entry[1]+'</span>')
        // })
        translation = translation.replaceAll(/\b(\d\d?).(\d\d)/g, '<span class="highlight">'+'$1:$2'+'</span>');
        return translation;
    }

    getTranslatedText(text, dict, ltr) {
        let translation = text;
        let firstIndex;
        let secondIndex;

        if (ltr) {
            firstIndex = 0;
            secondIndex = 1
        } else {
            firstIndex = 1;
            secondIndex = 0;
        }

        Object.entries(dict).forEach((entry) => {
            let searchElement = entry[firstIndex];
            if (searchElement.includes('.')) {
                searchElement = searchElement.replaceAll('.', '[.]');
                searchElement = '\\b'+searchElement
                // console.log('sEl',searchElement)
            } else {
                searchElement = '\\b'+searchElement+'\\b';
            }
            let re = new RegExp(String.raw`${searchElement}`, "gi");
            if (re.test(text)) {
                let replaceElement = text.match(re);
                let copyStartCase = (model, text) => {
                    if (model[0] === model[0].toUpperCase()) return text[0].toUpperCase() + text.slice(1);
                    else return text[0].toLowerCase() + text.slice(1);
                }
                translation = translation.replaceAll(replaceElement[0], '<span class="highlight">'+copyStartCase(replaceElement[0], entry[secondIndex])+'</span>')

            }
        })
        return translation;
    }

}

module.exports = Translator;