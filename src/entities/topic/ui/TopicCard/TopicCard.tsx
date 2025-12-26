import { useTranslation } from 'react-i18next';

import { Topics, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Topic } from '../../model/types/topic';

import styles from './TopicCard.module.css';

interface TopicCardProps {
	topic: Topic;
}

export const TopicCard = ({ topic }: TopicCardProps) => {
	const { t } = useTranslation(i18Namespace.topic);
	return (
		<Flex direction="column" gap="24" className={styles.wrap}>
			<Card withOutsideShadow className={styles.card}>
				<Flex gap="16">
					<Text variant="body6">{topic.title}</Text>
				</Flex>
			</Card>

			<Card withOutsideShadow expandable className={styles.card}>
				<Flex direction="column" gap="20">
					<Text variant="body5-accent">{t(Topics.DESCRIPTION_FULL)}</Text>

					<Text variant="body3">{topic.description}</Text>
				</Flex>
			</Card>
		</Flex>
	);
};
