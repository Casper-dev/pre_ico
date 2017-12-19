const Casper = artifacts.require('Casper');

describe('Change owner function test', () => {
  let casper;

  before(async () => {
    casper = await Casper.new();
  });

  it('Owner should be changed as expected', async () => {
    let owner = null;
    casper.setNewOwner('0xafb2ddcf3a047c4849bb0971b424cd62cfb4ea31');
    owner = await casper.owner.call();
    assert.equal(owner, '0xafb2ddcf3a047c4849bb0971b424cd62cfb4ea31');
  });
});
