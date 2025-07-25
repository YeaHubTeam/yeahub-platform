import { SVGProps } from 'react';

export interface Media {
	title: string;
	link: string;
	specializationId: number;
}

export interface MediaWithImage extends Media {
	image?: React.FC<SVGProps<SVGSVGElement>>; // Используем тип компонента, а не JSX
}
