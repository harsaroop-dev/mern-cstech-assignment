import React, { useState, useEffect } from "react";
import api from "../services/api";

const DistributedLists = ({ refreshKey }) => {
  const [groupedTasks, setGroupedTasks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data: tasks } = await api.get("/lists");

        const grouped = tasks.reduce((acc, task) => {
          const agentName = task.assignedAgent
            ? task.assignedAgent.name
            : "Unassigned";
          if (!acc[agentName]) {
            acc[agentName] = [];
          }
          acc[agentName].push(task);
          return acc;
        }, {});

        setGroupedTasks(grouped);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [refreshKey]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading lists...</p>;
  }

  if (Object.keys(groupedTasks).length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500">
          No tasks found. Upload a CSV file to see the distributed lists.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(groupedTasks).map(([agentName, tasks]) => (
        <div key={agentName} className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold mb-3 border-b pb-2">{agentName}</h4>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task._id} className="text-sm bg-gray-50 p-2 rounded">
                <p className="font-semibold">{task.firstName}</p>
                <p className="text-gray-600">{task.phone}</p>
                {task.notes && (
                  <p className="text-xs text-gray-500 italic mt-1">
                    Note: {task.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DistributedLists;
