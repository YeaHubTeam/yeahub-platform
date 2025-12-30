import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Translation } from '@/shared/config';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './BackButton.module.css';

export const BackButtonSkeleton = () => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<IconButtonSkeleton
			aria-label={t(Translation.BACK_BUTTON)}
			form="round"
			className={styles.button}
		/>
	);
};
