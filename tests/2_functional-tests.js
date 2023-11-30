const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  let locale = 'american-to-british';
  let text = 'Mangoes are my favorite fruit.';
  let translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.';

  test('text and locale', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ text, locale })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 200);
        assert.property(res.body, 'text');
        assert.property(res.body, 'translation');
        assert.strictEqual(res.body.text, text);
        assert.strictEqual(res.body.translation, translation);
        done();
      });
  });

  test('text and invalid locale', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ text, locale: 'invalid' })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.strictEqual(res.body.error, 'Invalid value for locale field');
        done();
      });
  });

  test('missing text', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.strictEqual(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('missing locale', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ text })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.strictEqual(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('empty text', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ text: "", locale })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.strictEqual(res.body.error, 'No text to translate');
        done();
      });
  });

  test('text needs no translation', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ text: "hello world", locale })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 200);
        assert.property(res.body, 'text');
        assert.property(res.body, 'translation');
        assert.strictEqual(res.body.text, "hello world");
        assert.strictEqual(res.body.translation, 'Everything looks good to me!');
        done();
      });
  });
});
