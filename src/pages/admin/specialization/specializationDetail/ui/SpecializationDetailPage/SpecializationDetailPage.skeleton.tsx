import React from 'react';

import { HeaderAdminPageDetailCardSkeleton } from '@/shared/ui/HeaderAdminPageDetailCard';

import { SpecializationCardSkeleton } from '@/entities/specialization';

export const SpecializationDetailPageSkeleton = () => {
	return (
		<>
			<HeaderAdminPageDetailCardSkeleton />
			<SpecializationCardSkeleton />
		</>
	);
};
