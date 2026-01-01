import React from 'react';
import { DemoLayout } from '@/components/DemoLayout';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, ShieldCheck } from 'lucide-react';
const DATA_EFFICIENCY = [
  { name: 'Jan', manual: 120, ai: 45 },
  { name: 'Feb', manual: 115, ai: 42 },
  { name: 'Mar', manual: 125, ai: 38 },
  { name: 'Apr', manual: 110, ai: 35 },
];
const DATA_RISK = [
  { name: 'Low', value: 400 },
  { name: 'Moderate', value: 300 },
  { name: 'High', value: 100 },
];
const COLORS = ['#00A896', '#3b82f6', '#C44536'];
export function AnalyticsDemo() {
  return (
    <DemoLayout title="CHM Analytics">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold text-health-dark">Health Intelligence Dashboard</h2>
            <p className="text-muted-foreground">Predictive clinical metrics driven by the AACI Engine.</p>
          </div>
          <Button className="rounded-full bg-health-teal text-white shadow-lg shadow-health-teal/20">
            <Download className="mr-2 h-4 w-4" /> Export Insights
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-4xl bg-white shadow-neu space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-health-dark flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-health-teal" /> Documentation Time (Minutes)
              </h3>
              <span className="text-[10px] font-bold bg-teal-50 text-health-teal px-2 py-1 rounded">68% Improvement</span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_EFFICIENCY}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="manual" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Manual" />
                  <Bar dataKey="ai" fill="#00A896" radius={[4, 4, 0, 0]} name="Voither AI" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="p-8 rounded-4xl bg-white shadow-neu flex flex-col items-center justify-center space-y-4">
              <h3 className="font-bold text-health-dark">Population Risk Distribution</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DATA_RISK} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {DATA_RISK.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4">
                {DATA_RISK.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 rounded-4xl bg-health-bg shadow-neu-inset border border-white">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-white shadow-neu-soft center shrink-0">
              <ShieldCheck className="h-5 w-5 text-health-teal" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-health-dark">AI Agent Insight</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on documentation efficiency trends, switching to full ambient documentation across the rheumatology department could recover approximately 14 hours of clinical face-time per week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}