import CityForm from "./form.jsx"

export default function Home(props) {
    return (
        <CityForm
            handleSubmit={props.handleSubmit}
            searchQuery={props.searchQuery}
            searchCount={props.searchCount}
            error={props.error}
        />
    )
}
