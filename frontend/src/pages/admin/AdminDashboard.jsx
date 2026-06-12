// import { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';
// import api from '../../services/api';

// const AdminDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [stats, setStats] = useState({
//     assignments: 0,
//     exams: 0,
//     submissions: 0,
//     students: 0
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [assignRes, examRes] = await Promise.all([
//           api.get('/assignments'),
//           api.get('/exams'),
//           //  api.get('/submissions')
//         ]);
//         setStats({
//           assignments: assignRes.data.length,
//           exams: examRes.data.length,
//            submissions:0,
//           students: 0
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStats();
//   }, []);

//   const cards = [
//     {
//       title: 'Assignments',
//       value: stats.assignments,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                 d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//         </svg>
//       ),
//       color: 'from-blue-500 to-blue-600',
//       bgColor: 'bg-blue-100',
//       textColor: 'text-blue-600',
//       link: '/faculty/assignments'
//     },
//     {
//       title: 'Exams',
//       value: stats.exams,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       color: 'from-green-500 to-green-600',
//       bgColor: 'bg-green-100',
//       textColor: 'text-green-600',
//       link: '/faculty/exams'
//     },
//     {
//       title: 'Submissions',
//       value: stats.submissions,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                 d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//         </svg>
//       ),
//       color: 'from-purple-500 to-purple-600',
//       bgColor: 'bg-purple-100',
//       textColor: 'text-purple-600',
//       link: '/faculty/submissions'
//     },
//     {
//       title: 'Students',
//       value: stats.students,
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       ),
//       color: 'from-yellow-500 to-yellow-600',
//       bgColor: 'bg-yellow-100',
//       textColor: 'text-yellow-600',
//       link: '#'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-primary text-black">
//         <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="animate-slideIn">
//               <h1 className="text-3xl font-display font-bold">
//               Faculty Dashboard
//               </h1>
//               <p className="mt-2 text-black/80">
//                 Welcome back, {user?.name}! Manage your study materials
//               </p>
//             </div>
//             <div className="hidden lg:flex items-center gap-4">
//               <Link to="/faculty/assignments" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
//                 New Assignment
//               </Link>
//               <Link to="/faculty/exams" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
//                 New Exam
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 -mt-8">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {cards.map((card, index) => (
//             <Link
//               key={card.title}
//               to={card.link}
//               className="card p-6 animate-slideUp hover:shadow-card-hover group"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`${card.bgColor} p-3 rounded-xl`}>
//                   <div className={card.textColor}>{card.icon}</div>
//                 </div>
//                 <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//               <h3 className="text-3xl font-display font-bold text-gray-900">{card.value}</h3>
//               <p className="text-sm text-gray-500 mt-1">{card.title}</p>
//             </Link>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="card p-6 animate-slideUp">
//             <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">Quick Actions</h2>
//             <div className="space-y-3">
//               <Link to="/faculty/assignments" className="flex items-center p-4 rounded-lg hover:bg-primary-50 transition-colors group">
//                 <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
//                   <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">Create Assignment</p>
//                   <p className="text-sm text-gray-500">Add questions and options</p>
//                 </div>
//               </Link>
//               <Link to="/faculty/exams" className="flex items-center p-4 rounded-lg hover:bg-green-50 transition-colors group">
//                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
//                   <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">Create Exam</p>
//                   <p className="text-sm text-gray-500">Set timer and questions</p>
//                 </div>
//               </Link>
//               <Link to="/faculty/submissions" className="flex items-center p-4 rounded-lg hover:bg-purple-50 transition-colors group">
//                 <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
//                   <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">Grade Submissions</p>
//                   <p className="text-sm text-gray-500">Review student work</p>
//                 </div>
//               </Link>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="card p-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
//             <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">System Overview</h2>
//             <div className="space-y-4">
//               <div className="p-4 bg-green-50 rounded-lg border border-green-200">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <p className="text-sm text-green-700 font-medium">System is running normally</p>
//                 </div>
//               </div>
//               <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//                 <p className="text-sm text-blue-700 font-medium">
//                   Total Content: {stats.assignments + stats.exams} items
//                 </p>
//                 <p className="text-xs text-blue-600 mt-1">
//                   {stats.assignments} assignments, {stats.exams} exams
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import {
  FileText,
  ClipboardList,
  GraduationCap,
  Users,
  PlusCircle,
  FileCheck,
  BookOpen,
  Activity,
  BarChart3,
  TrendingUp,
  Award,
  Bell,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    assignments: 0,
    exams: 0,
    submissions: 0,
    students: 0
  });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [assignRes, examRes] = await Promise.all([
          api.get('/assignments'),
          api.get('/exams'),
        ]);
        setStats({
          assignments: assignRes.data.length,
          exams: examRes.data.length,
          submissions: 0,
          students: 0
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      id: 'assignments',
      label: 'Assignments',
      value: stats.assignments,
      trend: '+12% this month',
      icon: ClipboardList,
      accentColor: 'from-blue-400 to-cyan-500',
      lightBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      link: '/faculty/assignments'
    },
    {
      id: 'exams',
      label: 'Exams',
      value: stats.exams,
      trend: '+5 recent',
      icon: GraduationCap,
      accentColor: 'from-emerald-400 to-teal-500',
      lightBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      link: '/faculty/exams'
    },
    {
      id: 'submissions',
      label: 'Submissions',
      value: stats.submissions,
      trend: 'Pending review',
      icon: FileCheck,
      accentColor: 'from-violet-400 to-purple-500',
      lightBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
      link: '/faculty/submissions'
    },
    {
      id: 'students',
      label: 'Students',
      value: stats.students,
      trend: 'Active today',
      icon: Users,
      accentColor: 'from-amber-400 to-orange-500',
      lightBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      link: '/faculty/students'
    }
  ];
  const quickActions = [
    {
      title: 'Create Assignment',
      description: 'Add questions, set deadline',
      icon: PlusCircle,
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      accentColor: 'text-blue-600',
      link: '/faculty/assignments',
      badge: 'Popular'
    },
    {
      title: 'Create Exam',
      description: 'Set timer and questions',
      icon: FileText,
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      accentColor: 'text-emerald-600',
      link: '/faculty/exams',
      badge: 'Quick'
    },
    {
      title: 'Grade Submissions',
      description: 'Review student work',
      icon: BookOpen,
      bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50',
      accentColor: 'text-violet-600',
      link: '/faculty/submissions',
      badge: 'Review'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with gradient */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Decorative gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />

        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm font-semibold text-slate-500 tracking-wide uppercase">Dashboard</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                Welcome back, {user?.name || 'Educator'}
              </h1>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Here's your course overview and quick access to teaching tools
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                to="/faculty/assignments"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Assignment
              </Link>
              <Link
                to="/faculty/exams"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Exam
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid - Redesigned */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((card, index) => (
              <Link
                key={card.id}
                to={card.link}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${hoveredCard === card.id
                  ? 'border-slate-300 bg-white shadow-lg scale-105'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r ${card.accentColor}`} />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`${card.lightBg} p-3 rounded-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-500">{card.trend}</p>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-slate-900 mb-1">{card.value}</h3>
                <p className="text-sm text-slate-600 font-medium">{card.label}</p>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions - Full height on desktop */}
          <section className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  to={action.link}
                  className={`group relative p-5 rounded-xl border border-slate-200 transition-all hover:border-slate-300 hover:shadow-md overflow-hidden ${action.bgColor}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Subtle animated border glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`p-2.5 rounded-lg bg-white/70 backdrop-blur-sm ${action.accentColor}`}
                      >
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 bg-white/60 px-2 py-1 rounded-full">
                        {action.badge}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-slate-900 transition-colors">{action.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* System Status & Analytics */}
          <section>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">System Status</h2>
            </div>
            <div className="space-y-3">
              {/* Status card */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 animate-pulse" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">All Systems Operational</p>
                    <p className="text-xs text-slate-600 mt-0.5">Platform running smoothly</p>
                  </div>
                </div>
              </div>

              {/* Content summary */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Content Summary</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Total Items</span>
                    <span className="font-bold text-slate-900">{stats.assignments + stats.exams}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((stats.assignments + stats.exams) * 10, 100)}%` }}
                    />
                  </div>
                  <div className="flex gap-4 mt-3 text-xs">
                    <div>
                      <p className="text-slate-600">Assignments</p>
                      <p className="font-semibold text-slate-900">{stats.assignments}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Exams</p>
                      <p className="font-semibold text-slate-900">{stats.exams}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Latest Activity</p>
                <div className="space-y-2">
                  <div className="text-xs text-slate-600 pb-2 border-b border-slate-100">
                    Dashboard loaded
                  </div>
                  <div className="text-xs text-slate-500">
                    Ready to manage your courses
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


