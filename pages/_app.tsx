import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
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
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    )
}
