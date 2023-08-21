import Head from 'next/head'
import VideoForm from '@/components/video/VideoForm'
import { Heading, VStack } from '@chakra-ui/react'
import { GeneralProps } from '@/components/layout/Layout'
import { socialMedia } from '@/api/socialMedia'
import cookie from 'js-cookie'
import * as Yup from 'yup'

const AddVideo = ({ formSize }: GeneralProps) => {
    const onSubmit = async (data: { title: string; src: string }) => {
        const token = cookie.get('token')
        await socialMedia.post('/videos', data, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        src: Yup.string()
            .url('Source must be a valid url')
            .required('Source is Required'),
    })

    return (
        <>
            <Head>
                <title>Add Video</title>
                <meta name={'description'} content={'Add video form'} />
            </Head>
            <main>
                <VStack alignItems={'center'}>
                    <Heading>Add Video</Heading>
                    <VideoForm
                        onSubmit={onSubmit}
                        formSize={formSize}
                        validationSchema={validationSchema}
                    />
                </VStack>
            </main>
        </>
    )
}

export default AddVideo
