import { ICollection } from "./ICollection"
import { IGenre } from "./IGenre"
import { IProductionCompany } from "./IProductionCompany"
import { MovieStatus } from "./MovieStatus"

export interface IMovieDetails {
	adult: boolean
	backdrop_path: string | null
	belongs_to_collection: ICollection
	budget: number
	genres: IGenre[]
	homepage: string
	id: number
	imdb_id: string | null
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string | null
	productionCompanies: IProductionCompany[]
	productionCountries: { name: string }[]
	release_date: string
	revenue: number
	runtime: number | null
	spoken_languages: { name: string }[]
	status: MovieStatus
	tagline: string
	title: string
	video: boolean
	vote_count: number
	vote_average: number
}
