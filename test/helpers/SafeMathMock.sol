pragma solidity ^0.4.13;

import "../../contracts/SafeMath.sol";


contract SafeMathMock is SafeMath {
    uint public result;

    function safeMulMock(uint a, uint b) public returns (uint) {
        result = safeMul(a, b);
        return result;
    }

    function safeSubMock(uint a, uint b) public returns (uint) {
        result = safeSub(a, b);
        return result;
    }

    function safeAddMock(uint a, uint b) public returns (uint) {
        result = safeAdd(a, b);
        return result;
    }

    function safeDivMock(uint a, uint b) public returns (uint) {
        result = safeDiv(a, b);
        return result;
    }
}