module.exports = (error) => {
  assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'Invalid error must be returned');
};
