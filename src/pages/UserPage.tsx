import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface User {
  username: string
  email: string
}

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`)
        setUser(response.data)
      } catch (err) {
        setError('Failed to load user details.')
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  return (
    <div>
      <h2>User Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default UserPage
