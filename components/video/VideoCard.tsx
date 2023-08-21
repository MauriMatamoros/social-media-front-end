import { Video } from '@/types/Video'
import {
    Badge,
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Icon,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa6'
import { FaThumbsUp } from 'react-icons/fa'
import { Link } from '@chakra-ui/next-js'
import { User } from '@/types/User'
import { useState } from 'react'
import { socialMedia } from '@/api/socialMedia'
import cookie from 'js-cookie'

interface PropTypes {
    video: Video
    author: User
    currentUser: User
}

const VideoCard = ({ video, author, currentUser }: PropTypes) => {
    const [liked, setLiked] = useState(
        video.likedBy.some(({ id }) => id === currentUser.id)
    )
    const [favorited, setFavorited] = useState(
        video.favoritedBy.some(({ id }) => id === currentUser.id)
    )
    const [updatedVideo, setUpdatedVideo] = useState<Video>(video)
    const toast = useToast()
    const handleLikeDislike = async () => {
        const token = cookie.get('token')
        try {
            if (liked) {
                await socialMedia.patch(
                    `/videos/${video.id}/dislike`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                const { data: dislikedVideo } = await socialMedia.get(
                    `/videos/${video.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setUpdatedVideo((prevState) => ({
                    ...prevState,
                    ...dislikedVideo,
                }))
                toast({
                    position: 'top-right',
                    title: 'Video Disliked!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                await socialMedia.patch(
                    `/videos/${video.id}/like`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                const { data: likedVideo } = await socialMedia.get(
                    `/videos/${video.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setUpdatedVideo((prevState) => ({
                    ...prevState,
                    ...likedVideo,
                }))
                toast({
                    position: 'top-right',
                    title: 'Video Liked!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
            setLiked((prevState) => !prevState)
        } catch (e) {
            toast({
                position: 'top-right',
                title: 'Oops!',
                description: `Unable to ${liked ? 'unlike' : 'like'} video. ${
                    updatedVideo.published === false
                        ? 'Cannot interact with videos.'
                        : ''
                }`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const handlePublishUnPublish = async () => {
        const token = cookie.get('token')
        try {
            if (updatedVideo.published) {
                const { data: likedVideo } = await socialMedia.patch(
                    `/videos/${video.id}/unpublish`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setUpdatedVideo((prevState) => ({
                    ...prevState,
                    ...likedVideo,
                }))
                toast({
                    position: 'top-right',
                    title: 'Video Unpublished!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                const { data: publishedVideo } = await socialMedia.patch(
                    `/videos/${video.id}/publish`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setUpdatedVideo((prevState) => ({
                    ...prevState,
                    ...publishedVideo,
                }))
                toast({
                    position: 'top-right',
                    title: 'Video Published!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
        } catch (e) {
            toast({
                position: 'top-right',
                title: 'Oops!',
                description: `Unable to ${
                    updatedVideo.published ? 'unpublish' : 'publish'
                } video.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const handleFavoriteUnFavorite = async () => {
        const token = cookie.get('token')
        try {
            if (favorited) {
                await socialMedia.patch(
                    `/videos/${video.id}/unfavorite`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                const { data: unFavoritedVideo } = await socialMedia.get(
                    `/videos/${video.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setUpdatedVideo((prevState) => ({
                    ...prevState,
                    ...unFavoritedVideo,
                }))
                toast({
                    position: 'top-right',
                    title: 'Video removed from Favorites!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                await socialMedia.patch(
                    `/videos/${video.id}/favorite`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                const { data: favoritedVideo } = await socialMedia.get(
                    `/videos/${video.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setUpdatedVideo((prevState) => ({
                    ...prevState,
                    ...favoritedVideo,
                }))
                toast({
                    position: 'top-right',
                    title: 'Video added to Favorites!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
            setFavorited((prevState) => !prevState)
        } catch (e) {
            toast({
                position: 'top-right',
                title: 'Oops!',
                description: `Unable to ${
                    favorited ? 'Remove from Favorites' : 'Favorite video.'
                }. ${
                    updatedVideo.published === false
                        ? 'Cannot interact with unpublished videos.'
                        : ''
                }`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }
    return (
        <Container
            p={4}
            borderWidth={'1px'}
            borderRadius={'lg'}
            borderBottomWidth={'5px'}
            borderRightWidth={'5px'}
        >
            <VStack w={'100%'} spacing={5}>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Box w={'100%'}>
                        <Heading mt={4} as={'h2'} size={'md'}>
                            {updatedVideo.title}
                        </Heading>
                        <HStack w={'100%'} justifyContent={'space-between'}>
                            <Link href={`/profile/${author.id}`}>
                                {author.name}
                            </Link>
                            {updatedVideo.published ? (
                                <Badge colorScheme={'green'}>Published</Badge>
                            ) : (
                                <Badge colorScheme={'red'}>Unpublished</Badge>
                            )}
                        </HStack>
                    </Box>
                </HStack>
                <HStack>
                    <Text color={'gray.900'}>
                        <a
                            target="_blank"
                            rel="noopener"
                            href={updatedVideo.src}
                        >
                            Src: {updatedVideo.src}
                        </a>
                    </Text>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Text color={'gray.700'}>
                        <Icon as={FaHeart} mr={1} />
                        <Badge>{updatedVideo.favoritedBy.length}</Badge>{' '}
                        <Link href={`/videos/favorites/${video.id}`}>
                            Favorites
                        </Link>
                    </Text>
                    <Text color={'gray.700'}>
                        <Icon as={FaThumbsUp} mr={1} />
                        <Badge>{updatedVideo.likedBy.length}</Badge>{' '}
                        <Link href={`/videos/likes/${video.id}`}>Likes</Link>
                    </Text>
                </HStack>
            </VStack>

            <Button
                mt={5}
                type={'submit'}
                w={'100%'}
                colorScheme={'blue'}
                onClick={handleLikeDislike}
            >
                {liked ? 'Unlike' : 'like'}
            </Button>
            <Button
                mt={5}
                type={'submit'}
                w={'100%'}
                colorScheme={'blue'}
                onClick={handleFavoriteUnFavorite}
            >
                {favorited ? 'Remove from Favorites' : 'Favorite'}
            </Button>
            {currentUser.id === author.id && (
                <Button
                    mt={5}
                    type={'submit'}
                    w={'100%'}
                    colorScheme={'blue'}
                    onClick={handlePublishUnPublish}
                >
                    {updatedVideo.published ? 'Unpublish' : 'Publish'}
                </Button>
            )}
        </Container>
    )
}

export default VideoCard
