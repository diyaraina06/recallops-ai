import { useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import AnalyticsPanel from "./components/AnalyticsPanel";
import RuntimeLogs from "./components/RuntimeLogs";
import AnalyticsPage from "./components/AnalyticsPage";
import IncidentsPage from "./components/IncidentsPage";
import MemoryPage from "./components/MemoryPage";
import BudgetPage from "./components/BudgetPage";
import SettingsPage from "./components/SettingsPage";
import DocumentationPage from "./components/DocumentationPage";

function App() {

  const [activeView, setActiveView] = useState("dashboard");

  const [messages, setMessages] = useState([]);

  const [embeddingsEnabled, setEmbeddingsEnabled] =
    useState(true);

  const [runtimeData, setRuntimeData] = useState({

    latency: "0ms",

    cost: "$0.000",

    severity: "Low",

    memoryHits: 0,

    status: "Operational",

    logs: [],
  });

  return (

    <div className="flex h-screen bg-[#020817] overflow-hidden">

      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="flex flex-1 overflow-hidden">

        {
          activeView === "dashboard" && (

            <>
              <ChatWindow
                runtimeData={runtimeData}
                setRuntimeData={setRuntimeData}
                messages={messages}
                setMessages={setMessages}
                setActiveView={setActiveView}
                embeddingsEnabled={embeddingsEnabled}
              />

              <AnalyticsPanel
                runtimeData={runtimeData}
                messages={messages}
              />
            </>

          )
        }

        {
          activeView === "docs" && (
            <DocumentationPage />
          )
        }

        {
          activeView === "incidents" && (

            <IncidentsPage
              messages={messages}
              runtimeData={runtimeData}
            />

          )
        }

        {
          activeView === "memory" && (
            <MemoryPage messages={messages} />
          )
        }

        {
          activeView === "logs" && (
            <RuntimeLogs runtimeData={runtimeData} />
          )
        }

        {
          activeView === "analytics" && (

            <AnalyticsPage
              runtimeData={runtimeData}
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
          activeView === "settings" && (

            <SettingsPage
              embeddingsEnabled={embeddingsEnabled}
              setEmbeddingsEnabled={setEmbeddingsEnabled}
            />

          )
        }

      </div>

    </div>
  );
}

export default App;