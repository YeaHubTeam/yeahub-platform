import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import styles from './TrainCollectionButton.module.css';

interface TrainCollectionProps {
	collectionId?: number | string;
	isSmallIcon?: boolean;
	isDisabled: boolean;
	isPopover?: boolean;
	variant?: 'tertiary' | 'link-gray';
	onSuccess?: () => void;
}

export const TrainCollectionButton = ({
	collectionId,
	isSmallIcon,
	isDisabled,
	isPopover = false,
	variant = 'tertiary',
}: TrainCollectionProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const handleTrainCollection = () => {
		// eslint-disable-next-line no-console
		console.log('Коллекция изучена успешно', collectionId);
	};

	const iconSize = isSmallIcon ? 20 : 24;

	return (
		<Button
			className={isPopover ? styles.button : ''}
			preffix={<Icon icon="student" size={iconSize} />}
			variant={variant}
			onClick={handleTrainCollection}
			disabled={isDisabled}
		>
			{t(Collections.COLLECTIONS_TRAIN)}
		</Button>
	);
};
