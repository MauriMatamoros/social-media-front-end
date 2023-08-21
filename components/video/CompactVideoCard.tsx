import { Box, Heading, HStack, VStack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { Video } from '@/types/Video'

interface PropTypes {
    video: Partial<Video>
}

const CompactVideoCard = ({ video }: PropTypes) => {
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
                </HStack>
            </VStack>
        </Box>
    )
}

export default CompactVideoCard
