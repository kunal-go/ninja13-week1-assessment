import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"
import NotFoundPage from "./pages/NotFoundPage"

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movie/:id" element={<MovieDetailsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}
