import {
  ShieldAlert,
  Clock3,
  AlertTriangle,
} from "lucide-react";

function IncidentsPage({ messages, runtimeData }) {

  const incidents = messages.filter(
    (msg) => msg.type === "user"
  );

  return (

    <div className="flex-1 p-6 overflow-y-auto">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">

          <ShieldAlert
            className="text-red-400"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            Incidents
          </h1>

          <p className="text-gray-400 mt-1">
            Operational incident history & tracking
          </p>

        </div>

      </div>

      {/* INCIDENT LIST */}

      <div className="space-y-5">

        {
          incidents.length > 0 ? (

            incidents.map((incident, index) => (

              <div
                key={index}
                className="glass-card rounded-3xl p-6 border border-white/10"
              >

                {/* TOP */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-2xl bg-red-500/20 flex items-center justify-center">

                      <AlertTriangle
                        className="text-red-400"
                        size={20}
                      />

                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-white">
                        Incident #{index + 1}
                      </h2>

                      <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">

                        <Clock3 size={14} />

                        {incident.timestamp}

                      </div>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div className="flex items-center gap-3">

                    <div className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-sm font-medium">

                      {runtimeData.severity}

                    </div>

                    <div className="px-4 py-2 rounded-xl bg-green-500/20 text-green-400 text-sm font-medium">

                      Resolved

                    </div>

                  </div>

                </div>

                {/* INCIDENT CONTENT */}

                <div className="mt-6">

                  <p className="text-gray-300 leading-8">

                    {incident.content}

                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="glass-card rounded-3xl h-[60vh] flex items-center justify-center text-gray-500 text-lg">

              No incidents recorded yet

            </div>

          )
        }

      </div>

    </div>
  );
}

export default IncidentsPage;