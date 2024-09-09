const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('All fields POST /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({
            text: 'Mangoes are my favorite fruit.',
            locale: 'american-to-british'
         })
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.isObject(res.body, 'response should be an object');
           assert.property(res.body, 'text', 'response should contain text field');
           assert.property(res.body, 'translation', 'response should contain translation field');
           assert.equal(res.body.text, 'Mangoes are my favorite fruit.', 'text field is request text');
           assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.', 'translation field is correct');
           done();
         });
     });

    test('Invalid locale POST /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({
            text: 'Mangoes are my favorite fruit.',
            locale: 'american-to-boy'
         })
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.isObject(res.body, 'response should be an object');
           assert.property(res.body, 'error', 'response should contain error field');
           assert.equal(res.body.error, 'Invalid value for locale field', 'error message is correct');
           done();
         });
     });

    test('Missing text field POST /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({
            locale: 'american-to-british'
         })
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.isObject(res.body, 'response should be an object');
           assert.property(res.body, 'error', 'response should contain error field');
           assert.equal(res.body.error, 'Required field(s) missing', 'error message is correct');
           done();
         });
     });

    test('Missing locale field POST /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({
            text: 'Mangoes are my favorite fruit.'
         })
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.isObject(res.body, 'response should be an object');
           assert.property(res.body, 'error', 'response should contain error field');
           assert.equal(res.body.error, 'Required field(s) missing', 'error message is correct');
           done();
         });
     });

    test('Empty text field POST /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({
            text: '',
            locale: 'american-to-british'
         })
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.isObject(res.body, 'response should be an object');
           assert.property(res.body, 'error', 'response should contain error field');
           assert.equal(res.body.error, 'No text to translate', 'error message is correct');
           done();
         });
     });

    test('No tranlation needed POST /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({
            text: 'Mangoes are my favourite fruit.',
            locale: 'american-to-british'
         })
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.isObject(res.body, 'response should be an object');
           assert.property(res.body, 'text', 'response should contain text field');
           assert.property(res.body, 'translation', 'response should contain translation field');
           assert.equal(res.body.text, 'Mangoes are my favourite fruit.', 'text field is request text');
           assert.equal(res.body.translation, 'Everything looks good to me!', 'translation field is correct');
           done();
         });
     });

});
