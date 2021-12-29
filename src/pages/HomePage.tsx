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
			{/* Header  */}
			<div
				style={{
					position: "fixed",
					width: "100%",
					backgroundColor: "rgba(255,255,255, 0.8)",
					backdropFilter: "blur(10px)",
					WebkitBackdropFilter: "blur(10px)",
					borderBottom: "1px solid rgba(0,0,0,0.1)",
					textAlign: "center",
				}}
			>
				<div
					style={{
						fontSize: "25px",
						fontWeight: "bold",
						padding: "10px",
					}}
				>
					Popular Movies
				</div>
				<div>
					<label>Search Movie: </label>
					<input
						type="text"
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value)
						}}
						style={{
							marginBottom: "10px",
							padding: "7px 20px",
							display: "inline-block",
							border: "1px solid #ccc",
							borderRadius: "4px",
							boxSizing: "border-box",
						}}
					/>
				</div>
			</div>

			{errorMessage && <div className="error">{errorMessage}</div>}

			<InfiniteScroll
				dataLength={movies.length}
				next={() => {
					if (searchText !== "") return
					setPageNumber((currPageNumber) => currPageNumber + 1)
				}}
				hasMore={hasMore}
				loader={isLoading && <h4 style={{ textAlign: "center" }}>Loading...</h4>}
			>
				<div
					style={{
						margin: "120px auto",
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-evenly",
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
