"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import Terminal from "@/components/Terminal";
import MessageList from "@/components/MessageList";
import MessageForm from "@/components/MessageForm";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  return (
    <Terminal>
      {/* Connection Status */}
      <div className="mb-6 p-4 border border-terminal-text/30">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {isConnected ? (
              <div className="space-y-1">
                <div className="text-terminal-info terminal-text">
                  &gt; CONNECTED
                </div>
                <div className="text-xs opacity-75">
                  {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                </div>
              </div>
            ) : (
              <div className="text-terminal-error terminal-text">
                &gt; NOT CONNECTED
              </div>
            )}
          </div>
          <button
            onClick={() => (isConnected ? disconnect() : open())}
            className="bg-terminal-text text-black px-4 py-2 text-sm font-bold hover:bg-black hover:text-terminal-text border-2 border-terminal-text transition-colors"
          >
            {isConnected ? "DISCONNECT" : "CONNECT WALLET"}
          </button>
        </div>
      </div>

      {/* Instructions */}
      {!isConnected ? (
        <div className="p-6 border border-terminal-text/30 mb-6 terminal-text">
          <div className="text-sm mb-4 text-terminal-info">
            &gt; SYSTEM MESSAGE:
          </div>
          <div className="space-y-2 text-sm opacity-75">
            <p>&gt; CONNECT YOUR WALLET TO SIGN THE GUESTBOOK</p>
            <p>&gt; MESSAGES ARE STORED ON-CHAIN PERMANENTLY</p>
            <p>&gt; MAX 280 CHARACTERS PER MESSAGE</p>
            <p>&gt; NETWORK: BASE</p>
          </div>
        </div>
      ) : (
        <>
          {/* Message Form */}
          <MessageForm />

          {/* Divider */}
          <div className="border-t border-terminal-text/30 my-6"></div>

          {/* Message List */}
          <MessageList />
        </>
      )}
    </Terminal>
  );
}
