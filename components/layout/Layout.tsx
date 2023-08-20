import Navbar from '@/components/layout/Navbar'
import { cloneElement, ReactElement } from 'react'
import { Flex, useBreakpointValue, useTheme } from '@chakra-ui/react'

export type User = {
    id: number
    email: string
    name: string
    role: string
    photo: string
    following: { id: number; email: string }[]
    followedBy: { id: number; email: string }[]
    videos: { id: number; title: string }[]
    favoriteVideos: { id: number; title: string }[]
    likes: { id: number; title: string }[]
}

const Layout = ({ children, user }: { children: ReactElement; user: User }) => {
    const theme = useTheme()
    const formSize = useBreakpointValue({
        base: theme.sizes.xs,
        lg: theme.sizes.lg,
    })
    return (
        <Flex flexDirection={'column'} h={'100vh'}>
            <Navbar user={user} />
            {cloneElement(children, { formSize })}
        </Flex>
    )
}

export default Layout

export type GeneralProps = {
    formSize: string
}
