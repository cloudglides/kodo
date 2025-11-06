'use client';

import { LayoutDashboard, Code2, Calendar, BarChart3, Users, Settings, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">Kodo</span>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 mb-3 px-3">MENU</p>
          <nav className="space-y-1">
            <Link 
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-green-50 text-green-600 font-medium border-l-4 border-green-600"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/tasks"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Code2 className="w-5 h-5" />
              <span>Tasks</span>
              <span className="ml-auto text-xs font-semibold bg-gray-900 text-white px-2 py-0.5 rounded">02</span>
            </Link>
            <Link 
              href="/calendar"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </Link>
            <Link 
              href="/analytics"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
            <Link 
              href="/team"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Team</span>
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 mb-3 px-3">GENERAL</p>
          <nav className="space-y-1">
            <Link 
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <Link 
              href="/help"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Download App */}
      <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="mb-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <Code2 className="w-5 h-5" />
          </div>
          <p className="font-semibold text-sm mb-1">Download our</p>
          <p className="font-semibold text-sm">Mobile App</p>
          <p className="text-xs text-gray-400 mt-1">Get it easy in anychat.any</p>
        </div>
        <button className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors">
          Download
        </button>
      </div>
    </div>
  );
}
