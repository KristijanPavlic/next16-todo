'use client'

import { useState, useCallback } from 'react'
import { Event, CreateEventData } from '../types/event'
import { eventService } from '../services/eventService'

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const fetchedEvents = await eventService.getEvents()

      setEvents(fetchedEvents)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const createEvent = useCallback(async (eventData: CreateEventData): Promise<boolean> => {
    try {
      setError(null)

      const newEvent = await eventService.createEvent(eventData)

      setEvents(prev => [newEvent, ...prev])

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event')
      return false
    }
  }, [])

  const updateEvent = useCallback(async (id: string, eventData: Partial<CreateEventData>): Promise<boolean> => {
    try {
      setError(null)

      const updatedEvent = await eventService.updateEvent(id, eventData)

      setEvents(prev => prev.map(event => 
        event.id === id ? updatedEvent : event
      ))

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event')

      return false
    }
  }, [])

  const deleteEvent = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null)

      await eventService.deleteEvent(id)

      setEvents(prev => prev.filter(event => event.id !== id))

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event')

      return false
    }
  }, [])

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent
  }
}