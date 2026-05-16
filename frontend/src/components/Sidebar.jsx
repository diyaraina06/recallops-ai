import {
  LayoutDashboard,
  ShieldAlert,
  Brain,
  Activity,
  BarChart3,
  Wallet,
  Settings,
  X,
} from "lucide-react";

import { useState } from "react";

function Sidebar({
  activeView,
  setActiveView,
}) {

  const [showProfile, setShowProfile] =
    useState(false);

  const menuItems = [

    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      id: "incidents",
      label: "Incidents",
      icon: ShieldAlert,
    },

    {
      id: "memory",
      label: "Memory",
      icon: Brain,
    },

    {
      id: "logs",
      label: "Runtime Logs",
      icon: Activity,
    },

    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
    },

    {
      id: "budget",
      label: "Budget",
      icon: Wallet,
    },

    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (

    <>

      <div className="
        w-[320px]
        h-screen
        border-r
        border-white/10
        bg-[#020817]
        p-6
        flex
        flex-col
        relative
        overflow-hidden
      ">

        {/* SIDEBAR GLOW */}

        <div className="
          absolute
          top-[-120px]
          left-[-120px]
          w-[260px]
          h-[260px]
          bg-blue-500/10
          blur-3xl
          rounded-full
        "></div>

        {/* LOGO */}

        <div className="
          relative
          z-10
          flex
          items-center
          gap-4
          mb-12
        ">

          <div className="
            relative
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-br
            from-blue-500
            via-indigo-500
            to-purple-600
            flex
            items-center
            justify-center
            shadow-[0_0_35px_rgba(59,130,246,0.45)]
          ">

            <div className="
              absolute
              inset-0
              rounded-2xl
              bg-white/10
            "></div>

            <Brain
              className="text-white relative z-10"
              size={24}
            />

          </div>

          <div>

            <h1 className="
              text-5xl
              font-black
              tracking-tight
              bg-gradient-to-r
              from-white
              via-blue-100
              to-blue-400
              bg-clip-text
              text-transparent
              drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]
            ">

              RecallOps

            </h1>

            <p className="
              text-xs
              text-blue-300/70
              mt-1
              tracking-[0.2em]
              uppercase
            ">

              AI INCIDENT OPS

            </p>

          </div>

        </div>

        {/* MENU */}

        <div className="
          relative
          z-10
          space-y-3
        ">

          {
            menuItems.map((item) => {

              const Icon = item.icon;

              return (

                <button
                  key={item.id}
                  onClick={() =>
                    setActiveView(item.id)
                  }
                  className={`
                    w-full
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    transition-all
                    duration-300
                    border

                    ${activeView === item.id
                      ? `
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        text-white
                        border-blue-400/20
                        shadow-lg
                        shadow-blue-500/20
                      `
                      : `
                        border-transparent
                        text-gray-300
                        hover:bg-white/5
                        hover:border-white/10
                      `
                    }
                  `}
                >

                  <Icon size={22} />

                  <span className="
                    text-lg
                    font-medium
                  ">

                    {item.label}

                  </span>

                </button>

              );
            })
          }

        </div>

        {/* STATUS */}

        <div className="
          relative
          z-10
          mt-10
          glass-card
          rounded-3xl
          p-5
          border
          border-green-500/10
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              w-3
              h-3
              rounded-full
              bg-green-400
              animate-pulse
            "></div>

            <h3 className="
              text-green-400
              font-bold
              text-xl
            ">

              System Online

            </h3>

          </div>

          <p className="
            text-gray-400
            mt-3
            text-sm
          ">

            All systems operational

          </p>

        </div>

        {/* PROFILE */}

        <div
          onClick={() => setShowProfile(true)}
          className="
            relative
            z-10
            mt-auto
            glass-card
            rounded-3xl
            p-5
            flex
            items-center
            justify-between
            cursor-pointer
            hover:bg-white/10
            transition-all
            duration-300
            border
            border-white/10
          "
        >

          <div>

            <h3 className="
              text-white
              font-bold
              text-lg
            ">

              RecallOps Team

            </h3>

            <p className="
              text-gray-400
              text-sm
              mt-1
            ">

              admin@recallops.ai

            </p>

          </div>

          <div className="
            w-14
            h-14
            rounded-full
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-xl
            shadow-lg
            shadow-blue-500/20
          ">

            R

          </div>

        </div>

      </div>

      {/* MODAL */}

      {
        showProfile && (

          <div className="
            fixed
            inset-0
            bg-black/60
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
          ">

            <div className="
              w-[500px]
              glass-card
              rounded-[32px]
              p-8
              border
              border-white/10
              relative
            ">

              <button
                onClick={() =>
                  setShowProfile(false)
                }
                className="
                  absolute
                  top-5
                  right-5
                  text-gray-400
                "
              >

                <X size={22} />

              </button>

              <div className="
                flex
                flex-col
                items-center
                text-center
              ">

                <div className="
                  w-24
                  h-24
                  rounded-full
                  bg-gradient-to-br
                  from-blue-500
                  to-purple-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-4xl
                  font-bold
                ">

                  R

                </div>

                <h2 className="
                  text-3xl
                  font-bold
                  text-white
                  mt-5
                ">

                  RecallOps Admin

                </h2>

                <p className="
                  text-gray-400
                  mt-3
                ">

                  AI-powered incident response platform

                </p>

              </div>

            </div>

          </div>

        )
      }

    </>

  );
}

export default Sidebar;