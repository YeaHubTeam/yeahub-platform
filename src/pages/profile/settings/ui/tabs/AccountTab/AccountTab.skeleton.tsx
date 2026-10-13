import { BannerSkeleton } from '@/shared/ui/Banner';
import { Flex } from '@/shared/ui/Flex';

import { DeleteAccountSectionSkeleton } from '@/widgets/DeleteAccountSection';
import { ManageProfilesPanelSkeleton } from '@/widgets/manageProfiles';

export const AccountTabSkeleton = () => {
	return (
		<Flex direction="column" gap="32">
			<BannerSkeleton showDescription />
			<ManageProfilesPanelSkeleton />
			<DeleteAccountSectionSkeleton />
		</Flex>
	);
};
