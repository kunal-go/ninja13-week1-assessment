import { ComponentProps, FC } from "react"
import { IMovie } from "../types/IMovie"

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
		<div
			style={{ margin: "25px 0px", width: "320px", textAlign: "center" }}
			{...rest}
		>
			<img
				style={{ height: "320px", maxWidth: "320px" }}
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>
			<div style={{ color: "#475569" }}>
				<div
					style={{
						fontWeight: "bold",
						textTransform: "uppercase",
						letterSpacing: "0.4px",
					}}
				>
					<small>{formattedReleasedDate}</small>
				</div>

				<div
					style={{
						color: "#1e293b",
						fontSize: "20px",
						fontWeight: "bold",
						margin: "3px 0px 4px 0px",
					}}
				>
					{movie.title}
				</div>
				<div>
					&#9734; <b>{movie.vote_average}</b> / 10 ({movie.vote_count} Reviews)
				</div>
			</div>
		</div>
	)
}

export default MovieCard
