import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetTopicByIdQuery, TopicAdditionalInfo, TopicCard } from '@/entities/topic';

import { DeleteTopicButton } from '@/features/topics/deleteTopic';

const TopicDetailPage = () => {
	const { topicId } = useParams<{ topicId: string }>();
	const { t } = useTranslation(i18Namespace.translation);
	const { data: topic } = useGetTopicByIdQuery(topicId!);

	if (!topic) {
		return null;
	}

	return (
		<>
			<Flex align="center" justify="between" gap="8" style={{ marginBottom: 34 }}>
				<BackButton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<DeleteTopicButton topicId={topic.id} isDetailPage />
					<NavLink
						style={{ marginLeft: 'auto' }}
						to={route(ROUTES.admin.topics.edit.page, topic.id)}
					>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</Flex>

			<Flex gap="20" direction="row">
				<TopicCard topic={topic} />
				<TopicAdditionalInfo topic={topic} />
			</Flex>
		</>
	);
};

export default TopicDetailPage;
