import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import styles from '@/features/collections/trainCollection/ui/TrainCollectionButton.module.css';

export const WatchCollectionButton = () => {
	const { t } = useTranslation(i18Namespace.collection);
	const navigate = useNavigate();
	return (
		<>
			<Button
				className={styles.button}
				variant={'tertiary'}
				preffix={<Icon icon="watch" size={24} />}
				onClick={() => {
					navigate('/avos');
				}}
			>
				{t(Collections.INTERVIEW_WATCH)}
			</Button>
		</>
	);
};
