import React from 'react';

import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { DeleteButtonSkeleton } from '@/shared/ui/DeleteButton';

import { SpecializationCardSkeleton } from '@/entities/specialization';

export const SpecializationDetailPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<DeleteButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<SpecializationCardSkeleton />
		</>
	);
};
