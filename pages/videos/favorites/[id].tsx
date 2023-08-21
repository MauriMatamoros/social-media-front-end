import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import { User } from '@/types/User'
import Head from 'next/head'
import { Container, Heading } from '@chakra-ui/react'
import UserList from '@/components/user/UserList'
import { Video } from '@/types/Video'
import VideoList from '@/components/video/VideoList'

interface PropTypes {
    video: Video
}
const VideoFavorites = ({ video }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Favorites</title>
                <meta
                    name={'description'}
                    content={`Users that favorited ${video.title}`}
                />
            </Head>
            <Container>
                <Heading>{`Liked ${video.title}`}</Heading>
                <UserList users={video.favoritedBy} />
            </Container>
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { params } = ctx
    const { token } = parseCookies(ctx)
    const { data: video } = await socialMedia.get(`/videos/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return { props: { video } }
}
export default VideoFavorites
