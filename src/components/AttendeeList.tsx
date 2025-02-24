import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of the attendee data
interface Attendee {
  id: string;
  status: string;
  userId: string;
  eventId: string;
}

const AttendeeList = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]); // Ensure initial state is an array
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get('/api/attendees');
        
        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setAttendees(response.data); // Set the attendees data if it's an array
        } else {
          setError('Unexpected response format. Expected an array.');
        }
      } catch (err: any) {
        console.error('Error fetching attendees:', err);
        setError('Failed to load attendees.');
      }
    };

    fetchAttendees();
  }, []); // Empty array means this effect runs once, after the first render

  return (
    <div>
      <h2>Attendees</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
      <ul>
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <li key={attendee.id}>
              {attendee.status} - User {attendee.userId} at Event {attendee.eventId}
            </li>
          ))
        ) : (
          <p>No attendees available</p> // Display if there are no attendees
        )}
      </ul>
    </div>
  );
};

export default AttendeeList;
