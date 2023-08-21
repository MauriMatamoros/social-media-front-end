import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import { User } from '@/types/User'
import Head from 'next/head'
import { Container, Heading } from '@chakra-ui/react'
import UserList from '@/components/user/UserList'

interface PropTypes {
    externalUser: User
}
const FollowersExternal = ({ externalUser }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Followers</title>
                <meta
                    name={'description'}
                    content={`Users that follow ${externalUser.name}`}
                />
            </Head>
            <Container>
                <Heading>{`${externalUser.name}'s Followers`}</Heading>
                <UserList users={externalUser.followedBy} />
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
export default FollowersExternal
