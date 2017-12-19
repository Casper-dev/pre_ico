const Casper = artifacts.require('Casper');

module.exports = (deployer) => {
  deployer.deploy(Casper);
};
