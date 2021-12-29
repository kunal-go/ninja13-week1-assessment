import { useEffect, useState } from "react"
import { IMovie } from "../types/IMovie"

export function useFetchMovieRecommendations(movieId: string) {
	const apiKey = process.env.REACT_APP_API_KEY
	const [recommendedMovies, setRecommendedMovies] = useState<IMovie[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	useEffect(() => {
		setIsLoading(true)

		const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setRecommendedMovies(data.results)
			})
			.catch((err) => {
				if (err instanceof Error) setErrorMessage(err.message)
				setErrorMessage("Something went wrong")
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [apiKey, movieId])

	return { recommendedMovies, isLoading, errorMessage }
}
