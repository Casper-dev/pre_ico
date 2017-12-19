const Casper = artifacts.require('Casper');

contract('Casper', () => {
  it(
    'Hard cap is set to 1000000',
    () => Casper.new().then(casper =>
      casper.TOKEN_SUPPLY_LIMIT.call().then((TOKEN_SUPPLY_LIMIT) => {
        assert.equal(TOKEN_SUPPLY_LIMIT.valueOf(), 1300000 * 1000000000000000000);
      })),
  );

  it(
    'Minimum ether price in tokens at deploy is 200',
    () => Casper.new().then(casper =>
      casper.MIN_PRICE.call().then((MIN_PRICE) => {
        assert.equal(MIN_PRICE, 750);
      })),
  );

  it(
    'Maximum ether price in tokens at deploy is 950',
    () => Casper.new().then(casper =>
      casper.MAX_PRICE.call().then((MAX_PRICE) => {
        assert.equal(MAX_PRICE, 1250);
      })),
  );

  it(
    'Ether price in tokens at deploy is 550',
    () => Casper.new().then(casper =>
      casper.price.call().then((price) => {
        assert.equal(price.valueOf(), 1040);
      })),
  );

  it(
    'Decimals at deploy equal 18',
    () => Casper.new().then(casper =>
      casper.DECIMALS.call().then((DECIMALS) => {
        assert.equal(DECIMALS, 18);
      })),
  );

  it(
    'Token name at deploy is Casper Pre-ICO Token',
    () => Casper.new().then(casper =>
      casper.NAME.call().then((NAME) => {
        assert.equal(NAME, 'Casper Pre-ICO Token');
      })),
  );
});
