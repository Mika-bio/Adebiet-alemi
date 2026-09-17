"use client";

import { useState } from "react";
import { Feather } from "lucide-react";

interface WriterPortraitProps {
  name: string;
  portraitUrl: string;
  className?: string;
}

export function WriterPortrait({
  name,
  portraitUrl,
  className = "",
}: WriterPortraitProps) {
  const [failed, setFailed] = useState(!portraitUrl);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-burgundy to-burgundy-600 text-cream ${className}`}
      >
        <Feather className="mb-2 h-12 w-12 text-gold" />
        <span className="px-4 text-center font-serif text-sm font-semibold">
          {name}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={portraitUrl}
      alt={name}
      className={`object-cover object-top ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
