import { FC, SVGProps } from 'react';

export interface SubscriptionProps {
	id: number;
	icon: string | FC<SVGProps<SVGSVGElement>>;
	name: string;
	description: string;
	price: number;
	advantages: string[];
}
