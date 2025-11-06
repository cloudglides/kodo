export interface WakaTimeStats {
  data: {
    daily_average: number;
    total_seconds: number;
    human_readable_total: string;
    human_readable_daily_average: string;
    languages: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
      hours: number;
      minutes: number;
    }>;
    editors: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
    }>;
    operating_systems: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
    }>;
    categories: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
    }>;
    projects: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
    }>;
    best_day: {
      date: string;
      text: string;
      total_seconds: number;
    };
    range: {
      start: string;
      end: string;
      text: string;
    };
  };
}
