
import { Link } from 'react-router-dom'
import UserList from '../components/UserList'
import EventList from '../components/EventList'
import AttendeeList from '../components/AttendeeList'

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Event Management System</h1>
      <nav>
        <ul>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/attendees">Attendees</Link></li>
        </ul>
      </nav>
      <UserList />
      <EventList />
      <AttendeeList />
    </div>
  )
}

export default Home
