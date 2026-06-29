import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { SpecializationCardSkeleton } from '@/entities/specialization';

import { DeleteSpecializationButtonSkeleton } from '@/features/specialization/deleteSpecialization';

export const SpecializationDetailPageSkeleton = () => {
	return (
		<>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButtonSkeleton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<DeleteSpecializationButtonSkeleton isDetailPage />
					<ButtonSkeleton width={180} style={{ marginLeft: 'auto' }} />
				</Flex>
			</Flex>
			<SpecializationCardSkeleton />
		</>
	);
};
