import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    assignments: 0,
    exams: 0,
    submissions: 0,
    students: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [assignRes, examRes] = await Promise.all([
          api.get('/assignments'),
          api.get('/exams')
        ]);
        setStats({
          assignments: assignRes.data.length,
          exams: examRes.data.length,
          submissions: 0, // You can add a submissions count endpoint
          students: 0
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Assignments',
      value: stats.assignments,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      link: '/admin/assignments'
    },
    {
      title: 'Exams',
      value: stats.exams,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      link: '/admin/exams'
    },
    {
      title: 'Submissions',
      value: stats.submissions,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      link: '/admin/submissions'
    },
    {
      title: 'Students',
      value: stats.students,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-primary text-black">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="animate-slideIn">
              <h1 className="text-3xl font-display font-bold">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-black/80">
                Welcome back, {user?.name}! Manage your study materials
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/admin/assignments" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
                New Assignment
              </Link>
              <Link to="/admin/exams" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
                New Exam
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 -mt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <Link
              key={card.title}
              to={card.link}
              className="card p-6 animate-slideUp hover:shadow-card-hover group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.bgColor} p-3 rounded-xl`}>
                  <div className={card.textColor}>{card.icon}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900">{card.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.title}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-6 animate-slideUp">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/admin/assignments" className="flex items-center p-4 rounded-lg hover:bg-primary-50 transition-colors group">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Create Assignment</p>
                  <p className="text-sm text-gray-500">Add questions and options</p>
                </div>
              </Link>
              <Link to="/admin/exams" className="flex items-center p-4 rounded-lg hover:bg-green-50 transition-colors group">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Create Exam</p>
                  <p className="text-sm text-gray-500">Set timer and questions</p>
                </div>
              </Link>
              <Link to="/admin/submissions" className="flex items-center p-4 rounded-lg hover:bg-purple-50 transition-colors group">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Grade Submissions</p>
                  <p className="text-sm text-gray-500">Review student work</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">System Overview</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-green-700 font-medium">System is running normally</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 font-medium">
                  Total Content: {stats.assignments + stats.exams} items
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {stats.assignments} assignments, {stats.exams} exams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;