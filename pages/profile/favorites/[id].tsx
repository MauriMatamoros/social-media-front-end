import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import { User } from '@/types/User'
import Head from 'next/head'
import { Container, Heading } from '@chakra-ui/react'
import VideoList from '@/components/video/VideoList'

interface PropTypes {
    externalUser: User
}
const UserFavoritedVideos = ({ externalUser }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Favorites</title>
                <meta
                    name={'description'}
                    content={`Videos that ${externalUser.name} favorites`}
                />
            </Head>
            <Container>
                <Heading>{`${externalUser.name}'s favorite videos`}</Heading>
                <VideoList videos={externalUser.favoriteVideos} />
            </Container>
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { params } = ctx
    const { token } = parseCookies(ctx)
    const { data: externalUser } = await socialMedia.get(
        `/users/${params.id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    )
    return { props: { externalUser } }
}
export default UserFavoritedVideos
