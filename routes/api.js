'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text;
      const locale = req.body.locale;
      if (text === '') return res.json({ error: 'No text to translate' });
      if (! (locale && text)) return res.json({ error: 'Required field(s) missing' })
      if (!(locale === 'american-to-british' | locale === 'british-to-american' )) return res.json({ error: 'Invalid value for locale field' })
      let translation = translator.translate(text, locale);
      if (translation === text) translation = "Everything looks good to me!";
      return res.json({text, translation})
    });
};
