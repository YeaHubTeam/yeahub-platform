import { useTranslation } from 'react-i18next';

import multyProfile from '@/shared/assets/images/multyProfile.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Banner } from '@/shared/ui/Banner';
import { Flex } from '@/shared/ui/Flex';

import { DeleteAccountSection } from '@/widgets/DeleteAccountSection';
import { ManageProfilesPanel } from '@/widgets/manageProfiles';

export const AccountTab = () => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Flex direction="column" gap="32">
			<Banner
				img={multyProfile}
				alt="MultyProfile"
				description={t(Profile.MANAGE_PROFILES_MULTIPROFILE_BANNER_DESCRIPTION)}
				color="white"
			/>
			<ManageProfilesPanel />
			<DeleteAccountSection />
		</Flex>
	);
};
