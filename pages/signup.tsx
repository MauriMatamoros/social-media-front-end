import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useBoolean,
    VStack,
    Switch,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { GeneralProps } from '@/components/layout/Layout'

const Signup = ({ formSize }: GeneralProps) => {
    const [showPassword, setShowPassword] = useBoolean()
    const [isStudent, setIsStudent] = useBoolean(false)
    const [showConfirmPassword, setShowConfirmPassword] = useBoolean()
    return (
        <VStack height={'100%'}>
            <Heading>Sign Up</Heading>
            <form style={{ width: formSize }}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type={'text'} placeholder={'John'} />
                    <FormErrorMessage>First Name is required.</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isRequired>
                    <FormLabel>Photo</FormLabel>
                    <Input
                        type={'text'}
                        placeholder={'https://robohash.org/stefan-two'}
                    />
                    <FormErrorMessage> Last Name is required.</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type={'email'} placeholder={'john@example.com'} />
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                            <IconButton
                                variant={'ghost'}
                                h="1.75rem"
                                size="sm"
                                onClick={setShowPassword.toggle}
                                aria-label={'show password'}
                                icon={
                                    showPassword ? (
                                        <ViewIcon />
                                    ) : (
                                        <ViewOffIcon />
                                    )
                                }
                            ></IconButton>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                            <IconButton
                                variant={'ghost'}
                                h="1.75rem"
                                size="sm"
                                onClick={setShowConfirmPassword.toggle}
                                aria-label={'show password'}
                                icon={
                                    showConfirmPassword ? (
                                        <ViewIcon />
                                    ) : (
                                        <ViewOffIcon />
                                    )
                                }
                            ></IconButton>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} display="flex" alignItems="center">
                    <FormLabel htmlFor="proxies" mb="0">
                        Student/Teacher
                    </FormLabel>
                    <Switch
                        id="proxies"
                        onChange={setIsStudent.toggle}
                        isChecked={isStudent}
                    />
                </FormControl>
                <Button mt={4} type={'submit'} w={'100%'}>
                    Sign up
                </Button>
            </form>
        </VStack>
    )
}

export default Signup
