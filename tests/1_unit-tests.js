const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();
const amLocale = 'british-to-american';
const britLocale = 'american-to-british'

suite('Unit Tests', () => {
    
    //#1
    test("Translate Mangoes are my favorite fruit. to British English", function() {
        assert.equal(translator.translate("Mangoes are my favorite fruit.", britLocale), `Mangoes are my <span class="highlight">favourite</span> fruit.`);
    });
    
    //#2
    test("Translate I ate yogurt for breakfast. to British English", function() {
        assert.equal(translator.translate("I ate yogurt for breakfast.", britLocale), `I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekkie</span>.`);
    });
    
    //#3
    test("Translate We had a party at my friend's condo. to British English", function() {
        assert.equal(translator.translate("We had a party at my friend's condo.", britLocale), `We had a party at my friend's <span class="highlight">flat</span>.`);
    });

    //#4
    test("Translate Can you toss this in the trashcan for me? to British English", function() {
        assert.equal(translator.translate("Can you toss this in the trashcan for me?", britLocale), `Can you toss this in the <span class="highlight">bin</span> for me?`);
    });
    
    //#5
    test("Translate The parking lot was full. to British English", function() {
        assert.equal(translator.translate("The parking lot was full.", britLocale), `The <span class="highlight">car park</span> was full.`);
    });
    
    //#6
    test("Translate Like a high tech Rube Goldberg machine. to British English", function() {
        assert.equal(translator.translate("Like a high tech Rube Goldberg machine.", britLocale), `Like a high tech <span class="highlight">Heath Robinson device</span>.`);
    });
    
    //#7
    test("Translate To play hooky means to skip class or work. to British English", function() {
        assert.equal(translator.translate("To play hooky means to skip class or work.", britLocale), `To <span class="highlight">bunk off</span> means to skip class or work.`);
    });

    //#8
    test("Translate No Mr. Bond, I expect you to die. to British English", function() {
        assert.equal(translator.translate("No Mr. Bond, I expect you to die.", britLocale), `No <span class="highlight">Mr</span> Bond, I expect you to die.`);
    });
    
    //#9
    test("Translate Dr. Grosh will see you now. to British English", function() {
        assert.equal(translator.translate("Dr. Grosh will see you now.", britLocale), `<span class="highlight">Dr</span> Grosh will see you now.`);
    });
    
    //#10
    test("Translate Lunch is at 12:15 today. to British English", function() {
        assert.equal(translator.translate("Lunch is at 12:15 today.", britLocale), `Lunch is at <span class="highlight">12.15</span> today.`);
    });
   
    //#11
    test("Translate We watched the footie match for a while. to American English", function() {
        assert.equal(translator.translate("We watched the footie match for a while.", amLocale), `We watched the <span class="highlight">soccer</span> match for a while.`);
    });
    
    //#12
    test("Translate Paracetamol takes up to an hour to work. to American English", function() {
        assert.equal(translator.translate("Paracetamol takes up to an hour to work.", amLocale), `<span class="highlight">Tylenol</span> takes up to an hour to work.`);
    });
    
    //#13
    test("Translate First, caramelise the onions. to American English", function() {
        assert.equal(translator.translate("First, caramelise the onions.", amLocale), `First, <span class="highlight">caramelize</span> the onions.`);
    });
    
    //#14
    test("Translate I spent the bank holiday at the funfair. to American English", function() {
        assert.equal(translator.translate("I spent the bank holiday at the funfair.", amLocale), `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`);
    });
    
    //#15
    test("Translate I had a bicky then went to the chippy. to American English", function() {
        assert.equal(translator.translate("I had a bicky then went to the chippy.", amLocale), `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`);
    });

    //#16
    test("Translate I've just got bits and bobs in my bum bag. to American English", function() {
        assert.equal(translator.translate("I've just got bits and bobs in my bum bag.", amLocale), `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`);
    });
    
    //#17
    test("Translate The car boot sale at Boxted Airfield was called off. to American English", function() {
        assert.equal(translator.translate("The car boot sale at Boxted Airfield was called off.", amLocale), `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`);
    });
    
    //#18
    test("Translate Have you met Mrs Kalyani? to American English", function() {
        assert.equal(translator.translate("Have you met Mrs Kalyani?", amLocale), `Have you met <span class="highlight">Mrs.</span> Kalyani?`);
    });
    
    //#19
    test("Translate Prof Joyner of King's College, London. to American English", function() {
        assert.equal(translator.translate("Prof Joyner of King's College, London.", amLocale), `<span class="highlight">Prof.</span> Joyner of King's College, London.`);
    });
    
    //#20
    test("Translate Tea time is usually around 4 or 4.30. to American English", function() {
        assert.equal(translator.translate("Tea time is usually around 4 or 4.30.", amLocale), `Tea time is usually around 4 or <span class="highlight">4:30</span>.`);
    });
    
    //#21
    test("Highlight translation in Mangoes are my favorite fruit.",function() {
        assert.include(translator.translate("Mangoes are my favorite fruit.", britLocale), `<span class="highlight"></span>`);
    });
    
    //#22
    test("Highlight translation in I ate yogurt for breakfast.",function() {
        assert.include(translator.translate("I ate yogurt for breakfast.", britLocale), `<span class="highlight">yoghurt</span>`);
    });
    
    //#23
    test("Highlight translation in We watched the footie match for a while.",function() {
        assert.include(translator.translate("We watched the footie match for a while.", amLocale), `<span class="highlight">football</span>`);
    });
    
    //#24
    test("Highlight translation in Paracetamol takes up to an hour to work.",function() {
        assert.include(translator.translate("Paracetamol takes up to an hour to work.", amLocale), `<span class="highlight">Tylenol</span>`);
    });

});
