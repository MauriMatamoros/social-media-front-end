import CompactVideoCard from '@/components/video/CompactVideoCard'
import { Video } from '@/types/Video'

interface PropTypes {
    videos: Partial<Video>[]
}
const VideoList = ({ videos }: PropTypes) => {
    return (
        <>
            {videos.map((video) => (
                <CompactVideoCard key={video.id} video={video} />
            ))}
        </>
    )
}

export default VideoList
