import Header from "./header.jsx"
import Footer from "./footer.jsx"

export default function Layout({ children }) {
    return (
        <div className="flex flex-col justify-between h-screen w-screen">
            <Header className="flex-none"/>
            <main className="grow overflow-hidden flex flex-col justify-center items-center">{children}</main>
            <Footer className="flex-none"/>
        </div>
    )
}
