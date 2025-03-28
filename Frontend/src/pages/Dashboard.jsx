import React from 'react';
import {
  HiChartBar,
  HiDocumentText,
  HiUserGroup,
  HiClock,
  HiArrowUp,
  HiArrowDown,
} from 'react-icons/hi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const metrics = [
    {
      title: 'Total Forms',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: <HiDocumentText className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Active Submissions',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: <HiUserGroup className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Response Rate',
      value: '68%',
      change: '-2%',
      trend: 'down',
      icon: <HiChartBar className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Avg. Response Time',
      value: '2.4h',
      change: '+0.3h',
      trend: 'down',
      icon: <HiClock className="w-6 h-6 text-primary" />,
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Submissions',
        data: [120, 190, 150, 210, 180, 240],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Dashboard</h1>
        <button className="btn btn-primary flex items-center">
          <HiChartBar className="w-5 h-5 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary-light rounded-lg">
                {metric.icon}
              </div>
              <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {metric.trend === 'up' ? (
                  <HiArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <HiArrowDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.title}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-text mb-4">Submissions Over Time</h2>
          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-text mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-4 bg-primary-light rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                  <HiUserGroup className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">New submission received</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 