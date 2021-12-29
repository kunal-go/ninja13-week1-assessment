import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import MovieCard from "../components/MovieCard"
import { useFetchMovies } from "../hooks/useFetchMovies"
import { IMovie } from "../types/IMovie"

export default function HomePage() {
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
			<header style={{ textAlign: "center" }}>
				<h1>Popular Movies</h1>
				<div>
					{!errorMessage && (
						<>
							<input
								type="text"
								placeholder="Search Movies"
								value={searchText}
								onChange={(e) => {
									setSearchText(e.target.value)
								}}
								style={{
									width: "40%",
									padding: "12px 20px",
									margin: "8px 0",
									display: "inline-block",
									border: "1px solid #ccc",
									borderRadius: "4px",
									boxSizing: "border-box",
								}}
							/>
						</>
					)}
				</div>
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
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-evenly",
						margin: "20px auto",
					}}
				>
					{filteredMovies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			</InfiniteScroll>
		</div>
	)
}
