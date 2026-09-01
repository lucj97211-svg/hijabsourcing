import React from "react";

/** Abstract mark: two overlapping fabric folds reading as an H. */
export default function BrandMark({ size = 30, tone = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7 5c0 8.5 0 13.5 0 22"
        stroke={tone}
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      <path
        d="M25 5c0 8.5 0 13.5 0 22"
        stroke={tone}
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      <path
        d="M7 16c4.5-3.4 13.5 3.4 18 0"
        stroke={tone}
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  );
}
