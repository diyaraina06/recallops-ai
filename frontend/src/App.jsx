import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import RuntimeLogs from "./components/RuntimeLogs";

import AnalyticsPage from "./components/AnalyticsPage";
import MemoryPage from "./components/MemoryPage";
import SettingsPage from "./components/SettingsPage";
import IncidentsPage from "./components/IncidentsPage";
import BudgetPage from "./components/BudgetPage";
import DocumentationPage from "./components/DocumentationPage";

function App() {

  /* MESSAGES */

  const [messages, setMessages] = useState(() => {

    const saved =
      localStorage.getItem(
        "recallops_messages"
      );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  /* ACTIVE VIEW */

  const [activeView, setActiveView] =
    useState("dashboard");

  /* SEMANTIC RETRIEVAL */

  const [embeddingsEnabled, setEmbeddingsEnabled] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "recallops_embeddings"
        );

      return saved
        ? JSON.parse(saved)
        : true;
    });

  /* RUNTIME DATA */

  const [runtimeData, setRuntimeData] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "recallops_runtime"
        );

      return saved
        ? JSON.parse(saved)
        : {

          latency: "0ms",
          cost: "$0.000",
          severity: "Low",
          memoryHits: 0,
          status: "Operational",
          logs: [],
        };
    });

  /* SAVE MESSAGES */

  useEffect(() => {

    localStorage.setItem(
      "recallops_messages",
      JSON.stringify(messages)
    );

  }, [messages]);

  /* SAVE RUNTIME */

  useEffect(() => {

    localStorage.setItem(
      "recallops_runtime",
      JSON.stringify(runtimeData)
    );

  }, [runtimeData]);

  /* SAVE SETTINGS */

  useEffect(() => {

    localStorage.setItem(
      "recallops_embeddings",
      JSON.stringify(
        embeddingsEnabled
      )
    );

  }, [embeddingsEnabled]);

  return (

    <div className="
      min-h-screen
      bg-[#020817]
      text-white
      flex
      overflow-hidden
    ">

      {/* SIDEBAR */}

      <div className="hidden md:flex">

        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
        />

      </div>

      {/* MOBILE NAV */}

      <div className="
        md:hidden
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-[#020817]
        border-b
        border-white/10
        px-4
        py-3
      ">

        <div className="
          flex
          gap-2
          overflow-x-auto
        ">

          {
            [
              "dashboard",
              "incidents",
              "memory",
              "logs",
              "analytics",
              "budget",
              "settings",
              "docs",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  setActiveView(item)
                }
                className="
                  px-3
                  py-2
                  rounded-xl
                  bg-white/5
                  text-sm
                  whitespace-nowrap
                "
              >

                {item}

              </button>

            ))
          }

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="
        flex-1
        flex
        pt-[70px]
        md:pt-0
        overflow-hidden
      ">

        {/* CENTER SECTION */}

        <div className="flex-1 overflow-hidden">

          {
            activeView === "dashboard" && (

              <ChatWindow
                runtimeData={runtimeData}
                setRuntimeData={setRuntimeData}
                messages={messages}
                setMessages={setMessages}
                setActiveView={setActiveView}
                embeddingsEnabled={embeddingsEnabled}
              />

            )
          }

          {
            activeView === "logs" && (

              <RuntimeLogs
                runtimeData={runtimeData}
              />

            )
          }

          {
            activeView === "analytics" && (

              <AnalyticsPage
                runtimeData={runtimeData}
              />

            )
          }

          {
            activeView === "memory" && (

              <MemoryPage
                messages={messages}
              />

            )
          }

          {
            activeView === "settings" && (

              <SettingsPage
                embeddingsEnabled={embeddingsEnabled}
                setEmbeddingsEnabled={setEmbeddingsEnabled}
              />

            )
          }

          {
            activeView === "incidents" && (

              <IncidentsPage
                messages={messages}
              />

            )
          }

          {
            activeView === "budget" && (

              <BudgetPage
                runtimeData={runtimeData}
                messages={messages}
              />

            )
          }

          {
            activeView === "docs" && (

              <DocumentationPage />

            )
          }

        </div>

        {/* RIGHT ANALYTICS PANEL */}

        {
          activeView === "dashboard" && (

            <div className="
              hidden
              lg:flex
              w-[340px]
              border-l
              border-white/10
              bg-[#030712]
              p-6
              flex-col
              overflow-y-auto
            ">

              <h1 className="
                text-4xl
                font-bold
                text-white
                mb-10
              ">

                Runtime Analytics

              </h1>

              {/* ANALYTICS */}

              <div className="space-y-8">

                <div className="flex items-center gap-4">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-cyan-500/10
                    flex
                    items-center
                    justify-center
                    text-cyan-400
                    text-2xl
                  ">

                    ⚙️

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Model
                    </p>

                    <h2 className="text-2xl font-bold">
                      llama-3.3-70b
                    </h2>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-green-500/10
                    flex
                    items-center
                    justify-center
                    text-green-400
                    text-2xl
                  ">

                    ⏱️

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Latency
                    </p>

                    <h2 className="text-2xl font-bold">
                      {runtimeData.latency}
                    </h2>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-pink-500/10
                    flex
                    items-center
                    justify-center
                    text-pink-400
                    text-2xl
                  ">

                    💲

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Cost
                    </p>

                    <h2 className="text-2xl font-bold">
                      {runtimeData.cost}
                    </h2>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-yellow-500/10
                    flex
                    items-center
                    justify-center
                    text-yellow-400
                    text-2xl
                  ">

                    🧠

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Memory Hits
                    </p>

                    <h2 className="text-2xl font-bold">
                      {runtimeData.memoryHits}
                    </h2>

                  </div>

                </div>

              </div>

              {/* RECENT MEMORIES */}

              <div className="mt-14">

                <h2 className="
                  text-4xl
                  font-bold
                  mb-8
                ">

                  Recent Memories

                </h2>

                <div className="space-y-5">

                  {
                    messages
                      .filter(
                        (msg) => msg.type === "user"
                      )
                      .slice(0, 4)
                      .map((msg, index) => (

                        <div
                          key={index}
                          className="
                            glass-card
                            rounded-3xl
                            p-5
                            border
                            border-white/10
                          "
                        >

                          <p className="
                            text-white
                            leading-7
                          ">

                            {msg.content}

                          </p>

                          <p className="
                            text-xs
                            text-gray-400
                            mt-4
                          ">

                            {msg.timestamp}

                          </p>

                        </div>

                      ))
                  }

                </div>

              </div>

            </div>

          )
        }

      </div>

    </div>
  );
}

export default App;