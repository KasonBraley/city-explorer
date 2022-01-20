import "../styles/globals.css"
import Layout from "../components/layout.jsx"
import CityProvider from "../context/cityContext.jsx"

function MyApp({ Component, pageProps }) {
    return (
        <CityProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CityProvider>
    )
}

export default MyApp
