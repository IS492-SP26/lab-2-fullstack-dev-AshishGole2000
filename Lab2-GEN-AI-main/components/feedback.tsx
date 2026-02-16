"use client"

import { useEffect, useState, useCallback } from "react"
import { Star, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

interface FeedbackEntry {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          aria-checked={value === star}
          role="radio"
          className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              star <= (hovered || value)
                ? "fill-primary text-primary"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function FeedbackCard({ entry }: { entry: FeedbackEntry }) {
  const date = new Date(entry.created_at)
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
          {entry.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= entry.rating
                  ? "fill-primary text-primary"
                  : "fill-transparent text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
      <h4 className="font-heading text-sm font-semibold text-card-foreground">
        {entry.name}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {entry.message}
      </p>
      <p className="mt-4 text-xs text-muted-foreground/70">
        {formattedDate} at {formattedTime}
      </p>
    </div>
  )
}

export function Feedback() {
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  const fetchFeedback = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })

    if (!fetchError && data) {
      setFeedbackList(data as FeedbackEntry[])
    }
  }, [supabase])

  useEffect(() => {
    fetchFeedback()

    // Subscribe to realtime inserts
    const channel = supabase
      .channel("feedback-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedback" },
        (payload) => {
          setFeedbackList((prev) => [payload.new as FeedbackEntry, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchFeedback, supabase])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (rating === 0) {
      setError("Please select a rating.")
      return
    }

    setSubmitting(true)

    const { error: insertError } = await supabase.from("feedback").insert({
      name: name.trim(),
      message: message.trim(),
      rating,
    })

    setSubmitting(false)

    if (insertError) {
      setError("Failed to submit feedback. Please try again.")
      return
    }

    setName("")
    setMessage("")
    setRating(0)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <section id="feedback" className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Your thoughts matter
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Feedback
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
            {"I'd love to hear what you think! Leave your feedback below."}
          </p>
        </div>

        {/* Existing feedback cards */}
        {feedbackList.length > 0 && (
          <div className="mb-16">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
              What people are saying
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {feedbackList.map((entry) => (
                <FeedbackCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {/* Feedback form */}
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-border bg-card p-8 shadow-sm"
          >
            <h3 className="font-heading text-lg font-bold text-card-foreground">
              Leave your feedback
            </h3>

            <div className="space-y-2">
              <Label htmlFor="feedback-name">Name</Label>
              <Input
                id="feedback-name"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-message">Feedback message</Label>
              <Textarea
                id="feedback-message"
                placeholder="Share your thoughts..."
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <StarRating value={rating} onChange={setRating} />
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="text-sm font-medium text-primary" role="status">
                Thank you for your feedback!
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="gap-2 rounded-full px-8"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  Submitting
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Submit Feedback
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
