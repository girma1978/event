import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of the event data
interface Event {
  id: string;
  title: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]); // Ensure initial state is an array
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        
        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setEvents(response.data); // Set the events data if it's an array
        } else {
          setError('Unexpected response format. Expected an array.');
        }
      } catch (err: any) {
        console.error('Error fetching events:', err);
        setError('Failed to load events.');
      }
    };

    fetchEvents();
  }, []); // Empty array means this effect runs once, after the first render

  return (
    <div className="event-list-container">
      <h2 className="event-list-header">Events</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <ul className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id} className="event-item">
              <a className="event-link" href={`/events/${event.id}`}>{event.title}</a>
            </li>
          ))
        ) : (
          <p className="no-events-message">No events available</p> // Display if there are no events
        )}
      </ul>
    </div>
  );
}

export default EventList;
