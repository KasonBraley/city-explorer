import "../styles/globals.css"
import CityProvider from "../context/cityContext.jsx"

function MyApp({ Component, pageProps }) {
    return (
        <CityProvider>
            <Component {...pageProps} />
        </CityProvider>
    )
}

export default MyApp
