import React from 'react';

import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { DeleteButtonSkeleton } from '@/shared/ui/DeleteButton';
import { Flex } from '@/shared/ui/Flex';

import { TopicAdditionalInfoSkeleton, TopicCardSkeleton } from '@/entities/topic';

export const TopicDetailPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<DeleteButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<Flex gap="24">
				<TopicCardSkeleton />
				<TopicAdditionalInfoSkeleton />
			</Flex>
		</>
	);
};
