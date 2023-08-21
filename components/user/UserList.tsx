import { User } from '@/types/User'
import UserCard from '@/components/user/UserCard'

interface PropTypes {
    users: Partial<User>[]
}
const UserList = ({ users }: PropTypes) => {
    return (
        <>
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </>
    )
}

export default UserList
