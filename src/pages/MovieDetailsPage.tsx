import styled from "@emotion/styled"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import CastCard from "../components/CastCard"
import GenreChip from "../components/GenreChip"
import Loader from "../components/Loader"
import MovieCard from "../components/MovieCard"
import { useFetchMovieCredits } from "../hooks/useFetchMovieCredits"
import { useFetchMovieDetails } from "../hooks/useFetchMovieDetails"
import { useFetchMovieRecommendations } from "../hooks/useFetchMovieRecommendations"
import { formattedDate, imageLink } from "../utils"

export default function MovieDetailsPage() {
	const movieId = useParams().id as string
	const { movieDetails, isLoading } = useFetchMovieDetails(movieId)
	const { recommendedMovies } = useFetchMovieRecommendations(movieId)
	const { castList, isLoading: isCastLoading } = useFetchMovieCredits(movieId)

	if (isLoading) return <Loader />
	if (!movieDetails) return null

	const imageUrl = imageLink(movieDetails.poster_path ?? "")
	const backDropImageUrl = imageLink(movieDetails.backdrop_path ?? "", "original")
	const releaseDate = formattedDate(movieDetails.release_date)

	return (
		<Container>
			<PosterCard style={{ backgroundImage: `url(${backDropImageUrl})` }}>
				<PosterCardBody>
					<PosterImage src={imageUrl} alt={movieDetails.title} />
					<div style={{ margin: "30px 5px" }}>
						<MovieTitle>{movieDetails.title}</MovieTitle>
						<MovieTagline>{movieDetails.tagline}</MovieTagline>
					</div>
				</PosterCardBody>
			</PosterCard>
			<MainSection>
				<GenreContainer>
					{movieDetails.genres.map((genre) => (
						<GenreChip key={genre.id}>{genre.name}</GenreChip>
					))}
				</GenreContainer>
				<ReleasedDate>{releaseDate}</ReleasedDate>
				<Overview>{movieDetails.overview}</Overview>
				<h2 style={{ marginTop: "30px" }}>Casts</h2>
				<CastContainer>
					{isCastLoading && <Loader />}
					{!isCastLoading &&
						castList.map((cast) => <CastCard key={cast.id} cast={cast} />)}
				</CastContainer>
			</MainSection>
			<RecommendationSection>
				<h1 style={{ textAlign: "center" }}>Similar Movies</h1>
				<RecommendationListContainer>
					{isLoading && <Loader />}
					{recommendedMovies.map((movie) => (
						<Link
							key={movie.id}
							to={`/movie/${movie.id}`}
							style={{ textDecoration: "none" }}
						>
							<MovieCard movie={movie} />
						</Link>
					))}
				</RecommendationListContainer>
			</RecommendationSection>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: black;
	color: white;
	overflow-x: hidden;
`

const MainSection = styled.div`
	margin: 30px 30px 50px 30px;
`

const RecommendationSection = styled.div`
	background-color: white;
	color: black;
	padding-top: 50px;
`

const PosterCard = styled.div`
	height: 500px;
	background-size: cover;
	background-position: center;
`

const PosterCardBody = styled.div`
	height: inherit;
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: flex-end;
	grid-gap: 20px;
	padding: 0px 30px;
	background: linear-gradient(transparent, rgba(0, 0, 0, 1));
`

const PosterImage = styled.img`
	height: 320px;
	max-width: 320px;
`

const MovieTitle = styled.div`
	font-size: 45px;
	margin: 6px 0px;
	color: white;
`

const MovieTagline = styled.div`
	font-size: 20px;
	color: #e2e8f0;
`

const ReleasedDate = styled.div`
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: #cbd5e1;
`

const GenreContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px auto;
	margin-left: -5px;
`

const Overview = styled.div`
	margin: 10px auto;
	color: #cbd5e1;
`

const RecommendationListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`

const CastContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px auto;
	margin-left: -5px;
`
