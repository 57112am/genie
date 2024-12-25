import PropTypes from "prop-types";

const Sidebar = ({ setCurrentPage }) => {
  return (
    <div className="bg-sidebar w-64 h-screen p-6 border-r border-border">
      <h2 className="text-lg font-bold text-textPrimary mb-6">test-10000</h2>
      <ul className="space-y-4">
        <li
          className="text-textPrimary hover:text-primary cursor-pointer"
          onClick={() => setCurrentPage("home")}
        >
          Home
        </li>
        <li
          className="text-textPrimary hover:text-primary cursor-pointer"
          onClick={() => setCurrentPage("project")}
        >
          Projects
        </li>
        <li
          className="text-textPrimary hover:text-primary cursor-pointer"
          onClick={() => setCurrentPage("yourWork")}
        >
          PMS
        </li>
        <li
          className="text-textPrimary hover:text-primary cursor-pointer"
          onClick={() => setCurrentPage("inbox")}
        >
          Inbox
        </li>
        <li
          className="text-textPrimary hover:text-primary cursor-pointer"
          onClick={() => setCurrentPage("gptSearcher")}
        >
          GPT Searcher
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Sidebar;