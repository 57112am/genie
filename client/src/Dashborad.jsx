import PropTypes from "prop-types";
import { useState } from "react";

const Dashboard = ({ tasks, setSearchQuery, addTask, handleTaskClick }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [taskName, setTaskName] = useState(""); // Task name input
  const [taskType, setTaskType] = useState(""); // Task type input
  const [filteredTasks, setFilteredTasks] = useState(null); // State for filtered tasks
  const [hasSearched, setHasSearched] = useState(false); // Tracks if a search was performed

  // Function to handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
    setHasSearched(true);
    if (query.trim() === "") {
      setFilteredTasks(null); // Reset filtered tasks if query is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = tasks.filter((task) =>
        task.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredTasks(filtered);
    }
  };

  // Function to handle task creation
  const handleCreateTask = () => {
    if (taskName && taskType) {
      const newTask = `${taskType}: ${taskName}`;
      addTask(newTask);
      setTaskName("");
      setTaskType("");
      setIsPopupOpen(false);
      setFilteredTasks((prev) => (prev ? [...prev, newTask] : [newTask])); // Update filtered tasks if they exist
    } else {
      alert("Please fill in both task name and type.");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="bg-headerBg py-4 px-6 rounded-md shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-textDark">Good afternoon, User</h1>
            <p className="text-sm text-textLight">Welcome back to your dashboard</p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Task List */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Your Tasks</h2>
        {!hasSearched ? (
          <p className="text-gray-600">Please search to see tasks.</p>
        ) : filteredTasks && filteredTasks.length > 0 ? (
          <ul className="space-y-2">
            {filteredTasks.map((task, index) => (
              <li
                key={index}
                className="p-3 bg-gray-100 border border-gray-300 rounded shadow cursor-pointer"
                onClick={() => handleTaskClick(task)} // Navigate to TaskList
              >
                {task}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No tasks found.</p>
        )}
      </div>

      {/* Create Task Button */}
      <button
        className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
        onClick={() => setIsPopupOpen(true)} // Open popup
      >
        Create Task
      </button>

      {/* Create Task Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Create New Task</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Type
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter task type"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white py-2 px-4 rounded"
                onClick={handleCreateTask} // Handle task creation
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
Dashboard.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  handleTaskClick: PropTypes.func.isRequired,
};

export default Dashboard;
