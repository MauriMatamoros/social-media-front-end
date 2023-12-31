import ProfileHeader from '@/components/profile/ProfileHeader'
import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'

import { User } from '@/types/User'
import Head from 'next/head'

interface PropTypes {
    externalUser: User
    user: User
}
const ProfileDetails = ({ externalUser, user }: PropTypes) => {
    return (
        <>
            <Head>
                <title>Profile</title>
                <meta
                    name={'description'}
                    content={`Profile for user ${user.id}`}
                />
            </Head>
            <ProfileHeader user={externalUser} currentUser={user} />
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

export default ProfileDetails
