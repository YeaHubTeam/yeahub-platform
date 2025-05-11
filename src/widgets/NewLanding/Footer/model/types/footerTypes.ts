import { Pallete } from '@/shared/types/types';
import { IconName } from '@/shared/ui/Icon';

export interface LinkIcon {
	url: string;
	label: string;
	icon?: IconName;
	color?: Pallete;
	className?: string;
	isTextLink?: boolean;
}

export interface FooterLinksProps {
	links: LinkIcon[];
	className: string;
}
