'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CheckSquare, Calendar, Home } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      label: 'To-Do',
      icon: CheckSquare,
      active: pathname === '/'
    },
    {
      href: '/events',
      label: 'Events',
      icon: Calendar,
      active: pathname === '/events'
    }
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 select-none">
      <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-nowrap font-medium transition-all duration-200 ${
                item.active
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}