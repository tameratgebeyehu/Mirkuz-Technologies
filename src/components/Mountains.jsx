import React from 'react';

// Soft, rounded hills like the Bale Mountains behind Dodola (same look as my LinkedIn banner).
// "slice" keeps their shape on every screen: on phones the hills are cropped, not squeezed
// into sharp triangles. The back layer repeats every 1600 units, so its slow drift loops
// without a jump. The drift is turned off for people who prefer less motion.
export default function Mountains() {
  return (
    <svg className="mountains" viewBox="0 0 1600 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g className="mountains-back">
        <path d="M-65 117 Q0 130 65 113 Q130 96 195 107 Q260 118 340 90 Q420 62 495 83 Q570 104 645 81 Q720 58 800 79 Q880 100 955 85 Q1030 70 1105 91 Q1180 112 1255 95 Q1330 78 1400 91 Q1470 104 1535 117 Q1600 130 1665 113 Q1730 96 1795 107 Q1860 118 1940 90 Q2020 62 2095 83 Q2170 104 2245 81 Q2320 58 2400 79 Q2480 100 2555 85 Q2630 70 2705 91 Q2780 112 2855 95 Q2930 78 3000 91 Q3070 104 3135 117 Q3200 130 3265 113 L3265 220 L-65 220 Z" />
      </g>
      <path className="mountains-front" d="M0 178 Q170 150 255 165 Q340 180 430 162 Q520 144 610 159 Q700 174 800 155 Q900 136 990 153 Q1080 170 1170 159 Q1260 148 1345 163 Q1430 178 1515 167 L1600 156 L1600 220 L0 220 Z" />
    </svg>
  );
}
