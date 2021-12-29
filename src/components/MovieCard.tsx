import styled from "@emotion/styled"
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
		<Card {...rest}>
			<PosterImage
				src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
				alt={movie.title}
			/>
			<div style={{ color: "#475569" }}>
				<ReleasedDate>{formattedReleasedDate}</ReleasedDate>
				<Title>{movie.title}</Title>
				<div>
					&#9734; <b>{movie.vote_average}</b> / 10 ({movie.vote_count} Reviews)
				</div>
			</div>
		</Card>
	)
}

export default MovieCard

const Card = styled.div`
	margin: 25px 0px;
	width: 320px;
	text-align: center;
`

const PosterImage = styled.img`
	height: 320px;
	max-width: 320px;
`

const ReleasedDate = styled.div`
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 0.4px;
`

const Title = styled.div`
	color: #1e293b;
	font-size: 20px;
	font-weight: bold;
	margin: 3px 0px 4px 0px;
`
