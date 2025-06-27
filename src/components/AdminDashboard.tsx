import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, MessageSquare, FolderOpen, TrendingUp } from 'lucide-react';
import { useProjectStats } from '../hooks/useProjectStats';

const AdminDashboard = () => {
  const { projectStats, contactStats, isLoading } = useProjectStats();

  if (isLoading) {
    return (
      <div className="glass bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Projects',
      value: projectStats?.total_projects || 0,
      icon: FolderOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Published Projects',
      value: projectStats?.published_projects || 0,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Total Views',
      value: projectStats?.total_views || 0,
      icon: Eye,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'New Inquiries',
      value: contactStats?.new_submissions || 0,
      icon: MessageSquare,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    }
  ];

  const contactData = contactStats ? [
    { name: 'New', value: contactStats.new_submissions, color: '#3B82F6' },
    { name: 'In Progress', value: contactStats.total_submissions - contactStats.new_submissions - contactStats.completed_submissions, color: '#F59E0B' },
    { name: 'Completed', value: contactStats.completed_submissions, color: '#10B981' },
  ] : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-gray-300">Monitor your portfolio performance and client inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="glass bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Submissions Chart */}
        <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Contact Submissions</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contactData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {contactData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-gray-300 text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed Project */}
        <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Performance Insights</h3>
          <div className="space-y-4">
            <div className="glass bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Most Viewed Project</p>
                  <p className="text-white font-semibold">
                    {projectStats?.most_viewed_project || 'No data available'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">High Priority Inquiries</p>
                  <p className="text-white font-semibold">
                    {contactStats?.high_priority_submissions || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Completion Rate</p>
                  <p className="text-white font-semibold">
                    {contactStats?.total_submissions ? 
                      Math.round((contactStats.completed_submissions / contactStats.total_submissions) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;