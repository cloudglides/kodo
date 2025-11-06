import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const type = searchParams.get('type') || 'medium'; // small, medium, full, languages, compact

  if (!username) {
    return new Response(generateErrorSVG('Username required', type), {
      headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-cache' },
    });
  }

  try {
    const response = await fetch(`https://wakatime.com/api/v1/users/${username}/stats/last_7_days`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!response.ok) {
      return new Response(generateErrorSVG('User not found', type), {
        headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-cache' },
      });
    }

    const data = await response.json();
    const dailyAvg = data.data?.human_readable_daily_average || '0 hrs';
    const totalTime = data.data?.human_readable_total || '0 hrs';
    const languages = data.data?.languages?.slice(0, 5) || [];

    let svg = '';
    switch (type) {
      case 'small':
        svg = generateSmallWidget(dailyAvg);
        break;
      case 'compact':
        svg = generateCompactWidget(dailyAvg, totalTime);
        break;
      case 'languages':
        svg = generateLanguagesWidget(languages);
        break;
      case 'full':
        svg = generateFullWidget(dailyAvg, totalTime, languages, username);
        break;
      default: // medium
        svg = generateMediumWidget(dailyAvg, totalTime);
    }

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    return new Response(generateErrorSVG('Failed to fetch', type), {
      headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-cache' },
    });
  }
}

// Small: Just daily coding time (200x80)
function generateSmallWidget(dailyAvg: string) {
  return `
<svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="80" fill="#131513" rx="8"/>
  <rect width="200" height="80" fill="none" stroke="#1a1c1a" stroke-width="1" rx="8"/>
  
  <text x="100" y="28" font-family="system-ui" font-size="9" fill="#929992" text-anchor="middle">
    DAILY AVERAGE
  </text>
  <text x="100" y="55" font-family="system-ui" font-size="20" font-weight="600" fill="#DE7356" text-anchor="middle">
    ${dailyAvg}
  </text>
</svg>`.trim();
}

// Compact: Daily + Total (250x100)
function generateCompactWidget(dailyAvg: string, totalTime: string) {
  return `
<svg width="250" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="250" height="100" fill="#131513" rx="8"/>
  <rect width="250" height="100" fill="none" stroke="#1a1c1a" stroke-width="1" rx="8"/>
  
  <text x="15" y="25" font-family="system-ui" font-size="9" fill="#929992">
    DAILY AVERAGE
  </text>
  <text x="15" y="50" font-family="system-ui" font-size="22" font-weight="600" fill="#f6fff5">
    ${dailyAvg}
  </text>
  
  <line x1="15" y1="65" x2="235" y2="65" stroke="#1a1c1a" stroke-width="1"/>
  
  <text x="15" y="80" font-family="system-ui" font-size="8" fill="#929992">
    LAST 7 DAYS
  </text>
  <text x="235" y="80" font-family="system-ui" font-size="12" font-weight="500" fill="#DE7356" text-anchor="end">
    ${totalTime}
  </text>
</svg>`.trim();
}

// Medium: Clean stats (320x120)
function generateMediumWidget(dailyAvg: string, totalTime: string) {
  return `
<svg width="320" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="120" fill="#131513" rx="10"/>
  <rect width="320" height="120" fill="none" stroke="#1a1c1a" stroke-width="1" rx="10"/>
  
  <!-- Left side: Daily -->
  <rect x="15" y="15" width="135" height="90" fill="#0b0d0b" rx="6"/>
  <text x="82.5" y="40" font-family="system-ui" font-size="9" fill="#929992" text-anchor="middle">
    DAILY AVERAGE
  </text>
  <text x="82.5" y="75" font-family="system-ui" font-size="24" font-weight="600" fill="#DE7356" text-anchor="middle">
    ${dailyAvg}
  </text>
  
  <!-- Right side: Total -->
  <rect x="170" y="15" width="135" height="90" fill="#0b0d0b" rx="6"/>
  <text x="237.5" y="40" font-family="system-ui" font-size="9" fill="#929992" text-anchor="middle">
    LAST 7 DAYS
  </text>
  <text x="237.5" y="75" font-family="system-ui" font-size="24" font-weight="600" fill="#f6fff5" text-anchor="middle">
    ${totalTime}
  </text>
</svg>`.trim();
}

