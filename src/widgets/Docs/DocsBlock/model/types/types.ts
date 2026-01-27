import { TFunction } from 'i18next';

import { i18Namespace } from '@/shared/config';

export interface DockItem {
	name: string;
	link: string;
}

export type DocsTFunction = TFunction<typeof i18Namespace.docs>;
