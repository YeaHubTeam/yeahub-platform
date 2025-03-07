import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';

import { useLazyCreateNewQuizQuery } from '@/entities/quiz';

import styles from './TrainCollectionButton.module.css';

interface TrainCollectionProps {
	collectionId?: string;
	profileId: string;
	isDisabled: boolean;
	variant?: 'tertiary' | 'link-gray';
	onSuccess?: () => void;
}

export const TrainCollectionButton = ({
	collectionId,
	profileId,
	isDisabled,
	variant = 'tertiary',
}: TrainCollectionProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const navigate = useNavigate();

	const [createNewQuiz] = useLazyCreateNewQuizQuery();

	const handleTrainCollection = async () => {
		if (!collectionId || !profileId) return;

		try {
			await createNewQuiz({
				profileId,
				collection: Number(collectionId),
				mode: 'RANDOM',
			}).unwrap();
			navigate(ROUTES.interview.new.page);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Ошибка при создании квиза:', error);
		}
	};

	return (
		<Button
			className={styles.button}
			preffix={<Icon icon="student" size={24} />}
			variant={variant}
			onClick={handleTrainCollection}
			disabled={isDisabled}
		>
			{t(Collections.COLLECTIONS_TRAIN)}
		</Button>
	);
};
