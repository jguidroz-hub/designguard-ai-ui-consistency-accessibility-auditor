'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
      <p className="text-gray-600 mb-8">Here's your DesignGuard: AI UI Consistency & Accessibility Auditor overview.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded-lg bg-blue-50">
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-2xl font-bold text-blue-600">Active</p>
        </div>
        <div className="p-4 border rounded-lg bg-green-50">
          <p className="text-sm text-gray-600">Plan</p>
          <p className="text-2xl font-bold text-green-600">Free</p>
        </div>
        <div className="p-4 border rounded-lg bg-purple-50">
          <p className="text-sm text-gray-600">Since</p>
          <p className="text-2xl font-bold text-purple-600">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <a href="/dashboard/design-systems" className="block p-4 border rounded-lg hover:bg-blue-50 transition">
            <h3 className="font-medium">Design Systems Dashboard</h3>
            <p className="text-sm text-gray-500">Overview and management of tracked design systems</p>
          </a>
          <a href="/dashboard/audits" className="block p-4 border rounded-lg hover:bg-blue-50 transition">
            <h3 className="font-medium">Audit History</h3>
            <p className="text-sm text-gray-500">Historical view of component audits</p>
          </a>
          <a href="/dashboard/design-systems/[id]" className="block p-4 border rounded-lg hover:bg-blue-50 transition">
            <h3 className="font-medium">Design System Details</h3>
            <p className="text-sm text-gray-500">Detailed view of a specific design system</p>
          </a>
        <a href="/dashboard/settings" className="block p-4 border rounded-lg hover:bg-blue-50 transition">
          <h3 className="font-medium">Settings</h3>
          <p className="text-sm text-gray-500">Manage your account preferences</p>
        </a>
      </div>
    </div>
  );
}
