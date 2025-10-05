// src/pages/Chat.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { messagesRef, dbPush, dbOnChildAdded } from "../firebase.js";

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messageBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem("chat_username");
    if (!username) {
      navigate("/login");
      return;
    }

    
    const childAddedCallback = (snapshot) => {
      const val = snapshot.val();
      const item = {
        id: snapshot.key || Math.random().toString(36).slice(2),
        user: val.user,
        text: val.text,
        createdAt: val.createdAt || Date.now(),
      };
      setMessages((prev) => [...prev, item]);
    };

    
    dbOnChildAdded(messagesRef, childAddedCallback);

    
    inputRef.current?.focus();
    
    return () => {
      setMessages([]);
    };
  }, [navigate]);

  useEffect(() => {
    if (messageBoxRef.current) {
      // small timeout so new message DOM settles
      setTimeout(() => {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
      }, 50);
    }
  }, [messages]);

  function sendMessage(e) {
    e?.preventDefault?.();
    const username = localStorage.getItem("chat_username") || "Anonymous";
    const trimmed = text.trim();
    if (!trimmed) return;

    // include createdAt so we can show time
    dbPush(messagesRef, {
      user: username,
      text: trimmed,
      createdAt: Date.now(),
    });
    setText("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    // Enter -> send, Shift+Enter -> newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleLogout() {
    localStorage.removeItem("chat_username");
    navigate("/login");
  }

  function formatTime(ts) {
    try {
      return new Date(ts).toLocaleTimeString();
    } catch (err) {
      return "";
    }
  }

  const currentUser = localStorage.getItem("chat_username");

  return (
    <div className="flex flex-col h-[100vh]">
      {/* // navbar */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center mb-3">
        <div className="navbar bg-gray-300 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">
              Chat Box ✍ <strong className="text-black">{currentUser}</strong>
            </a>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* // message box */}
      <div className="w-9/12 mx-auto">
        <div
          ref={messageBoxRef}
          className="flex-1 overflow-auto p-3 bg-[#969090] rounded mb-3"
         > 
          {messages.length === 0 ? (
            <div className="text-center text-sm text-black/70">
              No messages yet — say hi 👋
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`mb-2 flex ${
                  m.user === currentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] break-words p-3 rounded-lg shadow ${
                    m.user === currentUser
                      ? "bg-green-200 text-black"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">
                    {m.user}{" "}
                    <span className="text-[11px] font-normal ml-2">
                      {formatTime(m.createdAt)}
                    </span>
                  </div>
                  <div className="whitespace-pre-line">{m.text}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={sendMessage}
          className="flex bg-white text-black gap-2"
          aria-label="Send a message"
         >
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message"
            className="flex-1 p-2 rounded border border-green-700 text-black resize-none h-14"
            aria-label="Message input"
          />
          <button
            type="submit"
            className={`w-24 rounded p-2 ${
              text.trim()
                ? "bg-green-600 hover:bg-green-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!text.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
