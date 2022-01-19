import Link from "next/link"

export default function Header() {
    return (
        <div id="header" className="bg-blue-400 w-screen">
            <nav className="flex justify-center space-x-4">
                <h1>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </h1>
                <h1>
                    <Link
                        href={{
                            pathname: "/movies",
                        }}
                    >
                        <a>Movies</a>
                    </Link>
                </h1>
            </nav>
        </div>
    )
}
