import axios, { AxiosError } from "axios"
import {
	ValidationError,
	UnauthorisedError,
	ForbiddenError,
	NotFoundError,
	OperationError,
	UnexpectedError,
} from "./errors"

export async function apiRequester<RequestQueryShape, ResponseShape>(
	endpoint: string,
	params: RequestQueryShape,
) {
	const baseApiUrl = "https://api.themoviedb.org" // use ENV variables for production
	const apiKey = process.env.REACT_APP_API_KEY

	try {
		const response = await axios.get(`${baseApiUrl}/${endpoint}`, {
			params: { ...params, apiKey },
		})
		return response.data as ResponseShape
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const response = err.response as AxiosError["response"]
			const statusCode = response?.status ?? 500
			const message = response?.data?.status_message ?? "No error message provided"

			if (statusCode === 400) {
				throw new ValidationError(message)
			} else if (statusCode === 401) {
				window.location.reload()
				throw new UnauthorisedError(message)
			} else if (statusCode === 403) {
				throw new ForbiddenError(message)
			} else if (statusCode === 404) {
				console.error(message)
				throw new NotFoundError()
			} else if (statusCode === 422) {
				throw new OperationError(message)
			} else if (statusCode === 500) {
				console.error(message)
				throw new OperationError(message)
			}
		}
		throw new UnexpectedError(err)
	}
}
