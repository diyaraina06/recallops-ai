import { Terminal } from "lucide-react";

function RuntimeLogs({ runtimeData }) {

  return (

    <div className="flex-1 p-6 overflow-hidden">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">

          <Terminal
            className="text-green-400"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            Runtime Logs
          </h1>

          <p className="text-gray-400 mt-1">
            Live AI inference & system activity
          </p>

        </div>

      </div>

      {/* TERMINAL */}

      <div className="glass-card rounded-3xl h-[82vh] overflow-y-auto p-6 border border-green-500/10">

        <div className="space-y-4 font-mono text-sm">

          {
            runtimeData.logs.length > 0 ? (

              runtimeData.logs.map((log, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3 text-green-400"
                >

                  <span className="text-green-500">
                    ●
                  </span>

                  <p className="break-all">
                    {log}
                  </p>

                </div>

              ))

            ) : (

              <div className="h-full flex items-center justify-center text-gray-500 text-lg">

                No runtime logs available

              </div>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default RuntimeLogs;