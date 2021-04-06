import { FC } from "react"
import "./header.styles.scss"

interface IHeader {
	title: string,
	username?: string,
}

export const Header: FC<IHeader> = ({title, username}) => {
	return(
		<div className="header-component">
			<div className="title">{title}</div>
			<div className="username">{username}</div> 
		</div>
	)
}