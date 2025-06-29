import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import styles from './BackButton.module.css';

/**
 * Button to return to the previous page
 */

export const BackButton = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.translation);

	const onReturnBack = () => {
		navigate(-1);
	};

	return (
		<IconButton
			data-testid="BackButton"
			onClick={onReturnBack}
			aria-label={t(Translation.BACK_BUTTON)}
			icon={<Icon icon="arrowLeft" size={20} />}
			form="round"
			variant="outline"
			className={styles.button}
		/>
	);
};
