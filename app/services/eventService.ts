import { Event } from '../types/event'
import { EventFormData } from '../schemas/eventSchema'

const STORAGE_KEY = 'next-todo-events'

const getEventsFromStorage = (): Event[] => {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveEventsToStorage = (events: Event[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch {
    console.log("Failed to save events to localStorage")
  }
}

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return getEventsFromStorage()
  },

  getEvent: async (id: string): Promise<Event | null> => {
    await new Promise(resolve => setTimeout(resolve, 100))
    const events = getEventsFromStorage()
    return events.find(event => event.id === id) || null
  },

  createEvent: async (data: EventFormData): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const events = getEventsFromStorage()
    const newEvent: Event = {
      name: data.name,
      description: data.description,
      location: data.location,
      startDate: data.startDate,
      startTime: data.startTime,
      endDate: data.endDate,
      endTime: data.endTime,
      ticketPrice: data.ticketPrice,
      maxAttendees: data.maxAttendees,
      sponsors: data.sponsors,
      category: data.category,
      isPublic: data.isPublic,
      requiresRegistration: data.requiresRegistration,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const updatedEvents = [newEvent, ...events]

    saveEventsToStorage(updatedEvents)

    return newEvent
  },

  updateEvent: async (id: string, data: Partial<EventFormData>): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const events = getEventsFromStorage()
    const eventIndex = events.findIndex(event => event.id === id)

    if (eventIndex === -1)
      throw new Error('Event not found')
    
    events[eventIndex] = {
      ...events[eventIndex],
      ...data,
      updatedAt: new Date().toISOString()
    }
    
    saveEventsToStorage(events)

    return events[eventIndex]
  },

  deleteEvent: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const events = getEventsFromStorage()
    const eventIndex = events.findIndex(event => event.id === id)

    if (eventIndex === -1)
      throw new Error('Event not found')
    
    const updatedEvents = events.filter(event => event.id !== id)
    
    saveEventsToStorage(updatedEvents)
  },
}