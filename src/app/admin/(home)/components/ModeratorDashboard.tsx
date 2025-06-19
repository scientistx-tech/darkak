import React from "react";

const ModeratorLandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <h1 className="text-3xl font-bold text-blue-700">
            Welcome, Moderator
          </h1>
          <p className="mt-2 text-gray-600">
            You’re seeing a limited version of the dashboard. Your role is to
            keep the platform clean and safe.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: "Reports Today", value: 12, color: "blue" },
            { label: "Pending Reviews", value: 7, color: "yellow" },
            { label: "Resolved Issues", value: 48, color: "green" },
            { label: "Flagged Users", value: 3, color: "red" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-${stat.color}-50 rounded-lg border-l-4 p-4 shadow-sm border-${stat.color}-500`}
            >
              <h2 className={`text-${stat.color}-600 text-sm font-semibold`}>
                {stat.label}
              </h2>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Recent Reports
          </h3>
          <ul className="divide-y divide-gray-200">
            {[
              {
                id: 1,
                user: "user123",
                issue: "Spam post in the general forum",
                time: "2 hours ago",
              },
              {
                id: 2,
                user: "jane_doe",
                issue: "Inappropriate language",
                time: "4 hours ago",
              },
              {
                id: 3,
                user: "admin_test",
                issue: "Fake profile picture",
                time: "Yesterday",
              },
            ].map((report) => (
              <li
                key={report.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="font-medium text-gray-700">{report.issue}</p>
                  <p className="text-sm text-gray-500">
                    Reported by:{" "}
                    <span className="font-semibold">{report.user}</span> •{" "}
                    {report.time}
                  </p>
                </div>
                <button className="text-sm text-blue-600 hover:underline">
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Quick Actions
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
              Review Reports
            </button>
            <button className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">
              View User Activity
            </button>
            <button className="rounded-md bg-yellow-600 px-4 py-2 text-white transition hover:bg-yellow-700">
              Pending Approvals
            </button>
            <button className="rounded-md bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700">
              Contact Admin
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          You have restricted access. For more privileges, please contact the
          system administrator.
        </div>
      </div>
    </div>
  );
};

export default ModeratorLandingPage;
