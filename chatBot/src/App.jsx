import { useState, useEffect, useRef } from "react";
import codingIcon from "./assets/1.png";
import pythonIcon from "./assets/2.png";
import planetIcon from "./assets/3.png";
import botIcon from "./assets/4.png";
import sendIcon from "./assets/send.png";
import axios from "axios";
import "./index.css";

export default function App() {
  const messagesEndRef = useRef(null);

  const data = [
    {
      id: 1,
      text: "What is coding? How can we learn it?",
      icon: codingIcon,
    },
    {
      id: 2,
      text: "Which is the red planet of the solar system?",
      icon: planetIcon,
    },
    {
      id: 3,
      text: "In which year was Python invented?",
      icon: pythonIcon,
    },
    {
      id: 4,
      text: "How can we use AI for adoption?",
      icon: botIcon,
    },
  ];

  const [textMessage, setTextMessage] = useState("");
  const [isChat, setIsChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    setIsChat(true);
    if (textMessage.trim()) {
      setMessages([...messages, { text: textMessage, isUser: true }]);
      setTextMessage("");
      setLoading(true);

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
            import.meta.env.VITE_GEMINI_API_KEY
          }`,
          {
            contents: [
              {
                parts: [{ text: textMessage }],
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const aiResponse = response.data.candidates[0].content.parts[0].text;
        const formattedResponse = parseResponse(aiResponse);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: formattedResponse, isUser: false, isHtml: true },
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsChat(true);
    setTextMessage("");
  };

  const parseResponse = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/gim, '<h2>$1</h2>');
    text = text.replace(/`(.*?)`/gim, '<code>$1</code>');
    text = text.replace(/```(.*?)```/gs, (match, p1) => {
      return `<pre><code>${p1.replace(/\n/g, '<br>')}</code></pre>`;
    });
    text = text.replace(/\n/gim, '<br>');
    text = text.replace(/\n\n/gim, '<p></p>');
    return text.trim();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 hide-scrollbar">
        {isChat ? (
          <>
            <div className="rounded-full flex items-center justify-between w-full">
              <h1 className="text-4xl cursor-pointer" onClick={() => setIsChat(false)}>
                AssistMe
              </h1>
              <button
                onClick={handleNewChat}
                className="bg-[#181818] rounded-full text-sm sm:text-base p-4"
              >
                New Chat
              </button>
            </div>
            <div className="w-full min-h-[70vh]">
              <div className="w-full flex flex-col items-center justify-start p-4 hide-scrollbar overflow-y-auto max-h-[70vh]">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"} w-full mb-4`}>
                    <div
                      className={`flex ${message.isUser ? "bg-blue-500" : "bg-[#181818]"} p-2 rounded-xl max-w-[80%] break-words`}
                    >
                      {message.isHtml ? (
                        <div className="text-left p-3" dangerouslySetInnerHTML={{ __html: message.text }} />
                      ) : (
                        <p className="text-left p-3">{message.text}</p>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start w-full mb-4">
                    <div className="flex bg-[#181818] p-2 rounded-3xl max-w-[80%] break-words">
                      <p className="text-left p-3">Loading...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full max-w-6xl mb-16 sm:mb-24">
            <h1 className="text-4xl sm:text-5xl text-center mb-8 sm:mb-16">AssistMe</h1>
            <div className="flex gap-2 mt-8 sm:mt-16 flex-wrap items-center justify-center w-full">
              {data.map((item) => (
                <div key={item.id} className="bg-[#181818] p-4 rounded-lg relative h-36 w-full sm:w-48 flex-shrink-0">
                  <p>{item.text}</p>
                  <img src={item.icon} alt="" className="absolute right-3 bottom-3" />
                </div>
              ))}
            </div>
          </div>
        )}

        <form className="w-full max-w-4xl flex items-center bg-[#181818] p-4 rounded-full" onSubmit={handleSend}>
          <input
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            type="text"
            placeholder="Write your message here..."
            className="px-3 rounded bg-transparent outline-none border-none w-full text-sm sm:text-base"
          />
          {textMessage && (
            <button type="submit" className="ml-2">
              <img src={sendIcon} alt="" className="w-6" />
            </button>
          )}
        </form>

        <p className="text-center text-[#808080] mt-3 text-xs sm:text-sm">
          AssistMe is developed by Muhammad Attique. This AI uses the Gemini API for giving responses.
        </p>
      </div>
    </>
  );
}
