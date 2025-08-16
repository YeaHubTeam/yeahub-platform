import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { AvatarField } from '../AvatarField/AvatarField';
import { LinksField } from '../LinksField/LinksField';
import { PersonalInfoFields } from '../PersonalInfoFields/PersonalInfoFields';

export const PersonalInformationTabForm = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap={isMobile ? '24' : '60'}>
			<AvatarField />
			<PersonalInfoFields />
			<LinksField />
		</Flex>
	);
};
