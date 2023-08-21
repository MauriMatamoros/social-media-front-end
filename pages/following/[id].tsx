import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import { User } from '@/types/User'
import Head from 'next/head'
import { Container, Heading } from '@chakra-ui/react'
import UserList from '@/components/user/UserList'

interface PropTypes {
    externalUser: User
}
const FollowingExternal = ({ externalUser }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Following</title>
                <meta
                    name={'description'}
                    content={`Users that ${externalUser.name} follows`}
                />
            </Head>
            <Container>
                <Heading>{`Following ${externalUser.name}`}</Heading>
                <UserList users={externalUser.following} />
            </Container>
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { params } = ctx
    const { token } = parseCookies(ctx)
    const { data: externalUser } = await socialMedia.get(
        `/users/${params.id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    )
    return { props: { externalUser } }
}
export default FollowingExternal
