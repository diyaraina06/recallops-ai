import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await axios.post("http://127.0.0.1:8000/chat", {
      message,
    });

    setResponse(res.data.reply);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>RecallOps</h1>

      <input
        type="text"
        placeholder="Enter incident..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          padding: "10px",
          width: "400px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginLeft: "10px",
          padding: "10px",
        }}
      >
        Send
      </button>

      <div style={{ marginTop: "30px" }}>
        <strong>AI Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
