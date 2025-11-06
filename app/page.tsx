'use client';

import { useEffect, useState } from 'react';
import { Settings, Clock, Code, TrendingUp, Target, Activity } from 'lucide-react';
import { format, subDays } from 'date-fns';
import Cookies from 'js-cookie';
import { WakaTimeStats } from '@/lib/types';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { StatCard } from '@/components/StatCard';
import { SimpleChart } from '@/components/SimpleChart';
import { LanguagesList } from '@/components/LanguagesList';
import { ProjectsList } from '@/components/ProjectsList';
import { EditorsList } from '@/components/EditorsList';

export default function Dashboard() {
  const [stats, setStats] = useState<WakaTimeStats | null>(null);
  const [summaries, setSummaries] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const apiKey = Cookies.get('wakatime_api_key');
    setHasApiKey(!!apiKey);
    if (!apiKey) {
      setShowApiModal(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasApiKey) return;

    async function fetchData() {
      try {
        const [statsRes, summariesRes] = await Promise.all([
          fetch('/api/wakatime?endpoint=stats/last_7_days'),
          fetch(`/api/wakatime/summaries?start=${format(subDays(new Date(), 6), 'yyyy-MM-dd')}&end=${format(new Date(), 'yyyy-MM-dd')}`)
        ]);

        if (statsRes.status === 401 || summariesRes.status === 401) {
          setShowApiModal(true);
          setHasApiKey(false);
          return;
        }

        if (!statsRes.ok || !summariesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [statsData, summariesData] = await Promise.all([
          statsRes.json(),
          summariesRes.json()
        ]);

        setStats(statsData);
        setSummaries(summariesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [hasApiKey]);

  const handleApiKeySave = (apiKey: string) => {
    setShowApiModal(false);
    setHasApiKey(true);
    setLoading(true);
  };

  const handleSettings = () => {
    Cookies.remove('wakatime_api_key');
    setHasApiKey(false);
    setShowApiModal(true);
  };

  if (showApiModal) {
    return <ApiKeyModal onSave={handleApiKeySave} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0d0b] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-[#DE7356] animate-pulse" />
          <span className="text-[10px] font-medium text-[#929992]" style={{ lineHeight: '10px' }}>Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-[#0b0d0b] flex items-center justify-center p-4">
        <div className="text-center max-w-sm bg-primary border border-[#1a1c1a] rounded-lg p-6">
          <p className="text-sm text-[#f6fff5] mb-4">Unable to load data</p>
          <button 
            onClick={handleSettings}
            className="text-sm text-[#DE7356] hover:text-[#f3937f] font-medium"
          >
            Update API Key
          </button>
        </div>
      </div>
    );
  }

  const { data } = stats;

  const weeklyData = summaries?.data?.map((day: any) => ({
    day: format(new Date(day.range.date), 'EEE'),
    hours: parseFloat(((day.grand_total?.total_seconds || 0) / 3600).toFixed(2)),
  })) || [];

  const totalHours = parseFloat((data.total_seconds / 3600).toFixed(1));
  const avgHours = parseFloat((data.daily_average / 3600).toFixed(1));

  return (
    <div className="min-h-screen bg-[#0b0d0b]">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-medium text-[#f6fff5] mb-2">Dashboard</h1>
            <p className="text-[10px] font-medium text-[#929992]" style={{ lineHeight: '10px' }}>Last 7 days of coding activity</p>
          </div>
          <button 
            onClick={handleSettings}
            className="p-2.5 hover:bg-primary rounded-lg transition-colors border border-[#1a1c1a]"
          >
            <Settings className="w-4 h-4 text-[#929992]" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total time"
            value={`${totalHours}h`}
            icon={Clock}
            change="Last 7 days"
          />
          <StatCard
            label="Daily average"
            value={`${avgHours}h`}
            icon={TrendingUp}
          />
          <StatCard
            label="Projects"
            value={data.projects?.length || 0}
            icon={Target}
          />
          <StatCard
            label="Languages"
            value={data.languages?.length || 0}
            icon={Code}
          />
        </div>

        {/* Chart */}
        <div className="mb-8">
          <SimpleChart data={weeklyData} />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LanguagesList languages={data.languages || []} />
          <ProjectsList projects={data.projects || []} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditorsList editors={data.editors || []} />
          <div className="bg-primary border border-[#1a1c1a] rounded-lg p-6">
            <h3 className="text-[10px] font-medium text-[#929992] uppercase tracking-wider mb-3" style={{ lineHeight: '10px' }}>Total</h3>
            <div className="text-3xl font-medium text-[#f6fff5] mb-2">{data.human_readable_total}</div>
            <p className="text-[10px] font-medium text-[#929992]" style={{ lineHeight: '10px' }}>coded in the last 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
