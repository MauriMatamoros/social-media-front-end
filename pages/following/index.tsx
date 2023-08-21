import { User } from '@/types/User'
import { Container, Heading } from '@chakra-ui/react'
import UserList from '@/components/user/UserList'
import Head from 'next/head'

interface PropTypes {
    user: User
}

const Following = ({ user }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Following</title>
                <meta
                    name={'description'}
                    content={'Users that are following you'}
                />
            </Head>
            <Container>
                <Heading>Following</Heading>
                <UserList users={user.following} />
            </Container>
        </>
    )
}

export default Following
