import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { A11y } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './BackButton.module.css';

/**
 * Button to return to the previous page
 */

export const BackButton = memo(() => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.a11y);

	const onReturnBack = () => {
		navigate(-1);
	};

	return (
		<IconButton
			data-testid="BackButton"
			onClick={onReturnBack}
			aria-label={t(A11y.BACK_BUTTON)}
			icon={<Icon icon="arrowLeft" size={20} />}
			form="round"
			theme="outline"
			className={styles.button}
		/>
	);
});

BackButton.displayName = 'BackButton';
