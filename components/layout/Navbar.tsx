import {
    Drawer,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    useDisclosure,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerOverlay,
    VStack,
    useMediaQuery,
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { HamburgerIcon } from '@chakra-ui/icons'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMobile] = useMediaQuery('(max-width: 1024px)', {
        ssr: true,
        fallback: false, // return false on the server, and re-evaluate on the client side
    })
    const MenuItems = [
        {
            title: 'Login',
            route: '/',
        },
        {
            title: 'Sign Up',
            route: '/signup',
        },
        {
            title: 'Profile',
            route: '/profile',
        },
        {
            title: 'Videos',
            route: '/videos',
        },
    ]
    return (
        <header>
            <nav>
                {isMobile ? (
                    <HStack
                        w={'100%'}
                        padding={'10px'}
                        justifyContent={'flex-end'}
                    >
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                variant={'unstyled'}
                                aria-label={'menu'}
                                icon={<HamburgerIcon />}
                                onClick={onOpen}
                            />
                        </Menu>
                    </HStack>
                ) : (
                    <Menu>
                        <HStack
                            p={'20px'}
                            justifyContent={'center'}
                            spacing={12}
                        >
                            {MenuItems.map(({ title, route }) => (
                                <Link key={title} href={route}>
                                    {title}
                                </Link>
                            ))}
                        </HStack>
                    </Menu>
                )}
            </nav>
            {isMobile && (
                <Drawer isOpen={isOpen} onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Menu</DrawerHeader>
                        <DrawerBody>
                            <VStack alignItems={'start'}>
                                {MenuItems.map(({ title, route }) => (
                                    <Link
                                        key={title}
                                        href={route}
                                        onClick={onClose}
                                    >
                                        {title}
                                    </Link>
                                ))}
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            )}
        </header>
    )
}

export default Navbar
