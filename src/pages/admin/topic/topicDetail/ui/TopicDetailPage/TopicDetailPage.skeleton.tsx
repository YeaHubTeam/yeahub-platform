import React from 'react';

import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCardSkeleton } from '@/shared/ui/HeaderAdminPageDetailCard';

import { TopicAdditionalInfoSkeleton, TopicCardSkeleton } from '@/entities/topic';

export const TopicDetailPageSkeleton = () => {
	return (
		<>
			<HeaderAdminPageDetailCardSkeleton />
			<Flex gap="24">
				<TopicCardSkeleton />
				<TopicAdditionalInfoSkeleton />
			</Flex>
		</>
	);
};
