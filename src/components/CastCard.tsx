import styled from "@emotion/styled"
import { ComponentProps, FC } from "react"
import { ICast } from "../types/ICast"
import { imageLink } from "../utils"

interface Props extends ComponentProps<"div"> {
	cast: ICast
}

const CastCard: FC<Props> = ({ cast, ...rest }) => {
	const imageUrl = cast.profile_path
		? imageLink(cast.profile_path ?? "")
		: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIJkKK5Xl5uJtmXeAlVov4xhzFAmEhi7PbA&usqp=CAU"

	return (
		<Card {...rest}>
			<CastImage src={imageUrl} alt={cast.name} />
			<CastBody>
				<CastName>{cast.name}</CastName>
				<CastCharacter>{cast.character}</CastCharacter>
			</CastBody>
		</Card>
	)
}

export default CastCard

const Card = styled.div`
	width: 130px;
	padding: 15px;
	text-align: center;
`

const CastImage = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 100%;
	object-fit: cover;
`

const CastBody = styled.div``

const CastName = styled.div`
	font-size: 14px;
	font-weight: bold;
`

const CastCharacter = styled.div`
	font-size: 12px;
	color: #cbd5e1;
`
