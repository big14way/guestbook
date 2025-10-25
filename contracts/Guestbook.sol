// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Guestbook
 * @dev Simple on-chain guestbook where anyone can leave a message
 */
contract Guestbook {
    struct Message {
        address author;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;

    event MessagePosted(
        address indexed author,
        string content,
        uint256 timestamp,
        uint256 messageId
    );

    /**
     * @dev Post a new message to the guestbook
     * @param _content The message content
     */
    function postMessage(string memory _content) public {
        require(bytes(_content).length > 0, "Message cannot be empty");
        require(bytes(_content).length <= 280, "Message too long (max 280 chars)");

        Message memory newMessage = Message({
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp
        });

        messages.push(newMessage);

        emit MessagePosted(
            msg.sender,
            _content,
            block.timestamp,
            messages.length - 1
        );
    }

    /**
     * @dev Get the total number of messages
     */
    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }

    /**
     * @dev Get a specific message by ID
     */
    function getMessage(uint256 _id) public view returns (
        address author,
        string memory content,
        uint256 timestamp
    ) {
        require(_id < messages.length, "Message does not exist");
        Message memory message = messages[_id];
        return (message.author, message.content, message.timestamp);
    }

    /**
     * @dev Get all messages (use with caution for large arrays)
     */
    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

    /**
     * @dev Get recent messages with pagination
     */
    function getRecentMessages(uint256 _count, uint256 _offset)
        public
        view
        returns (Message[] memory)
    {
        uint256 totalMessages = messages.length;

        if (_offset >= totalMessages) {
            return new Message[](0);
        }

        uint256 endIndex = _offset + _count;
        if (endIndex > totalMessages) {
            endIndex = totalMessages;
        }

        uint256 resultCount = endIndex - _offset;
        Message[] memory result = new Message[](resultCount);

        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = messages[totalMessages - 1 - _offset - i];
        }

        return result;
    }
}
