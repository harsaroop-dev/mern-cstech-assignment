import React, { useState } from "react";
import api from "../services/api";

const UploadListForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/lists/upload", formData);
      setMessage(response.data.message);
      setFile(null);
      document.getElementById("csvFile").value = "";
      onUploadSuccess();
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("File upload failed. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full h-full flex flex-col">
      <h3 className="text-xl font-bold mb-4">Upload CSV and Distribute</h3>

      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="flex-grow flex flex-col justify-center items-center text-center p-4 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          <div className="w-full max-w-xs">
            <label
              className="block text-slate-600 font-semibold mb-2"
              htmlFor="csvFile"
            >
              Choose a file to upload
            </label>
            <input
              type="file"
              id="csvFile"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </div>
        </div>

        <div className="mt-auto pt-4">
          {message && (
            <p className="text-blue-600 text-sm text-center mb-2">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center mb-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Upload and Distribute
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadListForm;
