import searchBar from "../components/SearchBar"

const Home = () => {
    return (
        <div className="home">
            <div className="search-bar-container">
                <searchBar />
                <div>SearchResults</div>
            </div>
        </div>
        
    )
}

export default Home