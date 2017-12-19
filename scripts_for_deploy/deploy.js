const Web3 = require('web3');
const WalletProvider = require('truffle-wallet-provider');
const ethereumWallet = require('ethereumjs-wallet');
const fs = require('fs');
const solc = require('solc');

const wallet = ethereumWallet.fromPrivateKey(Buffer.from('674393e0fb1cba8a71be3f1261e7171effb998bc5047ae0eee8b0e49e556e293', 'hex'));
const infura = 'https://mainnet.infura.io/WTu1LsZIdygEHpUcn2Nd';

const provider = new WalletProvider(wallet, infura);
const web3 = new Web3();
web3.setProvider(provider);

const accountAddress = `0x${wallet.getAddress().toString('hex')}`;

const input = fs.readFileSync('./artifacts/Casper.sol').toString();
const output = solc.compile(input, 1);

const casperBytecode = `0x${output.contracts[':Casper'].bytecode}`;
fs.writeFileSync('./artifacts/casperBytecode', casperBytecode);

const casperAbi = JSON.parse(output.contracts[':Casper'].interface);
fs.writeFileSync('./artifacts/casperAbi', JSON.stringify(casperAbi));

const casper = new web3.eth.Contract(casperAbi);

const Contract = casper.deploy({ data: casperBytecode })
  .send({
    from: accountAddress,
    gas: 4712388,
  }, async (err, txnHash) => {
    if (err) {
      console.error(err);
    } else if (txnHash) {
      waitForTransactionReceipt(txnHash);
    }
  });

function waitForTransactionReceipt(hash) {
  console.log('waiting for contract to be mined');
  web3.eth.getTransactionReceipt(hash)
    .then((res) => {
      if (res == undefined) {
        console.log(hash);
        setTimeout(() => {
          waitForTransactionReceipt(hash);
        }, 1000);
      } else {
        console.log(`Contract was deployed! It's address: ${res.contractAddress.toString()}`);
        fs.writeFileSync('./artifacts/casperAddress', res.contractAddress.toString());
      }
    });
}
