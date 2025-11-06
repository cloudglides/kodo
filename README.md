# WakaTime Dashboard

A beautiful, modern dashboard for visualizing your WakaTime coding statistics.

## Features

- 📊 Real-time WakaTime API integration
- 📈 Interactive charts and visualizations
- 🎨 Beautiful dark theme UI
- ⚡ Built with Next.js 15 and React
- 🎯 TypeScript for type safety
- 📱 Fully responsive design

## Setup

1. **Get your WakaTime API Key:**
   - Go to https://wakatime.com/settings/account
   - Scroll to "API Key" section
   - Copy your secret API key

2. **Configure the API key:**
   - Open `.env.local`
   - Replace `your_wakatime_api_key_here` with your actual API key:
     ```
     WAKATIME_API_KEY=waka_your_actual_key_here
     ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the dashboard:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## What's Included

- **Stats Cards:** Total time, daily average, best day, and language count
- **Language Chart:** Bar chart showing time spent in each programming language
- **Editors Chart:** Pie chart displaying editor usage distribution
- **Projects List:** Top projects with progress bars
- **Operating Systems:** OS usage breakdown

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (for visualizations)
- Lucide React (for icons)

## API Endpoints

The dashboard uses the WakaTime API v1:
- `/api/v1/users/current/stats/last_7_days` - Get last 7 days of coding stats

Data is cached for 5 minutes to reduce API calls.

## License

MIT
