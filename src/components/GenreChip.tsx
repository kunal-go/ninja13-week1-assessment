import styled from "@emotion/styled"
import { FC } from "react"

const GenreChip: FC = ({ children }) => <Chip>{children}</Chip>

const Chip = styled.div`
	border: 1px solid #ccc;
	border-radius: 5px;
	margin: 5px;
	padding: 5px 10px;
`

export default GenreChip
