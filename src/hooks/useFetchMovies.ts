import { useEffect, useState } from "react"
import {} from "react-router"
import { IMovie } from "../types/IMovie"

export function useFetchMovies(pageNumber: number) {
	const apiKey = process.env.REACT_APP_API_KEY
	const [movies, setMovies] = useState<IMovie[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${pageNumber}`

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setMovies((currentMovies) => [...currentMovies, ...data.results])
				setHasMore(data.results.length > 0)
			})
			.catch((err) => {
				if (err instanceof Error) {
					setErrorMessage(err.message)
				}
				setErrorMessage("Something went wrong")
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [apiKey, pageNumber])

	return { movies, isLoading, hasMore, errorMessage }
}
