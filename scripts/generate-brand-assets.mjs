import sharp from "sharp";

const cyan = "#21D4FD";
const navy = "#050816";

function markSvg(size) {
  const stroke = Math.round(size * 0.092);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
      <g fill="none" stroke="${cyan}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="512" cy="512" r="360"/>
        <path d="M300 300 L824 824"/>
        <path d="M724 300 L300 724"/>
      </g>
    </svg>
  `;
}

const socialCard = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(255 315) rotate(20) scale(430 430)">
        <stop stop-color="${cyan}" stop-opacity=".2"/>
        <stop offset="1" stop-color="${cyan}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M56 0H0V56" fill="none" stroke="#FFFFFF" stroke-opacity=".045"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" rx="36" fill="${navy}"/>
    <rect width="1200" height="630" rx="36" fill="url(#grid)"/>
    <rect width="1200" height="630" rx="36" fill="url(#glow)"/>
    <g transform="translate(54 94) scale(.43)">
      <g fill="none" stroke="${cyan}" stroke-width="92" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="512" cy="512" r="360"/>
        <path d="M300 300 L824 824"/>
        <path d="M724 300 L300 724"/>
      </g>
    </g>
    <line x1="522" y1="112" x2="522" y2="518" stroke="#FFFFFF" stroke-opacity=".12"/>
    <text x="592" y="220" fill="${cyan}" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" letter-spacing="7">X QUANTUM NETWORK TOKEN</text>
    <text x="588" y="330" fill="#F4F7FF" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="800" letter-spacing="-3">XQNT COIN</text>
    <text x="592" y="400" fill="#AEB7CC" font-family="Arial, Helvetica, sans-serif" font-size="31">Official website live. Token pre-launch.</text>
    <rect x="592" y="448" width="292" height="58" rx="29" fill="${cyan}" fill-opacity=".1" stroke="${cyan}" stroke-opacity=".45"/>
    <circle cx="626" cy="477" r="6" fill="${cyan}"/>
    <text x="648" y="487" fill="#D5F9FF" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="3">XQNTCOIN.COM</text>
  </svg>
`;

await Promise.all([
  sharp(Buffer.from(markSvg(1024)))
    .png({ compressionLevel: 9 })
    .toFile("public/xqnt-logo.png"),
  sharp(Buffer.from(markSvg(512)))
    .png({ compressionLevel: 9 })
    .toFile("app/icon.png"),
  sharp(Buffer.from(socialCard))
    .png({ compressionLevel: 9 })
    .toFile("public/og.png"),
]);

console.log("Generated XQNT logo, favicon, and social card.");
