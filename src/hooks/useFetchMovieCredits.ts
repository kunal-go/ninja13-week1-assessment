import { useEffect, useState } from "react"
import { ICast } from "../types/ICast"

export function useFetchMovieCredits(movieId: string) {
	const apiKey = process.env.REACT_APP_API_KEY
	const [castList, setCastList] = useState<ICast[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	useEffect(() => {
		setIsLoading(true)

		const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setCastList(data.cast)
			})
			.catch((err) => {
				if (err instanceof Error) setErrorMessage(err.message)
				setErrorMessage("Something went wrong")
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [apiKey, movieId])

	return { castList, isLoading, errorMessage }
}
