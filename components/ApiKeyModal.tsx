'use client';

import { useState } from 'react';
import { X, Key, ExternalLink } from 'lucide-react';
import Cookies from 'js-cookie';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
}

export function ApiKeyModal({ onSave }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter your WakaTime API key');
      return;
    }

    if (!apiKey.startsWith('waka_')) {
      setError('Invalid API key format. Should start with "waka_"');
      return;
    }

    setLoading(true);
    Cookies.set('wakatime_api_key', apiKey, { expires: 365 });
    
    // Small delay to show feedback
    setTimeout(() => {
      onSave(apiKey);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-coral-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect WakaTime</h2>
          <p className="text-gray-600 text-sm">Enter your API key to get started</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setError('');
              }}
              placeholder="waka_..."
              autoFocus
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <a
            href="https://wakatime.com/settings/account"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-coral-600 hover:text-coral-700 font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Get your API key from WakaTime
          </a>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connecting...' : 'Connect Dashboard'}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Your API key is stored securely in your browser cookies and never leaves your device.
        </p>
      </div>
    </div>
  );
}
