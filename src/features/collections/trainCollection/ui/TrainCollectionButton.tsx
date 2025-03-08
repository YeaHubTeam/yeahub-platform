import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import { useLazyCreateNewQuizQuery } from '@/entities/quiz';

import styles from './TrainCollectionButton.module.css';

interface TrainCollectionProps {
	collectionId?: string;
	profileId: string;
	variant?: 'tertiary' | 'link-gray';
	onSuccess?: () => void;
}

export const TrainCollectionButton = ({
	collectionId,
	profileId,
	variant = 'tertiary',
}: TrainCollectionProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	const [createNewQuiz, { isLoading: isCreateNewQuizLoading }] = useLazyCreateNewQuizQuery();

	const handleTrainCollection = () => {
		createNewQuiz({ profileId, collection: Number(collectionId) });
	};

	return (
		<Button
			className={styles.button}
			preffix={<Icon icon="student" size={24} />}
			variant={variant}
			onClick={handleTrainCollection}
			disabled={isCreateNewQuizLoading}
		>
			{t(Collections.COLLECTIONS_TRAIN)}
		</Button>
	);
};
