import Head from "next/head"

import Home from "../components/home.jsx"

export default function HomePage() {
    return (
        <>
            <Head>
                <title>City Explorer</title>
                <meta charSet="utf-8" />
            </Head>

            <Home />
        </>
    )
}
