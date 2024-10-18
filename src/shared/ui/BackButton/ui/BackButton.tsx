import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Icon } from 'yeahub-ui-kit';

import styles from './BackButton.module.css';

export const BackButton = memo(() => {
	const navigate = useNavigate();

	const onReturnBack = () => {
		navigate(-1);
	};

	return (
		<IconButton
			onClick={onReturnBack}
			aria-label="back button"
			icon={<Icon icon="arrowLeft" size={20} />}
			form="round"
			theme="outline"
			className={styles.button}
		/>
	);
});

BackButton.displayName = 'BackButton';
