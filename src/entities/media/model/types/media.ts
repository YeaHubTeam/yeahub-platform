import { IconComponent } from '@/shared/ui/Icon/types';

export interface Media {
	title: string;
	link: string;
	specializations: number[];
	image?: IconComponent;
}
