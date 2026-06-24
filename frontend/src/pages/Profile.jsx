import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Update state management
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    phone: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get('/auth/me');
        setUser(res.data.user);
        // Initialize form fields with incoming API data
        setFormData({
          department: res.data?.department || '',
          phone: res.data?.phone || '',
          bio: res.data?.bio || ''
        });
      } catch (err) {
        console.error('Error fetching ERP profile master data:', err);
        setError('System Error: Failed to retrieve user registry records.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      // Adjust endpoint if your backend route is structured differently (e.g., /users/profile)
      const res = await api.put('/auth/profile', formData);
      
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to dispatch user profile record adjustments:', err);
      alert('Transmission Failure: Could not update database entries.');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
        <p className="mt-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Loading Registry File...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm max-w-sm text-center">
          <p className="text-sm font-semibold text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all"
          >
            Reload Module
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto space-y-5">
        
        {/* ERP CORPORATE MASTER CARD */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-red-600 text-white flex items-center justify-center text-2xl font-black shadow-inner tracking-tight shrink-0">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold tracking-tight">{user?.name}</h1>
                  <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
                    {user?.role || 'User'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
              </div>
            </div>

            <div className="flex sm:flex-row items-start sm:items-center gap-4 self-stretch sm:self-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-800 justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                ERP Session Status: Active
              </span>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold rounded-lg transition-all"
              >
                {isEditing ? 'Cancel Edit' : 'Edit Registry'}
              </button>
            </div>
          </div>

          {/* EDIT ROUTING OR VIEW ROUTING SWITCH */}
          {isEditing ? (
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight border-b border-slate-100 pb-2">Modify Master System Variables</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department Division</label>
                  <input 
                    type="text" 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Routing Phone</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                    placeholder="e.g. +1 555-0199"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Personnel Comments / Biography</label>
                <textarea 
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                  placeholder="Enter personalized metadata logs..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all"
                >
                  Discard Changes
                </button>
                <button 
                  type="submit" 
                  disabled={updateLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  {updateLoading ? 'Saving Registry...' : 'Commit Updates'}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* MASTER SYSTEM ATTRIBUTES */}
              <div className="lg:col-span-2 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ERPField 
                    label="Department Division" 
                    value={user?.department || 'Not Assigned'} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />}
                  />
                  <ERPField 
                    label="System Routing Phone" 
                    value={user?.phone || 'Not Configured'} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                  />
                  <ERPField 
                    label="Access Clearance Matrix" 
                    value={user?.role || 'Student'} 
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                  />
                </div>

                {/* RESOURCE BIOGRAPHY */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Personnel Comments / Biography</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {user?.bio || 'No personalized metadata logs entered. System records are running on institutional defaults.'}
                  </p>
                </div>
              </div>

              {/* IDENTITY PASSPORT GENERATOR */}
              <div className="bg-slate-50/60 rounded-xl border border-slate-200 p-5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Data Passport Record</h3>
                <p className="text-[11px] text-slate-400 max-w-[200px] mb-4 font-medium">Scan code string below to mirror system credentials externally.</p>
                
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <QRCodeCanvas
                    value={JSON.stringify({
                      name: user?.name,
                      email: user?.email,
                      role: user?.role,
                    })}
                    size={140}
                    level="H"
                  />
                </div>
                <div className="mt-4 text-[9px] font-mono tracking-widest text-slate-400 uppercase">SYS SECURE MODULE</div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// CLEAN ALIGNED ERP COMPONENT DATA FIELD
const ERPField = ({ label, value, icon }) => (
  <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start justify-between gap-3">
    <div className="overflow-hidden">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <h4 className="text-sm font-bold text-slate-800 mt-1.5 truncate capitalize">
        {value}
      </h4>
    </div>
    {icon && (
      <div className="p-1.5 bg-slate-50 border border-slate-150 rounded-lg text-slate-400 shrink-0">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
    )}
  </div>
);

export default Profile;