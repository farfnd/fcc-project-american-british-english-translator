'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (req.body.text == undefined || req.body.locale == undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }
      
      const { text, locale } = req.body;

      const translation = translator.translate(text, locale);
      return res.json(translation);
    });
};
