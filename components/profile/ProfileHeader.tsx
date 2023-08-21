import {
    Avatar,
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
import { FaHeart, FaRankingStar } from 'react-icons/fa6'
import { FaVideo } from 'react-icons/fa'
import cookie from 'js-cookie'
import { socialMedia } from '@/api/socialMedia'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { User } from '@/types/User'
import { Link } from '@chakra-ui/next-js'

interface PropTypes {
    user: User
    currentUser?: User
}

const ProfileHeader = ({ user, currentUser }: PropTypes) => {
    const router = useRouter()
    const toast = useToast()
    const [isFollowing, setIsFollowing] = useState(
        currentUser?.following.some(({ id }) => id === user.id)
    )
    const [updatedUser, setUpdatedUser] = useState<User | null>(null)

    const handleFollowOrUnfollow = async () => {
        const token = cookie.get('token')
        try {
            if (isFollowing) {
                await socialMedia.patch(
                    `/users/${user.id}/unfollow`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                setIsFollowing(false)
            } else {
                await socialMedia.patch(
                    `/users/${user.id}/follow`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setIsFollowing(true)
            }
            const { data } = await socialMedia.get(`/users/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setUpdatedUser(data)
            toast({
                position: 'top-right',
                title: isFollowing ? 'Unfollowed!' : 'Followed!',
                description: `You'll be redirected to you profile soon!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setTimeout(() => {
                router.push('/profile')
            }, 5000)
        } catch (e) {
            toast({
                position: 'top-right',
                title: 'Oops!',
                description: `Unable to ${
                    isFollowing ? 'Unfollow' : 'Follow'
                } user.`,
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
                    <Box>
                        <Avatar size={'lg'} src={user.photo} />
                        <Heading mt={4} as={'h2'} size={'md'}>
                            {user.name}
                        </Heading>
                    </Box>
                </HStack>
                <HStack w={'100%'}>
                    <Text color={'gray.700'}>
                        <Icon as={FaRankingStar} mr={1} />
                        <Badge>{user.likes.length}</Badge>{' '}
                        <Link href={`/profile/likes/${user.id}`}>Likes</Link>
                    </Text>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Text color={'gray.700'}>
                        <Icon as={FaHeart} mr={1} />
                        <Badge>{user.favoriteVideos.length}</Badge>{' '}
                        <Link href={`/profile/favorites/${user.id}`}>
                            Favorite Videos
                        </Link>
                    </Text>
                    <Text color={'gray.700'}>
                        <Icon as={FaVideo} mr={1} />
                        <Badge>{user.videos.length}</Badge> Videos
                    </Text>
                </HStack>
                <HStack width={'100%'} justifyContent={'space-between'}>
                    <Text>
                        <Badge>
                            {updatedUser
                                ? updatedUser.following.length
                                : user.following.length}
                        </Badge>{' '}
                        {currentUser ? (
                            <Link href={`/following/${user.id}`}>
                                Following
                            </Link>
                        ) : (
                            <Link href={'/following'}>Following</Link>
                        )}
                    </Text>
                    <Text>
                        <Badge>
                            {updatedUser
                                ? updatedUser.followedBy.length
                                : user.followedBy.length}
                        </Badge>
                        {currentUser ? (
                            <Link href={`/followers/${user.id}`}>
                                Followers
                            </Link>
                        ) : (
                            <Link href={'/followers'}>Followers</Link>
                        )}
                    </Text>
                </HStack>
            </VStack>
            {currentUser && currentUser.id !== user.id && (
                <Button
                    mt={5}
                    type={'submit'}
                    w={'100%'}
                    colorScheme={'blue'}
                    onClick={handleFollowOrUnfollow}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            )}
        </Container>
    )
}

export default ProfileHeader
