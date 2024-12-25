import PropTypes from "prop-types";
import { useState } from "react";

const TaskList = ({ tasks, highlightedTask }) => {
  const [expandedTask, setExpandedTask] = useState(null); // Track expanded task
  const [taskStatuses, setTaskStatuses] = useState(
    tasks.reduce((acc, task) => ({ ...acc, [task]: "Pending" }), {}) // Initialize statuses
  );
  const [selectedPhase, setSelectedPhase] = useState(null); // Track selected phase

  // Function to toggle dropdown
  const toggleDropdown = (task) => {
    setExpandedTask(expandedTask === task ? null : task); // Expand or collapse
  };

  // Function to toggle task status
  const toggleStatus = (task) => {
    setTaskStatuses((prevStatuses) => ({
      ...prevStatuses,
      [task]: prevStatuses[task] === "Pending" ? "Completed" : "Pending",
    }));
  };

  // Mock data for task timeline and responsible person with line-wise status
  const mockDetails = [
    { phase: "Study planning", duration: "5 days", person: "Alice", status: "Completed", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "External lab communication", duration: "3 days", person: "Bob", status: "Completed", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Commercial requirements", duration: "4 days", person: "Charlie", status: "Completed", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Sample requirements", duration: "2 days", person: "Diana", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Sample shipment", duration: "3 days", person: "Eve", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Animal Study Plan", duration: "6 days", person: "Frank", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Execution of animal study", duration: "10 days", person: "Grace", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Completion of in-life phase of animal study", duration: "5 days", person: "Henry", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Pathology evaluation", duration: "4 days", person: "Isabella", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Pathology study report", duration: "3 days", person: "Jack", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Main study report", duration: "5 days", person: "Karen", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
    { phase: "Submission to various regulatory authorities", duration: "6 days", person: "Leo", status: "Pending", tooltip: "Mail is pending, talk to Mr. Sumit, and your deadline is due." },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Work</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks created yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`p-3 border rounded shadow ${
                task === highlightedTask
                  ? "bg-primary text-white"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <div
                  className="cursor-pointer"
                  onClick={() => toggleDropdown(task)}
                >
                  <span>{task}</span>
                  <span>{expandedTask === task ? "▲" : "▼"}</span>
                </div>
                <button
                  className={`px-2 py-1 rounded text-sm ${
                    taskStatuses[task] === "Completed"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                  onClick={() => toggleStatus(task)}
                >
                  {taskStatuses[task]}
                </button>
              </div>
              {expandedTask === task && (
                <div className="mt-4 overflow-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 border border-gray-300 text-left">Phase</th>
                        <th className="p-2 border border-gray-300 text-left">Duration</th>
                        <th className="p-2 border border-gray-300 text-left">Responsible Person</th>
                        <th className="p-2 border border-gray-300 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDetails.map((detail, i) => (
                        <tr
                          key={i}
                          className={`hover:bg-blue-50 ${
                            selectedPhase === detail.phase ? "bg-blue-100" : ""
                          }`}
                        >
                          <td
                            className="p-2 border border-gray-300 cursor-pointer"
                            onClick={() =>
                              setSelectedPhase(
                                selectedPhase === detail.phase
                                  ? null
                                  : detail.phase
                              )
                            }
                          >
                            {detail.phase}
                          </td>
                          <td className="p-2 border border-gray-300">{detail.duration}</td>
                          <td className="p-2 border border-gray-300">{detail.person}</td>
                          <td className="p-2 border border-gray-300">{detail.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedPhase && (
                    <div className="mt-4 p-3 border rounded bg-gray-50">
                      <p className="text-gray-700">
                        {mockDetails.find(
                          (detail) => detail.phase === selectedPhase
                        )?.tooltip}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlightedTask: PropTypes.string, // Highlighted task
};

export default TaskList;
