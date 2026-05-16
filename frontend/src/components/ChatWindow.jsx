import { useState } from "react";
import axios from "axios";

import {
  Send,
  BookOpen,
  Sparkles,
  Brain,
} from "lucide-react";

function ChatWindow({
  runtimeData,
  setRuntimeData,
  messages,
  setMessages,
  setActiveView,
  embeddingsEnabled,
}) {

  const [message, setMessage] = useState("");

  const [similarIncident, setSimilarIncident] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const sampleIncidents = [

    "AWS load balancer returning 502 Bad Gateway errors",

    "Docker containers crashing after CI/CD deployment",

    "MongoDB connections timing out in production",

    "Kubernetes pods restarting continuously",

    "Redis cache causing high latency spikes",

    "PostgreSQL database latency increased suddenly",

    "Users facing gateway timeout failures in production",

    "CI pipeline failing after infrastructure update",
  ];

  const generateIncident = () => {

    const randomIncident =
      sampleIncidents[
      Math.floor(
        Math.random() * sampleIncidents.length
      )
      ];

    setMessage(randomIncident);
  };

  const sendMessage = async () => {

    if (!message.trim()) return;

    setLoading(true);

    const start = performance.now();

    const userMessage = {
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message,
          embeddings_enabled:
            embeddingsEnabled,
        }
      );

      const end = performance.now();

      const latency =
        ((end - start) / 1000).toFixed(2);

      setSimilarIncident(
        res.data.similar_incident
      );

      const aiMessage = {
        type: "ai",
        content: res.data.reply,
        timestamp:
          new Date().toLocaleTimeString(),
      };

      // NEWEST INCIDENT + AI RESPONSE AT TOP

      setMessages((prev) => [

        userMessage,

        aiMessage,

        ...prev,
      ]);

      setRuntimeData({

        latency: `${latency}s`,

        cost: `$${(
          Math.random() * 0.02
        ).toFixed(3)}`,

        severity: res.data.severity,

        memoryHits:
          res.data.similar_incident
            ? 1
            : 0,

        status: "Operational",

        logs: [

          `[${new Date().toLocaleTimeString()}] Incident received`,

          embeddingsEnabled
            ? `[${new Date().toLocaleTimeString()}] Semantic memory retrieval enabled`
            : `[${new Date().toLocaleTimeString()}] Semantic retrieval disabled`,

          `[${new Date().toLocaleTimeString()}] AI resolution generated using llama-3.3-70b`,

          `[${new Date().toLocaleTimeString()}] Operational memory updated`,
        ],
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

      setMessage("");
    }
  };

  return (

    <div className="flex-1 p-6 overflow-hidden">

      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Incident Response
            <br />
            Center
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            AI-Powered Incident Analysis & Resolution
          </p>

        </div>

        <div className="flex gap-3">

          {/* DOCS BUTTON */}

          <button
            onClick={() =>
              setActiveView("docs")
            }
            className="
              glass-card
              px-4
              py-3
              rounded-2xl
              hover:bg-white/10
              transition
              flex
              items-center
              gap-2
              text-white
              text-sm
            "
          >

            <BookOpen size={16} />

            Documentation

          </button>

          {/* RANDOM INCIDENT */}

          <button
            onClick={generateIncident}
            className="
              glass-card
              p-3
              rounded-2xl
              hover:bg-white/10
              transition
              text-white
            "
          >

            <Sparkles size={16} />

          </button>

        </div>

      </div>

      {/* INPUT */}

      <div className="flex gap-4 mt-8">

        <input
          type="text"
          placeholder="Describe the incident in detail..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="
            flex-1
            bg-[#0f172a]
            border
            border-blue-500/20
            px-5
            py-4
            rounded-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            text-base
            text-white
            placeholder:text-gray-500
          "
        />

        <button
          onClick={sendMessage}
          className="
            bg-blue-600
            hover:bg-blue-500
            transition
            px-7
            rounded-2xl
            shadow-lg
            shadow-blue-500/30
            flex
            items-center
            gap-2
            text-base
            text-white
          "
        >

          <Send size={18} />

          Send

        </button>

      </div>

      {/* EMBEDDINGS STATUS */}

      <div className="mt-4">

        <div className={`
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          text-sm

          ${embeddingsEnabled
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
          }
        `}>

          <div className={`
            w-2
            h-2
            rounded-full

            ${embeddingsEnabled
              ? "bg-green-400"
              : "bg-red-400"
            }
          `}></div>

          {
            embeddingsEnabled
              ? "Semantic Retrieval Enabled"
              : "Semantic Retrieval Disabled"
          }

        </div>

      </div>

      {/* SIMILAR INCIDENT */}

      {
        similarIncident &&
        embeddingsEnabled && (

          <div className="
            mt-5
            bg-yellow-500/10
            border
            border-yellow-500/20
            rounded-2xl
            p-4
          ">

            <p className="
              text-yellow-400
              font-semibold
              text-base
            ">

              Similar Incident Detected

            </p>

            <p className="
              text-white
              mt-2
              text-sm
            ">

              {
                similarIncident.incident
              }

            </p>

            <p className="
              text-yellow-300
              text-xs
              mt-3
            ">

              Confidence Match:
              {" "}
              {
                similarIncident.score
              }%

            </p>

          </div>

        )
      }

      {/* MESSAGE FEED */}

      <div className="
        mt-8
        space-y-4
        overflow-y-auto
        h-[68vh]
        pr-2
      ">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`
              rounded-3xl
              p-5
              border
              shadow-xl

              ${msg.type === "user"
                ? "bg-blue-600/10 border-blue-500/20"
                : "glass-card"
              }
            `}
          >

            <div className="
              flex
              items-center
              justify-between
              mb-4
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className={`
                  w-3
                  h-3
                  rounded-full

                  ${msg.type === "user"
                    ? "bg-blue-400"
                    : "bg-purple-400"
                  }
                `}></div>

                <h2 className="
                  text-xl
                  font-bold
                  text-white
                ">

                  {
                    msg.type === "user"
                      ? "Incident Report"
                      : "AI Resolution"
                  }

                </h2>

              </div>

              <p className="
                text-gray-400
                text-sm
              ">

                {msg.timestamp}

              </p>

            </div>

            <p className="
              text-gray-300
              whitespace-pre-wrap
              leading-7
              text-[15px]
            ">

              {msg.content}

            </p>

          </div>

        ))}

        {/* LOADING */}

        {
          loading && (

            <div className="
              glass-card
              rounded-3xl
              p-5
              border
              border-white/10
              animate-pulse
            ">

              <div className="
                flex
                items-center
                gap-4
                mb-4
              ">

                <div className="
                  w-10
                  h-10
                  rounded-xl
                  bg-purple-500/20
                  flex
                  items-center
                  justify-center
                ">

                  <Brain
                    className="text-purple-400"
                    size={18}
                  />

                </div>

                <div>

                  <h2 className="
                    text-xl
                    font-bold
                    text-white
                  ">

                    AI Resolution

                  </h2>

                  <p className="
                    text-purple-300
                    text-sm
                    mt-1
                  ">

                    Analyzing incident...

                  </p>

                </div>

              </div>

              <div className="space-y-3">

                <div className="
                  h-4
                  bg-white/10
                  rounded-full
                  w-full
                "></div>

                <div className="
                  h-4
                  bg-white/10
                  rounded-full
                  w-5/6
                "></div>

                <div className="
                  h-4
                  bg-white/10
                  rounded-full
                  w-4/6
                "></div>

              </div>

            </div>

          )
        }

      </div>

    </div>
  );
}

export default ChatWindow;