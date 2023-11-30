const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  suite('American to British English', () => {
    test('Mangoes are my favorite fruit.', () => {
      assert.equal(translator.translateA2B('Mangoes are my favorite fruit.', 'american-to-british'), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });

    test('I ate yogurt for breakfast.', () => {
      assert.equal(translator.translateA2B('I ate yogurt for breakfast.', 'american-to-british'), 'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });

    test('We had a party at my friend\'s condo.', () => {
      assert.equal(translator.translateA2B('We had a party at my friend\'s condo.', 'american-to-british'), 'We had a party at my friend\'s <span class="highlight">flat</span>.');
    });

    test('Can you toss this in the trashcan for me?', () => {
      assert.equal(translator.translateA2B('Can you toss this in the trashcan for me?', 'american-to-british'), 'Can you toss this in the <span class="highlight">bin</span> for me?');
    });

    test('The parking lot was full.', () => {
      assert.equal(translator.translateA2B('The parking lot was full.', 'american-to-british'), 'The <span class="highlight">car park</span> was full.');
    });

    test('Like a high tech Rube Goldberg machine.', () => {
      assert.equal(translator.translateA2B('Like a high tech Rube Goldberg machine.', 'american-to-british'), 'Like a high tech <span class="highlight">Heath Robinson device</span>.');
    });

    test('To play hooky means to skip class or work.', () => {
      assert.equal(translator.translateA2B('To play hooky means to skip class or work.', 'american-to-british'), 'To <span class="highlight">bunk off</span> means to skip class or work.');
    });

    test('No Mr. Bond, I expect you to die.', () => {
      assert.equal(translator.translateA2B('No Mr. Bond, I expect you to die.', 'american-to-british'), 'No <span class="highlight">Mr</span> Bond, I expect you to die.');
    });

    test('Dr. Grosh will see you now.', () => {
      assert.equal(translator.translateA2B('Dr. Grosh will see you now.', 'american-to-british'), '<span class="highlight">Dr</span> Grosh will see you now.');
    });

    test('Lunch is at 12:15 today.', () => {
      assert.equal(translator.translateA2B('Lunch is at 12:15 today.', 'american-to-british'), 'Lunch is at <span class="highlight">12.15</span> today.');
    });
  });

  suite('British to American English', () => {
    test('We watched the footie match for a while.', () => {
      assert.equal(translator.translateB2A('We watched the footie match for a while.', 'american-to-british'), 'We watched the <span class="highlight">soccer</span> match for a while.');
    });

    test('Paracetamol takes up to an hour to work.', () => {
      assert.equal(translator.translateB2A('Paracetamol takes up to an hour to work.', 'american-to-british'), '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
    
    test('First, caramelise the onions.', () => {
      assert.equal(translator.translateB2A('First, caramelise the onions.', 'american-to-british'), 'First, <span class="highlight">caramelize</span> the onions.');
    });
    
    test('I spent the bank holiday at the funfair.', () => {
      assert.equal(translator.translateB2A('I spent the bank holiday at the funfair.', 'american-to-british'), 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.');
    });
    
    test('I had a bicky then went to the chippy.', () => {
      assert.equal(translator.translateB2A('I had a bicky then went to the chippy.', 'american-to-british'), 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
    });
    
    test('I\'ve just got bits and bobs in my bum bag.', () => {
      assert.equal(translator.translateB2A('I\'ve just got bits and bobs in my bum bag.', 'american-to-british'), 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.');
    });
    
    test('The car boot sale at Boxted Airfield was called off.', () => {
      assert.equal(translator.translateB2A('The car boot sale at Boxted Airfield was called off.', 'american-to-british'), 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.');
    });
    
    test('Have you met Mrs Kalyani?', () => {
      assert.equal(translator.translateB2A('Have you met Mrs Kalyani?', 'american-to-british'), 'Have you met <span class="highlight">Mrs.</span> Kalyani?');
    });
    
    test('Prof Joyner of King\'s College, London.', () => {
      assert.equal(translator.translateB2A('Prof Joyner of King\'s College, London.', 'american-to-british'), '<span class="highlight">Prof.</span> Joyner of King\'s College, London.');
    });
    
    test('Tea time is usually around 4 or 4.30.', () => {
      assert.equal(translator.translateB2A('Tea time is usually around 4 or 4.30.', 'american-to-british'), 'Tea time is usually around 4 or <span class="highlight">4:30</span>.');
    });
  });
  
  suite('Highlight translations', () => {
    test('Mangoes are my favorite fruit.', () => {
      assert.equal(translator.translateA2B('Mangoes are my favorite fruit.', 'american-to-british'), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });

    test('I ate yogurt for breakfast.', () => {
      assert.equal(translator.translateA2B('I ate yogurt for breakfast.', 'american-to-british'), 'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });
    
    test('We watched the footie match for a while.', () => {
      assert.equal(translator.translateB2A('We watched the footie match for a while.', 'american-to-british'), 'We watched the <span class="highlight">soccer</span> match for a while.');
    });

    test('Paracetamol takes up to an hour to work.', () => {
      assert.equal(translator.translateB2A('Paracetamol takes up to an hour to work.', 'american-to-british'), '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
  });
});