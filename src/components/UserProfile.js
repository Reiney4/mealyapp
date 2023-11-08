import React, { useEffect } from 'react'

const UserProfile = ({ users }) => {
    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`/profile?username=${username}`)
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setUser(data);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }
  return (
    <div className='p-4'>
        <h2 className="text-2xl font-semibold">{user.username}'s Profile</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>ID: {user.id}</p>
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <Link to={`/profile/${user.username}`}>{user.username}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default UserProfile