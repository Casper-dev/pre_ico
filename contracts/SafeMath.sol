pragma solidity ^0.4.13;


contract SafeMath {
    function safeAdd(uint x, uint y) internal pure returns (uint) {
        uint256 z = x + y;
        assert((z >= x) && (z >= y));
        return z;
    }

    function safeSub(uint x, uint y) internal pure returns (uint) {
        assert(x >= y);
        uint256 z = x - y;
        return z;
    }

    function safeMul(uint x, uint y) internal pure returns (uint) {
        uint256 z = x * y;
        assert((x == 0)||(z/x == y));
        return z;
    }

    function safeDiv(uint a, uint b) internal pure returns (uint) {
        uint c = a / b;
        return c;
    }
}