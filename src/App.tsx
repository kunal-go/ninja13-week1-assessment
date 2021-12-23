import { useCallback, useEffect, useState } from "react"
import { IMovie } from "./IMovie"
import MovieCard from "./MovieCard"
import "./App.css"

export default function App() {
	const apiKey = process.env.REACT_APP_API_KEY
	const pageNo = 1 // temporary hard-coded value

	const [movies, setMovies] = useState<IMovie[]>([])

	const fetchMovies = useCallback(async () => {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${pageNo}`

		const response = await fetch(url)
		const data = await response.json()
		setMovies(data.results)
	}, [apiKey, pageNo])

	useEffect(() => {
		fetchMovies()
	}, [fetchMovies])

	return (
		<div className="app">
			<h1>Popular Movies</h1>
			<div className="movie-card-list-container">
				{movies.map((movie) => (
					<MovieCard movie={movie} className="movie-card" />
				))}
			</div>
		</div>
	)
}