// Languages: Top languages (300x180)
function generateLanguagesWidget(languages: any[]) {
  return `
<svg width="300" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="180" fill="#131513" rx="10"/>
  <rect width="300" height="180" fill="none" stroke="#1a1c1a" stroke-width="1" rx="10"/>
  
  <text x="20" y="30" font-family="system-ui" font-size="12" font-weight="600" fill="#f6fff5">
    Top Languages
  </text>
  
  ${languages.map((lang, i) => `
    <text x="20" y="${60 + i * 22}" font-family="system-ui" font-size="11" fill="#f6fff5">
      ${lang.name}
    </text>
    <rect x="120" y="${48 + i * 22}" width="${Math.max(lang.percent * 1.5, 3)}" height="8" fill="#DE7356" rx="4"/>
    <text x="280" y="${60 + i * 22}" font-family="system-ui" font-size="10" fill="#929992" text-anchor="end">
      ${lang.percent.toFixed(1)}%
    </text>
  `).join('')}
</svg>`.trim();
}

// Full: Everything (400x200)
function generateFullWidget(dailyAvg: string, totalTime: string, languages: any[], username: string) {
  return `
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="200" fill="#131513" rx="12"/>
  <rect width="400" height="200" fill="none" stroke="#1a1c1a" stroke-width="1" rx="12"/>
  
  <!-- Header -->
  <text x="20" y="28" font-family="system-ui" font-size="14" font-weight="600" fill="#f6fff5">
    📊 Coding Stats
  </text>
  <text x="20" y="45" font-family="system-ui" font-size="9" fill="#929992">
    @${username}
  </text>
  
  <!-- Stats -->
  <rect x="20" y="60" width="160" height="60" fill="#0b0d0b" rx="6"/>
  <text x="100" y="80" font-family="system-ui" font-size="8" fill="#929992" text-anchor="middle">
    DAILY
  </text>
  <text x="100" y="105" font-family="system-ui" font-size="18" font-weight="600" fill="#DE7356" text-anchor="middle">
    ${dailyAvg}
  </text>
  
  <rect x="20" y="130" width="160" height="50" fill="#0b0d0b" rx="6"/>
  <text x="30" y="150" font-family="system-ui" font-size="8" fill="#929992">
    LAST 7 DAYS
  </text>
  <text x="170" y="165" font-family="system-ui" font-size="14" font-weight="500" fill="#f6fff5" text-anchor="end">
    ${totalTime}
  </text>
  
  <!-- Languages -->
  <text x="210" y="75" font-family="system-ui" font-size="10" font-weight="600" fill="#f6fff5">
    Top Languages
  </text>
  ${languages.slice(0, 3).map((lang, i) => `
    <text x="210" y="${95 + i * 22}" font-family="system-ui" font-size="10" fill="#f6fff5">
      ${lang.name}
    </text>
    <rect x="290" y="${85 + i * 22}" width="${Math.max(lang.percent * 0.8, 2)}" height="6" fill="#DE7356" rx="3"/>
    <text x="375" y="${95 + i * 22}" font-family="system-ui" font-size="9" fill="#929992" text-anchor="end">
      ${lang.percent.toFixed(0)}%
    </text>
  `).join('')}
  
  <text x="200" y="190" font-family="system-ui" font-size="7" fill="#929992" text-anchor="middle">
    via Kodo
  </text>
</svg>`.trim();
}

function generateErrorSVG(message: string, type: string) {
  const sizes: Record<string, [number, number]> = {
    small: [200, 80],
    compact: [250, 100],
    medium: [320, 120],
    languages: [300, 180],
    full: [400, 200],
  };
  const [w, h] = sizes[type] || [320, 120];
  
  return `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#131513" rx="8"/>
  <rect width="${w}" height="${h}" fill="none" stroke="#1a1c1a" stroke-width="1" rx="8"/>
  <text x="${w/2}" y="${h/2 - 5}" font-family="system-ui" font-size="12" fill="#f6fff5" text-anchor="middle">
    ⚠️ ${message}
  </text>
  <text x="${w/2}" y="${h/2 + 15}" font-family="system-ui" font-size="8" fill="#929992" text-anchor="middle">
    Make profile public on WakaTime
  </text>
</svg>`.trim();
}
