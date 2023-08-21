import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import Layout, { User } from '@/components/layout/Layout'
import { parseCookies } from 'nookies'
import { socialMedia } from '@/api/socialMedia'
import jwt from 'jsonwebtoken'
import Router from 'next/router'

export default function App({
    Component,
    pageProps,
    user,
}: AppProps & { user: User }) {
    return (
        <ChakraProvider>
            <Head>
                <title>Login</title>
                <meta name={'description'} content={'Video Social Media'} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:title" content="Login - Social Media" />
                <meta
                    property="og:description"
                    content="Video Social Media Assignment"
                />
            </Head>
            <Layout user={user}>
                <Component {...pageProps} user={user} />
            </Layout>
        </ChakraProvider>
    )
}

App.getInitialProps = async ({ ctx }: any) => {
    const { token } = parseCookies(ctx)
    const publicRoutes = ['/', '/signup']

    const redirect = (ctx: any, Location: string) => {
        if (ctx.req) {
            ctx.res.writeHead(302, { Location })
            ctx.res.end()
        } else {
            Router.push(Location)
        }
    }

    if (!token) {
        if (!publicRoutes.includes(ctx.pathname)) {
            redirect(ctx, '/')
        }
        return {}
    } else {
        if (publicRoutes.includes(ctx.pathname)) {
            redirect(ctx, '/videos')
        }
        const { id } = jwt.decode(token) as { id: string }
        const { data: user } = await socialMedia.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })

        return { user }
    }
}
