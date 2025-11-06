'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type WidgetType = 'small' | 'compact' | 'medium' | 'languages' | 'full';

const widgetTypes = [
  { id: 'small', name: 'Small', desc: 'Just daily time', size: '200×80' },
  { id: 'compact', name: 'Compact', desc: 'Daily + 7-day total', size: '250×100' },
  { id: 'medium', name: 'Medium', desc: 'Clean cards', size: '320×120' },
  { id: 'languages', name: 'Languages', desc: 'Top 5 languages', size: '300×180' },
  { id: 'full', name: 'Full', desc: 'Complete stats', size: '400×200' },
];

export default function EmbedPage() {
  const [username, setUsername] = useState('');
  const [selectedType, setSelectedType] = useState<WidgetType>('medium');
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const widgetUrl = `${baseUrl}/api/widget?username=${username || 'YOUR_USERNAME'}&type=${selectedType}`;
  
  const embedCode = `<img src="${widgetUrl}" alt="WakaTime Stats" />`;
  const markdownCode = `![WakaTime Stats](${widgetUrl})`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0d0b] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#f6fff5] mb-3">
            WakaTime Widget Generator
          </h1>
          <p className="text-[#929992]">
            Embed beautiful coding stats anywhere - no API key required
          </p>
        </div>

        {/* Username Input */}
        <div className="bg-[#131513] border border-[#1a1c1a] rounded-lg p-6 mb-8">
          <label className="block text-sm font-medium text-[#929992] mb-2">
            WakaTime Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your_username"
            className="w-full px-4 py-3 bg-[#0b0d0b] border border-[#1a1c1a] rounded-lg text-[#f6fff5] focus:outline-none focus:border-[#DE7356] transition-colors"
          />
          <p className="mt-2 text-xs text-[#929992]">
            Find at wakatime.com/@<strong>username</strong>
          </p>
        </div>

        {/* Widget Type Selection */}
        <div className="bg-[#131513] border border-[#1a1c1a] rounded-lg p-6 mb-8">
          <h3 className="text-sm font-medium text-[#f6fff5] mb-4">Select Widget Style</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {widgetTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as WidgetType)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-[#DE7356] bg-[#DE7356]/10'
                    : 'border-[#1a1c1a] hover:border-[#2a2c2a]'
                }`}
              >
                <div className="text-sm font-medium text-[#f6fff5] mb-1">{type.name}</div>
                <div className="text-xs text-[#929992] mb-1">{type.desc}</div>
                <div className="text-xs text-[#DE7356]">{type.size}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        {username && (
          <div className="bg-[#131513] border border-[#1a1c1a] rounded-lg p-6 mb-8">
            <h3 className="text-sm font-medium text-[#929992] mb-4">Preview</h3>
            <div className="flex justify-center p-8 bg-[#0b0d0b] rounded-lg">
              <img 
                src={`/api/widget?username=${username}&type=${selectedType}`} 
                alt="WakaTime Stats"
                className="rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Embed Codes */}
        <div className="space-y-6">
          {/* HTML */}
          <div className="bg-[#131513] border border-[#1a1c1a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#f6fff5]">HTML Code</h3>
              <button
                onClick={() => handleCopy(embedCode)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#DE7356] hover:bg-[#f3937f] text-white rounded-lg text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-[#0b0d0b] border border-[#1a1c1a] rounded p-4 text-xs text-[#f6fff5] overflow-x-auto">
              <code>{embedCode}</code>
            </pre>
          </div>

          {/* Markdown */}
          <div className="bg-[#131513] border border-[#1a1c1a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#f6fff5]">Markdown (GitHub README)</h3>
              <button
                onClick={() => handleCopy(markdownCode)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#DE7356] hover:bg-[#f3937f] text-white rounded-lg text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-[#0b0d0b] border border-[#1a1c1a] rounded p-4 text-xs text-[#f6fff5] overflow-x-auto">
              <code>{markdownCode}</code>
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-[#131513] border border-[#1a1c1a] rounded-lg p-6">
          <h3 className="text-sm font-medium text-[#f6fff5] mb-4">Requirements</h3>
          <ul className="space-y-2 text-sm text-[#929992]">
            <li className="flex items-start gap-2">
              <span className="text-[#DE7356] mt-1">•</span>
              <span>Your WakaTime profile must be <strong className="text-[#f6fff5]">public</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#DE7356] mt-1">•</span>
              <span>Enable at <strong className="text-[#f6fff5]">wakatime.com/settings/account</strong> → Profile Visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#DE7356] mt-1">•</span>
              <span>Stats update every 5 minutes (cached)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#DE7356] mt-1">•</span>
              <span>100% safe - no API key needed!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
