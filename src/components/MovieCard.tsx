import styled from "@emotion/styled"
import { ComponentProps, FC } from "react"
import { IMovie } from "../types/IMovie"
import { imageLink } from "../utils"
import ReleaseDate from "./ReleaseDate"

interface Props extends ComponentProps<"div"> {
	movie: IMovie
}

const MovieCard: FC<Props> = ({ movie, ...rest }) => {
	const imageUrl = imageLink(movie.poster_path ?? "")

	return (
		<Card {...rest}>
			<PosterImage src={imageUrl} alt={movie.title} />
			<div style={{ color: "#475569" }}>
				<ReleaseDate date={movie.release_date} />
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

const Title = styled.div`
	color: #1e293b;
	font-size: 20px;
	font-weight: bold;
	margin: 3px 0px 4px 0px;
`
