// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CreditSystem {
    mapping(address => uint256) public balances;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function transferCredits(address recipient, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient credits");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;
    }

    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can call this function");

        balances[account] += amount;
    }
}
