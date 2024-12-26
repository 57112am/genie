import PropTypes from "prop-types";
import { useState } from "react";

const CreateTaskPopup = ({ closePopup, addTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if (taskName.trim()) {
      addTask(taskName);
      setTaskName("");
      closePopup();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-1/3">
        <h2 className="text-xl font-bold mb-4">Create New Work</h2>
        <input
          type="text"
          placeholder="Type of device"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={closePopup}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

CreateTaskPopup.propTypes = {
  closePopup: PropTypes.func.isRequired, // Function to close the popup
  addTask: PropTypes.func.isRequired, // Function to add a task
};

export default CreateTaskPopup;
