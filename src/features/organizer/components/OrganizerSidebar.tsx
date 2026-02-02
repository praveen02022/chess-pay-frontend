import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Trophy,
  PlusCircle,
  Users,
  Settings,
} from "lucide-react"

const menu = [
  { label: "Dashboard", path: "/organizer", icon: LayoutDashboard },
  { label: "My Tournaments", path: "/organizer/tournaments", icon: Trophy },
  { label: "Create Tournament", path: "/organizer/tournaments/create", icon: PlusCircle },
  { label: "Players", path: "/organizer/players", icon: Users },
  { label: "Settings", path: "/organizer/settings", icon: Settings },
]

const OrganizerSidebar = () => {
  return (
    <aside className="w-64 border-r bg-card p-4">
      <h2 className="mb-6 text-xl font-bold">♟ Organizer</h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default OrganizerSidebar
