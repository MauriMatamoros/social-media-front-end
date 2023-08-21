import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import { Button, Container } from '@chakra-ui/react'
import VideoFeed from '@/components/video/VideoFeed'

import { User } from '@/types/User'
import { Video } from '@/types/Video'
import { Link } from '@chakra-ui/next-js'
import { useRouter } from 'next/router'

interface PropTypes {
    videos: Video[]
}

const Videos = ({ videos }: PropTypes) => {
    const router = useRouter()

    const onClick = () => {
        router.push('/videos/create')
    }
    return (
        <Container>
            <Button mt={5} w={'100%'} colorScheme={'blue'} onClick={onClick}>
                Add Video
            </Button>
            {videos.map((video) => (
                <VideoFeed key={video.id} video={video} />
            ))}
        </Container>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { token } = parseCookies(ctx)
    const { data: videos } = await socialMedia.get('/videos?owned=false', {
        headers: { Authorization: `Bearer ${token}` },
    })
    return { props: { videos } }
}

export default Videos
