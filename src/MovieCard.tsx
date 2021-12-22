import { FC } from "react"
import { IMovie } from "./IMovie"

interface Props {
	movie: IMovie
}

const MovieCard: FC<Props> = ({ movie }) => {
	return (
		<div className="movie-card">
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>
			<div className="movie-card-body">
				<h3>{movie.title}</h3>
				<p>{movie.overview}</p>
			</div>
		</div>
	)
}

export default MovieCard
