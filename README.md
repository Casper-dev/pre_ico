# casper-contract

This repository contains the source code of ERC20-compliant  [Ethereum](https://ethereum.org/) token used in Casper project.

[Truffle framework](http://truffleframework.com/) is used for development and testing.

## Testing

### Requirements

Install [testrpc](https://github.com/ethereumjs/testrpc).

Install package dependencies using [npm](https://www.npmjs.com/).

```sh
npm install
```

### Running tests

A JS wrapper over `testrpc` is used. It allows to restart testrpc process right from the tests to restore ethereum balances of test accounts. To make it possible, all invocations of testrpc must share the same `--seed` value. By default seed is set to `0`.

You should manually start `testrpc` with appropriate flags before the first `truffle test` invocation because truffle requires it running to start testing process.

```sh
testrpc --seed 0 &>/dev/null &
truffle test
```

After first run, you may notice that the `testrpc` you have just started was terminated, and another one was spawned in background, so you don't need to restart it anymore.

If you don't want this behavior, change `testrpc.detachAndExit()` to `testrpc.stop()` at the very end of `test/test.js` script.

For more information, see `util/testrpc.js`.


### Contract public methods

#### close () onlyOwner

End pre-ICO.

#### balanceOf(address) constant returns (uint)

Get balance of an address.

#### buy () payable

Can receive ether. Assigns number of tokens depending on current usd price to the message sender.

#### withdrawEther (uint) onlyOwner

Used to transfer ether from contract to owner's address. Can be used by contract owner only.

#### setEtherPrice (uint) onlyOwner

Used to update ethereum price in USD.
