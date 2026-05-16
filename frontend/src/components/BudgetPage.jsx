import {
  Wallet,
  Activity,
  Database,
  Cpu,
} from "lucide-react";

function BudgetPage({
  runtimeData,
  messages,
}) {

  const incidentCount =
    messages.filter(
      (msg) => msg.type === "user"
    ).length;

  const totalSpend =
    (incidentCount * 0.012).toFixed(3);

  const avgCost =
    incidentCount > 0
      ? (
        totalSpend / incidentCount
      ).toFixed(3)
      : "0.000";

  const tokenUsage =
    incidentCount * 3200;

  const retrievalOps =
    runtimeData.memoryHits || 0;

  return (

    <div className="
      flex-1
      p-6
      overflow-y-auto
    ">

      {/* HEADER */}

      <div className="
        flex
        items-center
        gap-4
        mb-12
      ">

        <div className="
          w-14
          h-14
          rounded-2xl
          bg-green-500/10
          flex
          items-center
          justify-center
        ">

          <Wallet
            className="text-green-400"
            size={26}
          />

        </div>

        <div>

          <h1 className="
            text-5xl
            font-bold
            text-white
          ">

            AI Budget Monitoring

          </h1>

          <p className="
            text-gray-400
            mt-2
          ">

            Operational AI spend & infrastructure utilization

          </p>

        </div>

      </div>

      {/* STATS */}

      <div className="
        grid
        grid-cols-1 md:grid-cols-2
        gap-6
      ">

        {/* CARD */}

        <div className="
          glass-card
          rounded-3xl
          p-6
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-400
                text-sm
              ">

                Total AI Spend

              </p>

              <h1 className="
                text-5xl
                font-bold
                text-green-400
                mt-4
              ">

                ${totalSpend}

              </h1>

            </div>

            <Wallet
              className="text-green-400"
              size={28}
            />

          </div>

        </div>

        {/* CARD */}

        <div className="
          glass-card
          rounded-3xl
          p-6
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-400
                text-sm
              ">

                Avg Cost / Incident

              </p>

              <h1 className="
                text-5xl
                font-bold
                text-purple-400
                mt-4
              ">

                ${avgCost}

              </h1>

            </div>

            <Cpu
              className="text-purple-400"
              size={28}
            />

          </div>

        </div>

        {/* CARD */}

        <div className="
          glass-card
          rounded-3xl
          p-6
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-400
                text-sm
              ">

                Token Usage

              </p>

              <h1 className="
                text-5xl
                font-bold
                text-blue-400
                mt-4
              ">

                {tokenUsage}

              </h1>

            </div>

            <Activity
              className="text-blue-400"
              size={28}
            />

          </div>

        </div>

        {/* CARD */}

        <div className="
          glass-card
          rounded-3xl
          p-6
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-400
                text-sm
              ">

                Vector Retrieval Ops

              </p>

              <h1 className="
                text-5xl
                font-bold
                text-yellow-400
                mt-4
              ">

                {retrievalOps}

              </h1>

            </div>

            <Database
              className="text-yellow-400"
              size={28}
            />

          </div>

        </div>

      </div>

      {/* BREAKDOWN */}

      <div className="
        glass-card
        rounded-3xl
        p-8
        mt-10
      ">

        <h2 className="
          text-3xl
          font-bold
          text-white
          mb-8
        ">

          Infrastructure Cost Breakdown

        </h2>

        <div className="space-y-8">

          {/* AI */}

          <div>

            <div className="
              flex
              justify-between
              mb-3
            ">

              <p className="text-white">
                AI Inference
              </p>

              <p className="text-white">
                68%
              </p>

            </div>

            <div className="
              w-full
              h-4
              bg-white/5
              rounded-full
            ">

              <div className="
                h-4
                rounded-full
                bg-blue-500
                w-[68%]
              "></div>

            </div>

          </div>

          {/* VECTOR */}

          <div>

            <div className="
              flex
              justify-between
              mb-3
            ">

              <p className="text-white">
                Vector Memory Retrieval
              </p>

              <p className="text-white">
                21%
              </p>

            </div>

            <div className="
              w-full
              h-4
              bg-white/5
              rounded-full
            ">

              <div className="
                h-4
                rounded-full
                bg-purple-500
                w-[21%]
              "></div>

            </div>

          </div>

          {/* LOGGING */}

          <div>

            <div className="
              flex
              justify-between
              mb-3
            ">

              <p className="text-white">
                Runtime Logging
              </p>

              <p className="text-white">
                11%
              </p>

            </div>

            <div className="
              w-full
              h-4
              bg-white/5
              rounded-full
            ">

              <div className="
                h-4
                rounded-full
                bg-green-500
                w-[11%]
              "></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BudgetPage;