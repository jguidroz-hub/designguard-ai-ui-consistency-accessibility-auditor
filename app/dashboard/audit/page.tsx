'use client';
import { useState } from 'react';
import Link from 'next/link';

type Issue = { id: string; type: 'consistency' | 'a11y' | 'spacing'; severity: 'critical' | 'warning' | 'info'; element: string; description: string; fix: string; };

const DEMO: Issue[] = [
  { id: '1', type: 'a11y', severity: 'critical', element: 'button.submit-btn', description: 'Color contrast ratio 2.8:1 — fails WCAG AA (requires 4.5:1)', fix: 'Change text color to #1a1a1a or background to #4F46E5' },
  { id: '2', type: 'a11y', severity: 'critical', element: 'img.hero-image', description: 'Missing alt text on decorative image', fix: 'Add alt="" for decorative or descriptive alt text' },
  { id: '3', type: 'consistency', severity: 'warning', element: '.card-title', description: 'Font size 18px — differs from design system (16px)', fix: 'Update to var(--text-base) or 16px' },
  { id: '4', type: 'spacing', severity: 'warning', element: '.sidebar-nav', description: 'Padding 12px — inconsistent with 16px grid system', fix: 'Use p-4 (16px) to match grid' },
  { id: '5', type: 'consistency', severity: 'info', element: '.btn-primary', description: 'Border radius 6px — design system specifies 8px', fix: 'Update to rounded-lg or 8px' },
  { id: '6', type: 'a11y', severity: 'warning', element: 'form.login', description: 'No visible focus indicator on input fields', fix: 'Add focus:ring-2 focus:ring-blue-500' },
];

const sevColors: Record<string, string> = { critical: 'bg-red-100 text-red-700', warning: 'bg-yellow-100 text-yellow-700', info: 'bg-blue-100 text-blue-700' };
const typeIcons: Record<string, string> = { consistency: '🎨', a11y: '♿', spacing: '📐' };

export default function AuditPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? DEMO : DEMO.filter(i => i.type === filter);
  const score = Math.round(100 - DEMO.filter(i => i.severity === 'critical').length * 15 - DEMO.filter(i => i.severity === 'warning').length * 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <h1 className="font-bold text-lg">UI Audit Report</h1>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${score >= 80 ? 'bg-green-100 text-green-700' : score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{score}/100</span>
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm rounded-lg">🔍 Run New Audit</button>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-gray-400 uppercase">Score</p><p className="text-3xl font-bold">{score}</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-red-500 uppercase">Critical</p><p className="text-2xl font-bold text-red-600">{DEMO.filter(i=>i.severity==='critical').length}</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-yellow-500 uppercase">Warnings</p><p className="text-2xl font-bold text-yellow-600">{DEMO.filter(i=>i.severity==='warning').length}</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-blue-500 uppercase">Info</p><p className="text-2xl font-bold text-blue-600">{DEMO.filter(i=>i.severity==='info').length}</p></div>
        </div>
        <div className="flex gap-2 mb-4">
          {['all','consistency','a11y','spacing'].map(t=>(
            <button key={t} onClick={()=>setFilter(t)} className={`px-3 py-1.5 text-xs rounded-lg font-medium ${filter===t?'bg-black text-white':'bg-white border text-gray-600'}`}>
              {t==='all'?'All Issues':t==='a11y'?'♿ Accessibility':t==='consistency'?'🎨 Consistency':'📐 Spacing'}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filtered.map(issue=>(
            <div key={issue.id} className="bg-white rounded-xl border p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{typeIcons[issue.type]}</span>
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{issue.element}</code>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sevColors[issue.severity]}`}>{issue.severity}</span>
                  </div>
                  <p className="text-sm font-medium">{issue.description}</p>
                </div>
              </div>
              <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <p className="text-sm text-green-700">💡 <strong>Fix:</strong> {issue.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
