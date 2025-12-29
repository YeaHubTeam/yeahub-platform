import { useScreenSize } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { TopicAdditionalInfo } from '@/entities/topic/index';

import { DeleteTopicButtonSkeleton } from '@/features/topics/deleteTopic';

import { TopicBodySkeleton } from '@/widgets/topic/TopicBody';
import { TopicHeaderSkeleton } from '@/widgets/topic/TopicHeader';

export const TopicPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<BackHeader>
				<DeleteTopicButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeader>
			<Flex gap="20" align="start" flex={1} maxWidth>
				<Flex gap="20" direction="column" flex={1} maxWidth>
					<TopicHeaderSkeleton />
					<TopicBodySkeleton />
				</Flex>

				{!isMobile && !isTablet && <TopicAdditionalInfo />}
			</Flex>
		</>
	);
};
