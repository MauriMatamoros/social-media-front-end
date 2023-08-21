import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import { Button, Container } from '@chakra-ui/react'
import VideoCard from '@/components/video/VideoCard'

import { User } from '@/types/User'
import { Video } from '@/types/Video'

interface PropTypes {
    videos: Video[]
}

const Videos = ({ videos }: PropTypes) => {
    return (
        <Container>
            <Button mt={5} type={'submit'} w={'100%'} colorScheme={'blue'}>
                Add Video
            </Button>
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
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
