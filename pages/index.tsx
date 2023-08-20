import Head from 'next/head'
import {
    Box,
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
    useToast,
    VStack,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import { GeneralProps } from '@/components/layout/Layout'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { socialMedia } from '@/api/socialMedia'
import { handleLogin } from '@/utils/auth'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'

export default function Home({ formSize }: GeneralProps) {
    const [showPassword, setShowPassword] = useBoolean()
    const toast = useToast()
    const router = useRouter()

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please provide a valid email')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    const { errors, handleSubmit, isSubmitting, getFieldProps, touched } =
        useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            onSubmit: async (values, actions) => {
                try {
                    const {
                        data: { accessToken },
                    } = await socialMedia.post('/auth/login', values)
                    handleLogin(accessToken)
                    actions.resetForm()
                    router.push('/videos')
                } catch (e) {
                    const error = e as AxiosError
                    const credentialsError = {
                        title: 'Oops!',
                        description: 'Your email or password do not match.',
                    }
                    toast({
                        position: 'top-right',
                        title:
                            error.request.status === 401
                                ? credentialsError.title
                                : 'Error',
                        description:
                            error.request.status === 401
                                ? credentialsError.description
                                : 'Unable to log in. Please try again later.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            },
            validationSchema,
        })

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name={'description'} content={'Login page'} />
            </Head>
            <main>
                <VStack alignItems={'center'}>
                    <Heading>Login</Heading>
                    <form style={{ width: formSize }} onSubmit={handleSubmit}>
                        <FormControl isRequired isInvalid={'email' in errors}>
                            <FormLabel htmlFor={'email'}>Email</FormLabel>
                            <Input
                                type={'email'}
                                id={'email'}
                                placeholder={'john@example.com'}
                                {...getFieldProps('email')}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            mt={4}
                            isRequired
                            isInvalid={'password' in errors && touched.password}
                        >
                            <FormLabel htmlFor={'password'}>Password</FormLabel>
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                    id={'password'}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    {...getFieldProps('password')}
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
                            <FormErrorMessage>
                                {errors.password}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            mt={4}
                            type={'submit'}
                            w={'100%'}
                            colorScheme={'blue'}
                            isDisabled={
                                isSubmitting ||
                                Boolean(Object.keys(errors).length)
                            }
                            isLoading={isSubmitting}
                        >
                            Log in
                        </Button>
                        <Box mt={4}>
                            {"Don't have an account? "}
                            <Link href={'/'}>Sign Up Here</Link>
                        </Box>
                    </form>
                </VStack>
            </main>
        </>
    )
}
