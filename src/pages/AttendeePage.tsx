import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Attendee {
  status: string
  userId: string
  eventId: string
}

const AttendeePage = () => {
  const { attendeeId } = useParams<{ attendeeId: string }>()
  const [attendee, setAttendee] = useState<Attendee | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        const response = await axios.get(`/api/attendees/${attendeeId}`)
        setAttendee(response.data)
      } catch (err) {
        setError('Failed to load attendee details.')
      }
    }

    if (attendeeId) {
      fetchAttendee()
    }
  }, [attendeeId])

  return (
    <div>
      <h2>Attendee Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {attendee ? (
        <div>
          <p>Status: {attendee.status}</p>
          <p>User ID: {attendee.userId}</p>
          <p>Event ID: {attendee.eventId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default AttendeePage
