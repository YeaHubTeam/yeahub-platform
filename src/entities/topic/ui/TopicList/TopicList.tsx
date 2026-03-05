import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';

import type { Topic } from '@/entities/topic';

interface TopicListProps {
	topics: Topic[];
	onClick?: (topicId: number) => void;
}

export const TopicList = ({ topics, onClick }: TopicListProps) => {
	return (
		<Flex componentType="ul" gap="10" wrap="wrap">
			{topics?.map((topic) => {
				return (
					<li key={topic.id}>
						<Chip onClick={() => onClick?.(topic.id)} label={topic.title} theme="primary" active />
					</li>
				);
			})}
		</Flex>
	);
};
