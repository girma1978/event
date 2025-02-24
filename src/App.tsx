
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Path to the Home component
import UserList from './components/UserList'; // Path to UserList
import EventList from './components/EventList'; // Path to EventList
import AttendeeList from './components/AttendeeList'; // Path to AttendeeList
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/attendees" element={<AttendeeList />} />
      </Routes>
    </Router>
  );
}

export default App;
