import { ComponentProps, FC } from "react"
import { IMovie } from "./IMovie"
import "./MovieCard.css"

interface Props extends ComponentProps<"div"> {
	movie: IMovie
}

const MovieCard: FC<Props> = ({ movie, ...rest }) => {
	const releasedDate = new Date(movie.release_date)
	const formattedReleasedDate = releasedDate.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})

	return (
		<div className="movie-card" {...rest}>
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>
			<div className="movie-card-body">
				<div className="movie-date">
					<small>{formattedReleasedDate}</small>
				</div>

				<div className="movie-title">{movie.title}</div>
				<div>
					&#9734; <b>{movie.vote_average}</b> / 10 ({movie.vote_count} Reviews)
				</div>
			</div>
		</div>
	)
}

export default MovieCard
