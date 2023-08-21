import {
    Badge,
    Box,
    Heading,
    HStack,
    Icon,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FaRegCalendarDays } from 'react-icons/fa6'
import { Link } from '@chakra-ui/next-js'

export type Video = {
    id: number
    title: string
    src: string
    published: boolean
    authorId: string
    createdAt: string
}

interface PropTypes {
    video: Video
}

const VideoCard = ({ video }: PropTypes) => {
    return (
        <Box
            w={'100%'}
            p={4}
            borderWidth={'1px'}
            borderRadius={'lg'}
            borderBottomWidth={'5px'}
            borderRightWidth={'5px'}
            mt={'20px'}
        >
            <VStack alignItems={'start'} spacing={4}>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Heading as={'h2'} size={'sm'}>
                        <Link href={`/videos/${video.id}`}>{video.title}</Link>
                    </Heading>
                    {video.published ? (
                        <Badge colorScheme={'green'}>Published</Badge>
                    ) : (
                        <Badge colorScheme={'red'}>Unpublished</Badge>
                    )}
                </HStack>
                <HStack justifyContent={'space-between'} w={'100%'}>
                    <Text color={'gray.700'}>
                        <Icon as={FaRegCalendarDays} mr={1} />
                        {new Date(video.createdAt).toLocaleDateString()}
                    </Text>
                </HStack>
            </VStack>
        </Box>
    )
}

export default VideoCard
