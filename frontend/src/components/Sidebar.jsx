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
        w-[300px]
        h-screen
        border-r
        border-white/10
        bg-[#030712]
        p-6
        flex
        flex-col
      ">

        {/* LOGO */}

        <div className="flex items-center gap-4 mb-10">

          <div className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-blue-500
            to-purple-600
            flex
            items-center
            justify-center
            shadow-lg
          ">

            <Brain
              className="text-white"
              size={22}
            />

          </div>

          <h1 className="text-5xl font-bold text-white">
            RecallOps
          </h1>

        </div>

        {/* MENU */}

        <div className="space-y-3">

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

                    ${activeView === item.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-300 hover:bg-white/5"
                    }
                  `}
                >

                  <Icon size={22} />

                  <span className="text-lg font-medium">
                    {item.label}
                  </span>

                </button>

              );
            })
          }

        </div>

        {/* STATUS */}

        <div className="
          mt-10
          glass-card
          rounded-3xl
          p-5
        ">

          <div className="flex items-center gap-3">

            <div className="
              w-3
              h-3
              rounded-full
              bg-green-400
            "></div>

            <h3 className="text-green-400 font-bold text-xl">
              System Online
            </h3>

          </div>

          <p className="text-gray-400 mt-3 text-sm">
            All systems operational
          </p>

        </div>

        {/* PROFILE */}

        <div
          onClick={() => setShowProfile(true)}
          className="
            mt-auto
            glass-card
            rounded-3xl
            p-5
            flex
            items-center
            justify-between
            cursor-pointer
            hover:bg-white/10
            transition
          "
        >

          <div>

            <h3 className="text-white font-bold text-lg">
              RecallOps Team
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              admin@recallops.ai
            </p>

          </div>

          <div className="
            w-14
            h-14
            rounded-full
            bg-blue-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-xl
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

              </div>

            </div>

          </div>

        )
      }

    </>

  );
}

export default Sidebar;