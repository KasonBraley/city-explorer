import { Link } from "react-router-dom"

export default function Header() {
    return (
        <div className="bg-blue-400 w-screen">
            <nav className="flex justify-center space-x-4">
                <Link to="/">Home</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/weather">Weather</Link>
            </nav>
        </div>
    )
}
