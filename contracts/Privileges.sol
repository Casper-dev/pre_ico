pragma solidity ^0.4.13;


contract Privileges {
    // A person who owns the contract
    address public owner;
    // A person who can update the CENT price
    address public trusted;

    function Privileges() public payable {
        owner = msg.sender;
    }

    function setTrusted(address addr) onlyOwner public {
        trusted = addr;
    }

    function setNewOwner(address newOwner) onlyOwner public {
        owner = newOwner;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier onlyTrusted {
        require(msg.sender == trusted || msg.sender == owner);
        _;
    }
}