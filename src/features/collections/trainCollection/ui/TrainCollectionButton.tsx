import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

import { useGetActiveQuizQuery, useLazyCreateNewQuizQuery } from '@/entities/quiz';

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

	const { data: activeQuiz, isLoading: isActiveQuizLoading } = useGetActiveQuizQuery({
		profileId,
		page: 1,
		limit: 1,
	});
	const isActiveQuizDisabled = !!activeQuiz || isActiveQuizLoading;

	const handleTrainCollection = () => {
		createNewQuiz({ profileId, collection: Number(collectionId), limit: 100 });
	};

	return (
		<Tooltip
			title={t(Collections.TOOLTIP_TITLE)}
			tooltipDelay={{ open: 0, close: 150 }}
			color="violet"
			shouldShowTooltip={isActiveQuizDisabled}
			ariaLabel={t(Collections.TOOLTIP_ARIA_LABEL)}
		>
			<Button
				className={styles.button}
				preffix={<Icon icon="student" size={24} />}
				variant={variant}
				onClick={handleTrainCollection}
				disabled={isCreateNewQuizLoading || isActiveQuizDisabled}
			>
				{t(Collections.COLLECTIONS_TRAIN)}
			</Button>
		</Tooltip>
	);
};
