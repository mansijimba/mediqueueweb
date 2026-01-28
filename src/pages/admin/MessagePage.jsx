import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/admin/messages",{ withCredentials: true }
        );
        if (res.data.success) {
          setMessages(res.data.data);
          setError(null);
        } else {
          setError("Failed to load messages");
        }
      } catch (err) {
        setError(err.message || "Error fetching messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-500 animate-pulse text-lg">
        Loading messages...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-600 font-semibold text-lg">
        Error: {error}
      </div>
    );

  if (messages.length === 0)
    return (
      <div className="p-6 text-center text-gray-600 font-medium text-lg">
        No messages found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-600 tracking-wide">
        Admin Messages
      </h1>
      <ul className="space-y-6">
        {messages.map((msg) => (
          <li
            key={msg._id}
            className="relative border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {/* Accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-purple-500"></div>
            <div className="p-6 pl-8">
              <p className="text-gray-900 text-lg leading-relaxed">{msg.content}</p>
              <p className="text-xs text-gray-400 mt-3 italic select-none">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMessagesPage;
