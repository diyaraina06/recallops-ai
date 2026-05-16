import {
  Brain,
  Database,
  Clock3,
  Sparkles,
} from "lucide-react";

function MemoryPage({ messages }) {

  const memories = messages.filter(
    (msg) => msg.type === "user"
  );

  return (

    <div className="flex-1 p-6 overflow-y-auto">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">

          <Brain
            className="text-purple-400"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Memory Explorer
          </h1>

          <p className="text-gray-400 mt-1">
            Semantic operational memory & vector retrieval
          </p>

        </div>

      </div>

      {/* MEMORY STATS */}

      <div className="grid grid-cols-3 gap-5 mb-8">

        <div className="glass-card rounded-3xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Stored Memories
              </p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {memories.length}
              </h2>

            </div>

            <Database
              className="text-blue-400"
              size={24}
            />

          </div>

        </div>

        <div className="glass-card rounded-3xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Embedding Model
              </p>

              <h2 className="text-lg font-bold text-purple-400 mt-3">
                MiniLM-L6-v2
              </h2>

            </div>

            <Brain
              className="text-purple-400"
              size={24}
            />

          </div>

        </div>

        <div className="glass-card rounded-3xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                Retrieval Accuracy
              </p>

              <h2 className="text-4xl font-bold text-green-400 mt-2">
                94%
              </h2>

            </div>

            <Sparkles
              className="text-green-400"
              size={24}
            />

          </div>

        </div>

      </div>

      {/* MEMORY LIST */}

      <div className="space-y-5">

        {
          memories.length > 0 ? (

            memories.map((memory, index) => (

              <div
                key={index}
                className="glass-card rounded-3xl p-6 border border-white/10"
              >

                {/* TOP */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                      <Brain
                        className="text-purple-400"
                        size={20}
                      />

                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-white">
                        Memory #{index + 1}
                      </h2>

                      <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">

                        <Clock3 size={14} />

                        {memory.timestamp}

                      </div>

                    </div>

                  </div>

                  {/* TAGS */}

                  <div className="flex items-center gap-3">

                    <div className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-400 text-sm font-medium">

                      Semantic Vector

                    </div>

                    <div className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium">

                      Indexed

                    </div>

                  </div>

                </div>

                {/* MEMORY CONTENT */}

                <div className="mt-6">

                  <p className="text-gray-300 leading-8">

                    {memory.content}

                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="glass-card rounded-3xl h-[60vh] flex items-center justify-center text-gray-500 text-lg">

              No semantic memories stored yet

            </div>

          )
        }

      </div>

    </div>
  );
}

export default MemoryPage;