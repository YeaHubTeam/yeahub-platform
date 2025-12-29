import { IconComponent } from '@/shared/ui/Icon';

export interface Media {
	title: string;
	link: string;
	specializations: number[];
	image?: IconComponent;
}
