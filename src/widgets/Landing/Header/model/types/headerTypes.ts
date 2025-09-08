import { To } from 'react-router-dom';

export interface HeaderNavLinks {
	link: To;
	path: string;
	title: string;
}

export interface HeaderNavLinksProps {
	links?: HeaderNavLinks[];
}
