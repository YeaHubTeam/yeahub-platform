import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './QuestionAdditionalInfoDrawer.module.css';

export const QuestionAdditionalInfoDrawerSkeleton = () => {
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
