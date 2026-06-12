import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AssignmentForm from '../../components/admin/AssignmentForm';

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      const res = await api.get('/assignments');
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAssignments(); }, []);

  const handleCreate = async (data) => {
    try {
      await api.post('/assignments', data);
      setShowForm(false);
      fetchAssignments();
    } catch (err) {
      alert('Failed to create assignment');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) return;
    try {
      await api.delete(`/assignments/${id}`);
      fetchAssignments();
    } catch (err) {
      alert('Failed to delete assignment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-100 border-t-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Manage Assignments</h1>
              <p className="text-sm text-gray-500 mt-1">Oversee assessments and student submissions</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                showForm 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {showForm ? 'Cancel' : '+ Create Assignment'}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
  
  {/* Form Section with Card Depth */}
  {showForm && (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in slide-in-from-top-8 duration-500">
      <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Create New Assignment</h2>
        <span className="text-xs font-semibold px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-500 shadow-sm">STEP 1 OF 1</span>
      </div>
      <div className="p-8">
        <AssignmentForm onSubmit={handleCreate} />
      </div>
    </section>
  )}

  {/* Active Assignments Section */}
  <section>
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Active Assignments</h2>
        <p className="text-gray-500 mt-1">Manage your course curriculum and student tracking.</p>
      </div>
      <div className="hidden sm:block text-sm font-semibold text-gray-400">
        Showing {assignments.length} assignments
      </div>
    </div>

    {assignments.length === 0 ? (
      <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-inner">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">📁</div>
        <h3 className="text-lg font-bold text-gray-900">No content available</h3>
        <p className="text-gray-500 mt-1 max-w-xs mx-auto">It looks like you haven't published any assignments yet. Start by clicking the button above.</p>
      </div>
    ) : (
      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <article 
            key={assignment._id} 
            className="group bg-white p-7 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-primary-100 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Left Info Area */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-lg shadow-sm">
                  {assignment.title.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1 max-w-md">{assignment.description || 'No description provided.'}</p>
                </div>
              </div>

              {/* Middle Metrics */}
              <div className="flex items-center gap-8 pl-17 lg:pl-0">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Questions</span>
                  <span className="text-sm font-semibold text-gray-900">{assignment.questions?.length || 0}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Due Date</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
              
              {/* Action Area */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/faculty/submissions/${assignment._id}`)}
                  className="flex-1 lg:flex-none px-6 py-2.5 text-sm font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-xl transition-all active:scale-95"
                >
                  View Submissions
                </button>
                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="p-3 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
</main>
    </div>
  );
};

export default ManageAssignments;