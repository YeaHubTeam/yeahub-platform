import { useScreenSize } from '@/shared/libs';
import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import {
	SpecializationAdditionalInfoSkeleton,
	SpecializationCardSkeleton,
} from '@/entities/specialization';

import { DeleteSpecializationButtonSkeleton } from '@/features/specialization/deleteSpecialization';

import { SpecializationHeaderSkeleton } from '@/widgets/specialization/SpecializationHeader';

export const SpecializationDetailPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButtonSkeleton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<DeleteSpecializationButtonSkeleton isDetailPage />
					<ButtonSkeleton width={180} style={{ marginLeft: 'auto' }} />
				</Flex>
			</Flex>
			<Flex gap="24">
				<Flex direction="column" gap="24" style={{ flex: '0 1 740px' }}>
					<SpecializationHeaderSkeleton />
					<SpecializationCardSkeleton />
				</Flex>
				{!isMobile && !isTablet && <SpecializationAdditionalInfoSkeleton />}
			</Flex>
		</>
	);
};
