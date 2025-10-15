import React, { useState } from "react";
import AddAgentForm from "../components/AddAgentForm";
import UploadListForm from "../components/UploadListForm";
import DistributedLists from "../components/DistributedLists";

const DashboardPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AddAgentForm />
          <UploadListForm onUploadSuccess={handleUploadSuccess} />
        </main>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Distributed Lists
          </h2>
          <DistributedLists refreshKey={refreshKey} />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
