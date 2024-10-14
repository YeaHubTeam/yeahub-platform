import { FC, SVGProps } from 'react';

export type MenuItem = SingleMenuItem | CategoryMenuItem;
export interface SingleMenuItem {
	type: 'single';
	route: string;
	title: string;
	icon: FC<SVGProps<SVGSVGElement>>;
	notifications?: number;
}

export interface CategoryMenuItem {
	type: 'category';
	title: string;
	icon: FC<SVGProps<SVGSVGElement>>;
	notifications?: number;
	elements: {
		title: string;
		icon: FC<SVGProps<SVGSVGElement>>;
		route: string;
	}[];
}
