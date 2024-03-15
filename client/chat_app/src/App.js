import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userName, setUserName] = useState("");
  const [userjoined, setUserJoined] = useState([]);
  const [userLeft, setUserLeft] = useState([]);
  const sendUser = (e) => {
    e.preventDefault();
    socket.emit("user", {
      userName: userName,
    });
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };
  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });

    socket.on("userName", (payload) => {
      // console.log("what is payload", payload);
      setUserJoined([...userjoined, payload]);
    });

    socket.on("disconnectd user", (payload) => {
      setUserLeft([...userLeft, payload]);
    });
  }, [chat, userjoined, userLeft]);

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div>
        <h2>Users Joined:</h2>
        <ul>
          {userjoined.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
        <br />
        <h2>Users Left:</h2>
        <ul>
          {userLeft.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      {chat.map((payload, index) => {
        return (
          <div className="flex justify-center items-center" key={index}>
            <h1 className=" text-[8px] text-gray-200 bg-gray-600">
              ({payload.userName})
            </h1>
            <h1 className=" ml-2 text-2xl">{payload.message}</h1>
          </div>
        );
      })}
      <form onSubmit={sendChat}>
        <input
          className=" m-4 border-2 border-gray-300"
          type="text"
          name="chat"
          value={message}
          placeholder="send message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button className=" w-20 border-2 m-4 border-gray-300" type="submit">
          Send
        </button>
      </form>
      <form onSubmit={sendChat}>
        <input
          className=" m-4 border-2 border-gray-300"
          type="text"
          name="userName"
          value={userName}
          placeholder="Enter your name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default App;
