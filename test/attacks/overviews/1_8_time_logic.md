Described problem takes its place in Casper.sol smart contract.
Keyword "now" is used when we need to check, whether it is
time to close preICO or not. The time interval to check 
is rather big (7 days) so it is not that dangerous to use
"now" in this smart contract because miners can not affect
on that time interval too much.