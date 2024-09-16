import { FC, SVGProps } from 'react';

export interface MenuItem {
	route: string;
	title: string;
	icon: FC<SVGProps<SVGSVGElement>>;
}
