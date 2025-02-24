import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of the user data
interface User {
  id: string;
  username: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]); // Ensure initial state is an array
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        
        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setUsers(response.data); // Set the users data if it's an array
        } else {
          setError('Unexpected response format. Expected an array.');
        }
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      }
    };

    fetchUsers();
  }, []); // Empty array means this effect runs once, after the first render

  return (
    <div className="user-list-container">
      <h2 className="user-list-header">User List</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <ul className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="user-item">
              {user.username}
            </li>
          ))
        ) : (
          <p className="no-users-message">No users available</p> // Display if there are no users
        )}
      </ul>
    </div>
  );
};

export default UserList;
