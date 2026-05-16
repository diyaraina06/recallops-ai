import {
  Activity,
  AlertTriangle,
  Brain,
  DollarSign,
  Clock3,
  Database,
} from "lucide-react";

function AnalyticsPage({ runtimeData, messages }) {

  const totalIncidents =
    messages.filter(
      (msg) => msg.type === "user"
    ).length;

  return (

    <div className="flex-1 p-6 overflow-y-auto">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-10">

        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">

          <Activity
            className="text-blue-400"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Analytics
          </h1>

          <p className="text-gray-400 mt-1">
            Operational intelligence & AI observability
          </p>

        </div>

      </div>

      {/* STATS GRID */}

      <div className="grid grid-cols-2 gap-6">

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Total Incidents
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {totalIncidents}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">

              <AlertTriangle
                className="text-blue-400"
                size={24}
              />

            </div>

          </div>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Avg Latency
              </p>

              <h2 className="text-4xl font-bold text-green-400 mt-3">
                {runtimeData.latency}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">

              <Clock3
                className="text-green-400"
                size={24}
              />

            </div>

          </div>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                AI Cost
              </p>

              <h2 className="text-4xl font-bold text-purple-400 mt-3">
                {runtimeData.cost}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">

              <DollarSign
                className="text-purple-400"
                size={24}
              />

            </div>

          </div>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Memory Hits
              </p>

              <h2 className="text-4xl font-bold text-yellow-400 mt-3">
                {runtimeData.memoryHits}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center">

              <Database
                className="text-yellow-400"
                size={24}
              />

            </div>

          </div>

        </div>

      </div>

      {/* PERFORMANCE */}

      <div className="glass-card rounded-3xl p-6 mt-8">

        <div className="flex items-center gap-3 mb-8">

          <Brain
            className="text-purple-400"
            size={22}
          />

          <h2 className="text-2xl font-bold text-white">
            Semantic Retrieval Performance
          </h2>

        </div>

        {/* METRIC */}

        <div className="space-y-7">

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-gray-300">
                Embedding Accuracy
              </p>

              <p className="text-white">
                94%
              </p>

            </div>

            <div className="h-3 bg-white/5 rounded-full overflow-hidden">

              <div className="w-[94%] h-full bg-blue-500 rounded-full"></div>

            </div>

          </div>

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-gray-300">
                Memory Retrieval Efficiency
              </p>

              <p className="text-white">
                87%
              </p>

            </div>

            <div className="h-3 bg-white/5 rounded-full overflow-hidden">

              <div className="w-[87%] h-full bg-purple-500 rounded-full"></div>

            </div>

          </div>

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-gray-300">
                AI Resolution Success
              </p>

              <p className="text-white">
                98%
              </p>

            </div>

            <div className="h-3 bg-white/5 rounded-full overflow-hidden">

              <div className="w-[98%] h-full bg-green-500 rounded-full"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsPage;