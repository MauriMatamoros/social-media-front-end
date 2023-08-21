import { User } from '@/types/User'
import { Video } from '@/types/Video'
import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import VideoCard from '@/components/video/VideoCard'

interface PropTypes {
    user: User
    video: Video
    author: User
}
const Video = ({ user, video, author }: PropTypes) => {
    return (
        <>
            <VideoCard video={video} author={author} currentUser={user} />
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { params } = ctx
    const { token } = parseCookies(ctx)
    try {
        const { data: video } = await socialMedia.get(`/videos/${params.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })

        const { data: author } = await socialMedia.get(
            `/users/${video.authorId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        return { props: { author, video } }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default Video
