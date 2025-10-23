import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

export const FiltersDrawerSkeleton = () => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<div>
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
