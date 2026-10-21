import React from 'react';

// My mark: ታ (the first letter of ታምራት, "Tamerat", in Ge'ez script) in front of the
// Bale Mountains, with a gold sun – the same colours as my LinkedIn banner.
export default function LogoMark({ size = 36 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="lm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f5a46" />
          <stop offset="1" stopColor="#123528" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#lm-bg)" />
      <path d="M0 31 L9 24 L15 28 L23 19 L31 26 L40 21 L40 40 L0 40 Z" fill="rgba(255,255,255,.14)" />
      <circle className="logo-sun" cx="31" cy="10" r="3" fill="#e3b505" />
      <text x="17.5" y="27.5" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff"
        fontFamily="'Noto Sans Ethiopic', 'Nyala', 'Ebrima', sans-serif">ታ</text>
    </svg>
  );
}
