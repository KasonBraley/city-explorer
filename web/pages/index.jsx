import Head from "next/head"

import Home from "../components/home.jsx"
import Layout from "../components/layout.jsx"

export default function HomePage() {
    return (
        <Layout>
            <Head>
                <title>City Explorer</title>
                <meta charSet="utf-8" />
            </Head>

            <Home />
        </Layout>
    )
}
