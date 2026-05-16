import {
  Settings,
  Brain,
  Shield,
  Database,
  Cpu,
  Bell,
} from "lucide-react";

function SettingsPage({
  embeddingsEnabled,
  setEmbeddingsEnabled,
}) {

  return (

    <div className="flex-1 p-6 overflow-y-auto">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-gray-500/20 flex items-center justify-center">

          <Settings
            className="text-gray-300"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            Platform Settings
          </h1>

          <p className="text-gray-400 mt-1">
            Configure AI infrastructure & operational preferences
          </p>

        </div>

      </div>

      {/* SETTINGS GRID */}

      <div className="grid grid-cols-2 gap-6">

        {/* AI MODEL */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 flex items-center justify-center">

              <Brain
                className="text-purple-400"
                size={20}
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                AI Model
              </h2>

              <p className="text-gray-400 text-sm">
                Active inference model
              </p>

            </div>

          </div>

          <div className="bg-[#0f172a] rounded-2xl px-4 py-4 text-white border border-white/5">

            llama-3.3-70b-versatile

          </div>

        </div>

        {/* VECTOR MEMORY */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-blue-500/20 flex items-center justify-center">

              <Database
                className="text-blue-400"
                size={20}
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Vector Memory
              </h2>

              <p className="text-gray-400 text-sm">
                Semantic retrieval engine
              </p>

            </div>

          </div>

          <div className="flex items-center justify-between">

            <p className="text-gray-300">
              Embeddings Enabled
            </p>

            <button
              onClick={() =>
                setEmbeddingsEnabled(
                  !embeddingsEnabled
                )
              }
              className={`
                w-14
                h-7
                rounded-full
                flex
                items-center
                px-1
                transition

                ${embeddingsEnabled
                  ? "bg-green-500"
                  : "bg-gray-600"
                }
              `}
            >

              <div className={`
                w-5
                h-5
                rounded-full
                bg-white
                transition-all

                ${embeddingsEnabled
                  ? "ml-auto"
                  : ""
                }
              `}></div>

            </button>

          </div>

          <p className="text-xs text-gray-500 mt-4 leading-6">

            Controls semantic similarity retrieval
            and operational memory search in the
            backend inference pipeline.

          </p>

        </div>

        {/* SECURITY */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-red-500/20 flex items-center justify-center">

              <Shield
                className="text-red-400"
                size={20}
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Security
              </h2>

              <p className="text-gray-400 text-sm">
                Operational protection
              </p>

            </div>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <p className="text-gray-300">
                Threat Detection
              </p>

              <p className="text-green-400 text-sm">
                Active
              </p>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-gray-300">
                Incident Encryption
              </p>

              <p className="text-green-400 text-sm">
                Enabled
              </p>

            </div>

          </div>

        </div>

        {/* INFRA */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-green-500/20 flex items-center justify-center">

              <Cpu
                className="text-green-400"
                size={20}
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Infrastructure
              </h2>

              <p className="text-gray-400 text-sm">
                Runtime environment
              </p>

            </div>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <p className="text-gray-300">
                API Status
              </p>

              <p className="text-green-400 text-sm">
                Operational
              </p>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-gray-300">
                Memory Engine
              </p>

              <p className="text-green-400 text-sm">
                Healthy
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ALERTS */}

      <div className="glass-card rounded-3xl p-6 mt-8">

        <div className="flex items-center gap-4 mb-6">

          <div className="w-11 h-11 rounded-2xl bg-yellow-500/20 flex items-center justify-center">

            <Bell
              className="text-yellow-400"
              size={20}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Alert Preferences
            </h2>

            <p className="text-gray-400 text-sm">
              Operational incident notifications
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div className="flex items-center justify-between">

            <p className="text-gray-300">
              Critical Incident Alerts
            </p>

            <div className="text-green-400 text-sm">
              Active
            </div>

          </div>

          <div className="flex items-center justify-between">

            <p className="text-gray-300">
              AI Resolution Notifications
            </p>

            <div className="text-green-400 text-sm">
              Active
            </div>

          </div>

          <div className="flex items-center justify-between">

            <p className="text-gray-300">
              Semantic Memory Updates
            </p>

            <div className="text-green-400 text-sm">
              Active
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SettingsPage;