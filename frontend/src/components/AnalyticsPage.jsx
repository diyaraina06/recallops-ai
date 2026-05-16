import {
  Activity,
  DollarSign,
  AlertTriangle,
  Brain,
} from "lucide-react";

function AnalyticsPage({ runtimeData }) {

  const cards = [

    {
      title: "Latency",
      value: runtimeData.latency,
      icon: Activity,
    },

    {
      title: "AI Cost",
      value: runtimeData.cost,
      icon: DollarSign,
    },

    {
      title: "Severity",
      value: runtimeData.severity,
      icon: AlertTriangle,
    },

    {
      title: "Memory Hits",
      value: runtimeData.memoryHits,
      icon: Brain,
    },
  ];

  return (

    <div className="p-6">

      <h1 className="text-3xl md:text-5xl font-bold text-white">
        Analytics Dashboard
      </h1>

      <p className="text-gray-400 mt-3">
        Real-time operational analytics
      </p>

      <div className="
        grid
        grid-cols-1 md:grid-cols-2 lg:grid-cols-4
        gap-5
        mt-10
      ">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (

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

              <div className="
                flex
                items-center
                justify-between
              ">

                <h2 className="
                  text-gray-400
                  text-sm
                ">

                  {card.title}

                </h2>

                <Icon
                  className="text-blue-400"
                  size={20}
                />

              </div>

              <h1 className="
                text-2xl md:text-4xl
                font-bold
                text-white
                mt-5
              ">

                {card.value}

              </h1>

            </div>

          );
        })}

      </div>

    </div>
  );
}

export default AnalyticsPage;