import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Topic } from '../../model/types/topic';

import styles from './TopicCard.module.css';

interface TopicCardProps {
	topic: Topic;
}

export const TopicCard = ({ topic }: TopicCardProps) => {
	return (
		<Flex direction="column" gap="24" className={styles.wrap}>
			<Card withOutsideShadow>
				<Flex gap="16">
					<Text variant="head2">{topic.title}</Text>
				</Flex>
			</Card>

			<Card withOutsideShadow expandable>
				<Flex direction="column" gap="20">
					<Text variant="head3">Описание темы</Text>

					<p>{topic.description}</p>
				</Flex>
			</Card>
		</Flex>
	);
};
