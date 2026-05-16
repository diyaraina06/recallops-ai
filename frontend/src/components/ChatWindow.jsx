import { useState } from "react";
import axios from "axios";

import {
  Send,
  BookOpen,
  Sparkles,
  ShieldCheck,
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
        "https://recallops-ai.onrender.com",
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

    <div className="flex-1 p-4 md:p-6 overflow-hidden">

      {/* HEADER */}

      <div className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-gradient-to-br
        from-[#071225]
        to-[#020817]
        p-5 md:p-6
        mb-6
      ">

        {/* GLOW */}

        <div className="
          absolute
          top-[-70px]
          right-[-70px]
          w-[180px]
          h-[180px]
          bg-blue-500/20
          blur-3xl
          rounded-full
        "></div>

        <div className="
          relative
          z-10
          flex
          flex-col
          md:flex-row
          md:items-start
          md:justify-between
          gap-5
        ">

          {/* LEFT */}

          <div>

            {/* STATUS */}

            <div className="
              inline-flex
              items-center
              gap-3
              px-4
              py-2
              rounded-2xl
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
              text-sm
              font-medium
              mb-4
            ">

              <div className="
                w-2.5
                h-2.5
                rounded-full
                bg-green-400
                animate-pulse
              "></div>

              AI Infrastructure Operational

            </div>

            {/* TITLE */}

            <h1 className="
              text-3xl
              md:text-5xl
              font-black
              leading-[1.05]
              tracking-tight
            ">

              <span className="
                bg-gradient-to-r
                from-white
                via-blue-100
                to-blue-400
                bg-clip-text
                text-transparent
              ">

                Incident Response

              </span>

              <br />

              <span className="text-white">

                Center

              </span>

            </h1>

            {/* SUBTEXT */}

            <p className="
              text-gray-400
              mt-4
              text-sm
              md:text-base
              max-w-2xl
              leading-7
            ">

              AI-powered operational intelligence platform
              for semantic incident analysis,
              runtime observability,
              and production infrastructure resolution.

            </p>

          </div>

          {/* ACTIONS */}

          <div className="
            flex
            items-center
            gap-3
          ">

            <button
              onClick={() =>
                setActiveView("docs")
              }
              className="
                glass-card
                px-5
                py-3
                rounded-2xl
                hover:bg-white/10
                transition-all
                duration-300
                flex
                items-center
                gap-3
                text-white
                text-sm
                border
                border-white/10
              "
            >

              <BookOpen size={17} />

              Documentation

            </button>

            <button
              onClick={generateIncident}
              className="
                bg-blue-600
                hover:bg-blue-500
                transition-all
                duration-300
                p-3.5
                rounded-2xl
                shadow-lg
                shadow-blue-500/20
                text-white
              "
            >

              <Sparkles size={18} />

            </button>

          </div>

        </div>

      </div>

      {/* INPUT */}

      <div className="
        flex
        flex-col md:flex-row
        gap-4
        mt-6
      ">

        <input
          type="text"
          placeholder="Describe the incident..."
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
          disabled={loading}
          className={`
            w-full md:w-auto
            px-7
            py-4 md:py-0
            justify-center
            rounded-2xl
            shadow-lg
            flex
            items-center
            gap-3
            text-base
            text-white
            transition-all
            duration-300

            ${loading
              ? "bg-blue-400/60 cursor-not-allowed shadow-blue-400/10"
              : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/30"
            }
          `}
        >

          {
            loading ? (

              <>

                <div className="
                  w-4
                  h-4
                  border-2
                  border-white/30
                  border-t-white
                  rounded-full
                  animate-spin
                "></div>

                Analyzing...

              </>

            ) : (

              <>

                <Send size={18} />

                Send

              </>

            )
          }

        </button>

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

          </div>

        )
      }

      {/* SEMANTIC STATUS */}

      <div className="mt-5">

        <div className={`
          inline-flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          border

          ${embeddingsEnabled
            ? "bg-green-500/10 border-green-500/20 text-green-400"
            : "bg-red-500/10 border-red-500/20 text-red-400"
          }
        `}>

          <ShieldCheck size={18} />

          <p className="font-medium">

            {
              embeddingsEnabled
                ? "Semantic Retrieval Enabled"
                : "Semantic Retrieval Disabled"
            }

          </p>

        </div>

      </div>

      {/* MESSAGE FEED */}

      <div className="
        mt-8
        space-y-4
        overflow-y-auto
        max-h-[65vh] md:max-h-[68vh]
        pr-2
      ">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`
              rounded-3xl
              p-4 md:p-5
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

              <h2 className="
                text-lg md:text-xl
                font-bold
                text-white
              ">

                {
                  msg.type === "user"
                    ? "Incident Report"
                    : "AI Resolution"
                }

              </h2>

              <p className="
                text-xs
                text-gray-400
              ">

                {msg.timestamp}

              </p>

            </div>

            <p className="
              text-gray-300
              whitespace-pre-wrap
              leading-7
              text-sm md:text-[15px]
            ">

              {msg.content}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ChatWindow;