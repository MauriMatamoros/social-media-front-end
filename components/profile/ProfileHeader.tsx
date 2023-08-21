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
import { User } from '@/components/layout/Layout'
import { FaVideo } from 'react-icons/fa'
import cookie from 'js-cookie'
import { socialMedia } from '@/api/socialMedia'
import { useRouter } from 'next/router'

interface PropTypes {
    user: User
    currentUser?: User
}

const ProfileHeader = ({ user, currentUser }: PropTypes) => {
    const router = useRouter()
    const toast = useToast()
    const handleFollowOrUnfollow = async (following: boolean) => {
        const token = cookie.get('token')
        try {
            if (following) {
                await socialMedia.patch(
                    `/users/${user.id}/unfollow`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } else {
                await socialMedia.patch(
                    `/users/${user.id}/follow`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            }
            toast({
                position: 'top-right',
                title: following ? 'Unfollowed!' : 'Followed!',
                description: `You'll be redirected to you profile soon!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            router.push('/profile')
        } catch (e) {
            toast({
                position: 'top-right',
                title: 'Oops!',
                description: `Unable to ${
                    following ? 'Unfollow' : 'Follow'
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
                        <Badge>{user.likes.length}</Badge> Likes
                    </Text>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Text color={'gray.700'}>
                        <Icon as={FaHeart} mr={1} />
                        <Badge>{user.favoriteVideos.length}</Badge> Favorite
                        Videos
                    </Text>
                    <Text color={'gray.700'}>
                        <Icon as={FaVideo} mr={1} />
                        <Badge>{user.videos.length}</Badge> Videos
                    </Text>
                </HStack>
                <HStack width={'100%'} justifyContent={'space-between'}>
                    <Text>
                        <Badge>{user.following.length}</Badge> Following
                    </Text>
                    <Text>
                        <Badge>{user.followedBy.length}</Badge> Followers
                    </Text>
                </HStack>
            </VStack>
            {currentUser && (
                <Button
                    mt={5}
                    type={'submit'}
                    w={'100%'}
                    colorScheme={'blue'}
                    onClick={() =>
                        handleFollowOrUnfollow(
                            currentUser?.following.some(
                                ({ id }) => id === user.id
                            )
                        )
                    }
                >
                    {currentUser?.following.some(({ id }) => id === user.id)
                        ? 'Unfollow'
                        : 'Follow'}
                </Button>
            )}
        </Container>
    )
}

export default ProfileHeader
