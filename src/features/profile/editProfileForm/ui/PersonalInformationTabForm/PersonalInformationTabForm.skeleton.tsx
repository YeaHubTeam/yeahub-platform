import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { AvatarFieldSkeleton } from '../AvatarField/AvatarField.skeleton';
import { LinksFieldSkeleton } from '../LinksField/LinksField.skeleton';
import { PersonalInfoFieldsSkeleton } from '../PersonalInfoFields/PersonalInfoFields.skeleton';

export const PersonalInformationTabFormSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap={isMobile ? '24' : '60'}>
			<AvatarFieldSkeleton />
			<PersonalInfoFieldsSkeleton />
			<LinksFieldSkeleton />
		</Flex>
	);
};
