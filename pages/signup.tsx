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
    useToast,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { GeneralProps } from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { socialMedia } from '@/api/socialMedia'
import { handleLogin } from '@/utils/auth'
import Head from 'next/head'
import { ChangeEvent, useState } from 'react'

const Signup = ({ formSize }: GeneralProps) => {
    const [showPassword, setShowPassword] = useBoolean()
    const [isStudent, setIsStudent] = useBoolean(false)
    const [showConfirmPassword, setShowConfirmPassword] = useBoolean()
    const toast = useToast()
    const router = useRouter()
    const [confirmPassword, setConfirmPassword] = useState('')

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Please provide a valid email')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
        photo: Yup.string().url('Photo must be a valid url').optional(),
    })

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setConfirmPassword(value)
    }

    const {
        values,
        errors,
        handleSubmit,
        isSubmitting,
        getFieldProps,
        touched,
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            photo: '',
        },
        onSubmit: async (values, actions) => {
            try {
                let payload: {
                    name: string
                    password: string
                    email: string
                    photo?: string
                } = {
                    ...values,
                }
                if (values.photo.length === 0) {
                    delete payload.photo
                }
                const {
                    data: { accessToken },
                } = await socialMedia.post('/auth/signup', {
                    role: isStudent ? 'TEACHER' : 'STUDENT',
                    ...payload,
                })
                handleLogin(accessToken)
                setConfirmPassword('')
                actions.resetForm()
                router.push('/videos')
            } catch (e) {
                toast({
                    position: 'top-right',
                    title: 'Oops!',
                    description: 'Could not create a new user.',
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
                <title>Sign Up</title>
                <meta name={'description'} content={'Sign Up page'} />
            </Head>
            <main>
                <VStack height={'100%'}>
                    <Heading>Sign Up</Heading>
                    <form style={{ width: formSize }} onSubmit={handleSubmit}>
                        <FormControl
                            isRequired
                            isInvalid={touched.name && 'name' in errors}
                        >
                            <FormLabel htmlFor={'name'}>Name</FormLabel>
                            <Input
                                type={'text'}
                                id={'name'}
                                placeholder={'John'}
                                {...getFieldProps('name')}
                            />
                            <FormErrorMessage>
                                First Name is required.
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            mt={4}
                            isInvalid={touched.photo && 'photo' in errors}
                        >
                            <FormLabel htmlFor={'photo'}>Photo</FormLabel>
                            <Input
                                id={'photo'}
                                type={'text'}
                                placeholder={'https://robohash.org/stefan-two'}
                                {...getFieldProps('photo')}
                            />
                            <FormErrorMessage>
                                Photo must be a valid url.
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            mt={4}
                            isRequired
                            isInvalid={touched.email && 'email' in errors}
                        >
                            <FormLabel>Email</FormLabel>
                            <Input
                                type={'email'}
                                placeholder={'john@example.com'}
                                id={'email'}
                                {...getFieldProps('email')}
                            />
                            <FormErrorMessage>
                                Email is required.
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            mt={4}
                            isRequired
                            isInvalid={touched.password && 'password' in errors}
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
                                Password is required.
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            mt={4}
                            isRequired
                            isInvalid={values.password !== confirmPassword}
                        >
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup size="md">
                                <Input
                                    id={'confirmPassword'}
                                    value={confirmPassword}
                                    pr="4.5rem"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Enter password"
                                    onChange={handleConfirmPasswordChange}
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
                            <FormErrorMessage>
                                {"Passwords don't match"}
                            </FormErrorMessage>
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
                            Sign up
                        </Button>
                    </form>
                </VStack>
            </main>
        </>
    )
}

export default Signup
