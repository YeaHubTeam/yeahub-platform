import { ReactNode } from 'react';
import { To } from 'react-router-dom';

export interface HeaderNavItem {
	link: To;
	path: string;
	title: string;
}

export interface HeaderNavLinkProps extends Pick<HeaderNavItem, 'link' | 'path'> {
	children: ReactNode;
	className?: string;
}
