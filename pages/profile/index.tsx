import { parseCookies } from 'nookies'
import VideoFeed from '@/components/video/VideoFeed'
import { socialMedia } from '@/api/socialMedia'
import ProfileHeader from '@/components/profile/ProfileHeader'
import { Container } from '@chakra-ui/react'
import { User } from '@/types/User'
import { Video } from '@/types/Video'
import Head from 'next/head'

interface PropTypes {
    videos: Video[]
    user: User
}

const Profile = ({ videos, user }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Profile</title>
                <meta
                    name={'description'}
                    content={`Profile for user ${user.id}`}
                />
            </Head>
            <Container>
                <ProfileHeader user={user} />
                {videos.map((video) => (
                    <VideoFeed key={video.id} video={video} />
                ))}
            </Container>
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { token } = parseCookies(ctx)
    const { data: videos } = await socialMedia.get('/videos?owned=true', {
        headers: { Authorization: `Bearer ${token}` },
    })
    return { props: { videos } }
}

export default Profile
