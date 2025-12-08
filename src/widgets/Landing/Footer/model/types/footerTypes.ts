import { Pallete } from '@/shared/libs';
import { IconName } from '@/shared/ui/Icon';

export interface LinkIcon {
	url: string;
	label: string;
	icon: IconName;
	color: Pallete;
	className: string;
}
