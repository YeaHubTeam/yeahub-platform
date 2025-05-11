import { useTranslation } from 'react-i18next';

import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import Stars from '@/widgets/Landing/CollectionBlock/model/assets/stars-outline.svg';

import styles from './CollectionCard.module.css';

interface CollectionCardProps {
	specialization: string;
	description: string;
	isPublic: boolean;
	imageSrc: string;
}

export const CollectionCard = ({
	specialization,
	description,
	isPublic,
	imageSrc,
}: CollectionCardProps) => {
	const { t } = useTranslation();

	return (
		<Card className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="14">
				<img className={styles.image} src={imageSrc} alt="company" />
				<Text variant="body1-accent" color="green-900" className={styles.tag}>
					{specialization}
				</Text>
				<Text className={styles.description} maxRows={2} variant="body3-accent">
					{description}
				</Text>
				{!isPublic && (
					<Text className={styles.badge} variant="body2-accent" color="purple-700">
						<Stars className={styles.star} /> {t(Landing.COLLECTION_STAR)}
					</Text>
				)}
				<Text variant="body3-accent" color="black-500">
					{specialization}
				</Text>
			</Flex>
		</Card>
	);
};
