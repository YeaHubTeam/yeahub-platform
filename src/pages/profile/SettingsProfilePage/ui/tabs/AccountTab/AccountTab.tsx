import { Flex } from '@/shared/ui/Flex';

import { DeleteAccountSection } from '@/widgets/DeleteAccountSection';
import { ManageProfilesPanel, MultiProfileInfo } from '@/widgets/manageProfiles';

export const AccountTab = () => {
	return (
		<Flex direction="column" gap="32">
			<MultiProfileInfo />
			<ManageProfilesPanel />
			<DeleteAccountSection />
		</Flex>
	);
};
