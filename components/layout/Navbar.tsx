import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    useDisclosure,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { HamburgerIcon } from '@chakra-ui/icons'
import cookie from 'js-cookie'
import { User } from '@/types/User'

const Navbar = ({ user }: { user: User }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMobile] = useMediaQuery('(max-width: 1024px)', {
        ssr: true,
        fallback: false, // return false on the server, and re-evaluate on the client side
    })
    const publicMenuItems = [
        {
            title: 'Login',
            route: '/',
        },
        {
            title: 'Sign Up',
            route: '/signup',
        },
    ]

    const privateMenuItems = [
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
                            {!user
                                ? publicMenuItems.map(({ title, route }) => (
                                      <Link key={title} href={route}>
                                          {title}
                                      </Link>
                                  ))
                                : privateMenuItems.map(({ title, route }) => (
                                      <Link key={title} href={route}>
                                          {title}
                                      </Link>
                                  ))}
                            {user && (
                                <Link
                                    href={'/'}
                                    onClick={() => cookie.remove('token')}
                                >
                                    Logout
                                </Link>
                            )}
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
                                {!user
                                    ? publicMenuItems.map(
                                          ({ title, route }) => (
                                              <Link
                                                  key={title}
                                                  href={route}
                                                  onClick={onClose}
                                              >
                                                  {title}
                                              </Link>
                                          )
                                      )
                                    : privateMenuItems.map(
                                          ({ title, route }) => (
                                              <Link
                                                  key={title}
                                                  href={route}
                                                  onClick={onClose}
                                              >
                                                  {title}
                                              </Link>
                                          )
                                      )}
                                {user && (
                                    <Link
                                        href={'/'}
                                        onClick={() => cookie.remove('token')}
                                    >
                                        Logout
                                    </Link>
                                )}
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            )}
        </header>
    )
}

export default Navbar
