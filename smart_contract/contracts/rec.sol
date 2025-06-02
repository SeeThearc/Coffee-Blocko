//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.13;

contract rec{
    struct memo{
        string name;
        string message;
        uint256 timestamp;
        address from;
    }
    memo[] memos;
    address payable owner;
    constructor(){
        owner=payable(msg.sender);
    }
    function buy(string memory name,string memory message) public payable{
        require(msg.value>0,"Please pay greater than 0 ETH");
        owner.transfer(msg.value);
        memos.push(memo(name,message,block.timestamp,msg.sender));

    }

    function getMemos() public view returns(memo[] memory){
        return memos;
    }
}