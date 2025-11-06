import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BASE_URL = 'https://wakatime.com/api/v1';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  const cookieStore = await cookies();
  const WAKATIME_API_KEY = cookieStore.get('wakatime_api_key')?.value;

  if (!WAKATIME_API_KEY) {
    return NextResponse.json(
      { error: 'WakaTime API key not configured' },
      { status: 401 }
    );
  }

  try {
    const url = `${BASE_URL}/users/current/summaries?start=${start}&end=${end}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching WakaTime summaries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch WakaTime summaries' },
      { status: 500 }
    );
  }
}
