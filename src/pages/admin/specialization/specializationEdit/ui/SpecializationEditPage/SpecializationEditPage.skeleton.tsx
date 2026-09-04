import { Flex } from '@/shared/ui/Flex';

import { SpecializationEditFormSkeleton } from '@/features/specialization/editSpecialization';

export const SpecializationEditPageSkeleton = () => {
	return (
		<Flex direction="column" gap="16">
			<SpecializationEditFormSkeleton />
		</Flex>
	);
};
