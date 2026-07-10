import React from 'react';

import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

import { SpecializationCardSkeleton } from '@/entities/specialization';

import { DeleteQuestionButtonSkeleton } from '@/features/question/deleteQuestion';

export const SpecializationDetailPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<DeleteQuestionButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<SpecializationCardSkeleton />
		</>
	);
};
