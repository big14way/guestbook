"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { GUESTBOOK_ABI, GUESTBOOK_ADDRESS } from "@/lib/contract";

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string>("");

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("ERROR: MESSAGE CANNOT BE EMPTY");
      return;
    }

    if (message.length > 280) {
      setStatus("ERROR: MESSAGE TOO LONG (MAX 280 CHARS)");
      return;
    }

    try {
      setStatus("PREPARING TRANSACTION...");
      writeContract({
        address: GUESTBOOK_ADDRESS,
        abi: GUESTBOOK_ABI,
        functionName: "postMessage",
        args: [message],
      });
    } catch (error) {
      setStatus(`ERROR: ${error instanceof Error ? error.message : "TRANSACTION FAILED"}`);
    }
  };

  useState(() => {
    if (isPending) {
      setStatus("CONFIRM TRANSACTION IN WALLET...");
    } else if (isConfirming) {
      setStatus("TRANSACTION PENDING...");
    } else if (isSuccess) {
      setStatus("MESSAGE POSTED SUCCESSFULLY!");
      setMessage("");
      setTimeout(() => setStatus(""), 3000);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm mb-2 terminal-text">
          &gt; ENTER YOUR MESSAGE:
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-black border-2 border-terminal-text p-3 text-terminal-text font-mono focus:outline-none focus:border-terminal-info resize-none terminal-text"
          rows={4}
          maxLength={280}
          placeholder="Leave your mark on-chain..."
        />
        <div className="text-xs mt-1 opacity-50">
          {message.length}/280 characters
        </div>
      </div>

      {status && (
        <div
          className={`text-sm mb-4 p-3 border ${
            status.includes("ERROR")
              ? "border-terminal-error text-terminal-error"
              : status.includes("SUCCESS")
              ? "border-terminal-text text-terminal-text"
              : "border-terminal-info text-terminal-info"
          }`}
        >
          &gt; {status}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || isConfirming}
        className="w-full bg-terminal-text text-black font-bold py-3 px-6 border-2 border-terminal-text hover:bg-black hover:text-terminal-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed terminal-text"
      >
        {isPending || isConfirming ? "PROCESSING..." : "POST MESSAGE"}
      </button>
    </form>
  );
}
