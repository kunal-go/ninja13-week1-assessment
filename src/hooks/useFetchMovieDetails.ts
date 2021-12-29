import { useEffect, useState } from "react"
import { IMovieDetails } from "../types/IMovieDetails"

export function useFetchMovieDetails(movieId: string) {
	const apiKey = process.env.REACT_APP_API_KEY
	const [movieDetails, setMovieDetails] = useState<IMovieDetails[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	useEffect(() => {
		setIsLoading(true)

		const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setMovieDetails(data)
			})
			.catch((err) => {
				if (err instanceof Error) setErrorMessage(err.message)
				setErrorMessage("Something went wrong")
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [apiKey, movieId])

	return { movieDetails, isLoading, errorMessage }
}
