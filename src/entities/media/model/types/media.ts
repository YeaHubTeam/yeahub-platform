import { SVGProps } from 'react';

export interface Media {
	title: string;
	link: string;
	specializationId: number;
	image?: React.FC<SVGProps<SVGSVGElement>>;
}
