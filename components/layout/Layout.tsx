import Navbar from '@/components/layout/Navbar'
import { cloneElement, ReactElement } from 'react'
import { Flex, useBreakpointValue, useTheme } from '@chakra-ui/react'

const Layout = ({ children }: { children: ReactElement }) => {
    const theme = useTheme()
    const formSize = useBreakpointValue({
        base: theme.sizes.xs,
        lg: theme.sizes.lg,
    })
    return (
        <Flex flexDirection={'column'} h={'100vh'}>
            <Navbar />
            {cloneElement(children, { formSize })}
        </Flex>
    )
}

export default Layout

export type GeneralProps = {
    formSize: string
}
