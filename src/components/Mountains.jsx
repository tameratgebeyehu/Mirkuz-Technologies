import React from 'react';

// Soft mountain shapes, like the Bale Mountains behind Dodola (same look as my LinkedIn banner).
// The back layer drifts slowly; the animation is turned off for people who prefer less motion.
export default function Mountains() {
  return (
    <svg className="mountains" viewBox="0 0 1600 220" preserveAspectRatio="none" aria-hidden="true">
      <g className="mountains-back">
        <path d="M0 150 L140 110 L260 130 L420 66 L560 104 L700 50 L860 96 L1000 64 L1150 110 L1300 76 L1450 96 L1600 70 L1740 110 L1860 90 L2020 130 L2160 80 L2300 104 L2440 70 L2600 120 L2740 86 L2900 110 L3050 76 L3200 150 L3200 220 L0 220 Z" />
      </g>
      <path className="mountains-front" d="M0 190 L180 150 L330 186 L520 140 L700 176 L900 132 L1080 172 L1260 146 L1420 182 L1600 154 L1600 220 L0 220 Z" />
    </svg>
  );
}
