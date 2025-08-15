import type { To } from 'react-router-dom';

import { IconName } from '@/shared/ui/Icon';

export interface NavItem {
	icon: IconName;
	label: string;
	route: To;
}
