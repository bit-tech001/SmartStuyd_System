import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const RateSubmission = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSubmission();
  }, []);

  const fetchSubmission = async () => {
    try {
      const res = await api.get(`/submissions/${submissionId}`);

      setSubmission(res.data);
      setScore(res.data.score || '');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      await api.put(`/submissions/rate/${submissionId}`, {
        score,
      });

      navigate(-1);
    } catch (err) {
      console.log(err);
      alert('Failed to grade submission');
    } finally {
      setSaving(false);
    }
  };

  const getScoreColor = () => {
    if (score >= 80) {
      return 'text-green-600 bg-green-100 border-green-200';
    }

    if (score >= 60) {
      return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    }

    return 'text-red-600 bg-red-100 border-red-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f7]">
        <div className="w-14 h-14 rounded-full border-4 border-red-200 border-t-[#c94343] animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f7]">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#c94343] to-[#b63a3a] px-6 py-12">

        <div className="max-w-7xl mx-auto">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white transition mb-6"
          >
            <span className="text-lg">←</span>
            Back
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            <div>
              <h1 className="text-4xl font-bold text-white">
                Rate Submission
              </h1>

              <p className="text-white/80 mt-3 text-lg">
                Review student answers and provide grading
              </p>

              <div className="flex items-center gap-3 mt-6">

                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                  {submission?.student?.name?.charAt(0)}
                </div>

                <div>
                  <h2 className="text-white font-semibold text-lg">
                    {submission?.student?.name}
                  </h2>

                  <p className="text-white/70 text-sm">
                    {submission?.student?.email}
                  </p>
                </div>

              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 min-w-[220px]">

              <p className="text-white/70 text-sm">
                Current Score
              </p>

              <h1 className="text-6xl font-bold text-white mt-3">
                {score || 0}%
              </h1>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* ANSWERS */}
          <div className="xl:col-span-2">

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Student Answers
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Review all submitted answers carefully
                  </p>
                </div>

                <div className="px-4 py-2 rounded-full bg-red-50 text-[#c94343] font-semibold text-sm">
                  {submission?.answers?.length || 0} Answers
                </div>

              </div>

              <div className="space-y-6">

                {submission?.answers?.map((ans, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-2xl p-6 hover:border-red-100 transition"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-red-50 text-[#c94343] flex items-center justify-center font-bold">
                          {index + 1}
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Question {index + 1}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Submitted Answer
                          </p>
                        </div>

                      </div>

                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5">

                      <p className="text-gray-700 leading-7 whitespace-pre-wrap">
                        {ans.answer}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* SIDE PANEL */}
          <div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-6">

              <h2 className="text-2xl font-bold text-gray-900">
                Grading Panel
              </h2>

              <p className="text-gray-500 mt-2">
                Provide final score for this submission
              </p>

              {/* SCORE DISPLAY */}
              <div className={`mt-8 rounded-3xl border p-8 text-center ${getScoreColor()}`}>

                <p className="text-sm font-medium">
                  Final Score
                </p>

                <h1 className="text-6xl font-bold mt-3">
                  {score || 0}%
                </h1>

              </div>

              {/* INPUT */}
              <div className="mt-8">

                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Enter Score
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Enter score"
                  className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#c94343] focus:ring-4 focus:ring-red-100 transition"
                />

              </div>

              {/* SUBMISSION INFO */}
              <div className="mt-8 space-y-4">

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <span className="text-gray-500">
                    Submitted
                  </span>

                  <span className="font-semibold text-gray-800 text-sm">
                    {new Date(submission?.submittedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                  <span className="text-gray-500">
                    Total Answers
                  </span>

                  <span className="font-semibold text-gray-800">
                    {submission?.answers?.length}
                  </span>
                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full mt-8 h-14 rounded-2xl bg-[#c94343] hover:bg-[#b33939] text-white font-semibold transition-all duration-300 shadow-lg shadow-red-200"
              >
                {saving ? 'Saving...' : 'Save Grade'}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default RateSubmission;