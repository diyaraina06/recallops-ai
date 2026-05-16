import {
  Wallet,
  DollarSign,
  Cpu,
  Database,
  Activity,
} from "lucide-react";

function BudgetPage({ runtimeData, messages }) {

  const totalIncidents =
    messages.filter(
      (msg) => msg.type === "user"
    ).length;

  const estimatedSpend =
    (totalIncidents * 0.012).toFixed(3);

  return (

    <div className="flex-1 p-6 overflow-y-auto">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">

          <Wallet
            className="text-green-400"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Budget Monitoring
          </h1>

          <p className="text-gray-400 mt-1">
            Operational AI spend & infrastructure utilization
          </p>

        </div>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-2 gap-6">

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Total AI Spend
              </p>

              <h2 className="text-4xl font-bold text-green-400 mt-3">
                ${estimatedSpend}
              </h2>

            </div>

            <DollarSign
              className="text-green-400"
              size={24}
            />

          </div>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Avg Cost / Incident
              </p>

              <h2 className="text-4xl font-bold text-purple-400 mt-3">
                $0.012
              </h2>

            </div>

            <Cpu
              className="text-purple-400"
              size={24}
            />

          </div>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Token Usage
              </p>

              <h2 className="text-4xl font-bold text-blue-400 mt-3">
                {totalIncidents * 3200}
              </h2>

            </div>

            <Activity
              className="text-blue-400"
              size={24}
            />

          </div>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Vector Retrieval Ops
              </p>

              <h2 className="text-4xl font-bold text-yellow-400 mt-3">
                {runtimeData.memoryHits}
              </h2>

            </div>

            <Database
              className="text-yellow-400"
              size={24}
            />

          </div>

        </div>

      </div>

      {/* COST BREAKDOWN */}

      <div className="glass-card rounded-3xl p-6 mt-8">

        <h2 className="text-2xl font-bold text-white mb-8">
          Infrastructure Cost Breakdown
        </h2>

        <div className="space-y-7">

          {/* AI INFERENCE */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-gray-300">
                AI Inference
              </p>

              <p className="text-white">
                68%
              </p>

            </div>

            <div className="h-3 bg-white/5 rounded-full overflow-hidden">

              <div className="w-[68%] h-full bg-blue-500 rounded-full"></div>

            </div>

          </div>

          {/* VECTOR DB */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-gray-300">
                Vector Memory Retrieval
              </p>

              <p className="text-white">
                21%
              </p>

            </div>

            <div className="h-3 bg-white/5 rounded-full overflow-hidden">

              <div className="w-[21%] h-full bg-purple-500 rounded-full"></div>

            </div>

          </div>

          {/* LOGGING */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-gray-300">
                Runtime Logging
              </p>

              <p className="text-white">
                11%
              </p>

            </div>

            <div className="h-3 bg-white/5 rounded-full overflow-hidden">

              <div className="w-[11%] h-full bg-green-500 rounded-full"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BudgetPage;