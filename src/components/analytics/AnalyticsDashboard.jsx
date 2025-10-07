import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useHybridData } from '../../contexts/HybridDataContext';

const COLORS = ['#fcee0a', '#f0a500', '#8a7400', '#525252'];

export const AnalyticsDashboard = () => {
  const { gigs, jobs } = useHybridData();

  // Status distribution
  const statusData = [
    { name: 'To Do', value: jobs.filter(j => j.status === 'todo').length },
    { name: 'In Progress', value: jobs.filter(j => j.status === 'in-progress').length },
    { name: 'Blocked', value: jobs.filter(j => j.status === 'blocked').length },
    { name: 'Completed', value: jobs.filter(j => j.status === 'completed').length },
  ].filter(item => item.value > 0);

  // Priority distribution
  const priorityData = [
    { name: 'Low', value: jobs.filter(j => j.priority === 'low').length },
    { name: 'Medium', value: jobs.filter(j => j.priority === 'medium').length },
    { name: 'High', value: jobs.filter(j => j.priority === 'high').length },
    { name: 'Critical', value: jobs.filter(j => j.priority === 'critical').length },
  ];

  // Gigs with job counts
  const gigsData = gigs.slice(0, 5).map(gig => ({
    name: gig.title.substring(0, 20) + (gig.title.length > 20 ? '...' : ''),
    jobs: jobs.filter(j => j.gig_id === gig.id).length,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow mb-2">
          Analytics
        </h1>
        <p className="text-sm font-mono text-cyber-gray-500">
          Insights and statistics for your gigs and jobs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Job Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #3a3a3a',
                      fontFamily: 'Share Tech Mono',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-cyber-gray-500 font-mono py-16">No jobs yet</p>
            )}
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {jobs.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#737373"
                    style={{ fontFamily: 'Share Tech Mono', fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#737373"
                    style={{ fontFamily: 'Share Tech Mono', fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #3a3a3a',
                      fontFamily: 'Share Tech Mono',
                    }}
                  />
                  <Bar dataKey="value" fill="#fcee0a" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-cyber-gray-500 font-mono py-16">No jobs yet</p>
            )}
          </CardContent>
        </Card>

        {/* Top Gigs by Job Count */}
        {gigsData.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Top Gigs by Job Count</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gigsData} layout="vertical">
                  <XAxis 
                    type="number"
                    stroke="#737373"
                    style={{ fontFamily: 'Share Tech Mono', fontSize: '12px' }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name" 
                    stroke="#737373"
                    style={{ fontFamily: 'Share Tech Mono', fontSize: '12px' }}
                    width={150}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #3a3a3a',
                      fontFamily: 'Share Tech Mono',
                    }}
                  />
                  <Bar dataKey="jobs" fill="#fcee0a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

