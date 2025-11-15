'use client'

import { CalendarDays, Clock, MapPin, Users, Euro, Eye, EyeOff, UserCheck } from 'lucide-react'
import { Event } from '../types/event'

interface EventListProps {
  events: Event[]
  loading: boolean
}

export function EventList({ events, loading }: EventListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4">
              <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-2/3"></div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="h-4 bg-slate-700 rounded w-24"></div>
                <div className="h-4 bg-slate-700 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarDays className="size-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-300 mb-2">No events yet</h3>
        <p className="text-slate-400">Create your first event to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div key={event.id} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 hover:border-slate-600 transition-colors">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-white truncate">{event.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-600/20 text-sky-400 select-none">
                  {event.category}
                </span>
              </div>
              <p className="text-slate-300 line-clamp-2 mb-3">{event.description}</p>
            </div>
            
            <div className="flex items-center gap-2 select-none">
              {event.isPublic ? (
                <div className="flex items-center gap-1 text-emerald-400 text-sm">
                  <Eye className="size-4" />
                  <span>Public</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <EyeOff className="size-4" />
                  <span>Private</span>
                </div>
              )}
              
              {event.requiresRegistration && (
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  <UserCheck className="size-4" />
                  <span>Registration Required</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <CalendarDays className="size-4 text-sky-400" />
              <div>
                <div className="text-sm">
                  {new Date(event.startDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
                <div className="text-xs text-slate-400 select-none">
                  Start Date
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="size-4 text-sky-400" />
              <div>
                <div className="text-sm">
                  {event.startTime} - {event.endTime}
                </div>
                <div className="text-xs text-slate-400 select-none">
                  Duration
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="size-4 text-sky-400" />
              <div>
                <div className="text-sm truncate">
                  {event.location}
                </div>
                <div className="text-xs text-slate-400 select-none">
                  Location
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Users className="size-4 text-sky-400" />
              <div>
                <div className="text-sm">
                  {event.maxAttendees} max
                </div>
                <div className="text-xs text-slate-400 select-none">
                  Attendees
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-emerald-400">
                {event.ticketPrice === 0 ? 'Free' : `€${event.ticketPrice.toFixed(2)}`}
              </span>
            </div>

            {event.sponsors.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Sponsored by:</span>
                <div className="flex flex-wrap gap-2 select-none">
                  {event.sponsors.slice(0, 3).map((sponsor, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300">
                      {sponsor.name}
                    </span>
                  ))}
                  {event.sponsors.length > 3 && (
                    <span className="text-xs text-slate-400">+{event.sponsors.length - 3} more</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
            <div className="text-xs text-slate-400">
              Created {new Date(event.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            
            {new Date(event.endDate + ' ' + event.endTime) < new Date() ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-600/50 text-slate-400 select-none">
                Past Event
              </span>
            ) : new Date(event.startDate + ' ' + event.startTime) <= new Date() ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-600/20 text-emerald-400 select-none">
                Live Now
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-600/20 text-sky-400 select-none">
                Upcoming
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}