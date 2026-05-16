function IncidentsPage({ messages }) {

  const incidents = messages.filter(
    (msg) => msg.type === "user"
  );

  return (

    <div className="p-6 overflow-y-auto max-h-screen">

      <h1 className="
        text-3xl md:text-5xl
        font-bold
        text-white
      ">

        Incident History

      </h1>

      <p className="
        text-gray-400
        mt-3
      ">

        Previous operational incidents
      </p>

      <div className="
        grid
        grid-cols-1 md:grid-cols-2
        gap-5
        mt-10
      ">

        {incidents.map((incident, index) => (

          <div
            key={index}
            className="
              glass-card
              rounded-3xl
              p-4 md:p-5
              border
              border-white/10
            "
          >

            <div className="
              flex
              items-center
              justify-between
              mb-4
            ">

              <h2 className="
                text-lg md:text-xl
                font-bold
                text-white
              ">

                Incident Report

              </h2>

              <p className="
                text-xs
                text-gray-400
              ">

                {incident.timestamp}

              </p>

            </div>

            <p className="
              text-gray-300
              leading-7
              text-sm
            ">

              {incident.content}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default IncidentsPage;