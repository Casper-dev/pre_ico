const fs = require('fs');

const contract = fs.readFileSync('./contracts/Casper.sol', 'utf8');

const regFor = new RegExp(/\sfor\(/g);

const regWhile = new RegExp(/\swhile\(/g);

const regArray = new RegExp(/.+\[[0-9]*\]\s.+/g);

describe('Array iteration problem', () => {
  it('Should avoid "for" loop', () => {
    assert.equal(contract.match(regFor), null);
  });

  it('Should avoid "while" loop', () => {
    assert.equal(contract.match(regWhile), null);
  });

  it('Should avoid use of dynamic arrays', () => {
    assert.equal(contract.match(regArray), null);
  });
});
