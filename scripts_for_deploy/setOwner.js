const Web3 = require('web3');
const WalletProvider = require('truffle-wallet-provider');
const ethereumWallet = require('ethereumjs-wallet');
const solc = require('solc');
const fs = require('fs');

const wallet = ethereumWallet.fromPrivateKey(Buffer.from('674393e0fb1cba8a71be3f1261e7171effb998bc5047ae0eee8b0e49e556e293', 'hex'));
const infura = 'https://mainnet.infura.io/WTu1LsZIdygEHpUcn2Nd';

const provider = new WalletProvider(wallet, infura);

const web3 = new Web3();
web3.setProvider(provider);

const accountAddress = `0x${wallet.getAddress().toString('hex')}`;
const casperAddress = fs.readFileSync('./artifacts/casperAddress').toString();

const owner = '0xd45302eda0ec8e0d5707a2bfd55f41432377b54d';

const casperAbi = JSON.parse(fs.readFileSync('./artifacts/casperAbi'));

const casper = new web3.eth.Contract(casperAbi, casperAddress);

casper.methods.setNewOwner(owner).send({from: accountAddress, gas: 100000},
     (error, transactionHash) => console.log('setOwner transaction has been sent to pool! The hash is: ' + transactionHash.toString()));

