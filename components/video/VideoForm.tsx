import { Video } from '@/types/Video'
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { GeneralProps } from '@/components/layout/Layout'

interface PropTypes {
    video?: Partial<Video>
    onSubmit: (data: { title: string; src: string }) => Promise<void>
    validationSchema: Yup.ObjectSchema<any>
}

const VideoForm = ({
    video,
    onSubmit,
    formSize,
    validationSchema,
}: PropTypes & GeneralProps) => {
    const toast = useToast()
    const router = useRouter()

    const { errors, handleSubmit, isSubmitting, getFieldProps, touched } =
        useFormik({
            initialValues: {
                title: video ? video.title : '',
                src: video ? video.src : '',
            },
            onSubmit: async (values, actions) => {
                try {
                    await onSubmit(values as { title: string; src: string })
                    toast({
                        position: 'top-right',
                        title: video ? 'Video Updated' : 'Video Added',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                    actions.resetForm()
                    router.push('/profile')
                } catch (e) {
                    toast({
                        position: 'top-right',
                        title: 'Oops!',
                        description: video
                            ? 'Error updating video.'
                            : 'Error adding video',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            },
            validationSchema,
        })
    return (
        <form style={{ width: formSize }} onSubmit={handleSubmit}>
            <FormControl isRequired={!video} isInvalid={'title' in errors}>
                <FormLabel htmlFor={'title'}>Title</FormLabel>
                <Input
                    type={'text'}
                    id={'title'}
                    placeholder={'Video Title'}
                    {...getFieldProps('title')}
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired={!video} isInvalid={'src' in errors}>
                <FormLabel htmlFor={'src'}>Source</FormLabel>
                <Input
                    type={'text'}
                    id={'src'}
                    placeholder={'https://www.youtube.com/watch?v=5HjX1B48rVI'}
                    {...getFieldProps('src')}
                />
                <FormErrorMessage>{errors.src}</FormErrorMessage>
            </FormControl>
            <Button
                mt={4}
                type={'submit'}
                w={'100%'}
                colorScheme={'blue'}
                isDisabled={isSubmitting || Boolean(Object.keys(errors).length)}
                isLoading={isSubmitting}
            >
                {video ? 'Edit' : 'Create'}
            </Button>
        </form>
    )
}

export default VideoForm
