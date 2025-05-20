import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './CollectionAdditionalInfoDrawer.module.css';

export const CollectionAdditionalInfoDrawerSkeleton = () => {
	const { t } = useTranslation(i18Namespace.translation);
	return (
		<div className={styles['popover-additional']}>
			<IconButtonSkeleton
				aria-label={t(Translation.SKELETON_ARIA_LABEL)}
				role="status"
				form="square"
				size="small"
				variant="tertiary"
			/>
		</div>
	);
};
