import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './TopicAdditionalInfoDrawer.module.css';

export const TopicAdditionalInfoDrawerSkeleton = () => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<div className={styles['popover-additional']}>
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
