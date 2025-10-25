const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Guestbook", function () {
  let guestbook;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Guestbook = await ethers.getContractFactory("Guestbook");
    guestbook = await Guestbook.deploy();
    await guestbook.waitForDeployment();
  });

  describe("Posting Messages", function () {
    it("Should post a message successfully", async function () {
      const message = "Hello, Base!";
      await guestbook.postMessage(message);

      const count = await guestbook.getMessageCount();
      expect(count).to.equal(1);
    });

    it("Should reject empty messages", async function () {
      await expect(guestbook.postMessage("")).to.be.revertedWith(
        "Message cannot be empty"
      );
    });

    it("Should reject messages over 280 characters", async function () {
      const longMessage = "a".repeat(281);
      await expect(guestbook.postMessage(longMessage)).to.be.revertedWith(
        "Message too long (max 280 chars)"
      );
    });

    it("Should allow multiple users to post messages", async function () {
      await guestbook.connect(addr1).postMessage("First message");
      await guestbook.connect(addr2).postMessage("Second message");

      const count = await guestbook.getMessageCount();
      expect(count).to.equal(2);
    });
  });

  describe("Reading Messages", function () {
    beforeEach(async function () {
      await guestbook.connect(addr1).postMessage("Message 1");
      await guestbook.connect(addr2).postMessage("Message 2");
    });

    it("Should get message by ID", async function () {
      const [author, content] = await guestbook.getMessage(0);
      expect(author).to.equal(addr1.address);
      expect(content).to.equal("Message 1");
    });

    it("Should get all messages", async function () {
      const messages = await guestbook.getAllMessages();
      expect(messages.length).to.equal(2);
      expect(messages[0].content).to.equal("Message 1");
      expect(messages[1].content).to.equal("Message 2");
    });

    it("Should get recent messages with pagination", async function () {
      await guestbook.postMessage("Message 3");

      const recent = await guestbook.getRecentMessages(2, 0);
      expect(recent.length).to.equal(2);
      expect(recent[0].content).to.equal("Message 3");
      expect(recent[1].content).to.equal("Message 2");
    });
  });
});
