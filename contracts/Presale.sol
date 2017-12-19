pragma solidity ^0.4.13;


contract Presale {

    uint numberOfPurchasers = 0;

    mapping (uint => address) presaleAddresses;
    mapping (address => uint) tokensToSend;

    function Presale() public {
        addPurchaser(0x41c8f018d10f500d231f723017389da5FF9F45F2, 191625 * ((1 ether / 1 wei) / 10));      
    }

    function addPurchaser(address addr, uint tokens) private {
        presaleAddresses[numberOfPurchasers] = addr;
        tokensToSend[addr] = tokens;
        numberOfPurchasers++;
    }

}