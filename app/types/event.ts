export interface Event {
  id: string
  name: string
  description: string
  location: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  ticketPrice: number
  maxAttendees: number
  sponsors: { name: string }[]
  category: string
  isPublic: boolean
  requiresRegistration: boolean
  createdAt: string
  updatedAt: string
}

export type CreateEventData = {
  name: string
  description: string
  location: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  ticketPrice: number
  maxAttendees: number
  sponsors: { name: string }[]
  category: string
  isPublic: boolean
  requiresRegistration: boolean
}