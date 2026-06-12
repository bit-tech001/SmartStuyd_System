import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/assignments')
    
      .then(res => setAssignments(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
      
      
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">Available Assignments</h1>
              <p className="mt-2 text-gray-600">Complete assignments to improve your skills</p>
            </div>
            <div className="hidden sm:block">
              <span className="badge badge-primary text-sm px-4 py-2">
                {assignments.length} Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search assignments..."
                className="input-field pl-10"
                onChange={(e) => {
                  // Implement search logic
                }}
              />
            </div>
            <select
              className="input-field w-full sm:w-48"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Assignments</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.length === 0 ? (
            <div className="col-span-full">
              <div className="card p-12 text-center">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assignments Available</h3>
                <p className="text-gray-500">Check back later for new assignments from your faculty.</p>
              </div>
            </div>
          ) : (
            assignments.map((assignment, index) => (
              <div 
                key={assignment._id} 
                className="card group animate-slideUp hover:border-primary-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  {/* Assignment Type Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge badge-primary">
                      {assignment.questions?.length || 0} Questions
                    </span>
                    {assignment.dueDate && (
                      <span className="text-sm text-gray-500">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {assignment.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {assignment.description || 'No description provided'}
                  </p>

                  {/* Created By */}
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                      {assignment.createdBy?.name?.charAt(0) || 'F'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {assignment.createdBy?.name || 'Faculty'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {assignment.createdBy?.email || ''}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/student/assignment/${assignment._id}`}
                    className="block w-full text-center btn-primary transform group-hover:scale-105 transition-transform"
                  >
                    <span className="flex items-center justify-center">
                      Start Assignment
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;