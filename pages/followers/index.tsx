import { User } from '@/types/User'
import { Container, Heading } from '@chakra-ui/react'
import UserList from '@/components/user/UserList'
import Head from 'next/head'

interface PropTypes {
    user: User
}

const Followers = ({ user }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Followers</title>
                <meta
                    name={'description'}
                    content={'Users that you are following'}
                />
            </Head>
            <Container>
                <Heading>Followers</Heading>
                <UserList users={user.followedBy} />
            </Container>
        </>
    )
}

export default Followers
