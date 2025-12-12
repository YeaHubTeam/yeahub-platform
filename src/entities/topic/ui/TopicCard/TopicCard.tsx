import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

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
					<h2>{topic.title}</h2>
				</Flex>
			</Card>

			<Card withOutsideShadow expandable>
				<Flex direction="column" gap="20">
					<h3>{topic.title}</h3>

					<p>{topic.description}</p>
				</Flex>
			</Card>
		</Flex>
	);
};
