import { parseCookies } from 'nookies'
import VideoCard, { Video } from '@/components/video/VideoCard'
import { User } from '@/components/layout/Layout'
import { socialMedia } from '@/api/socialMedia'
import ProfileHeader from '@/components/profile/ProfileHeader'
import { Container } from '@chakra-ui/react'

interface PropTypes {
    videos: Video[]
    user: User
}

const Profile = ({ videos, user }: PropTypes) => {
    return (
        <Container>
            <ProfileHeader user={user} />
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </Container>
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
