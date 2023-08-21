import Head from 'next/head'
import VideoForm from '@/components/video/VideoForm'
import { Heading, VStack } from '@chakra-ui/react'
import { GeneralProps } from '@/components/layout/Layout'
import { socialMedia } from '@/api/socialMedia'
import cookie from 'js-cookie'
import * as Yup from 'yup'
import { Video } from '@/types/Video'
import { parseCookies } from 'nookies'
import jwt from 'jsonwebtoken'

interface PropTypes {
    video: Video
}

const EditVideo = ({ formSize, video }: GeneralProps & PropTypes) => {
    const onSubmit = async (data: { title: string; src: string }) => {
        const token = cookie.get('token')
        await socialMedia.patch(`/videos/${video.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string(),
        src: Yup.string().url('Source must be a valid url'),
    })

    return (
        <>
            <Head>
                <title>Edit Video</title>
                <meta name={'description'} content={`Edit video ${video.id}`} />
            </Head>
            <main>
                <VStack alignItems={'center'}>
                    <Heading>Edit Video</Heading>
                    <VideoForm
                        onSubmit={onSubmit}
                        formSize={formSize}
                        validationSchema={validationSchema}
                        video={video}
                    />
                </VStack>
            </main>
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { params } = ctx
    const { token } = parseCookies(ctx)
    try {
        const { data: video } = await socialMedia.get(`/videos/${params.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })

        const { data: author } = await socialMedia.get(
            `/users/${video.authorId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const { id } = jwt.decode(token) as { id: string }
        if (id !== video.authorId) {
            return {
                redirect: {
                    destination: '/videos',
                },
            }
        }
        return { props: { author, video } }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default EditVideo
