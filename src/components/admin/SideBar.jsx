import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  ChevronDown,
  ClipboardList,
  Home,
  MessageSquare,
  Stethoscope,
  Users,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Doctors",
    href: "/admin/doctors",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    title: "Patients",
    href: "/admin/patients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Queue Management",
    href: "/admin/queues",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-cyan-500 to-teal-500 text-white shadow-xl min-h-screen rounded-tr-3xl rounded-br-3xl">
      <div className="p-6 border-b border-white/30 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md">
          <Home className="h-5 w-5 text-cyan-500" />
        </div>
        <span className="text-2xl font-bold tracking-wide">
          MediQueue
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-3">
        <h4 className="text-xs font-semibold uppercase px-2 tracking-widest text-white/80">
          Admin Panel
        </h4>

        {sidebarItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const hasSubmenu = item.submenu?.length > 0;

          return (
            <div key={item.title} className="space-y-1">
              {hasSubmenu ? (
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={`w-full flex justify-between items-center px-3 py-2 text-left text-sm rounded-lg transition-all ${
                    isActive
                      ? "bg-white text-cyan-500 shadow font-semibold"
                      : "hover:bg-white/20 text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openSubmenu === item.title ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${
                    isActive
                      ? "bg-white text-cyan-500 shadow-md font-semibold"
                      : "hover:bg-white/20 text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}

              {hasSubmenu && openSubmenu === item.title && (
                <div className="ml-6 space-y-1 border-l border-white/40 pl-3">
                  {item.submenu.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.title}
                        to={sub.href}
                        className={`block text-sm px-3 py-1.5 rounded-lg transition-all ${
                          isSubActive
                            ? "bg-white text-cyan-500 font-medium shadow"
                            : "hover:bg-white/20 text-white/80"
                        }`}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/30 text-xs text-center text-white/70">
        &copy; 2025 MediQueue
      </div>
    </div>
  );
}
