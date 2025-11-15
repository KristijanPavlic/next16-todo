"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Euro,
  Plus,
  X,
  Tag,
  Trash,
} from "lucide-react"
import { eventFormSchema, type EventFormData } from "../schemas/eventSchema"

interface EventFormProps {
  onSubmit: (data: EventFormData) => Promise<boolean>
  isPending: boolean
  error: string | null
}

const eventCategories = [
  "Conference",
  "Workshop",
  "Meetup",
  "Concert",
  "Festival",
  "Sports",
  "Business",
  "Educational",
  "Social",
  "Other",
]

export function EventForm({ onSubmit, isPending, error }: EventFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      ticketPrice: 0,
      maxAttendees: 50,
      sponsors: [],
      category: "",
      isPublic: true,
      requiresRegistration: false,
    },
  })

  const { fields, append, remove } = useFieldArray<EventFormData>({
    control,
    name: "sponsors",
  })

  const [priceDisplay, setPriceDisplay] = useState("0,00")

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault()

      const currentValue = priceDisplay.replace(",", "")
      const newValue = currentValue.slice(0, -1) || "0"
      const paddedValue = newValue.padStart(3, "0")
      const euros = paddedValue.slice(0, -2).replace(/^0+/, "") || "0"
      const cents = paddedValue.slice(-2)
      const formatted = euros + "," + cents

      setPriceDisplay(formatted)
      
      const numericValue = parseFloat(euros + "." + cents)
      reset({ ...watch(), ticketPrice: numericValue })
    } else if (/^\d$/.test(e.key)) {
      e.preventDefault()
      const currentValue = priceDisplay.replace(",", "")
      const newValue = (currentValue + e.key).replace(/^0+/, "") || "0"
      const paddedValue = newValue.padStart(3, "0")
      const euros = paddedValue.slice(0, -2).replace(/^0+/, "") || "0"
      const cents = paddedValue.slice(-2)
      const formatted = euros + "," + cents

      setPriceDisplay(formatted)
      
      const numericValue = parseFloat(euros + "." + cents)
      reset({ ...watch(), ticketPrice: numericValue })
    }
  }

  const onFormSubmit = async (data: EventFormData) => {
    const success = await onSubmit(data)
    if (success) {
      reset()
      setPriceDisplay("0,00")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4">
        <div className="mb-8 select-none">
          <h2 className="text-2xl font-bold text-white mb-2 ml-1.5">
            Create New Event
          </h2>
          <span className="text-slate-400">
            Fill in the details to create your event
          </span>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 select-none">
              <Tag className="size-5" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  Event Name *
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                />
                {errors.name && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="lg:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  Description *
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  rows={4}
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors resize-vertical"
                />
                {errors.description && (
                  <span className="text-sm text-rose-400 ml-1.5 select-none">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  Category *
                </label>
                <select
                  {...register("category")}
                  id="category"
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-1 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                >
                  <option value="">Select category</option>
                  {eventCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  <MapPin className="inline size-4 mr-1" />
                  Location *
                </label>
                <input
                  {...register("location")}
                  type="text"
                  id="location"
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                />
                {errors.location && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.location.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 select-none">
              <CalendarDays className="size-5" />
              Date & Time
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  Start Date *
                </label>
                <input
                  {...register("startDate")}
                  type="date"
                  id="startDate"
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                />
                {errors.startDate && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.startDate.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  <Clock className="inline size-4 mr-1" />
                  Start Time *
                </label>
                <input
                  {...register("startTime")}
                  type="time"
                  id="startTime"
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                />
                {errors.startTime && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.startTime.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  End Date *
                </label>
                <input
                  {...register("endDate")}
                  type="date"
                  id="endDate"
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                />
                {errors.endDate && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.endDate.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  End Time *
                </label>
                <input
                  {...register("endTime")}
                  type="time"
                  id="endTime"
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                />
                {errors.endTime && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.endTime.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 select-none">
              <Euro className="size-5" />
              Pricing & Capacity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ticketPrice"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  Ticket Price (€) *
                </label>
                <input
                  type="text"
                  id="ticketPrice"
                  value={priceDisplay}
                  onKeyDown={handlePriceKeyDown}
                  onChange={() => {}}
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                />
                {errors.ticketPrice && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.ticketPrice.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="maxAttendees"
                  className="block text-sm font-medium text-slate-300 mb-2 ml-1.5 select-none"
                >
                  <Users className="inline size-4 mr-1" />
                  Maximum Attendees *
                </label>
                <input
                  {...register("maxAttendees", { valueAsNumber: true })}
                  type="number"
                  id="maxAttendees"
                  min="1"
                  className="w-full rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                />
                {errors.maxAttendees && (
                  <span className="mt-1 text-sm text-rose-400 ml-1.5 select-none">
                    {errors.maxAttendees.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white select-none">
                Sponsors
              </h3>
              <button
                type="button"
                onClick={() => append({ name: "" })}
                className="whitespace-nowrap flex items-center gap-2 justify-center rounded-xl bg-sky-500 min-h-9 px-4 py-2 h-fit w-fit text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer transition-colors duration-300 ease-in-out select-none"
              >
                <Plus className="size-4" />
                Add Sponsor
              </button>
            </div>

            {fields.length > 0 && (
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      {...register(`sponsors.${index}.name`)}
                      type="text"
                      className="flex-1 rounded-xl bg-slate-800/70 border border-slate-600 h-9 px-4 py-3 text-white outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex items-center justify-center size-12 rounded-xl border border-slate-600 text-slate-400 hover:text-rose-400 hover:border-rose-400 transition-all duration-300 ease-in-out hover:cursor-pointer"
                    >
                      <Trash className="size-4 shrink-0" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.sponsors && (
              <span className="text-sm text-rose-400">
                {errors.sponsors.message}
              </span>
            )}
          </div>

          <div className="space-y-6 select-none">
            <h3 className="text-lg font-semibold text-white">Event Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div>
                  <label
                    htmlFor="isPublic"
                    className="text-sm font-medium text-white"
                  >
                    Public Event
                  </label>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Anyone can see this event and attend
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register("isPublic")}
                    type="checkbox"
                    id="isPublic"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div>
                  <label
                    htmlFor="requiresRegistration"
                    className="text-sm font-medium text-white"
                  >
                    Requires Registration
                  </label>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Attendees must register before attending
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register("requiresRegistration")}
                    type="checkbox"
                    id="requiresRegistration"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="p-4 rounded-xl bg-rose-900/50 border border-rose-400">
                <p className="text-sm text-rose-300">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isPending}
                className="whitespace-nowrap flex items-center gap-2 justify-center rounded-xl bg-sky-500 min-h-9 px-4 py-2 h-fit w-full text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer transition-colors duration-300 ease-in-out select-none"
              >
                {isPending ? (
                  <>
                    <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Event
                  </>
                ) : (
                  <>
                    <Plus className="size-5" />
                    Create Event
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  reset()
                  setPriceDisplay("0,00")
                }}
                className="whitespace-nowrap flex items-center gap-2 justify-center rounded-xl bg-slate-700 min-h-9 px-4 py-2 h-fit w-fit md:min-w-24 text-sm font-medium text-white hover:bg-slate-400 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer transition-colors duration-300 ease-in-out select-none"
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
