import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BASE_URL = 'https://wakatime.com/api/v1';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || 'stats/last_7_days';
  
  const cookieStore = await cookies();
  const WAKATIME_API_KEY = cookieStore.get('wakatime_api_key')?.value;

  if (!WAKATIME_API_KEY) {
    return NextResponse.json(
      { error: 'WakaTime API key not configured' },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${BASE_URL}/users/current/${endpoint}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch WakaTime data' },
      { status: 500 }
    );
  }
}
