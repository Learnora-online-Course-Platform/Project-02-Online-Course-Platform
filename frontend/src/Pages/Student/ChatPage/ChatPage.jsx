import React from "react";
import "./ChatPage.css";
import { FaSearch, FaPhoneAlt, FaVideo, FaTimes } from "react-icons/fa";

const ChatPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat with Instructor</h3>
        <div className="chat-actions">
          <FaSearch className="icon" />
          <FaPhoneAlt className="icon" />
          <FaVideo className="icon" />
          <FaTimes className="icon" />
        </div>
      </div>

      <div className="chat-body">
        {/* Message from Becky */}
        <div className="message message-right">
          <div className="message-bubble blue">
            <strong>Becky Adams</strong>
            <p>
              Bunny did a great job, her assistance was highly helpful in this
              project 💙
            </p>
          </div>
        </div>

        {/* Message from Ricky */}
        <div className="message message-left">
          <div className="message-bubble gray">
            <strong>Ricky Jones</strong>
            <p>We are working on the integration</p>
          </div>
        </div>

        {/* Repeat Becky */}
        <div className="message message-right">
          <div className="message-bubble blue">
            <strong>Becky Adams</strong>
            <p>
              Bunny did a great job, her assistance was highly helpful in this
              project 💙
            </p>
          </div>
        </div>

        {/* Repeat Ricky */}
        <div className="message message-left">
          <div className="message-bubble gray">
            <strong>Ricky Jones</strong>
            <p>We are working on the integration</p>
          </div>
        </div>
      </div>

      <div className="chat-footer">
        <input type="text" placeholder="Your message" />
        <button className="send-btn">➤</button>
      </div>
    </div>
  );
};

export default ChatPage;
