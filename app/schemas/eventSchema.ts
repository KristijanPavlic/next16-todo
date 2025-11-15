import { z } from 'zod'

export const eventFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Event name is required')
    .min(3, 'Event name must be at least 3 characters')
    .max(100, 'Event name must be less than 100 characters'),
  
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  
  location: z
    .string()
    .min(1, 'Location is required')
    .min(3, 'Location must be at least 3 characters')
    .max(200, 'Location must be less than 200 characters'),
  
  startDate: z
    .string()
    .min(1, 'Start date is required')
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Start date cannot be in the past'),
  
  startTime: z
    .string()
    .min(1, 'Start time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  
  endDate: z
    .string()
    .min(1, 'End date is required'),
  
  endTime: z
    .string()
    .min(1, 'End time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  
  ticketPrice: z
    .number()
    .min(0, 'Ticket price cannot be negative')
    .max(10000, 'Ticket price seems unreasonably high'),
  
  maxAttendees: z
    .number()
    .min(1, 'Maximum attendees must be at least 1')
    .max(100000, 'Maximum attendees seems unreasonably high'),
  
  sponsors: z
    .array(z.object({
      name: z.string().min(1, 'Sponsor name cannot be empty')
    })),
  
  category: z
    .string()
    .min(1, 'Category is required'),
  
  isPublic: z
    .boolean(),
  
  requiresRegistration: z
    .boolean()
}).refine((data) => {
  const startDateTime = new Date(`${data.startDate} ${data.startTime}`)
  const endDateTime = new Date(`${data.endDate} ${data.endTime}`)
  
  return endDateTime > startDateTime
}, {
  message: 'End date and time must be after start date and time',
  path: ['endDate']
})

export type EventFormData = z.infer<typeof eventFormSchema>