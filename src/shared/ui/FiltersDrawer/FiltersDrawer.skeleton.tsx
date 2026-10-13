import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Translation } from '@/shared/config';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import { filtersDrawerTestIds } from './constants';

export const FiltersDrawerSkeleton = () => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<div data-testid={filtersDrawerTestIds.filtersDrawerSkeletonChildren}>
			<IconButtonSkeleton
				aria-label={t(Translation.LOADING)}
				role="status"
				form="square"
				size="small"
				variant="tertiary"
			/>
		</div>
	);
};
