"use client";

import { useEffect, useState } from "react";
import { useReadContract, useBlockNumber } from "wagmi";
import { GUESTBOOK_ABI, GUESTBOOK_ADDRESS } from "@/lib/contract";
import { formatAddress } from "@/lib/utils";

interface Message {
  author: string;
  content: string;
  timestamp: bigint;
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data, refetch } = useReadContract({
    address: GUESTBOOK_ADDRESS,
    abi: GUESTBOOK_ABI,
    functionName: "getAllMessages",
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  useEffect(() => {
    if (data) {
      const formattedMessages = (data as Message[]).reverse();
      setMessages(formattedMessages);
    }
  }, [data]);

  if (!messages.length) {
    return (
      <div className="text-terminal-info text-sm mb-6 p-4 border border-terminal-text/30">
        <div className="animate-pulse">&gt; NO MESSAGES FOUND</div>
        <div className="mt-2 opacity-75">&gt; BE THE FIRST TO SIGN THE GUESTBOOK</div>
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-3">
      <div className="text-terminal-info text-sm mb-4 terminal-text">
        &gt; TOTAL ENTRIES: {messages.length}
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className="border border-terminal-text/50 p-3 hover:border-terminal-text transition-colors bg-black/30"
          >
            <div className="flex justify-between text-xs mb-2 opacity-75">
              <span className="text-terminal-info">
                #{messages.length - index}
              </span>
              <span>
                {new Date(Number(message.timestamp) * 1000).toLocaleString()}
              </span>
            </div>
            <div className="text-sm mb-2 break-words terminal-text">
              {message.content}
            </div>
            <div className="text-xs opacity-50">
              &gt; {formatAddress(message.author)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
