import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Event {
  title: string
  description: string
  date: string
  time: string
  location: string
}

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`)
        setEvent(response.data)
      } catch (err) {
        setError('Failed to load event details.')
      }
    }

    if (eventId) {
      fetchEvent()
    }
  }, [eventId])

  return (
    <div>
      <h2>Event Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {event ? (
        <div>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.date} at {event.time}</p>
          <p>Location: {event.location}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default EventPage
