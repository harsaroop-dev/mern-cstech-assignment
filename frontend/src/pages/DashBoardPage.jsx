import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAgentForm from "../components/AddAgentForm";
import UploadListForm from "../components/UploadListForm";
import DistributedLists from "../components/DistributedLists";

const DashboardPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header / Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Action Forms Section */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-slate-600 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AddAgentForm />
              <UploadListForm onUploadSuccess={handleUploadSuccess} />
            </div>
          </section>

          {/* Distributed Lists Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
              Distributed Lists
            </h2>
            <DistributedLists refreshKey={refreshKey} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
