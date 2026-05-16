import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Expanded Configuration with more icons
  const navigationLinks = [
    { 
      to: user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard', 
      label: "Overview", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
      roles: ['admin', 'student'] 
    },
    { 
      to: "/announcements", 
      label: "Announcements", 
      hasUpdate: true,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
      roles: ['admin', 'student'] 
    },
    { 
      to: "/courses", 
      label: "My Courses", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      roles: ['student'] 
    },
    { 
      to: "/materials", 
      label: "Study Materials", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>,
      roles: ['admin', 'student'] 
    },
    { 
      to: "/admin/manage-users", 
      label: "User Management", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      roles: ['admin'] 
    },
    { 
      to: "/calendar", 
      label: "Calendar", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      roles: ['admin', 'student'] 
    },
    { 
      to: "/assignments", 
      label: "Tasks", 
      badge: "12", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      roles: ['admin', 'student'] 
    },
    { 
      to: "/exams", 
      label: "Exams", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      roles: ['admin', 'student'] 
    },
    { 
      to: "/reports", 
      label: "Reports", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      roles: ['admin'] 
    },
  ];

  const NavItem = ({ to, icon, label, badge, hasUpdate }) => (
    <div className="relative group">
      <Link
        to={to}
        onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
        className={`flex items-center ${
          isCollapsed ? 'justify-center px-0' : 'justify-between px-4'
        } py-3 rounded-xl font-medium transition-all duration-200 ${
          isActive(to)
            ? 'bg-primary-50 text-primary-700 shadow-sm'
            : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50/50'
        }`}
      >
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="relative">
            <span className={`${isActive(to) ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'}`}>
              {icon}
            </span>
            {hasUpdate && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            )}
          </div>
          {!isCollapsed && <span className="text-sm whitespace-nowrap">{label}</span>}
        </div>
        
        {badge && !isCollapsed && (
          <span className="bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </Link>

      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-[11px] rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all z-[100] whitespace-nowrap font-bold shadow-xl">
          {label}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-[70]">
        <button onClick={() => setIsOpen(true)} className="p-3 bg-white shadow-xl rounded-2xl border border-primary-100 text-primary-600">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {isOpen && window.innerWidth < 1024 && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[80]" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-primary-50 z-[90] transform transition-all duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        ${isCollapsed ? 'w-20' : 'w-72'}`}>
        
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-200 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              {!isCollapsed && <span className="text-xl font-black text-gray-800 tracking-tighter">Study<span className="text-primary-600">MS</span></span>}
            </div>
            
            <button 
              onClick={() => window.innerWidth >= 1024 ? setIsCollapsed(!isCollapsed) : setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            >
              {isCollapsed ? 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg> : 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
              }
            </button>
          </div>

          <nav className="flex-1 px-3 space-y-2 overflow-y-auto pt-4">
            {navigationLinks
              .filter(link => link.roles.includes(user?.role))
              .map((link, index) => (
                <NavItem key={index} {...link} />
              ))}
          </nav>

          {!isCollapsed && user?.role === 'student' && (
            <div className="mx-4 p-4 bg-gray-50 rounded-2xl mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Course Progress</span>
                <span className="text-[10px] font-bold text-primary-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-100">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2 rounded-2xl hover:bg-gray-50 transition-all group/user relative`}>
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-red-100">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{user?.role}</p>
                </div>
              )}
              {!isCollapsed && (
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-600 transition-all">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-red-600 text-white text-[11px] rounded-lg opacity-0 pointer-events-none group-hover/user:opacity-100 transition-all font-bold shadow-xl">
                  Logout
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;