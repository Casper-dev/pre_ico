const seq = require('promise-sequential');
const BigNumber = require('bignumber.js');
const assert = require('assert');

module.exports = class TestUtils {
  constructor(web3, contract, participants, _assert) {
    if (typeof web3 === 'undefined') {
      throw new Error('test-utils: No web3 object given');
    }

    if (typeof contract === 'undefined') {
      throw new Error('test-utils: No contract object given');
    }

    if (!(participants instanceof Array)) {
      throw new Error('test-utils: Participants must be an Array');
    }

    if (typeof _assert !== 'undefined') {
      this.assert = _assert;
    } else {
      this.assert = assert;
    }

    this.web3 = web3;
    this.contract = contract;
    this.participants = participants;
    this.logs = [];
  }

  static toNumbers(list) {
    return list.map(b => b.toNumber());
  }

  buyTokens(etherToSpend, purchaser) {
    return this.contract.sendTransaction({
      from: purchaser,
      to: this.contract.address,
      value: etherToSpend,
    });
  }

  getAddressList(addressList) {
    return (typeof addressList === 'undefined') ? this.participants : addressList;
  }

  getBalances(addressList) {
    const addressesList = this.getAddressList(addressList);
    return seq(addressesList.map(address => () => this.contract.balanceOf.call(address)));
  }

  getAllowances(addressList) {
    const addressesList = this.getAddressList(addressList);
    return seq(addressesList.map(payer => () =>
      seq(addressesList.map(receiver => () =>
        this.contract.allowance.call(payer, receiver)))
        .then(x => [x])));
  }

  assertBalances(expected) {
    return this.getBalances(this.participants).then((balances) => {
      this.assert.deepEqual(expected.map(n => new BigNumber(n)), balances);
    });
  }

  assertAllowances(expected) {
    return this.getAllowances(this.participants).then((allowances) => {
      this.assert.deepEqual(expected.map(row => row.map(n => new BigNumber(n))), allowances);
    });
  }

  assertState(expectedBalances, expectedAllowances) {
    return this.assertAllowances(expectedAllowances).then(() =>
      this.assertBalances(expectedBalances));
  }

  assertLogs(expectedLogs) {
    const toBigNumbers = log =>
      log.map(entry =>
        entry.map(x => (typeof x === 'number' ? new BigNumber(x) : x)));
    this.assert.deepEqual(toBigNumbers(this.logs), toBigNumbers(expectedLogs));
  }

  static getEvents(log) {
    const r = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of log) {
      if (typeof entry.event !== 'undefined') {
        const t = [entry.event];
        // eslint-disable-next-line no-restricted-syntax
        for (const arg of entry.args) {
          t.push(typeof arg.toNumber === 'function' ? arg.toNumber() : arg);
        }
        r.push(t);
      }
    }
    return r;
  }

  spawnDummyTransactions(n) {
    return this.web3.eth.getAccounts()
      .then((accounts) => {
        const a = accounts.slice(-1)[0];
        const b = accounts.slice(-2)[0];
        return this.web3.eth.sendTransaction({ from: a, to: b, value: 1 })
          .then(() =>
            this.web3.eth.sendTransaction({ from: b, to: a, value: 1 }))
          .then(() => ((n > 0) ? this.spawnDummyTransactions(n - 1) : null));
      });
  }

  waitForBlock(n) {
    return new Promise((resolve, reject) => this.web3.eth.getBlockNumber().then((x) => {
      if (x > n) {
        return resolve();
      }
      return this.spawnDummyTransactions(5)
        .then(() =>
          this.waitForBlock(n))
        .then(resolve)
        .catch(reject);
    }).catch(reject));
  }

  waitBlocks(n) {
    return this.web3.eth.getBlockNumber().then(x => this.waitForBlock(x + n));
  }

  saveEvents(result) {
    TestUtils.getEvents(result.logs).forEach(e => this.logs.push(e));
  }
};
