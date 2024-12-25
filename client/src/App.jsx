import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashborad"; // Fixed typo
import Project from "./Project";
import { Inbox } from "./Inbox";
import TaskList from "./TaskList";
import GPTSearcher from "./GPTSearcher";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home"); // Default page
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [tasks, setTasks] = useState([
    "Work: Finish report",
    "Home: Clean kitchen",
    "Study: Review React hooks",
  ]);

  const [highlightedTask, setHighlightedTask] = useState(null); // State for managing the highlighted task

  // Function to add a task
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Function to handle task click from Dashboard
  const handleTaskClick = (task) => {
    setHighlightedTask(task); // Highlight the task
    setCurrentPage("yourWork"); // Navigate to TaskList page
  };

  // Function to render the current page
  const renderPage = () => {
    console.log("Current page:", currentPage);
    switch (currentPage) {
      case "home":
        return (
          <Dashboard
            tasks={tasks}
            setSearchQuery={setSearchQuery}
            addTask={addTask}
            handleTaskClick={handleTaskClick} // Handle task clicks
          />
        );
      case "project":
        return <Project />;
      case "inbox":
        return <Inbox />;
      case "yourWork":
        return (
          <TaskList
            tasks={tasks}
            highlightedTask={highlightedTask} // Pass the highlighted task
          />
        );
      case "gptSearcher":
        return <GPTSearcher />; // Render GPT Searcher
      default:
        return (
          <Dashboard
            tasks={tasks}
            setSearchQuery={setSearchQuery}
            addTask={addTask}
            handleTaskClick={handleTaskClick} // Handle task clicks
          />
        );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setCurrentPage={setCurrentPage} />
      {/* Main Content */}
      <div className="flex-1">{renderPage()}</div>
    </div>
  );
};

export default App;