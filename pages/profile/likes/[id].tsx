import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import { User } from '@/types/User'
import Head from 'next/head'
import { Container, Heading } from '@chakra-ui/react'
import VideoList from '@/components/video/VideoList'

interface PropTypes {
    externalUser: User
}
const UserLikedVideos = ({ externalUser }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Likes</title>
                <meta
                    name={'description'}
                    content={`Videos that ${externalUser.name} likes`}
                />
            </Head>
            <Container>
                <Heading>{`${externalUser.name}'s liked videos`}</Heading>
                <VideoList videos={externalUser.likes} />
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
export default UserLikedVideos
