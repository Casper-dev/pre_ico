const Casper = artifacts.require('Casper');

describe('Presale test', () => {
  it('Balance should be equal to 19162500000000000000000', () => Casper.new().then((casper) => {
    casper.sendPresaleTokens().then(() => {
      casper.balanceOf('0x41c8f018d10f500d231f723017389da5FF9F45F2').then(async (balance) => {
        await assert.equal(balance.valueOf(), 19162500000000000000000);
      });
    });
  }));

  it('Index must be equal to 1', () => {
    Casper.new().then((casper) => {
      casper.sendPresaleTokens().then(() => {
        casper.index.call().then((index) => {
          assert.equal(index.valueOf(), 1);
        });
      });
    });
  });
});
