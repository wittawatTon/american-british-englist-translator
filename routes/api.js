'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      console.log("Translate:" + text)
      // Check for missing required fields
      if (text === undefined || locale === undefined) {
        return res.status(200).json({ error: 'Required field(s) missing' });
      }

      // Check if text is empty
      if (text.trim() === '') {
        return res.status(200).json({ error: 'No text to translate' });
      }

      console.log("locate:" + locale)
      // Validate locale
      const validLocales = ['american-to-british', 'british-to-american'];
      if (!validLocales.includes(locale)) {
        return res.status(200).json({ error: 'Invalid value for locale field' });
      }

      // Perform translation
      const translation = translator.translate(text, locale, true);
      console.log("Translated:" + translation)
      // If no translation was needed, return the original text
      if (translation === text) {
        return res.json({ text, translation: 'Everything looks good to me!' });
      }

      // Return the translated text
      return res.json({ text:text, translation:translation });
    });
};
