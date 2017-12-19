const Casper = artifacts.require('Casper');
const assertJump = require('../helpers/assertJump');

describe('PresaleBlock test', () => {
  it('Should be reverted', () => Casper.new().then((casper) => {
    casper.sendPresaleTokens().then(() => {
      casper.sendPresaleTokens().catch(error => assertJump(error));
    });
  }));
});
