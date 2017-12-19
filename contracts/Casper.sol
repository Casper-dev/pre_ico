pragma solidity ^0.4.13;

// This contract is used to raise funds during pre-ICO and is not ERC-20 compatible.
// All tokens will be transfered to the main contract during ICO.


import "./SafeMath.sol";
import "./Privileges.sol";
import "./Presale.sol";


contract Casper is SafeMath, Privileges, Presale {    

    string public constant NAME = "Casper Pre-ICO Token";
    string public constant SYMBOL = "CSPT";
    uint public constant DECIMALS = 18;

    uint public constant MIN_PRICE = 750; // 600USD per Ether
    uint public constant MAX_PRICE = 1250; // 1000USD per Ether
    uint public price = 1040;  // 832USD per Ehter
    uint public totalSupply = 0;

    // PreICO hard cap
    uint public constant TOKEN_SUPPLY_LIMIT = 1300000 * (1 ether / 1 wei); // 1 300 000 CSPT

    // PreICO timings
    uint public beginTime;
    uint public endTime;

    uint public index = 0;

    bool sendPresale = true;

    mapping (address => uint) balances;
    mapping (uint => address) participants;


    function Casper() Privileges() public {
        beginTime = now;
        endTime = now + 2 weeks;
    }

    function() payable public {
        require (now < endTime);
        require (totalSupply < TOKEN_SUPPLY_LIMIT);
        uint newTokens = msg.value * price;
        if (newTokens + totalSupply <= TOKEN_SUPPLY_LIMIT) {
            balances[msg.sender] = safeAdd(balances[msg.sender], newTokens);
            totalSupply = safeAdd(totalSupply, newTokens);    
        } else {
            uint tokens = safeSub(TOKEN_SUPPLY_LIMIT, totalSupply); 
            balances[msg.sender] = safeAdd(balances[msg.sender], tokens);
            totalSupply = TOKEN_SUPPLY_LIMIT;
        }
        addParicipant(msg.sender);
    }

    function balanceOf(address addr) public constant returns (uint) {
        return balances[addr];
    }

    function setPrice(uint newPrice) onlyTrusted public {
        require (newPrice > MIN_PRICE && newPrice < MAX_PRICE);
        price = newPrice;
    }

    function sendPresaleTokens() onlyOwner public {
        require(sendPresale);
        for (uint i = 0; i < numberOfPurchasers; i++) {
            address addr = presaleAddresses[i];
            uint tokens = tokensToSend[addr];
            balances[addr] = tokens;
            totalSupply = safeAdd(totalSupply, tokens);  
        }
        index = safeAdd(index, numberOfPurchasers);
        sendPresale = false;
    }

    function withdrawEther(uint eth) onlyOwner public {
        owner.transfer(eth);
    }

    function addParicipant(address addr) private {
        participants[index] = addr;
        index++;
    }

}
