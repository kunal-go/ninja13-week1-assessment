import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import MovieCard from "../components/MovieCard"
import { useFetchMovies } from "../hooks/useFetchMovies"
import { IMovie } from "../types/IMovie"

export default function HomePage() {
	const [pageNumber, setPageNumber] = useState(1)
	const [searchText, setSearchText] = useState<string>("")
	const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([])
	const { movies, errorMessage, isLoading, hasMore } = useFetchMovies(pageNumber)

	useEffect(() => {
		if (searchText === "") {
			setFilteredMovies(movies)
			return
		}

		setFilteredMovies(
			movies.filter((movie) =>
				movie.title.toLowerCase().includes(searchText.toLowerCase()),
			),
		)
	}, [searchText, movies])

	function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
		const searchTextValue = event?.target?.value || ""
		setSearchText(searchTextValue)
	}

	function handleNextPage() {
		if (searchText !== "") return
		setPageNumber((currPageNumber) => currPageNumber + 1)
	}

	return (
		<div className="app">
			<Header>
				<PageTitle>Popular Movies</PageTitle>
				<div>
					<label>Search: </label>
					<SearchInput
						type="text"
						value={searchText}
						onChange={handleSearchTextChange}
					/>
				</div>
			</Header>

			{errorMessage && <div className="error">{errorMessage}</div>}

			<InfiniteScroll
				dataLength={movies.length}
				hasMore={hasMore}
				loader={isLoading && <Loader />}
				next={handleNextPage}
			>
				<ListContainer>
					{isLoading && <Loader />}
					{filteredMovies.map((movie) => (
						<Link
							key={movie.id}
							to={`/movie/${movie.id}`}
							style={{ textDecoration: "none" }}
						>
							<MovieCard movie={movie} />
						</Link>
					))}
				</ListContainer>
			</InfiniteScroll>
		</div>
	)
}

const Header = styled.div`
	position: fixed;
	width: 100%;
	background-color: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	text-align: center;
`

const PageTitle = styled.div`
	font-size: 25px;
	font-weight: bold;
	padding: 10px;
`

const SearchInput = styled.input`
	margin-bottom: 10px;
	padding: 7px 20px;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
`

const ListContainer = styled.div`
	margin: 120px auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`
