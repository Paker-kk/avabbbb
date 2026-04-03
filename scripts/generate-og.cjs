const sharp = require('sharp');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ef4444"/>
      <stop offset="100%" style="stop-color:#f97316"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  
  <!-- Grid pattern -->
  <g opacity="0.06">
    ${Array.from({length: 20}, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${HEIGHT}" stroke="white" stroke-width="0.5"/>`).join('')}
    ${Array.from({length: 11}, (_, i) => `<line x1="0" y1="${i * 60}" x2="${WIDTH}" y2="${i * 60}" stroke="white" stroke-width="0.5"/>`).join('')}
  </g>
  
  <!-- Decorative circles -->
  <circle cx="950" cy="180" r="120" fill="none" stroke="url(#accent)" stroke-width="1.5" opacity="0.15"/>
  <circle cx="950" cy="180" r="80" fill="none" stroke="url(#accent)" stroke-width="1" opacity="0.1"/>
  <circle cx="200" cy="500" r="60" fill="none" stroke="url(#accent)" stroke-width="1" opacity="0.1"/>
  
  <!-- Accent bar -->
  <rect x="100" y="200" width="60" height="4" rx="2" fill="url(#accent)"/>
  
  <!-- Main title -->
  <text x="100" y="270" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="72" font-weight="700" fill="white" letter-spacing="4">AVABBBB</text>
  
  <!-- Subtitle -->
  <text x="100" y="330" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="28" font-weight="300" fill="#a0a0a0" letter-spacing="6">AIGC CREATIVE PORTFOLIO</text>
  
  <!-- Description -->
  <text x="100" y="400" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="18" fill="#666" letter-spacing="1">Motion Design · Development · AI-Generated Content</text>
  
  <!-- Bottom accent line -->
  <rect x="100" y="520" width="1000" height="1" fill="#333"/>
  <rect x="100" y="520" width="200" height="1" fill="url(#accent)" opacity="0.8"/>
  
  <!-- Footer -->
  <text x="100" y="560" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="14" fill="#555" letter-spacing="2">paker-kk.github.io/avabbbb</text>
</svg>`;

async function generate() {
  const outputPath = path.join(__dirname, '..', 'public', 'og-cover.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 90 })
    .toFile(outputPath);
  console.log(`Generated: ${outputPath} (${WIDTH}x${HEIGHT})`);
}

generate().catch(console.error);
