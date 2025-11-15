"use client";

import { useEffect, useState } from "react";
import { EventForm } from "../components/EventForm";
import { EventList } from "../components/EventList";
import { useEvents } from "../hooks/useEvents";
import { EventFormData } from "../schemas/eventSchema";
import { Plus, Calendar, X, RefreshCcw } from "lucide-react";

export default function EventsPage() {
  const { events, loading, error, fetchEvents, createEvent } = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = async (eventData: EventFormData) => {
    setIsCreating(true);
    try {
      const success = await createEvent(eventData);
      if (success) {
        setShowForm(false);
      }
      return success;
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]"></div>

        <div className="relative container mx-auto px-4 py-8">
          <div className="flex flex-row gap-4 mt-20 mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="whitespace-nowrap flex items-center gap-2 justify-center rounded-xl bg-sky-500 min-h-9 px-4 py-2 h-fit w-fit md:min-w-24 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer transition-colors duration-300 ease-in-out select-none"
            >
              {showForm ? "Cancel" : "Create New Event"}
              {showForm ? (
                <X className="size-4 shrink-0" />
              ) : (
                <Plus className="size-4 shrink-0" />
              )}
            </button>

            <button
              onClick={() => fetchEvents()}
              disabled={loading}
              className="whitespace-nowrap flex items-center gap-2 justify-center rounded-xl bg-slate-700 min-h-9 px-4 py-2 h-fit w-fit md:min-w-24 text-sm font-medium text-white hover:bg-slate-400 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer transition-colors duration-300 ease-in-out select-none"
            >
              {loading && (
                <div className="flex items-center gap-1.5">
                  <div className="size-3 shrink-0 border border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading events</span>
                </div>
              ) || (
                <>
                  Refresh Events <RefreshCcw className="size-4 shrink-0" />
                </>
              )}
            </button>
          </div>

          <div className="space-y-8">
            {showForm && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <EventForm
                  onSubmit={handleCreateEvent}
                  isPending={isCreating}
                  error={error}
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-6 select-none">
                <h2 className="text-2xl font-semibold text-white">
                  {events.length === 0
                    ? "No Events"
                    : `${events.length} Event${events.length !== 1 ? "s" : ""}`}
                </h2>

                {events.length > 0 && (
                  <div className="text-sm text-slate-400">
                    Total events: {events.length}
                  </div>
                )}
              </div>

              <EventList events={events} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
