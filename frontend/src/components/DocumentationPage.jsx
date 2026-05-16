import {
  BookOpen,
  Brain,
  Database,
  Activity,
  Cpu,
  Shield,
} from "lucide-react";

function DocumentationPage() {

  return (

    <div className="flex-1 p-6 overflow-y-auto">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-10">

        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">

          <BookOpen
            className="text-blue-400"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            RecallOps Documentation
          </h1>

          <p className="text-gray-400 mt-1">
            AI incident infrastructure & semantic memory architecture
          </p>

        </div>

      </div>

      {/* DOC CARDS */}

      <div className="space-y-6">

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 flex items-center justify-center">

              <Brain
                className="text-purple-400"
                size={20}
              />

            </div>

            <h2 className="text-2xl font-bold text-white">
              AI Incident Resolution Engine
            </h2>

          </div>

          <p className="text-gray-300 leading-8">

            RecallOps uses the Groq inference engine with
            llama-3.3-70b-versatile to generate operational
            incident resolutions in real time.

            The AI system analyzes production incidents,
            infrastructure failures, deployment issues,
            and runtime anomalies.

          </p>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-blue-500/20 flex items-center justify-center">

              <Database
                className="text-blue-400"
                size={20}
              />

            </div>

            <h2 className="text-2xl font-bold text-white">
              Semantic Operational Memory
            </h2>

          </div>

          <p className="text-gray-300 leading-8">

            The platform stores historical operational incidents
            and performs semantic similarity search using
            sentence-transformer embeddings.

            Previous incidents are retrieved dynamically
            to improve AI-assisted troubleshooting accuracy.

          </p>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-green-500/20 flex items-center justify-center">

              <Activity
                className="text-green-400"
                size={20}
              />

            </div>

            <h2 className="text-2xl font-bold text-white">
              Runtime Observability
            </h2>

          </div>

          <p className="text-gray-300 leading-8">

            Runtime telemetry tracks AI latency,
            semantic retrieval operations,
            operational cost simulation,
            and AI infrastructure performance.

          </p>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-yellow-500/20 flex items-center justify-center">

              <Cpu
                className="text-yellow-400"
                size={20}
              />

            </div>

            <h2 className="text-2xl font-bold text-white">
              AI Infrastructure Stack
            </h2>

          </div>

          <div className="space-y-4 text-gray-300">

            <p>• React + Tailwind Frontend</p>

            <p>• FastAPI Backend</p>

            <p>• Groq AI Inference</p>

            <p>• Sentence Transformers</p>

            <p>• Semantic Memory Retrieval</p>

            <p>• Operational Runtime Analytics</p>

          </div>

        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-red-500/20 flex items-center justify-center">

              <Shield
                className="text-red-400"
                size={20}
              />

            </div>

            <h2 className="text-2xl font-bold text-white">
              Security & Reliability
            </h2>

          </div>

          <p className="text-gray-300 leading-8">

            RecallOps is designed to support
            enterprise-grade operational workflows
            with semantic incident intelligence,
            runtime observability,
            and scalable AI infrastructure.

          </p>

        </div>

      </div>

    </div>
  );
}

export default DocumentationPage;