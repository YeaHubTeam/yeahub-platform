import { FC, SVGProps } from 'react';

import { RoleName } from '@/entities/auth';

export type MenuItem = SingleMenuItem | CategoryMenuItem | SettingsMenuItem;
export interface SingleMenuItem {
	type: 'single';
	route: string;
	title: string;
	icon: FC<SVGProps<SVGSVGElement>>;
	notifications?: number;
	roles?: RoleName[];
	isAdmin?: boolean;
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
	roles?: RoleName[];
}

export interface SettingsMenuItem {
	type: 'settings';
	route: string;
	title: string;
	icon: FC<SVGProps<SVGSVGElement>>;
	notifications?: number;
	roles?: RoleName[];
	isAdmin?: boolean;
}
