const fs = require('fs');

const contract = fs.readFileSync('./contracts/Casper.sol', 'utf8');

describe('External call attack', () => {
  it('should avoid .call', () => {
    assert.equal(contract.includes('.call'), false);
  });

  it('should avoid .delegatecall', () => {
    assert.equal(contract.includes('.delegatecall'), false);
  });

  it('should avoid .callcode', () => {
    assert.equal(contract.includes('.callcode'), false);
  });
});
