import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const GPTSearcher = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { user: true, text: input }]);
      setInput("");
  
      // Send the query to the backend to scrape the data
      try {
        const response = await fetch("http://localhost:3000/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
  
        // Check if the report was successfully returned
        if (data.report) {
          // Display the scraped result in the chat
          setMessages((prev) => [
            ...prev,
            { user: false, text: data.report },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { user: false, text: "No report found." },
          ]);
        }
      } catch (error) {
        console.error("Error scraping data:", error);
        setMessages((prev) => [
          ...prev,
          { user: false, text: "Sorry, I couldn't fetch the data." },
        ]);
      }
      
    }
  };
  

  return (
    <div className="flex flex-col h-full bg-gray-50 p-4">
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-white rounded-lg shadow-md w-full mx-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg w-full ${
              msg.user
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            } shadow-lg`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300 flex flex-col">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Type your query"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GPTSearcher;
