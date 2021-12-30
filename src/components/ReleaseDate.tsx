import styled from "@emotion/styled"
import { ComponentProps, FC } from "react"
import { formattedDate } from "../utils"

interface Props extends ComponentProps<"div"> {
	date: string | Date
}

const ReleaseDate: FC<Props> = ({ date, ...rest }) => {
	const releaseDate = formattedDate(date)
	return <ReleasedDate {...rest}>{releaseDate}</ReleasedDate>
}

export default ReleaseDate

const ReleasedDate = styled.div`
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 0.4px;
`
