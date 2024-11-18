import { FC, SVGProps } from 'react';

export interface Subscription {
	id: number;
	icon: string | FC<SVGProps<SVGSVGElement>>;
	name: string;
	description: string;
	price: number;
	advantages: string[];
}
