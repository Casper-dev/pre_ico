const fs = require('fs');

const contract = fs.readFileSync('./contracts/Casper.sol', 'utf8');

describe('Race attack', () => {
  it('should avoid .call.value', () => {
    assert.equal(contract.includes('.call.value'), false);
  });
});
