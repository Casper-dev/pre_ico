const assertJump = require('../helpers/assertJump');

const SafeMathMock = artifacts.require('../helpers/SafeMathMock.sol');

contract('SafeMath', () => {
  let safeMath;

  before(async () => {
    safeMath = await SafeMathMock.new();
  });

  // Overflow checks
  it('Sum overflow return error', async () => {
    try {
      await safeMath.safeAddMock(2 ** 256, 1);
      assert.fail('should have thrown before');
    } catch (error) {
      assertJump(error);
    }
  });

  it('should throw an error on addition overflow', async () => {
    const a = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
    const b = 1;
    try {
      await safeMath.safeAddMock(a, b);
      assert.fail('should have thrown before');
    } catch (error) {
      assertJump(error);
    }
  });

  it('should throw an error on multiplication overflow', async () => {
    const a = 2 ** 257;
    const b = 2;
    try {
      await safeMath.safeMulMock(a, b);
      assert.fail('should have thrown before');
    } catch (error) {
      assertJump(error);
    }
  });

  // Underflow checks
  it('Sum underflow return error', async () => {
    try {
      await safeMath.safeAddMock(-1, -1);
      await safeMath.result();
      assert.fail('should have thrown before');
    } catch (error) {
      assertJump(error);
    }
  });

  // Division checks
  it('Div by zero return error', async () => {
    try {
      await safeMath.safeDivMock(100, 0);
      assert.fail('should have thrown before');
    } catch (error) {
      assertJump(error);
    }
  });

  it('Div zero by 1 return 0', async () => {
    let result = '';
    try {
      await safeMath.safeDivMock(0, 1);
      result = await safeMath.result();
    } catch (error) {
      result = error.message;
    }
    assert.equal(result, 0);
  });

  it('Div 9999 by 10000 return 0. Floor rounding.', async () => {
    let result = '';
    try {
      await safeMath.safeDivMock(1, 2);
      result = await safeMath.result();
    } catch (error) {
      result = error.message;
    }
    assert.equal(result, 0);
  });

  // Multiplication checks
  it('multiplies correctly', async () => {
    const a = 5678;
    const b = 1234;
    await safeMath.safeMulMock(a, b);
    const result = await safeMath.result();
    assert.equal(result.valueOf(), a * b);
  });

  // safeAddMockition checks
  it('safeAddMocks correctly', async () => {
    const a = 5678;
    const b = 1234;
    await safeMath.safeAddMock(a, b);
    const result = await safeMath.result();

    assert.equal(result, a + b);
  });

  // Subtraction checks
  it('subtracts correctly', async () => {
    const a = 5678;
    const b = 1234;
    await safeMath.safeSubMock(a, b);
    const result = await safeMath.result();

    assert.equal(result, a - b);
  });

  it('should throw an error if subtraction result would be negative', async () => {
    const a = 1234;
    const b = 5678;
    try {
      await safeMath.safeSubMock(a, b);
      assert.fail('should have thrown before');
    } catch (error) {
      assertJump(error);
    }
  });

  // it('', async () => {
  //   const a = 2.5;
  //   const b = 3;
  //   await safeMath.safeMulMock(a,b);
  //   const result = await safeMath.result();
  //   assert.equal(result.valueOf(), 7);
  // })
});
