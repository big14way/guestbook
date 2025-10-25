"use client";

import { useState, useEffect, useRef } from "react";

interface TerminalProps {
  children?: React.ReactNode;
}

export default function Terminal({ children }: TerminalProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen crt scanline p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="border-2 border-terminal-text mb-4 p-4">
          <div className="flex justify-between items-center mb-2 terminal-text">
            <div className="text-sm">BASED GUESTBOOK v1.0</div>
            <div className="text-xs">{currentTime}</div>
          </div>
          <div className="text-xs opacity-75">
            SYSTEM: BASE CHAIN | STATUS: ONLINE | MODE: WRITE
          </div>
        </div>

        {/* Main Content */}
        <div className="border-2 border-terminal-text p-4 md:p-6 bg-black/50">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs text-center opacity-50 terminal-text">
          &gt; LEAVE YOUR MARK ON-CHAIN &lt;
        </div>
      </div>
    </div>
  );
}
