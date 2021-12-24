import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useFetchMovies } from "../../hooks/useFetchMovies"
import { IMovie } from "../MovieCard/IMovie"
import MovieCard from "../MovieCard/MovieCard"
import "./App.css"

export default function App() {
	const [pageNumber, setPageNumber] = useState(1)
	const [searchText, setSearchText] = useState<string>("")
	const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([])
	const { movies, errorMessage, isLoading, hasMore } = useFetchMovies(pageNumber)

	useEffect(() => {
		if (searchText === "") {
			setFilteredMovies(movies)
			return
		}

		setFilteredMovies(
			movies.filter((movie) =>
				movie.title.toLowerCase().includes(searchText.toLowerCase()),
			),
		)
	}, [searchText, movies])

	return (
		<div className="app">
			<header>
				<h1>Popular Movies</h1>
				{!errorMessage && (
					<input
						className="search-box"
						type="text"
						placeholder="Search Movie"
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value)
						}}
					/>
				)}
			</header>

			{errorMessage && <div className="error">{errorMessage}</div>}

			<InfiniteScroll
				dataLength={movies.length}
				next={() => {
					if (searchText !== "") return
					setPageNumber((currPageNumber) => currPageNumber + 1)
				}}
				hasMore={hasMore}
				loader={isLoading && <h4>Loading...</h4>}
			>
				<div className="movie-card-list-container">
					{filteredMovies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} className="movie-card" />
					))}
				</div>
			</InfiniteScroll>
		</div>
	)
}
