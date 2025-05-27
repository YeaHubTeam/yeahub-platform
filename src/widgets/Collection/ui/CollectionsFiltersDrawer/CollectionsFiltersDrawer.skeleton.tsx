import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './CollectionsFiltersDrawer.module.css';

export const CollectionsFiltersDrawerSkeleton = () => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<div className={styles['filters-mobile']}>
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
