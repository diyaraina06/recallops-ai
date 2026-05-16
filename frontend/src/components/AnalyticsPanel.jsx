import {
  Cpu,
  Clock3,
  DollarSign,
  Database,
  Activity,
  Brain,
} from "lucide-react";

function AnalyticsPanel({
  runtimeData,
  messages,
}) {

  const cards = [

    {
      icon: Cpu,
      title: "Model",
      value: "llama-3.3-70b",
      color: "text-cyan-400",
    },

    {
      icon: Clock3,
      title: "Latency",
      value: runtimeData.latency,
      color: "text-green-400",
    },

    {
      icon: DollarSign,
      title: "Cost",
      value: runtimeData.cost,
      color: "text-purple-400",
    },

    {
      icon: Database,
      title: "Memory Hits",
      value: runtimeData.memoryHits,
      color: "text-yellow-400",
    },
  ];

  const recentMemories =
    messages.filter(
      (msg) => msg.type === "user"
    );

  return (

    <div className="w-[350px] h-screen border-l border-white/10 bg-[#050b18] p-6 overflow-y-auto">

      <div className="flex items-center gap-3 mb-8">

        <Activity className="text-blue-400" />

        <h2 className="text-3xl font-bold text-white">
          Runtime Analytics
        </h2>

      </div>

      <div className="space-y-5">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (

            <div
              key={index}
              className="glass-card rounded-3xl p-5"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className={`p-4 rounded-2xl bg-black/30 ${card.color}`}>

                    <Icon size={22} />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      {card.title}
                    </p>

                    <h3 className="text-2xl font-bold mt-1 text-white">
                      {card.value}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          );
        })}

      </div>

      {/* MEMORIES */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-6">

          <Brain className="text-purple-400" />

          <h2 className="text-2xl font-bold text-white">
            Recent Memories
          </h2>

        </div>

        <div className="space-y-4">

          {
            recentMemories
              .slice(-5)
              .reverse()
              .map((item, index) => (

                <div
                  key={index}
                  className="glass-card rounded-2xl p-4"
                >

                  <p className="text-white font-medium line-clamp-2">

                    {item.content}

                  </p>

                  <p className="text-gray-400 text-xs mt-2">

                    {item.timestamp}

                  </p>

                </div>

              ))
          }

        </div>

      </div>

    </div>
  );
}

export default AnalyticsPanel;