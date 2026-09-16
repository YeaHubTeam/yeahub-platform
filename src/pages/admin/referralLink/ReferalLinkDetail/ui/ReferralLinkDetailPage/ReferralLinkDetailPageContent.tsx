import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';

import { type ReferralLink, ReferralLinkCard } from '@/entities/referralLink';

import { useDeleteReferralLinkMutation } from '@/features/referralLinks/deleteReferralLink';

import { ReferralLinkAdditionalInfo } from '@/widgets/referralLink/ReferralLinkAdditionalInfo';

interface ReferralLinkDetailPageContentProps {
	referralLink: ReferralLink;
}

export const ReferralLinkDetailPageContent = ({
	referralLink,
}: ReferralLinkDetailPageContentProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	const [deleteReferralLink] = useDeleteReferralLinkMutation();

	const handleDeleteReferralLink = () => {
		void deleteReferralLink(referralLink.id);
	};

	return (
		<>
			<HeaderAdminPageDetailCard
				onDelete={handleDeleteReferralLink}
				deleteButtonProps={{ modalMessage: t(ReferralLinks.DELETE_MODAL_TEXT) }}
			/>
			<Flex gap="20" align="start">
				<ReferralLinkCard code={referralLink.refCode} link={referralLink.url} />
				<ReferralLinkAdditionalInfo
					ownerId={referralLink.ownerId}
					ownerUsername={referralLink.ownerUsername}
					linkedCount={referralLink.linkedCount}
					amountSum={referralLink.amountSum}
					createdAt={referralLink.createdAt}
					updatedAt={referralLink.createdAt}
				/>
			</Flex>
		</>
	);
};
