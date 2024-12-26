import { useState } from "react";
import codingIcon from "./assets/1.png";
import pythonIcon from "./assets/2.png";
import planetIcon from "./assets/3.png";
import botIcon from "./assets/4.png";
import sendIcon from "./assets/send.png";
import axios from "axios";

export default function App() {
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
  const [isChat, setIsChat] = useState(true);
  const [messages, setMessages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    try {
      //  const response = await axios.
      if (textMessage.trim()) {
        setMessages([...messages, { text: textMessage, isUser: true }]);
        setTextMessage("");
        // Simulate AI response
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "AI response to: " + textMessage, isUser: false },
          ]);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4">
        {isChat ? (
          <>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-4xl">AssistMe</h1>
              <button
                onClick={() => setIsChat(false)}
                className="bg-[#181818] rounded-full text-sm sm:text-base p-4"
              >
                New Chat
              </button>
            </div>

            <div className="h-[70vh] w-full bg-purple-950 flex flex-col items-center justify-start p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  } w-full mb-4`}
                >
                  <div
                    className={`flex ${
                      message.isUser ? "bg-blue-500" : "bg-[#181818]"
                    } p-4 rounded-full max-w-96`}
                  >
                    <p className="text-left p-3">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full max-w-6xl mb-16 sm:mb-24">
            <h1 className="text-4xl sm:text-5xl text-center mb-8 sm:mb-16">
              AssistMe
            </h1>
            <div className="flex gap-2 mt-8 sm:mt-16 flex-wrap items-center justify-center w-full">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#181818] p-4 rounded-lg relative h-36 w-full sm:w-48 flex-shrink-0"
                >
                  <p>{item.text}</p>
                  <img
                    src={item.icon}
                    alt=""
                    className="absolute right-3 bottom-3"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <form
          className="w-full max-w-4xl  flex items-center bg-[#181818] p-4  rounded-full"
          onSubmit={handleSend}
        >
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
          AssistMe is developed by Muhammad Attique. This AI uses the Gemini API
          for giving responses.
        </p>
      </div>
    </>
  );
}

// import { useState } from "react";
// import codingIcon from "./assets/1.png";
// import pythonIcon from "./assets/2.png";
// import planetIcon from "./assets/3.png";
// import botIcon from "./assets/4.png";
// import sendIcon from "./assets/send.png";

// export default function App() {
//   const data = [
//     {
//       id: 1,
//       text: "What is coding? How can we learn it?",
//       icon: codingIcon,
//     },
//     {
//       id: 2,
//       text: "Which is the red planet of the solar system?",
//       icon: planetIcon,
//     },
//     {
//       id: 3,
//       text: "In which year was Python invented?",
//       icon: pythonIcon,
//     },
//     {
//       id: 4,
//       text: "How can we use AI for adoption?",
//       icon: botIcon,
//     },
//   ];

//   const [textMessage, setTextMessage] = useState("");
//   const [isChat, setIsChat] = useState(true);

//   const handleSend = (e) => {
//     e.preventDefault();
//     console.log(textMessage);
//     setTextMessage("");
//   };

//   return (
//     <>
//       <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4">
//         {isChat ? (
//           <>
//             <div className="  flex items-center justify-between w-full  bg-red-400 ">
//               <h1 className="text-4xl ">AssistMe</h1>
//               <button
//                 onClick={() => setIsChat(true)}
//                 className="text-[#808080] text-sm sm:text-base"
//               >
//                 New Chat
//               </button>
//             </div>

//             <div className="h-[65vh] w-full bg-purple-950 flex items-center justify-around">
//               <div className="flex self-end bg-[#181818] p-4 rounded-full max-w-96  ">
//                 <p className=" text-left p-3">
//                   Wes Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Totam commodi dignissimos perspiciatis!
//                 </p>
//               </div>
//               <div className="flex self-start  bg-[#181818] p-4 rounded-full max-w-96  ">
//                 <p className=" text-left p-3">
//                   Wes Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Totam commodi dignissimos perspiciatis!
//                 </p>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center w-full max-w-6xl">
//             <h1 className="text-4xl sm:text-5xl text-center mb-8 sm:mb-16">
//               AssistMe
//             </h1>
//             <div className="flex gap-2 mt-8 sm:mt-16 flex-wrap items-center justify-center w-full">
//               {data.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-[#181818] p-4 rounded-lg relative h-36 w-full sm:w-48 flex-shrink-0"
//                 >
//                   <p>{item.text}</p>
//                   <img
//                     src={item.icon}
//                     alt=""
//                     className="absolute right-3 bottom-3 "
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <form
//           className="w-full max-w-4xl flex items-center bg-[#181818] p-4 mt-8 rounded-full"
//           onSubmit={handleSend}
//         >
//           <input
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             type="text"
//             placeholder="Write your message here..."
//             className="px-3 rounded bg-transparent outline-none border-none w-full text-sm sm:text-base"
//           />
//           {textMessage && (
//             <button type="submit" className="ml-2">
//               <img src={sendIcon} alt="" className="w-6" />
//             </button>
//           )}
//         </form>

//         <p className="text-center text-[#808080] mt-3 text-xs sm:text-sm">
//           AssistMe is developed by Muhammad Attique. This AI uses the Gemini API
//           for giving responses.
//         </p>
//       </div>
//     </>
//   );
// }
