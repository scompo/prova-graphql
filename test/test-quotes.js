const expect = require('chai').expect;
const quotes = require('../quotes');

describe('quotes', function() {
  describe('#quoteOfTheDay', function() {
    it('returns A or B ', function() {
      expect(quotes.quoteOfTheDay()).to.be.oneOf(['A', 'B']);
    });
  });
});
