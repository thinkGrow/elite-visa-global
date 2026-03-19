// src/components/icons/KaabaIcon.tsx
"use client";

import React from "react";

type KaabaIconProps = {
  className?: string;
};

export function KaabaIcon({ className = "" }: KaabaIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 22.5L32 16L48 22.5V48L32 54L16 48V22.5Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M16 22.5L32 16M16 22.5L32 29M16 22.5V48M32 16L48 22.5M32 16V29M48 22.5V48M48 48L32 54M48 48L32 41M32 54L16 48M32 54V41M16 48L32 41M32 29V41"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M20 25.5H44"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M23 22.5L25 19.5H39L41 22.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 31.5V36.5H35V31.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="28"
        y="30.5"
        width="8"
        height="11"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M24 28.5H40"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}