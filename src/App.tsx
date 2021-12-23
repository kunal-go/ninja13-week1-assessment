import { useCallback, useEffect, useMemo, useState } from "react"
import { IMovie } from "./IMovie"
import MovieCard from "./MovieCard"
import "./App.css"

export default function App() {
	const apiKey = process.env.REACT_APP_API_KEY
	const pageNo = 1 // temporary hard-coded value

	const [movies, setMovies] = useState<IMovie[]>([])
	const [searchText, setSearchText] = useState<string>("")
	const [errorMessage, setErrorMessage] = useState<string>()

	const fetchMovies = useCallback(async () => {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${pageNo}`

		try {
			const response = await fetch(url)
			const data = await response.json()
			setMovies(data.results)
		} catch (err) {
			if (err instanceof Error) {
				setErrorMessage(err.message)
			}
		}
	}, [apiKey, pageNo])

	useEffect(() => {
		fetchMovies()
	}, [fetchMovies])

	const filteredMovies = useMemo(() => {
		if (searchText !== "") {
			return movies.filter((movie) =>
				movie.title.toLowerCase().includes(searchText.toLowerCase()),
			)
		}
		return movies
	}, [movies, searchText])

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
			<div className="movie-card-list-container">
				{filteredMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} className="movie-card" />
				))}
			</div>
		</div>
	)
}
