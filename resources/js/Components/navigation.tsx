

import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Stethoscope, Video, Calendar, User, FileText, Menu, X } from "lucide-react"
import { Link } from "@inertiajs/react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Checkup Room", href: "/checkup", icon: Stethoscope },
  { name: "Consultation", href: "/consultation", icon: Video },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Patient History", href: "/history", icon: FileText },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar border-r border-sidebar-border px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-xl font-heading font-bold text-primary">Healthcare</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    // const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        {/* <Link
                          href={item.href}
                          className={cn(
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors",
                          )}
                        > */}
                        <Link
                          href={item.href}
                          className={cn(
                              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors",
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile menu button */}
        <div className="flex items-center justify-between bg-sidebar border-b border-sidebar-border px-4 py-3">
          <h1 className="text-lg font-heading font-bold text-primary">Healthcare Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-sidebar border-b border-sidebar-border">
            <nav className="px-4 py-2">
              <ul className="space-y-1">
                {navigation.map((item) => {
                //   const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                        //   isActive
                        //     ? "bg-primary text-primary-foreground"
                        //     : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        //   "group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors",
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border lg:hidden">
        <nav className="flex">
          {navigation.slice(0, 5).map((item) => {
            // const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                //   isActive ? "text-primary" : "text-sidebar-foreground hover:text-sidebar-accent-foreground",
                //   "flex flex-1 flex-col items-center justify-center py-2 text-xs transition-colors",
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
