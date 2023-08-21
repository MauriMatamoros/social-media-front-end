import { Box, Heading, HStack, VStack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

import { User } from '@/types/User'

interface PropTypes {
    user: Partial<User>
}

const UserCard = ({ user }: PropTypes) => {
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
                        <Link href={`/profile/${user.id}`}>{user.email}</Link>
                    </Heading>
                </HStack>
            </VStack>
        </Box>
    )
}

export default UserCard
