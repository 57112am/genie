import { useState } from 'react';
import inboxlight from './assets/Inboxlight.svg';


// Sample data for emails
const emailsData = [
  { id: 1, subject: "Meeting tomorrow", sender: "john@example.com",senderName:"jhon", date: "2024-11-18", preview: "Reminder about the meeting tomorrow at 10 AM." },
  { id: 2, subject: "Invoice for October", sender: "billing@example.com",senderName:"billing", date: "2024-11-17", preview: "Your invoice for the month of October is attached." },
  { id: 3, subject: "Project Update", sender: "kate@example.com",senderName:"kate", date: "2024-11-16", preview: "The project is on track, here's the latest update." }, 
  { id: 4, subject: "Meeting tomorrow", sender: "john@example.com",senderName:"jhon", date: "2024-11-18", preview: "Reminder about the meeting tomorrow at 10 AM." },
  { id: 5, subject: "Invoice for October", sender: "billing@example.com",senderName:"billing", date: "2024-11-17", preview: "Your invoice for the month of October is attached." },
  { id: 6, subject: "Project Update", sender: "kate@example.com",senderName:"kate", date: "2024-11-16", preview: "The project is on track, here's the latest update." },
  { id: 7, subject: "Meeting tomorrow", sender: "john@example.com",senderName:"jhon", date: "2024-11-18", preview: "Reminder about the meeting tomorrow at 10 AM." },
  { id: 8, subject: "Invoice for October", sender: "billing@example.com",senderName:"billing", date: "2024-11-17", preview: "Your invoice for the month of October is attached." },
  { id: 9, subject: "Project Update", sender: "kate@example.com",senderName:"kate", date: "2024-11-16", preview: "The project is on track, here's the latest update." },
  { id: 10, subject: "Meeting tomorrow", sender: "john@example.com",senderName:"jhon", date: "2024-11-18", preview: "Reminder about the meeting tomorrow at 10 AM." },
  { id: 12, subject: "Invoice for October", sender: "billing@example.com",senderName:"billing", date: "2024-11-17", preview: "Your invoice for the month of October is attached." },
  { id: 13, subject: "Project Update", sender: "kate@example.com",senderName:"kate", date: "2024-11-16", preview: "The project is on track, here's the latest update." },
  { id: 14, subject: "Meeting tomorrow", sender: "john@example.com",senderName:"jhon", date: "2024-11-18", preview: "Reminder about the meeting tomorrow at 10 AM." },
  { id: 15, subject: "Invoice for October", sender: "billing@example.com",senderName:"billing", date: "2024-11-17", preview: "Your invoice for the month of October is attached." },
  { id: 16, subject: "Project Update", sender: "kate@example.com",senderName:"kate", date: "2024-11-16", preview: "The project is on track, here's the latest update." },
  
];

export const Inbox = () => {
  const [emails, setEmails] = useState(emailsData);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  const toggleSelectEmail = (id) => {
    setSelectedEmails((prev) =>
      prev.includes(id) ? prev.filter((emailId) => emailId !== id) : [...prev, id]
    );
  };
 
  const selectAllEmails = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map((email) => email.id));
    }
  };

  const deleteSelectedEmails = () => {
    setEmails(emails.filter((email) => !selectedEmails.includes(email.id)));
    setSelectedEmails([]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F7F7F7] 020]">
      {/* Sidebar */}
      <div className="md:w-1/2 lg:w-1/2 py-4 overflow-y-auto border-r text-[13px] border-gray-300 #262626]">
        {/* Toolbar */}
        <div className="flex justify-between items-center px-4 mb-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedEmails.length === emails.length && emails.length > 0}
              onChange={selectAllEmails}
            />
            <span className="text-sm">Select All</span>
          </div>
          <button
            onClick={deleteSelectedEmails}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={selectedEmails.length === 0}
          >
            Delete
          </button>
        </div>

        {/* Email List */}
        <div>
          {emails.map((email) => (
            <div
              key={email.id}
              className={`p-1 py-2 cursor-pointer bg-white px-2  hover:bg-gray-50  border-b te -gray-600 transition-all duration-300 ${
                selectedEmails.includes(email.id) ? 'bg-gray-100 700' : ''
              }`}
              onClick={() => handleEmailSelect(email)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(email.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleSelectEmail(email.id);
                    }}
                  />
                  <button className="w-6 h-6 flex gap-2 items-center focus:outline-none">
                    <img
                      className="w-full h-full object-cover rounded-full"
               
                      alt="User Avatar"
                    />
                    <span className="hidden sm:inline">{email.senderName}</span>
                  </button>
                </div>
                <div className="mt-1 truncate max-w-[50%] 1a1a1] text-gray-800">{email.preview}</div>
                <span className="text-sm">{email.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Preview */}
      <div
        className={`md:w-2/3 lg:w-3/4 mt-2 ml-2 mr-2 md:mt-0 md:ml-0 h-full p-6 bg-white 020] shadow-lg rounded-lg transition-all duration-300 ${
          selectedEmail ? 'block' : 'hidden md:block'
        }`}
      >
        {selectedEmail ? (
          <>
            <div className="border-b #262626] py-2 px-4">
              <div className="flex justify-between">
                <button className="w-8 h-8 flex gap-2 items-center focus:outline-none">
                  <img className="w-full h-full object-cover rounded-full"  alt="User Avatar" />
                  <span>{selectedEmail.senderName}</span>
                </button>
                <p className="mt-1 text-sm">
                  <strong>Date:</strong> {selectedEmail.date}
                </p>
              </div>
            </div>
            <div className="px-4 md:px-10 py-4">
              <h3 className="mt-4 text-[17px] te">{selectedEmail.subject}</h3>
              <p className="mt-2 1a1a1]">
                <strong>From:</strong> {selectedEmail.sender}
              </p>
              <p className="mt-4">{selectedEmail.preview}</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 y-400">
            <img src={inboxlight} className="w-[20vw] md:w-[10vw]" alt="" />
            <p className="text-center">Select an email to view the details.</p>
          </div>
        )}
      </div>
    </div>
  );
};