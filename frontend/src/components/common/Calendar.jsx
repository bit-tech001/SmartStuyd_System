import { useState } from "react";

const Calendar = () => {

  const [currentDate] = useState(new Date());

  const month = currentDate.toLocaleString("default", {
    month: "long"
  });

  const year = currentDate.getFullYear();

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const events = {
    5: "Exam",
    10: "Assignment",
    15: "Holiday",
    20: "Project Review",
    25: "Submission"
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#7B1E1E] to-[#B03030] text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Academic Calendar
          </h1>

          <p className="mt-2 text-white/80">
            Manage Exams, Assignments & Events
          </p>
        </div>

        <div className="text-right">
          <h2 className="text-3xl font-bold">
            {month}
          </h2>

          <p className="text-xl">
            {year}
          </p>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">

        {/* CALENDAR */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-8">

          {/* DAYS */}
          <div className="grid grid-cols-7 gap-4 mb-4">

            {days.map((day) => (

              <div
                key={day}
                className="bg-[#9B2424] text-white py-4 rounded-xl text-center font-bold"
              >
                {day}
              </div>

            ))}

          </div>

          {/* DATES */}
          <div className="grid grid-cols-7 gap-4">

            {dates.map((date) => (

              <div
                key={date}
                className={`h-32 rounded-2xl p-3 shadow border relative transition hover:scale-105 cursor-pointer
                ${
                  events[date]
                    ? "bg-gradient-to-br from-[#7B1E1E] to-[#B03030] text-white"
                    : "bg-gray-50"
                }`}
              >

                <div className="flex justify-between items-start">

                  <h2 className="text-xl font-bold">
                    {date}
                  </h2>

                  {events[date] && (
                    <span className="w-3 h-3 bg-yellow-300 rounded-full"></span>
                  )}

                </div>

                {events[date] && (

                  <div className="mt-4">

                    <p className="text-sm font-semibold">
                      {events[date]}
                    </p>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

        {/* EVENT PANEL */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-[#7B1E1E] mb-6">
            Upcoming Events
          </h2>

          <div className="space-y-5">

            <div className="border-l-4 border-red-700 bg-red-50 p-4 rounded-lg">

              <h3 className="font-bold text-red-700">
                Semester Exam
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                5th May 2026
              </p>

            </div>

            <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded-lg">

              <h3 className="font-bold text-blue-700">
                Assignment Submission
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                10th May 2026
              </p>

            </div>

            <div className="border-l-4 border-green-700 bg-green-50 p-4 rounded-lg">

              <h3 className="font-bold text-green-700">
                Project Review
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                20th May 2026
              </p>

            </div>

            <div className="border-l-4 border-yellow-600 bg-yellow-50 p-4 rounded-lg">

              <h3 className="font-bold text-yellow-700">
                Final Submission
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                25th May 2026
              </p>

            </div>

          </div>

          {/* LEGEND */}
          <div className="mt-10">

            <h3 className="font-bold text-gray-700 mb-4">
              Legend
            </h3>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-700 rounded-full"></div>
                <p>Exam</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-700 rounded-full"></div>
                <p>Assignment</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-700 rounded-full"></div>
                <p>Project</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Calendar;